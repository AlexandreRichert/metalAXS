# Gestion du blog Metalaxs

Bienvenue ! Ce guide explique, **sans connaissances techniques**, comment gérer
les contenus du blog de votre site depuis votre espace d'administration.

---

## 1. Accéder à l'administration

L'espace d'administration s'appelle le **Studio**. Il est accessible à l'adresse :

```
https://votre-domaine.com/studio
```

(En local pendant les tests : `http://localhost:3000/studio`.)

### Se connecter

1. Vous recevez un **e-mail d'invitation** pour rejoindre la plateforme Studio
   du CMS.
2. Acceptez l'invitation, afin que votre compte soit ajouté aux **Members** du
   projet.
3. Ouvrez l'adresse du Studio.
4. Connectez-vous avec la méthode associée à l'invitation (**Google**,
   **GitHub** ou **e-mail**).

> **Sécurité.** Seules les personnes invitées peuvent se connecter et modifier
> le contenu. Les visiteurs du site, eux, ne voient que les articles **publiés**.

---

## 2. Vue d'ensemble du Studio

Une fois connecté, le menu de gauche est organisé dans la section **Blog** :

- **Articles** — vos publications
- **Auteurs** — les rédacteurs
- **Catégories** — le classement thématique

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

## 6. Questions fréquentes

**Je ne vois pas mon article sur le site.**
Vérifiez qu'il est bien **publié** (bouton _Publish_) et patientez quelques
instants (cache). Vérifiez aussi que la **date de publication** n'est pas dans le
futur.

**Une image ne s'affiche pas.**
Assurez-vous que l'upload est terminé (barre de progression) et que l'article a
été republié après l'ajout.

**Je n'arrive pas à me connecter au Studio.**
Vérifiez que vous avez bien reçu l'**e-mail d'invitation** au Studio CMS.
Si besoin, contactez votre administrateur pour qu'il renvoie l'invitation.

**Puis-je revenir en arrière après une erreur ?**
Oui : Sanity conserve l'historique. Ouvrez le document, menu **⋮ → Review
changes / History** pour restaurer une version précédente.

---

Besoin d'aide ou d'une nouvelle fonctionnalité ? Contactez votre équipe
technique en mentionnant la page concernée (`/studio` ou `/blog`).
