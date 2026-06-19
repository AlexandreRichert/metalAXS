# Implémentation du back-office Sanity

Ce document explique l'architecture technique mise en place pour gérer le blog
et les questionnaires d'All Access Metal avec **Sanity** (CMS headless) intégré à
**Next.js 16** (App Router, React 19).

---

## 1. Vue d'ensemble

```
┌────────────────────────────────────────────────────────────┐
│                      Application Next.js                     │
│                                                              │
│   /studio                       /blog, /blog/[slug]          │
│   ┌──────────────┐              /questionnaire               │
│   │ Sanity Studio │  écriture   ┌────────────────────────┐   │
│   │ (back-office) │ ──────────► │  Pages publiques (SSR)  │   │
│   │   + auth      │             │  lecture via GROQ        │   │
│   └──────┬───────┘              └───────────┬────────────┘   │
└──────────┼──────────────────────────────────┼───────────────┘
           │                                   │
           ▼                                   ▼
        ┌──────────────────────────────────────────┐
        │        Sanity Content Lake (cloud)         │
        │  documents : post, author, category,       │
        │  questionnaire, submission                 │
        └──────────────────────────────────────────┘
```

Trois rôles bien séparés :

1. **Le Studio** (`/studio`) : l'interface d'administration. C'est ici que le
   client se connecte et gère le contenu. Fournit l'**authentification**, le
   **CRUD** complet et la gestion des médias, sans aucune ligne de code à écrire.
2. **Les pages publiques** (`/blog`, `/questionnaire`) : elles **lisent** le
   contenu publié via le langage de requête GROQ.
3. **Le Content Lake** : la base de données hébergée par Sanity.

---

## 2. Pourquoi Sanity + Studio embarqué ?

| Besoin exprimé | Réponse Sanity |
| --- | --- |
| Authentification | Authentification intégrée du Studio (Google / GitHub / e-mail), gestion des membres et des rôles dans `manage.sanity.io`. Aucune gestion de mots de passe à coder. |
| CRUD d'articles | Édition complète via le Studio : titre, images, description, tags, vidéo, contenu riche. Brouillon / publication natifs. |
| Questionnaire multi-étapes | Modèle de données `questionnaire` (étapes → questions) + page publique multi-étapes + stockage des réponses (`submission`). |
| Architecture épurée | Logique séparée : schémas, accès aux données, et UI dans des dossiers distincts. |

> **Note sur l'authentification.** Le « système d'authentification » repose sur
> celui du Studio Sanity, qui protège l'accès à l'administration du contenu.
> C'est l'approche standard et sécurisée pour un back-office de blog. Si un jour
> vous avez besoin d'authentifier les **visiteurs** du site public (comptes
> utilisateurs, espace membre), c'est un besoin différent qui s'ajouterait via
> une librairie comme NextAuth/Auth.js — la section 9 en parle.

**Studio embarqué vs autonome.** Le Studio est ici *embarqué* dans l'app Next.js
(route `/studio`), ce qui donne un déploiement unique et une seule URL. Sanity
recommande aussi une variante *autonome* (Studio dans un dossier séparé, lancé
avec `sanity dev`) pour des builds plus rapides et des mises à jour automatiques.
Pour ce projet — une seule application, un seul déploiement — l'embarqué est le
plus simple. La migration vers un Studio autonome reste possible plus tard.

---

## 3. Structure des fichiers

