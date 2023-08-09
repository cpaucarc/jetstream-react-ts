<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

> Project created to test new technologies in the frontend, instead of the traditional Vue that comes by default with Jetstream Inertia.

## Create a new project with Laravel and React

To create a new Laravel project with Jetstream, Inertia, React and Typescript, follow the instructions of the following [**ozziexsh** repository](https://github.com/ozziexsh/laravel-jetstream-react).

```bash
composer create-project laravel/laravel my_app
cd my_app
composer require laravel/jetstream
php artisan jetstream:install inertia
npx laravel-jetstream-react@latest install
```

## Other tested libraries

- [**Zustand**](https://docs.pmnd.rs/zustand/getting-started/introduction)
-

## Others

- Changed the default horizontal navbar at the top to a responsive sidebar on the left side.
