# Documentation client Mintlify

Guide d'administration du blog All Access Metal, publié via [Mintlify](https://mintlify.com).

## Prévisualisation locale

Depuis la racine du projet :

```bash
npm run docs:dev
```

Ouvre la doc sur **http://localhost:3333** (port distinct du serveur Next.js sur 3000).

## Déploiement sur Mintlify

1. Créez un compte sur [dashboard.mintlify.com](https://dashboard.mintlify.com)
2. **New project** → connectez le dépôt GitHub `metalaxs`
3. Dans les paramètres du projet, définissez le **docs root** (ou *content directory*) sur : **`client-docs`**
4. Chaque push sur la branche principale déclenche un déploiement automatique
5. Mintlify vous attribue une URL du type `https://votre-projet.mintlify.app` — personnalisable avec un domaine (`docs.all-access-metal.fr`)

## Structure

```
client-docs/
├── docs.json          # Configuration Mintlify (navigation, couleurs, liens)
├── index.mdx          # Page d'accueil
├── studio/            # Accès et vue d'ensemble
└── guide/             # Contenu du guide client
```

## Source de vérité

Le contenu est dérivé de [`docs/GUIDE-CLIENT.md`](../docs/GUIDE-CLIENT.md). En cas de mise à jour, modifier d'abord le Markdown ou synchroniser les fichiers `.mdx` correspondants.
