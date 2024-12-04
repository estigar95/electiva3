# electiva3
Proyecto de Programa de Fidelización
Este proyecto implementa un sistema de programa de fidelización de clientes, que incluye funcionalidades como gestión de puntos, promociones, desafíos, insignias y encuestas de satisfacción. Está desarrollado utilizando Node.js y PostgreSQL para el backend, y se puede interactuar con él a través de APIs utilizando Postman.

Requisitos Previos
Para ejecutar este proyecto, necesitas tener instalados los siguientes programas:

- Node.js: Entorno de ejecución para JavaScript.
- PostgreSQL: Sistema de gestión de bases de datos relacional.
- Postman: Herramienta para probar APIs.
- Git: Sistema de control de versiones.
- Cuenta en GitHub: Para clonar el repositorio del proyecto.

Dependencias Principales
- Express: Framework web para Node.js.
- pg: Módulo de Node.js para interactuar con PostgreSQL.
- moment: Biblioteca para el manejo de fechas y horas.
- nodemon: Herramienta que reinicia automáticamente el servidor cuando detecta cambios en el código (solo para desarrollo).
  
Instrucciones para Ejecutar el Proyecto
Sigue los pasos a continuación para configurar y ejecutar el proyecto en tu máquina local.

1. Clonar el Repositorio desde GitHub
Abre una terminal y navega al directorio donde deseas clonar el proyecto. Luego, ejecuta el siguiente comando: git clone https://github.com/tu-usuario/tu-repositorio.git

2. Instalar Dependencias
Navega al directorio del proyecto y ejecuta: npm install
Esto instalará todas las dependencias necesarias que están listadas en package.json.

3. Configurar la Base de Datos
Crear un archivo .env en la carpeta del proyecto, este archivo contiene la configuracion de la base de datos (estos datos va a ser proveido al usuario participante del proyecto ya que son informacion sensible)

DB_HOST= localhost
DB_PORT= **
DB_USER= **
DB_PASSWORD= **
DB_NAME= **
PORT= **

5. Iniciar el Servidor
Para levantar el servidor local del backend, ejecuta: npm run dev

6. Importar Colecciones en Postman
Abre Postman y realiza lo siguiente: Importar las Colecciones

En Postman, haz clic en el botón Importar.
Selecciona los archivos XML o JSON proporcionados que contienen las consultas a las APIs del backend.

7. Probar las APIs
Con el servidor en ejecución y las colecciones importadas en Postman, ya puedes probar las diferentes APIs del backend. Ejecuta las solicitudes y verifica las respuestas para asegurarte de que todo funciona correctamente.








