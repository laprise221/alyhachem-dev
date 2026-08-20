# Aly Hachem Development — site vitrine

Site statique (HTML / CSS / JS, aucune dépendance, aucun build).

| | |
|---|---|
| **En ligne** | https://laprise221.github.io/alyhachem-dev/ |
| **Dépôt** | https://github.com/laprise221/alyhachem-dev |
| **Domaine prévu** | https://alyhachem.dev |

## Contenu

```
index.html            page unique (hero, services, réalisations, méthode, à propos, FAQ, contact)
404.html              page d'erreur
robots.txt            autorise l'indexation + déclare le sitemap
sitemap.xml           1 URL + les 2 images de réalisations
site.webmanifest      icônes et couleurs (installation sur mobile)
favicon.ico           favicon multi-taille à la racine
assets/css/style.css  toute la mise en forme
assets/js/main.js     menu mobile, en-tête, formulaire → e-mail, lien de nav actif
assets/img/           logo, favicons, image de partage, captures des réalisations
logo_AHD.png          fichier source d'origine (non utilisé par le site)
favicon.png           fichier source d'origine (non utilisé par le site)
```

## Voir le site en local

Les chemins des ressources sont **relatifs** : le site fonctionne aussi bien à la racine
d'un domaine que sur un sous-chemin. Mais ouvrir `index.html` par double-clic reste
déconseillé (le `fetch` du manifeste et certains comportements diffèrent en `file://`).
Lancer plutôt un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Publier une modification

GitHub Pages est branché sur la branche `main`, dossier racine. Chaque `push` redéploie
le site tout seul, en une à deux minutes.

```bash
git add -A
git commit -m "Ajout de la réalisation X"
git push
```

État du déploiement : onglet **Actions** du dépôt, ou `gh api repos/laprise221/alyhachem-dev/pages --jq .status`.

## Brancher le domaine alyhachem.dev

Le site tourne pour l'instant sur l'URL GitHub. Pour passer sur le vrai domaine :

1. **Chez le registrar du domaine**, créer les enregistrements DNS :

   ```
   A     @   185.199.108.153
   A     @   185.199.109.153
   A     @   185.199.110.153
   A     @   185.199.111.153
   CNAME www laprise221.github.io.
   ```

2. **Déclarer le domaine à GitHub** — cela crée le fichier `CNAME` à la racine :

   ```bash
   gh api -X PUT repos/laprise221/alyhachem-dev/pages -f cname=alyhachem.dev
   git pull   # récupérer le fichier CNAME créé par GitHub
   ```

3. Attendre la propagation DNS (quelques minutes à 24 h), puis **cocher « Enforce HTTPS »**
   dans *Settings → Pages*. Le certificat est gratuit et automatique.

> **À noter :** les balises `canonical`, Open Graph et JSON-LD pointent déjà vers
> `https://alyhachem.dev/`. C'est volontaire — cela évite que Google indexe l'URL
> `github.io` en doublon. Tant que le domaine n'est pas branché, ne soumets donc pas
> le site à la Search Console : il n'y a rien à indexer sous une adresse qui ne répond
> pas encore.

### Si le domaine change

Le domaine est écrit en dur à quatre endroits. Un chercher/remplacer suffit :

```bash
grep -rl "alyhachem.dev" . --exclude-dir=.git | xargs sed -i 's|alyhachem\.dev|nouveau-domaine.sn|g'
```

