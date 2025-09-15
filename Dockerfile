FROM php:8.2

# Install system dependencies + Node.js
RUN apt-get update && apt-get install -y \
    git curl unzip libpng-dev libonig-dev libxml2-dev zip \
    nodejs npm netcat-traditional \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy dependency files first (for caching)
COPY composer.json composer.lock package*.json* ./

# Copy the rest of the application
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader

# Install Node dependencies
RUN npm install

# Make sure node_modules/.bin is in PATH
ENV PATH="/var/www/node_modules/.bin:${PATH}"

EXPOSE 8000 5173
