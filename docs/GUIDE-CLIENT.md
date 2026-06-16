# Guide d'utilisation du blog — Metalaxs

Bienvenue ! Ce guide explique, **sans connaissances techniques**, comment gérer
le blog et les questionnaires de votre site depuis l'espace d'administration.

---

## 1. Accéder à l'administration

L'espace d'administration s'appelle le **Studio**. Il est accessible à l'adresse :

```
https://votre-domaine.com/studio
```

(En local pendant les tests : `http://localhost:3000/studio`.)

### Se connecter

1. Ouvrez l'adresse du Studio.
2. Choisissez votre méthode de connexion (**Google**, **GitHub** ou **e-mail**).
3. La première fois, demandez à l'administrateur du projet de vous **inviter**
   (depuis `manage.sanity.io` → *Members*) afin que votre compte ait les droits.

> 🔒 **Sécurité.** Seules les personnes invitées peuvent se connecter et modifier
> le contenu. Les visiteurs du site, eux, ne voient que les articles **publiés**.

---

## 2. Vue d'ensemble du Studio

Une fois connecté, le menu de gauche est organisé en deux groupes :

- **Blog**
  - **Articles** — vos publications
  - **Auteurs** — les rédacteurs
  - **Catégories** — le classement thématique
- **Questionnaires**
  - **Questionnaires** — vos formulaires multi-étapes
  - **Réponses reçues** — les soumissions des visiteurs

---

## 3. Écrire un article

### Créer

1. Menu **Blog → Articles**.
2. Cliquez sur **+** (ou « Create new ») en haut de la liste.
3. Remplissez les onglets du formulaire :

**Onglet « Contenu »**
- **Titre** — le titre de l'article (obligatoire).
- **Slug (URL)** — cliquez sur **Generate** pour le créer automatiquement à
  partir du titre. C'est la fin de l'adresse : `…/blog/mon-titre`.
- **Description / résumé** — court texte affiché dans la liste des articles et
  utilisé pour le référencement (obligatoire).
- **Contenu de l'article** — le corps du texte. Vous pouvez mettre en forme
  (gras, italique), ajouter des **titres**, des **listes**, des **liens** et
  insérer des **images**.

**Onglet « Médias »**
- **Image principale** — glissez-déposez une image. Pensez à remplir le
  **texte alternatif** (description de l'image, important pour l'accessibilité).
  Le « point focal » permet de choisir la zone à garder visible au recadrage.
- **Galerie d'images** — ajoutez plusieurs images supplémentaires.
- **Vidéo** — deux possibilités :
  - **Lien** : collez l'adresse d'une vidéo **YouTube** ou **Vimeo** (recommandé).
  - **Fichier vidéo** : à réserver aux **courtes** vidéos.

**Onglet « Métadonnées »**
- **Tags** — tapez un mot-clé puis Entrée pour l'ajouter (autant que voulu).
- **Auteur** — choisissez un auteur existant (voir §5).
- **Catégories** — rattachez l'article à une ou plusieurs catégories.
- **Date de publication** — pré-remplie à aujourd'hui ; modifiable.

### Enregistrer, publier, dépublier

- Vos modifications sont **sauvegardées automatiquement** en **brouillon**.
- Tant qu'un article est en brouillon, il **n'apparaît pas** sur le site.
- Cliquez sur **Publish** (en bas à droite) pour le rendre **visible**.
- Pour le retirer du site : **Unpublish**. Pour le supprimer : menu **⋮ → Delete**.

> ⏱️ Après publication, le site peut mettre quelques instants à afficher la
> nouveauté (mise en cache).

### Modifier un article existant

Cliquez sur l'article dans la liste, modifiez, puis **Publish** à nouveau.

---

## 4. Bonnes pratiques pour les images

- Privilégiez des images au format **paysage** pour l'image principale
  (rendu optimal en 16:9).
- Remplissez **toujours** le **texte alternatif** : c'est essentiel pour
  l'accessibilité (lecteurs d'écran) — cœur de la mission de Metalaxs.
- Évitez les fichiers trop lourds : Sanity optimise les images, mais une source
  raisonnable (< 2-3 Mo) reste préférable.

---

## 5. Gérer les auteurs et les catégories

### Auteurs (**Blog → Auteurs**)
Créez une fiche par rédacteur : **Nom**, **Slug** (Generate), **Photo**,
**Biographie**. La fiche s'affiche en bas des articles signés par l'auteur.

### Catégories (**Blog → Catégories**)
Créez vos thèmes : **Titre**, **Slug** (Generate), **Description**. Vous pourrez
ensuite les rattacher aux articles.

---

## 6. Créer un questionnaire

Menu **Questionnaires → Questionnaires → +**.

1. **Titre** et **Slug** (Generate).
2. **Description / introduction** — texte affiché en haut du formulaire.
3. **Étapes** — cliquez sur **Add item** pour ajouter une étape. Pour chaque
   étape :
   - **Titre de l'étape** et **description** (optionnelle).
   - **Questions** — **Add item** pour chaque question :
     - **Question** — l'intitulé affiché au visiteur.
     - **Type de réponse** :
       - *Texte court* / *Texte long*
       - *Choix unique* (boutons radio)
       - *Choix multiple* (cases à cocher)
       - *Liste déroulante*
       - *Oui / Non*
       - *Note (1 à 5)*
     - **Texte d'aide** (optionnel).
     - **Réponse obligatoire** — active la validation.
     - **Options de réponse** — apparaît pour les types à choix : ajoutez chaque
       option (libellé + valeur ; laissez la valeur identique au libellé en cas
       de doute).

4. **Publish**.

Le questionnaire est consultable par les visiteurs sur :

```
https://votre-domaine.com/questionnaire
```

> Le site affiche le questionnaire **le plus ancien** publié. Pour en mettre un
> autre en avant, demandez une petite évolution technique (routage par slug —
> voir la doc d'implémentation).

---

## 7. Consulter les réponses reçues

Menu **Questionnaires → Réponses reçues**.

- Chaque entrée correspond à un visiteur ayant rempli le formulaire.
- Le titre indique le **nom** (ou « Anonyme ») et la date ; une coche **✓**
  signale les réponses déjà **traitées**.
- En ouvrant une réponse, vous voyez **toutes les questions et réponses**.
- Vous pouvez cocher **Traité** et ajouter des **Notes internes** pour le suivi.
- Les réponses elles-mêmes ne sont **pas modifiables** (intégrité des données),
  mais vous pouvez supprimer une entrée (spam) via **⋮ → Delete**.

> Vous ne pouvez pas créer une réponse à la main : elles proviennent uniquement
> du formulaire public.

---

## 8. Questions fréquentes

**Je ne vois pas mon article sur le site.**
Vérifiez qu'il est bien **publié** (bouton *Publish*) et patientez quelques
instants (cache). Vérifiez aussi que la **date de publication** n'est pas dans le
futur.

**Une image ne s'affiche pas.**
Assurez-vous que l'upload est terminé (barre de progression) et que l'article a
été republié après l'ajout.

**Je n'arrive pas à me connecter au Studio.**
Votre compte doit être **invité** au projet. Contactez l'administrateur pour
recevoir une invitation.

**Puis-je revenir en arrière après une erreur ?**
Oui : Sanity conserve l'historique. Ouvrez le document, menu **⋮ → Review
changes / History** pour restaurer une version précédente.

---

Besoin d'aide ou d'une nouvelle fonctionnalité ? Contactez votre équipe
technique en mentionnant la page concernée (`/studio`, `/blog`,
`/questionnaire`).
