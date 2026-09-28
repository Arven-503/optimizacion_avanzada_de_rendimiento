# Frontend E-Commerce

Este proyecto corresponde al frontend de una aplicación de comercio electrónico desarrollada con **Next.js 16, TypeScript y Tailwind CSS**.

La aplicación se comunica con una API REST desarrollada en **Laravel**, encargada de administrar los productos, usuarios, órdenes y pagos. Para el procesamiento de los pagos se emplea **Stripe**.

El proyecto fue desarrollado prestando especial atención al rendimiento de la aplicación y al aprovechamiento de las herramientas proporcionadas por el App Router de Next.js.

## Tecnologías utilizadas

* Next.js 16
* TypeScript
* React
* Tailwind CSS
* Laravel API
* MySQL
* Stripe

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Arven-503/optimizacion_avanzada_de_rendimiento.git
cd optimizacion_avanzada_de_rendimiento
```

### 2. Configurar las variables de entorno

Duplica el archivo `.env.example` y crea `.env.local`:

```bash
cp .env.example .env.local
```

Posteriormente, establece la URL de la API:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

La dirección anterior corresponde a la configuración empleada cuando la API de Laravel se ejecuta de manera local en el puerto 8000.

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

Para trabajar en entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:3000
```

Para comprobar la versión de producción:

```bash
npm run build
npm run start
```

## Principales rutas

La aplicación dispone de las siguientes rutas:

* `/` — Catálogo de productos.
* `/products/[id]` — Información y detalles de un producto.
* `/login` — Inicio de sesión.
* `/register` — Registro de nuevos usuarios.
* `/checkout` — Carrito y proceso de creación de la orden.
* `/history` — Historial de compras del usuario.

Las páginas vinculadas con los productos aprovechan los **Server Components** de Next.js para obtener los datos desde el servidor.

## Autenticación

La autenticación se lleva a cabo mediante la API de Laravel.

Una vez que el usuario inicia sesión, el token se almacena en una cookie `httpOnly`. De esta manera, el token no queda directamente accesible para JavaScript ejecutándose en el navegador.

Las rutas que requieren autenticación utilizan esta información para efectuar las solicitudes correspondientes a la API.

## Proceso de compra

El flujo principal de la aplicación consiste en:

1. El usuario consulta el catálogo.
2. Selecciona un producto.
3. Revisa sus detalles.
4. Añade el producto al carrito.
5. Ingresa al checkout.
6. Se genera la orden mediante una Server Action.
7. Se efectúa el pago mediante Stripe.
8. La compra queda disponible en el historial del usuario.

## Rendimiento

Uno de los objetivos principales del proyecto consistió en aprovechar las funcionalidades de Next.js para evitar ejecutar en el navegador tareas que pueden llevarse a cabo en el servidor.

Entre las técnicas implementadas se encuentran:

* **React Server Components** para la obtención de datos.
* **Server Actions** para operaciones que modifican información.
* `loading.tsx` para presentar estados de carga.
* `error.tsx` para gestionar errores durante el renderizado.
* `Suspense` para dividir partes de la interfaz que dependen de operaciones asíncronas.
* `revalidatePath()` para actualizar el contenido de determinadas rutas después de efectuar cambios.

La finalidad es que el usuario pueda comenzar a recibir contenido útil lo antes posible, mientras las secciones que dependen de operaciones asíncronas siguen cargándose.

## Evidencias

### Endpoints

Aquí se incorporan las capturas de **Swagger/OpenAPI** de los endpoints de la API empleados por el frontend.

### Flujo de compra

Aquí se incorporan las capturas que muestran el proceso completo de compra, desde la elección del producto hasta la generación de la orden y el pago.

### Rendimiento

Aquí se incorpora el reporte de **Lighthouse**, utilizado para medir el rendimiento de la aplicación y valorar las optimizaciones implementadas.

## Estructura general

El frontend está organizado siguiendo la estructura del **App Router de Next.js**, separando las páginas, componentes y acciones del servidor de acuerdo con la responsabilidad que desempeñan dentro de la aplicación.

El propósito es conservar el código organizado y aprovechar las capacidades de renderizado del servidor de Next.js, en lugar de transformar toda la aplicación en componentes del cliente.

## Autor

**Arven-503**

Repositorio:

https://github.com/Arven-503/optimizacion_avanzada_de_rendimiento
