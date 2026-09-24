# Registro de inspección QA/QC (app instalable)

Archivos de este repositorio: `index.html`, `sw.js`, `manifest.webmanifest` y la carpeta `icons/`.

## 1. Apps Script (recibe los datos)
1. Abre tu proyecto en script.google.com y reemplaza `Code.gs` por el archivo `apps-script/Code.gs`.
2. Cambia `ACCESS_KEY` por una clave tuya.
3. Implementar → Nueva implementación → Aplicación web. Ejecutar como: **Yo**. Quién tiene acceso: **Cualquier persona**.
4. Copia la URL que termina en `/exec`. Si la abres en el navegador debe mostrar `{"ok":true,...}`.
5. Al cambiar el código: Implementar → Administrar implementaciones → lápiz → Nueva versión.

## 2. Configurar la app
En `index.html`, pega la URL en `API_URL`. Las listas (inspectores, proyectos, defectos…) están justo debajo.

## 3. Publicar en GitHub Pages
1. Crea un repositorio y sube estos archivos (con la carpeta `icons`).
2. Settings → Pages → Source: Deploy from a branch → `main` / `(root)`.
3. Tu app queda en `https://USUARIO.github.io/REPOSITORIO/`.

## 4. Instalar en el celular (con internet la primera vez)
- Android (Chrome): abre la URL → botón "Instalar app" o menú ⋮ → Instalar aplicación.
- iPhone (Safari): Compartir → Añadir a pantalla de inicio.
- Abre la app una vez con internet y escribe la clave de acceso.

Después de eso abre sin internet, permite guardar revisiones y las envía sola cuando vuelve la conexión.

## Actualizar la app
Sube el `index.html` nuevo a GitHub y sube el número de `CACHE` en `sw.js` (`qaqc-v2`, `qaqc-v3`…). La app se actualiza sola la siguiente vez que se abre con internet.
