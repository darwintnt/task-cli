# task-cli

## Descripción

Este es un proyecto de línea de comandos para gestionar tareas utilizando MongoDB como base de datos.

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

## Uso

Para iniciar la aplicación, asegúrate de tener configurada la variable de entorno `MONGODB_URL` en tu archivo `.env`.

Ejecuta el siguiente comando:

```bash
pnpm start
```

### Comandos disponibles

- `save` o `s`: Guarda una nueva tarea.
- `list` o `ls`: Lista todas las tareas.
- `delete` o `d`: Elimina una tarea.
- `update` o `u`: Actualiza una tarea existente.
- `find <term>` o `f <term>`: Busca tareas específicas.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cambios.

## Licencia

Este proyecto está bajo la Licencia MIT.
