# Aly Hachem Development — site vitrine

Site statique (HTML / CSS / JS, aucune dépendance, aucun build).
Domaine prévu : **https://alyhachem.dev**

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

Ouvrir `index.html` directement ne marche pas : les chemins sont absolus (`/assets/…`).
Il faut un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Mise en ligne

N'importe quel hébergeur statique convient. Déposer le dossier tel quel.

**Netlify / Vercel / Cloudflare Pages** — glisser-déposer le dossier, ou connecter un dépôt Git.
Aucune commande de build, dossier à publier : la racine.
`404.html` est repris automatiquement comme page d'erreur.

**Hébergement classique (cPanel, OVH, LWS…)** — envoyer le contenu dans `public_html/` en FTP.

Puis, chez le registrar du domaine, faire pointer `alyhachem.dev` vers l'hébergeur
et **activer le HTTPS** (obligatoire pour le référencement).

### Si le domaine change

Le domaine est écrit en dur à quatre endroits. Un chercher/remplacer suffit :

```bash
grep -rl "alyhachem.dev" . | xargs sed -i 's|alyhachem\.dev|nouveau-domaine.sn|g'
```

Fichiers concernés : `index.html` (canonical, Open Graph, JSON-LD), `sitemap.xml`,
`robots.txt`, `assets/js/main.js` (signature de l'e-mail).

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
