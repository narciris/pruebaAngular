
# Prueba Técnica Filtro 

## Contexto

En esta prueba técnica se evalúan las habilidades técnicas, conocimientos y experiencia del futuro desarrollador junior. El objetivo principal es desarrollar una solución completa que conecte un backend en PHP con un frontend en Angular, consumiendo datos desde un API externa y permitiendo registrar y manipular logs de dichas peticiones.

## Descripción del Proyecto

### Backend

El backend se desarrolló en PHP y tiene como fuente de datos la API externa de [JSONPlaceholder](https://jsonplaceholder.typicode.com/), que proporciona datos de usuarios, publicaciones, álbumes, comentarios y fotos.

#### Funcionalidades del backend:
1. Listar a los usuarios.
2. Listar publicaciones (posts).
3. Consultar álbumes de un usuario específico.
4. Editar registro de una petición.
5. Eliminar registro de una petición.
6. Listar registros de peticiones realizadas.
7. Simular errores en una de las 6 peticiones anteriores.

Se creó una base de datos para almacenar los registros (logs) de cada petición, incluyendo: fecha, método consultado y datos retornados.

### Frontend

El frontend fue desarrollado con **Angular versión 14+**, utilizando **TailwindCSS** para el diseño y **PrimeNG** como biblioteca de componentes UI. Este consume las APIs proporcionadas por el backend.

#### Páginas y funcionalidades principales:

- **Home Page**
  - Lista todos los usuarios.
  - Permite ver los posts de cada usuario en un componente modal reutilizable.

- **Página de Registro de Logs**
  - Lista todas las peticiones realizadas.
  - Permite crear una nueva simulación de log.
  - Editar un log en un modal.
  - Eliminar un log con confirmación, también desde un modal.

- **Página de Álbumes**
  - Filtra y muestra los álbumes por ID de usuario.

## Implementación Técnica

### Componentes Reutilizables

Para los modales se implementó un componente genérico reutilizable, aprovechando la comunicación entre componentes padre e hijo mediante `@Input()` y `@Output()`. Esto permitió abrir el mismo modal tanto para visualizar posts como para editar registros.

### Uso de Signals y PrimeNG

Para la gestión del estado en la página de logs, se aplicó la arquitectura **Signal First**, una nueva aproximación reactiva de Angular que permite manejar el estado de manera inmediata y más eficiente. Esto evita suscripciones manuales, reduciendo la posibilidad de fugas de memoria y manteniendo el código más limpio y declarativo.

**PrimeNG** se utilizó para facilitar la implementación de componentes interactivos y visualmente atractivos, como tablas, modales, botones y formularios, promoviendo la reutilización y rapidez en el desarrollo.

## Tecnologías Usadas

- Angular 14+
- TailwindCSS
- PrimeNG
- PHP (Backend)
- MySQL (Base de datos de logs)
- JSONPlaceholder API (Datos externos)

## Instalación y Ejecución

### Frontend

```bash
git clone <url-del-repo-frontend>
cd <nombre-del-proyecto>
npm install
ng serve
```



## Conclusión

Este proyecto demuestra el uso combinado de prácticas modernas de Angular con tecnologías backend tradicionales como PHP. Se aprovechan herramientas modernas como Signals y PrimeNG para lograr una aplicación robusta, reactiva y mantenible.