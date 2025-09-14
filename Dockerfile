FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip libpng-dev libonig-dev libxml2-dev zip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Node.js (LTS) & npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy dependency files first (for caching)
COPY composer.json composer.lock package*.json* ./

# Install dependencies (dev included for local)
RUN composer install \
    && npm install

# Copy source code
COPY . .

# Expose ports:
# - 8000: Laravel app (artisan serve)
# - 5173: Vite dev server
EXPOSE 8000 5173

# Run both Laravel and Vite together
CMD sh -c "php artisan serve --host=0.0.0.0 --port=8000 & npm run dev -- --host"
