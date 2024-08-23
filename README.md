# Proyecto de Aplicación de tareas Laravel + Inertia.js + React

Este es un proyecto de aplicación web desarrollado con Laravel, Inertia.js y React. La aplicación permite la creación, actualización, eliminación y validación de tareas (tasks).

## Requisitos

Asegúrate de tener instaladas las siguientes herramientas en tu entorno de desarrollo:

- [PHP](https://www.php.net/) (v8.0 o superior)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (v16 o superior)
- [NPM](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)


## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación localmente:

1. **Clonar el Repositorio**

    Clona el repositorio y navega al directorio del proyecto:

    ```bash
    git clone https://github.com/ErickFDeveloper/task_manager.git
    cd task_manager

2. **Instalar dependencias de php**

    Ejecuta el siguiente comando para instalar las dependencias de PHP utilizando Composer:

    ```bash
    composer install

3. **Instalar Dependencias de JavaScript**

    Ejecuta el siguiente comando para instalar las dependencias de JavaScript:

    ```bash
    npm install

4. **Configurar el Archivo de Entorno**

    Cambiale el nombre al archivo `.env.example` a `.env`, e incluye las siguientes constantes:

    ```bash
    DB_HOST=
    DB_USERNAME=
    DB_PASSWORD=

5. **Migrar la Base de Datos**

    Ejecuta las migraciones de la base de datos para crear las tablas necesarias:

    ```bash
    php artisan migrate

6. **Compilar los Assets**

    Compila los assets de frontend (React) usando Vite:
    
    ```bash
    npm run dev

7. **Iniciar el Servidor de Desarrollo**

    Ejecuta el servidor de desarrollo de Laravel:

    ```bash
    php artisan serve
