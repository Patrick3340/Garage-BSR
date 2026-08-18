# Garage BSR Inc. — site web bilingue

Site statique du **Garage BSR Inc. (Bulmer Service & Réparations)**
— 39-A rue Mill, Howick, QC J0S 1G0 — (514) 978-9413.

**En ligne :** https://patrick3340.github.io/Garage-BSR/

HTML / CSS / JS uniquement, aucune dépendance, aucune étape de compilation.

| Page | Français | English |
|---|---|---|
| Accueil | `/fr/` | `/en/` |
| Services | `/fr/services.html` | `/en/services.html` |
| Réalisations | `/fr/realisations.html` | `/en/our-work.html` |
| Catalogues | `/fr/catalogues.html` | `/en/catalogues.html` |
| Contact | `/fr/contact.html` | `/en/contact.html` |

Les PDF des fournisseurs sont dans `/Catalogue/` et listés sur les pages Catalogues.

`/index.html` redirige le visiteur vers sa langue.

## Modifier le site

Voir **[LISEZ-MOI.md](LISEZ-MOI.md)** pour :

- remplacer l’adresse courriel encore fictive ;
- ajouter ou retirer un catalogue PDF ;
- corriger la liste des services ;
- la palette et la structure du thème.

## Publier une modification

```bash
git add -A
git commit -m "Description du changement"
git push
```

GitHub Pages redéploie automatiquement en une minute environ.
