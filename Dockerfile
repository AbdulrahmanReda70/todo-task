FROM php:8.2

# Install system dependencies + Node.js
RUN apt-get update && apt-get install -y \
    git curl unzip libpng-dev libonig-dev libxml2-dev zip \
    nodejs npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy dependency files first (for caching)
COPY composer.json composer.lock package*.json* ./

COPY . .

# Install PHP and Node dependencies
RUN composer install --no-dev --optimize-autoloader \
    && npm install


EXPOSE 8000 5173
