# Receptes

App de receptes (HTML + PWA) que funciona al mòbil i a l'ordinador, també sense connexió.

## Fitxers
- `index.html` – l'app (dades de receptes incloses)
- `img/` – fotos de les receptes (1.238 fitxers)
- `manifest.webmanifest` – dades per instal·lar-la com a app (nom, icones, colors)
- `sw.js` – service worker (memòria cau i ús sense connexió)
- `icons/` – icones de l'app
- `.nojekyll` – diu a GitHub Pages que serveixi els fitxers tal qual

## Publicar a GitHub Pages
1. Crea un repositori nou (p. ex. `receptes`) i puja-hi **tot** el contingut d'aquesta carpeta, amb la carpeta `img` inclosa.
   - Amb GitHub Desktop o `git` és d'un sol cop (recomanat).
   - Al web de GitHub («Add file → Upload files») només deixa pujar 100 fitxers per vegada: puja `index.html`, `sw.js`, `manifest.webmanifest`, `.nojekyll` i `icons` primer, i `img` en tandes de 100.
2. A **Settings → Pages**: *Source* = «Deploy from a branch», branca `main`, carpeta `/ (root)`.
3. En uns minuts l'app serà a `https://EL-TEU-USUARI.github.io/receptes/`.

## Instal·lar-la
- Android (Chrome): menú ⋮ → «Instal·la l'aplicació».
- iPhone (Safari): Compartir → «Afegeix a la pantalla d'inici».
- Ordinador (Chrome/Edge): icona d'instal·lar a la barra d'adreces.
- Per usar-la sense connexió, obre-la una vegada amb connexió i prem el botó del peu de pàgina «Baixa totes les fotos…».

## Quan actualitzis l'app
- Substitueix `index.html` (i les fotos noves a `img/`).
- A `sw.js`, puja el número de `VERSION` (`v1` → `v2`) perquè els dispositius rebin la versió nova. Si canvies una foto mantenint el nom, puja també `IMG_CACHE`.
