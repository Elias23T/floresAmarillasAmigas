# Qué bonito tener tu amistad

## Publicar en Vercel desde GitHub

1. Entra en https://vercel.com/new e inicia sesión con GitHub.
2. Importa `Elias23T/floresAmarillasAmigas`. Si no aparece, concede acceso a ese repositorio en la integración de GitHub de Vercel.
3. Conserva el directorio raíz `./` y el preset **Other**. `vercel.json` configura el sitio estático sin instalación ni compilación y con salida en `.`.
4. Pulsa **Deploy**. No se necesitan variables de entorno ni base de datos.
5. Con el repositorio conectado y `main` como rama de producción, los nuevos commits enviados a esa rama actualizarán la página automáticamente.

Documentación: https://vercel.com/docs/git/vercel-for-github

Libro de 10 páginas para celebrar a las amigas este 21 de septiembre. Incluye frases de amistad personalizadas con el nombre ingresado, buenos deseos y cartas de su amigo Elias. Construido con HTML, CSS y JavaScript. Abre `index.html` en tu navegador.

El nombre se guarda exclusivamente en localStorage del navegador. No hay servidor ni base de datos. Las flores de fondo son ilustraciones SVG propias, con diez siluetas distintas. Google Fonts es opcional: sin conexión se utilizan las fuentes del sistema.

La música utiliza el reproductor visible de YouTube para el video https://www.youtube.com/watch?v=c2lJHjLdgvI. Intenta reproducirse al cargar y se mantiene entre las páginas. Si el navegador bloquea el autoplay, toca Reproducir dentro del video. Incluye un enlace directo a YouTube si el video no permite reproducción integrada. Necesita conexión a Internet. Prueba el reproductor desde Vercel o un servidor HTTP local: abrir el HTML como archivo puede ocasionar errores de identificación del reproductor.

En celular se muestra una página con collage y texto; en pantallas amplias, el collage acompaña la página de texto. Cada capítulo tiene tres fotos exclusivas: treinta fotos sin repetir entre capítulos. Hay girasoles, margaritas, rosas, tulipanes, peonías, orquídeas, cosmos, hortensias, iris, narcisos, dalias, amapolas, lavanda y flores de cerezo. Se guardan localmente en `assets/garden`; sus fuentes están en `assets/garden/sources.json` y se utilizan bajo la licencia de Unsplash: https://unsplash.com/license. Los archivos de `assets/photos` pertenecen a la versión anterior.

Las hojas giran sobre el lomo durante 1,6 segundos, con anverso, reverso y sombras. Durante el giro se bloquean las pulsaciones repetidas. Con la preferencia de movimiento reducido, el cambio es inmediato. Hay navegación con botones y flechas del teclado, tarjetas, deseos y un sobre interactivos.

La portada incluye la foto proporcionada en `image/IMG_20260908_190356.jpg`, con marco y placa «ING. ELIAS».

Para publicar, incluye `index.html`, `styles.css`, `album.css`, `app.js`, `assets/garden` e `image`. No hace falta subir `node_modules` ni `.checks` (herramientas y resultados de pruebas).

Para cambiar frases, edita `chapters` en `app.js`. Para cambiar colores, edita las variables al inicio de `styles.css`. No subas fotos personales sin permiso de sus protagonistas.
