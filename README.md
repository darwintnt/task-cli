# cli-console

## Descripción

Proyecto básico de línea de comandos para gestionar tareas utilizando MongoDB como base de datos. Permite crear, listar, actualizar, eliminar y buscar tareas de manera interactiva.

## Prerrequisitos

- Node.js (versión 16 o superior)
- MongoDB (local o en la nube, como MongoDB Atlas)
- pnpm

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd cli-console
   ```

2. Instala las dependencias:

   ```bash
   pnpm install
   ```

3. Construye el proyecto:

   ```bash
   pnpm run build
   ```

4. Instala la CLI globalmente (opcional, para usar `cli-tasks` directamente):
   ```bash
   pnpm link
   ```
   O usa `npx cli-tasks` sin instalar globalmente.

## Configuración

Antes de usar la aplicación, configura la conexión a MongoDB:

```bash
cli-tasks config
```

Esto te pedirá la URI de MongoDB (ejemplo: `mongodb://localhost:27017/tasks` o tu URI de MongoDB Atlas).

Para ver la configuración actual:

```bash
cli-tasks config:show
```

Para resetear la configuración:

```bash
cli-tasks config:reset
```

## Uso

### Comandos disponibles

- `config`: Configuración inicial de variables de entorno (MongoDB URI).
- `config:show`: Mostrar configuración actual.
- `config:reset`: Eliminar configuración guardada.
- `save` o `s`: Crea una nueva tarea (pide título y descripción).
- `list` o `ls`: Lista todas las tareas creadas.
- `delete` o `d`: Elimina una tarea existente (pide ID de tarea).
- `update` o `u`: Actualiza una tarea existente (pide ID, título y descripción).
- `find <term>` o `f <term>`: Busca tareas por título o descripción que contengan el término.

### Ejemplos de uso

1. Configurar la aplicación:

   ```bash
   cli-tasks config
   ```

2. Crear una nueva tarea:

   ```bash
   cli-tasks save
   ```

3. Listar todas las tareas:

   ```bash
   cli-tasks list
   ```

4. Buscar tareas:

   ```bash
   cli-tasks find "importante"
   ```

5. Actualizar una tarea:

   ```bash
   cli-tasks update
   ```

6. Eliminar una tarea:
   ```bash
   cli-tasks delete
   ```

### Desarrollo

Para desarrollo, puedes usar:

- `pnpm run dev`: Compila en modo watch.
- `pnpm run dev:cli`: Ejecuta la CLI en modo desarrollo con variables de entorno.
- `pnpm start`: Ejecuta la CLI compilada.

## Scripts disponibles

- `build`: Compila el proyecto TypeScript.
- `dev`: Compila en modo watch.
- `dev:cli`: Ejecuta la CLI en desarrollo.
- `start`: Ejecuta la CLI compilada.
- `lint`: Ejecuta ESLint y corrige errores.
- `format`: Formatea el código con Prettier.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios.

## Licencia

Este proyecto está bajo la Licencia ISC.
