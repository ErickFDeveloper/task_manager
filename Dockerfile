# Usar una imagen base oficial de PHP con FPM y Node.js para compilar assets
FROM php:8.2-fpm

# Instalar dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    libzip-dev \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar el directorio de trabajo
WORKDIR /var/www

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias de PHP con Composer
RUN composer install --optimize-autoloader

# Instalar dependencias de Node.js y construir assets
RUN npm install 

RUN npm run build

# Cambiar permisos de las carpetas storage y bootstrap/cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Exponer el puerto 8000 para el servidor embebido de PHP
EXPOSE 8080

# Ejecutar las migraciones al iniciar el contenedor
CMD php artisan migrate && php artisan serve --host=0.0.0.0 --port=8080 
