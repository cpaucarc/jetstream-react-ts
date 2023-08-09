<p align="center"><img src="https://github.com/cpaucarc/jetstream-react-ts/assets/52868996/644ae739-65c0-461b-bbfd-4268615fcc29" width="300" alt="Laravel Logo"></p>

> Project created to test new technologies in the frontend, instead of the traditional Vue that comes by default with Jetstream Inertia.

## Create a new project with Laravel and React

To create a new Laravel project with Jetstream, Inertia, React and Typescript, follow the instructions of the following [**ozziexsh** repository](https://github.com/ozziexsh/laravel-jetstream-react).

```bash
# Create a new project
composer create-project laravel/laravel my_app
cd my_app

# Install Jetstream Inertia
composer require laravel/jetstream
php artisan jetstream:install inertia

# Change from Vue to React
npx laravel-jetstream-react@latest install
```

## Other tested libraries
- [**Zustand**](https://docs.pmnd.rs/zustand/getting-started/introduction) library
- [**UI Avatars**](https://ui-avatars.com/) API

## Others
- Changed the default horizontal navbar at the top to a responsive sidebar on the left side. 
- Switching themes from light to dark, based on TailwindCSS classes

## How to clone locally
```bash
# Clone from github
git clone https://github.com/cpaucarc/sgc.git
cd sgc/

# Install composer and node dependencies
composer install
npm install

# Setting laravel environment variables
cp .env.example .env
php artisan key:generate
php artisan storage:link

# Create a new database in MySQL and migrate tables
php artisan migrate --seed

# Run project
php artisan serve	# In console/terminal 1
npm run dev		# In console/terminal 2
```
