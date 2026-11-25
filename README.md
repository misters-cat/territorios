# Territorios Malloa 2.0

Sitio estático para GitHub Pages. 59 territorios y seis sectores, conservando los IDs y permisos de Google Drive y My Maps originales.

- Plano general incrustado; catálogo por sector y búsqueda.
- Fichas con vista previa de Drive, enlaces directos, descarga y compartir.
- Favoritos e historial locales, sin servidor ni cuentas adicionales.
- PWA: el service worker guarda únicamente el catálogo y recursos propios; los mapas externos no se almacenan. Las descargas se gestionan manualmente.
- El mapa de My Maps es un iframe externo: sus marcadores no se sincronizan automáticamente con el catálogo. Para implementar esa integración hace falta un KML/GeoJSON real con identificadores de territorios.
- La vista previa y descarga dependen de los permisos originales de Drive.

Versión 2.0. El historial previo se conserva en Git.