```
metalaxs/
├── sanity.config.ts            # Config du Studio (schémas, plugins, structure)
├── sanity.cli.ts               # Config CLI (typegen, etc.)
├── .env.local.example          # Modèle de variables d'environnement
│
├── sanity/                     # ── Tout le code lié à Sanity ──
│   ├── env.ts                  # Lecture + validation des variables d'env
│   ├── structure.ts            # Organisation du menu du Studio
│   ├── schemaTypes/            # Modèle de données
│   │   ├── index.ts            # Agrégation de tous les types
│   │   ├── documents/          # Types « document » (stockés)
│   │   │   ├── post.ts         # Article
│   │   │   ├── author.ts       # Auteur
│   │   │   ├── category.ts     # Catégorie
│   │   │   ├── questionnaire.ts
│   │   │   └── submission.ts   # Réponse à un questionnaire
│   │   └── objects/            # Types « objet » réutilisables
│   │       ├── blockContent.ts # Texte riche (Portable Text)
│   │       ├── video.ts
│   │       ├── step.ts         # Étape d'un questionnaire
│   │       ├── question.ts
│   │       ├── questionOption.ts
│   │       └── answer.ts
│   └── lib/                    # ── Couche d'accès aux données ──
│       ├── client.ts           # Client de lecture (CDN)
│       ├── write-client.ts     # Client d'écriture (serveur uniquement)
│       ├── token.ts            # Jetons d'API (serveur uniquement)
│       ├── image.ts            # Construction d'URL d'images
│       ├── fetch.ts            # Wrapper de lecture avec cache
│       ├── queries.ts          # Requêtes GROQ centralisées
│       └── types.ts            # Types TypeScript des résultats
│
└── app/
    ├── layout.tsx              # Layout racine minimal (html/body/polices)
    ├── studio/
    │   └── [[...tool]]/page.tsx# Montage du Studio en plein écran
    └── (site)/                 # Groupe de routes du site public
        ├── layout.tsx          # En-tête + pied de page
        ├── page.tsx            # Accueil
        ├── blog/
        │   ├── page.tsx        # Liste des articles
        │   └── [slug]/page.tsx # Détail d'un article
        ├── questionnaire/
        │   ├── page.tsx        # Page du questionnaire
        │   ├── multi-step-form.tsx  # Formulaire multi-étapes (client)
        │   └── actions.ts      # Server Action d'enregistrement
        └── … (autres pages existantes)
```

### Le groupe de routes `(site)`

Pour que le Studio s'affiche en **plein écran** (sans l'en-tête ni le pied de
page du site), l'arborescence a été réorganisée :

- `app/layout.tsx` ne contient plus que `<html>`/`<body>` et les polices.
- `app/(site)/layout.tsx` ajoute l'en-tête et le pied de page **uniquement**
  aux pages publiques.
- `/studio` n'étant pas dans le groupe `(site)`, il hérite seulement du layout
  racine et occupe tout l'écran.

Les URLs publiques sont inchangées : les parenthèses d'un groupe de routes
n'apparaissent jamais dans l'URL.

---

## 4. Modèle de données

### Article (`post`)
| Champ | Type | Notes |
| --- | --- | --- |
| `title` | string | Obligatoire, max 120 |
| `slug` | slug | Généré depuis le titre, sert d'URL |
| `description` | text | Résumé (liste + SEO), obligatoire |
| `body` | blockContent | Contenu riche (titres, listes, liens, images) |
| `mainImage` | image | Avec point focal + texte alternatif |
| `gallery` | image[] | Galerie d'images |
| `video` | video | Lien YouTube/Vimeo **ou** fichier téléversé |
| `tags` | string[] | Saisie libre type « tags » |
| `author` | reference → author | |
| `categories` | reference[] → category | |
| `publishedAt` | datetime | Date de publication |

### Auteur (`author`), Catégorie (`category`)
Documents simples (nom/titre, slug, image, description).

### Questionnaire (`questionnaire`)
- `title`, `slug`, `description`
- `steps[]` (étapes) → chaque étape a un `title`, une `description` et des
  `questions[]`.
- Chaque **question** : `label`, `type` (texte court/long, choix unique,
  choix multiple, liste, oui/non, note 1-5), `helpText`, `required`, `options[]`.

> L'**identifiant** d'une question est le `_key` généré automatiquement par
> Sanity pour chaque élément de tableau : aucune saisie technique n'est demandée
> au client.

### Réponse (`submission`)
- `questionnaire` (référence), `respondentName`, `respondentEmail`,
  `submittedAt`, `answers[]`.
- Chaque **réponse** (`answer`) stocke `questionKey`, `questionLabel`
  (dénormalisé pour rester lisible même si la question change ensuite) et
  `values[]`.
- Champs en **lecture seule** (remplis par le formulaire), sauf `reviewed`
  (traité) et `notes` que l'équipe peut éditer pour le suivi.
- La création manuelle est désactivée via `newDocumentOptions` dans
  `sanity.config.ts` : une soumission provient toujours du formulaire public.

---

## 5. Lecture des données (pages publiques)

Les requêtes GROQ sont centralisées dans `sanity/lib/queries.ts` et exécutées
côté serveur via le wrapper `sanityFetch` (`sanity/lib/fetch.ts`) :

```ts
const posts = await sanityFetch<PostListItem[]>({
  query: POSTS_QUERY,
  tags: ["post", "author"],
});
```

- `client.ts` lit le **contenu publié** via le CDN (`useCdn: true`) : rapide et
  économique.
- `fetch.ts` ajoute la gestion du cache Next.js (`tags` pour l'invalidation
  ciblée, `revalidate` pour une durée de cache).
