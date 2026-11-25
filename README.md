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

## 3.2.2
Corrige la búsqueda mientras se escribe: seleccionar automáticamente un resultado único en el mapa conserva el texto y la posición del cursor. La vista Lista filtra sin cambiar automáticamente a Mapa; los clics explícitos y la navegación siguen seleccionando territorios.

## 3.2.3 — Privacidad
- Política común en privacidad.html (GitHub Pages y sitio original; añadir enlace manual en Google Sites).
- Aviso previo al GPS, consentimiento voluntario del navegador, sin persistencia de coordenadas. Proveedores pueden recibir zonas consultadas e IP.
- Borrar preferencias, favoritos, recientes y copias offline del navegador; conserva catálogo y permisos.
- Retira los seis IDs de carpetas del catálogo actual; migración de respaldos antiguos elimina el campo folder. No altera Drive ni el historial de GitHub.
- Esquema de campos permitidos, filtro heurístico de datos personales, revisión explícita previa a publicar, KML sin nombres originales de placemarks, imágenes recodificadas sin metadatos originales. Los controles no detectan toda información confidencial en texto, imágenes ni enlaces y no impiden la edición directa en GitHub. No es una certificación legal.

## 3.2.4 — Corrección del mapa de calles
Se sustituye la política no-referrer en la web y Administración por strict-origin y se configura la capa OpenStreetMap para enviar solo el origen web. Esto responde al bloqueo 403 por ausencia de Referer, respetando la política oficial https://operations.osmfoundation.org/policies/tiles/ . Se mantienen las demás medidas de privacidad y la caché HTTP normal. La recuperación efectiva del mapa depende del proveedor y del navegador; no se alteran los territorios ni las imágenes.

## 3.3 — Experiencia móvil y uso en terreno
- Interfaz compacta, navegación de seis secciones con Descargas y Ajustes. Conserva mapa, lista, favoritos y recientes.
- Carga cache-first del catálogo y aplicación después de una carga inicial válida; actualización del catálogo en segundo plano con aviso para recargar, sin interrumpir la consulta. No precarga mapas base externos.
- Centro de descargas con número de copias, tamaño de imágenes, apertura y eliminación individual/total; importación manual de JPG/PNG/WebP ante limitaciones de Drive.
- Visor local con ampliación por botones y gestos, giro, desplazamiento, ajuste y modo pantalla completa. Si Drive solo permite el visor incrustado, sus controles propios siguen disponibles.
- Hasta cinco territorios cercanos calculados localmente por distancia aproximada al perímetro. GPS con aviso previo y opción de ocultarlo; no se guarda su posición ni el resultado automático en recientes.
- Tarjeta imprimible con mapa, sector y QR generado localmente (versión 4-L). Se requiere una imagen legible disponible en la web o guardada localmente; no se envían datos a un generador de QR externo.
- Ajustes centralizados: tema, instalación, descargas, privacidad, borrado y comprobación de actualización.
- Diagnóstico administrativo del esquema, perímetros y referencias, y comprobación voluntaria de imágenes públicas con concurrencia limitada. Un resultado no confirmado puede ser por permisos, red o proveedor. Se conservan los controles de privacidad de publicación.
- Validación técnica: sintaxis y referencias DOM, catálogo original intacto, QR cotejado con matriz de referencia, cálculos de proximidad y reglas de privacidad. Pruebas integrales de interfaz y dispositivos pendientes.

## 3.3.1 — GPS en aplicaciones instaladas
- Aviso de privacidad integrado y botón Permitir ubicación que llama directamente a geolocalización mediante una interacción del usuario, sin confirmación nativa previa.
- Distingue iPhone/iPad en modo instalado y ofrece instrucciones de permisos. Reintenta una vez con precisión estándar si hay fallo de posición o tiempo de espera; nunca reintenta automáticamente un permiso denegado.
- Se mantiene el GPS voluntario, sin guardar coordenadas ni resultado automático en recientes. No cambia el manifiesto ni requiere reinstalar. iOS controla el permiso; prueba física pendiente.

## 3.3.2 — Cercanos y rutas
- Encabezado Mostrar/Ocultar en cercanos con preferencia local; quitar ubicación elimina marcador, resultados y distancias de la sesión.
- Ver y Ruta por cada cercano; selector de cualquiera de los territorios con distancia aproximada al perímetro, precisión GPS y opciones de navegación. La ficha seleccionada también muestra su distancia cuando hay GPS.
- Reutiliza los puntos de encuentro/accesos públicos asociados en Administración como destino preferente; en su ausencia, punto interior aproximado con advertencia de acceso. Google Maps, Apple Maps y Waze calculan la ruta por su cuenta; los enlaces solo contienen destino, no el GPS de Territorios.
- Ayuda para GPS instalado en iPhone: autorizar primero en Safari y luego en la app, procedimiento confirmado por el usuario.
- Conserva el catálogo, los permisos y controles de privacidad. Se añade preferencia de cercanos al borrado local.

## 3.3.3 — Panel de distancia plegable
- Distancia a otro territorio inicia contraída, con botón Mostrar/Ocultar y preferencia local independiente de cercanos. No desactiva GPS ni elimina el destino seleccionado.
- Borrar datos locales elimina ambas preferencias. Catálogo intacto.

## 3.3.4 — Información del mapa plegable
- Botón general Mostrar/Ocultar bajo los controles del mapa. Agrupa aviso de ubicación, cercanos, distancia, encuentros, leyenda y texto explicativo. Contraído por defecto; recuerda la preferencia local.
- Mi ubicación y Encuentros abren el bloque temporalmente para mostrar permisos, resultados o errores. Plegar no borra el GPS ni cambia los estados internos; borrar datos locales elimina la preferencia.
- Conserva catálogo y controles de privacidad.

## 3.4 — Renovación visual
- Diseño inspirado en la tarjeta de referencia: tipografía nativa del dispositivo, superficies neutras, bordes finos, botones redondeados y azul oscuro para acciones principales. No se añaden fuentes ni recursos externos.
- Adaptación de portada, navegación, mapas, fichas, paneles de información, visor, descargas, ajustes, Administración y política de privacidad; tema oscuro de alto contraste.
- Distancia destacada con tamaño mayor, aclaración al perímetro y precisión GPS separadas. Colores editables de los sectores conservados como identificadores visuales.
- Conserva controles, funciones de GPS, almacenamiento local, privacidad, impresión, rutas y catálogo sin cambios. Preferencias y mapas offline mantienen sus claves. Pruebas de sintaxis, referencias DOM, preservación de catálogo y presentación estructural; revisión visual en dispositivos pendiente.

## 3.4.1 — Ficha de territorio compacta
- Dos columnas iguales y áreas de mapa e imagen de altura comparable en escritorio; en móvil se mantienen apiladas.
- Ampliar mapa y Abrir original siempre visibles; seis herramientas agrupadas en un panel plegable, contraído por defecto y con preferencia local.
- Cómo llegar plegable y contraído para cada nueva selección, conserva la distancia del territorio y las opciones de navegación. Accesos de ruta en cercanos y distancia del mapa interactivo conservados.
- Borrar datos locales elimina también la nueva preferencia. Catálogo y esquema de privacidad intactos.