Fichiers concernés : `index.html` (canonical, Open Graph, JSON-LD), `sitemap.xml`,
`robots.txt`, `assets/js/main.js` (signature de l'e-mail).

### Autres hébergeurs

Si tu quittes GitHub Pages un jour : le dossier se dépose tel quel sur Netlify, Vercel
ou Cloudflare Pages (aucune commande de build, dossier à publier = la racine), ou en FTP
dans le `public_html/` d'un hébergeur classique. `404.html` est repris automatiquement
comme page d'erreur partout.

## Formulaire de contact

Le bouton **Envoyer par e-mail** ne passe par aucun serveur : le JavaScript valide les
champs, compose un e-mail pré-rempli (objet + corps mis en forme) et ouvre la messagerie
du visiteur, destinataire `aly.hachemreda@gmail.com`.

Avantage : rien à héberger, rien à payer, aucune donnée qui transite par un tiers.
Limite : le visiteur doit avoir une messagerie configurée. L'adresse est donc aussi
affichée en clair juste à côté et dans le pied de page.

Pour changer l'adresse : `DEST` en haut du bloc formulaire dans `assets/js/main.js`,
puis les liens `mailto:` de `index.html` et le champ `email` du JSON-LD.

Pour recevoir les messages directement dans la boîte sans ouvrir de messagerie, il
faudra passer par un service de formulaire (Formspree, Web3Forms) — quelques lignes à
ajouter, dites-le si besoin.

## Référencement — ce qui est déjà fait

- `<title>` et meta description travaillés sur les mots-clés visés (58 et 145 caractères,
  sous les limites d'affichage de Google)
- H1 unique contenant *développement web, mobile & logiciel* ; hiérarchie H2/H3 respectée
- Données structurées Schema.org : `ProfessionalService` + `Person` (adresse Dakar,
  coordonnées GPS, zone desservie Sénégal), `WebSite`, `WebPage`, `OfferCatalog`
  des 9 services, `ItemList` des réalisations, `FAQPage`
- La FAQ est éligible aux résultats enrichis Google (les questions apparaissent
  directement dans les résultats de recherche)
- `canonical`, `hreflang`, `robots`, Open Graph et Twitter Card complets
- `robots.txt` + `sitemap.xml` (avec les images)
- Images en WebP avec repli JPEG, `width`/`height` déclarés (pas de saut de mise en page),
  chargement différé hors de l'écran
- Polices en `display=swap`, `preconnect` vers Google Fonts, logo préchargé
- Aucune bibliothèque JS : le site se charge quasi instantanément (bon Core Web Vitals,
  qui est un critère de classement)

## Référencement — ce qu'il reste à faire (par vous, après la mise en ligne)

Le site est optimisé, mais Google ne peut pas classer un domaine qu'il ne connaît pas
encore. Ces trois actions comptent plus que tout le reste :

1. **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console) :
   ajouter le domaine, vérifier la propriété, soumettre `https://alyhachem.dev/sitemap.xml`.
   C'est ce qui déclenche l'indexation, en général sous quelques jours.
   *À faire une fois le domaine branché* (voir plus haut), pas avant.

2. **Fiche d'établissement Google** — [business.google.com](https://business.google.com) :
   créer la fiche « Aly Hachem Development », catégorie *Développeur de logiciels* ou
   *Concepteur de sites Web*, zone desservie Dakar / Sénégal, avec le site en lien.
   C'est le levier n°1 pour ressortir sur « développeur web Dakar » et apparaître dans
   la carte locale. Demander un avis à chaque client livré.

3. **Liens entrants** — chaque site livré peut porter un « Site réalisé par Aly Hachem
   Development » en pied de page, en lien vers `alyhachem.dev`. Deux liens depuis
   `replaypadel.sn` et `beyti.sn` (domaines `.sn` actifs) pèsent lourd pour le
   référencement local.

Ensuite, régulièrement : ajouter chaque nouvelle réalisation dans la section
*Réalisations*, et mettre à jour `<lastmod>` dans `sitemap.xml`.

## Mots-clés visés

`développement web Dakar` · `développeur web Sénégal` · `développement logiciel Dakar` ·
`application mobile Sénégal` · `application web sur mesure` · `créer un site internet Dakar` ·
`développeur freelance Dakar` · `agence de développement Sénégal` · `site e-commerce Sénégal` ·
`référencement naturel Dakar`
