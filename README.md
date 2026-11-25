# Territorios Malloa 3.1

Web pública: https://misters-cat.github.io/territorios/
Administración: https://misters-cat.github.io/territorios/admin.html

## Administrar sin ChatGPT

1. Abre Administración. Edita territorios, nombres, sectores, enlaces o imágenes; aplica cada formulario al borrador. Los límites se pueden dibujar en la vista esquemática, editar como GeoJSON o importar por KML.
2. Crea un fine-grained personal access token en https://github.com/settings/personal-access-tokens/new. Selecciona únicamente el repositorio territorios y Contents: Read and write. Usa una caducidad breve.
3. Ingresa el token como contraseña en la página administrativa. Se verifica la identidad y el permiso de escritura de la cuenta antes de mostrar el panel. Pulsa Publicar. Se crea un commit normal con el catálogo y las imágenes nuevas, sin forzar main. El token vive únicamente en memoria hasta cerrar sesión o recargar; GitHub vuelve a exigir permisos reales en cada publicación. El administrador necesita permisos de escritura en GitHub.
4. GitHub Pages despliega la versión actualizada. Si cambia el catálogo mientras editas, el editor rechaza la publicación para evitar sobrescribir trabajo ajeno.
5. Descarga copias JSON y consulta el historial de GitHub. Para restaurar una versión anterior, recupera el catálogo y sus imágenes desde el historial. Las copias JSON no incluyen imágenes binarias.

## Arquitectura

catalogo.json contiene sectores, territorios y geometrías GeoJSON. data-schema.js valida el catálogo. index.html lee los datos dinámicamente. admin.html solo usa el API REST de GitHub, no tiene servidor ni almacena credenciales. Las imágenes nuevas se guardan en maps/. El sitio/repositorio es público: no subas información sensible. Las imágenes históricas siguen en Drive y conservan sus permisos; los mapas de fondo usan Leaflet/OpenStreetMap. El KML original (59 territorios, 46–48 NEW, anillos internos del 58) fue convertido en la versión 2.1. territorios.geojson queda como referencia histórica, el archivo activo es catalogo.json.

El modo offline conserva el catálogo local; la administración y los mapas externos requieren conexión. No es un editor del diseño HTML/CSS, ni modifica el mapa original de Google My Maps.


## 3.1
Selector de tema claro, oscuro o automático, compartido entre consulta y administración. La pantalla de acceso administrativo usa el token de GitHub como contraseña. GitHub Pages es público: el acceso visual no equivale a ocultar el HTML o los datos públicos; la protección de escritura es la autorización de GitHub. No se utiliza una contraseña fija incrustada.
