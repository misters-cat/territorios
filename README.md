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

## 3.1.1
Botón único de sol/luna para alternar claro y oscuro. Al abrir por primera vez se usa el tema del sistema; después se conserva la elección manual en cada dispositivo.

## 3.1.2
Elimina todos los accesos a carpetas de Drive del catálogo, explorador y fichas. Se retira el campo de carpeta en Administración; los identificadores existentes se conservan en el catálogo para no perder datos.

## 3.2 — Herramientas de terreno y administración
- GPS bajo solicitud del usuario, cálculo de territorio con polígonos reales (incluidos anillos interiores), marcador de precisión y aviso de límites coincidentes. La app no guarda ni transmite coordenadas GPS a GitHub.
- Alternancia calles OSM / satélite Sentinel-2 cloudless 2024 de EOX. Servicio de demostración externo, resolución regional (no detalle de casas) y sin garantía de disponibilidad; si falla se vuelve a calles. No se descargan teselas masivamente.
- Cómo llegar mediante Google Maps, Apple Maps o Waze. Usa un punto de encuentro asociado o una referencia interior calculada; no garantiza acceso por camino público.
- Mapas individuales sin conexión: descarga a almacenamiento local si el origen permite CORS, o importación manual de JPG/PNG/WebP descargado. El navegador puede liberar almacenamiento; no es respaldo permanente. El mapa base requiere Internet. Las copias se guardan por número e identificador de imagen.
- Pantalla completa para mapa general y ficha individual.
- Puntos de encuentro administrables: nombre, latitud, longitud, nota y territorio opcional. Se almacenan como campo meetings en catalogo.json; los registros existentes no se alteran. No publicar domicilios privados.
- Consulta de version.json con aviso y botón de actualización; se activa a partir de la versión 3.2. El catálogo sigue consultando datos actualizados al abrir.
- Administración: editor Leaflet sobre mapa real con dibujo o arrastre de vértices, vista previa del catálogo y plano, recuperación de las últimas 30 versiones del catálogo como borrador. Conserva imágenes históricas que sigan en main. El token solo vive en memoria; la autorización de escritura depende de GitHub.

Verificación de código: sintaxis JS, catálogo original sin cambios, 59 referencias interiores calculadas dentro de los polígonos. Pruebas en navegador y dispositivos pendientes. GitHub Pages sigue siendo la plataforma de publicación y almacenamiento.

## 3.2.1
Control cartográfico independiente con dos botones Calles y Satélite, iconos esquemáticos y estado activo visible. Se conserva la selección geográfica al cambiar de capa.