- Les images sont transformées à la volée par `image.ts`
  (`urlForImage(img).width(800).height(450).fit("crop").url()`).
- Le contenu riche est rendu par `app/components/portable-text.tsx`.
- Les routes d'articles sont pré-générées via `generateStaticParams`.

---

## 6. Écriture des données (questionnaire)

Le formulaire multi-étapes est un **Client Component** (`multi-step-form.tsx`)
qui gère la navigation entre étapes, la validation des champs obligatoires et
l'état des réponses. À la soumission, il appelle une **Server Action**
(`actions.ts`) :

```ts
"use server";
export async function submitQuestionnaire(payload) {
  // 1. Validation avec Zod
  // 2. Écriture via le client serveur (writeClient.create)
}
```

Points de sécurité :

- L'écriture utilise `write-client.ts`, importé avec `server-only` : il ne peut
  **jamais** être inclus dans un bundle navigateur.
- Le jeton d'écriture vit dans `SANITY_API_WRITE_TOKEN` (sans préfixe
  `NEXT_PUBLIC_`), donc invisible côté client.
- Les données reçues sont validées par **Zod** avant écriture.

---

## 7. Variables d'environnement

Copiez `.env.local.example` en `.env.local` :

| Variable | Rôle | Exposée au navigateur ? |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID du projet Sanity | Oui (nécessaire au Studio) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (`production`) | Oui |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Version d'API (date) | Oui |
| `SANITY_API_WRITE_TOKEN` | Écriture (réponses) | **Non — secret** |
| `SANITY_API_READ_TOKEN` | Lecture des brouillons (optionnel) | **Non — secret** |

`sanity/env.ts` lève une erreur explicite si une variable publique manque.

---

## 8. Installation pas à pas

1. **Créer le projet Sanity** (une seule fois). Deux options :
   - via le site `manage.sanity.io` (Create project → dataset `production`), ou
   - via la CLI : `npx sanity@latest login` puis `npx sanity@latest init`
     (choisir « use existing/new project », dataset `production`).
   Récupérez l'**ID de projet**.
2. **Renseigner `.env.local`** avec l'ID de projet et le dataset.
3. **Créer un jeton d'écriture** : `manage.sanity.io` → votre projet → API →
   Tokens → *Add API token* → permission **Editor**. Collez-le dans
   `SANITY_API_WRITE_TOKEN`.
4. **Configurer le CORS** : `manage.sanity.io` → API → CORS origins → ajoutez
   `http://localhost:3000` (et l'URL de production) avec **Allow credentials**
   activé. Sans cela, le Studio reste bloqué sur l'écran de connexion.
5. **Lancer** : `npm run dev`, puis ouvrez `http://localhost:3000/studio`.

> Tant que `.env.local` n'est pas renseigné, `npm run build` et l'accès aux
> pages Sanity échouent volontairement avec un message clair : c'est attendu.

---

## 9. Déploiement (Vercel)

1. Ajoutez les variables d'environnement dans Vercel (les `NEXT_PUBLIC_*` pour
   les 3 environnements, les jetons en secret).
2. Ajoutez l'URL de production et le motif des URLs de preview
   (`https://*-votre-equipe.vercel.app`) au CORS Sanity, *Allow credentials* ON.
3. `git push` : le Studio est disponible sur `votre-domaine.com/studio`.

### Invalidation du cache à la publication (optionnel mais recommandé)

Pour que le site se mette à jour instantanément après une publication, créez un
**webhook Sanity** (GROQ-powered) pointant vers une route
`/api/revalidate/tag` qui appelle `revalidateTag`. Le wrapper `sanityFetch`
pose déjà les tags (`post`, `post:<slug>`, `author`, `questionnaire`).

---

## 10. Pistes d'évolution

- **Typegen** : `npm run typegen` génère des types TypeScript à partir des
  requêtes GROQ (remplace les types manuels de `sanity/lib/types.ts`).
- **Prévisualisation des brouillons** : Draft Mode + outil Presentation
  (`next-sanity`), avec `SANITY_API_READ_TOKEN`.
- **Live Content API** (`defineLive`) : mises à jour en temps réel.
- **Authentification des visiteurs** du site public : librairie dédiée
  (NextAuth/Auth.js, Clerk…) — distincte de l'auth du Studio.
- **Plusieurs questionnaires** : la page `/questionnaire` charge actuellement le
  plus ancien ; on peut router par slug (`/questionnaire/[slug]`) en réutilisant
  `QUESTIONNAIRE_QUERY`.
