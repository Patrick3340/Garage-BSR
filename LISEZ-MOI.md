# Garage BSR Inc. — site web bilingue

Site statique (HTML/CSS/JS, aucune dépendance, aucun build).
Ouvrez **`dashboard.html`** pour le suivi des tâches et les liens vers toutes les pages.

---

## Structure

```
/index.html              Sélecteur de langue (redirige selon le navigateur)
/dashboard.html          Tableau de bord des tâches (interne, à ne pas publier)

/fr/index.html           Accueil
/fr/services.html        Services & réparations
/fr/rendez-vous.html     Prise de rendez-vous (calendrier)
/fr/contact.html         Contact, carte et formulaire

/en/index.html           Home
/en/services.html        Services & repairs
/en/appointment.html     Appointment booking (calendar)
/en/contact.html         Contact, map and form

/assets/css/style.css    Système de design complet
/assets/js/main.js       Menu, accordéon, animations
/assets/js/booking.js    Intégration du calendrier  ← 1 ligne à configurer
/assets/img/             Logo et déclinaisons
```

Chaque page française pointe vers son équivalent anglais (balises `hreflang`),
donc Google indexe correctement les deux versions.

---

## Les 3 choses à changer

### 1. Le calendrier de rendez-vous

Ouvrez `assets/js/booking.js` et collez votre lien à la première ligne :

```js
var BSR_BOOKING_URL = "https://calendly.com/votre-compte/rendez-vous";
```

Calendly **et** Google Calendar (plages de rendez-vous) sont supportés — le script
détecte lequel vous utilisez. Le calendrier s’affiche automatiquement aux couleurs
du logo (fond noir, accents rouges).

Tant que la ligne est vide, la page affiche un encadré « réservation par téléphone ».

### 2. Les coordonnées

Il reste des exemples à remplacer partout (recherche-remplacement dans les 8 pages) :

| À remplacer | Par |
|---|---|
| `info@garagebsr.ca` | votre vraie adresse courriel |
| `8 h 00 – 17 h 00` | vos vraies heures |

Déjà exacts partout :

- le téléphone **(514) 978-9413** — affiché, en lien `tel:+15149789413`, et dans
  les données structurées Google ;
- l’adresse **39-A rue Mill, Howick, QC J0S 1G0**.

> Le champ « Téléphone » du formulaire de contact affiche `(450) 555-0123` : c’est
> un simple exemple de format pour le visiteur, pas votre numéro. À laisser tel quel.

### 3. La liste de services

`fr/services.html` et `en/services.html` contiennent 12 catégories correspondant à
ce qu’un garage de mécanique générale offre couramment au Québec. Retirez ce que vous
ne faites pas, ajoutez vos spécialités.

⚠️ La catégorie **10 — Inspections** mentionne l’inspection mandatée par la SAAQ,
qui exige une accréditation. Retirez cette ligne si le garage n’est pas mandataire.

---

## Le formulaire de contact

Tel quel, il ouvre le logiciel de courriel du visiteur — ça fonctionne, mais c’est
peu fiable. Pour recevoir les demandes par courriel automatiquement :

- **Netlify** : ajoutez l’attribut `netlify` à la balise `<form>` ;
- **Formspree** : `action="https://formspree.io/f/VOTRE-ID" method="POST"`.

L’emplacement exact est indiqué par un commentaire dans les deux pages contact.

---

## Mise en ligne

Le dossier est prêt à publier tel quel.

1. **Netlify Drop** — allez sur `app.netlify.com/drop`, glissez le dossier, c’est en ligne. Gratuit, HTTPS inclus.
2. **GitHub Pages** ou **Vercel** — même principe si vous préférez.
3. Ensuite, pointez votre domaine (p. ex. `garagebsr.ca`) vers l’hébergeur.

Supprimez `dashboard.html`, `LISEZ-MOI.md` et `BSR-logo.png` du dossier publié si
vous ne voulez pas qu’ils soient accessibles publiquement.

---

## Thème

Le site alterne clair et foncé, de haut en bas :

| Bande | Traitement |
|---|---|
| En-tête (`.hdr`) | **noir** |
| Bandeau d’accueil (`.hero`) | **noir** — jusqu’à la bande rouge |
| Corps de page | **blanc**, texte noir |
| Pied de page (`.ftr`) | **noir** |

Tout est piloté par deux blocs de variables au début de `assets/css/style.css` :

- `:root { … }` — les couleurs de la page (claires) ;
- `.hdr, .drawer, .hero, .ftr { … }` — les mêmes variables redéclarées en foncé,
  uniquement pour ces quatre blocs. Pour rendre une autre section foncée, il
  suffit d’ajouter son sélecteur à cette liste (et de lui donner
  `background: var(--ink)` si elle n’en a pas).

Pour repasser le site en noir, il suffit d’intervertir les valeurs de `:root`
(`--ink` en `#000`, `--text` en `#fff`, etc.). Aucun autre fichier à toucher.
Le tableau de bord suit la même structure dans son propre `<style>`.

---

## Palette

Échantillonnée directement dans le logo. Aucune autre couleur n’apparaît sur le site.

| | Code |
|---|---|
| Rouge BSR | `#D5020D` |
| Noir | `#000000` |
| Gris | `#727272` |
| Gris clair | `#D2D2CC` |
| Blanc | `#FFFFFF` |
