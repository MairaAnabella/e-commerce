# Carrito E-commerce - Examen Técnico Fullstack

Este proyecto simula una aplicación e-commerce que permite crear y gestionar distintos tipos de carritos de compra, con lógica de promociones por fecha especial o tipo de usuario.

## Tecnologías utilizadas

- **Backend**: Laravel 12 (PHP 8.x)
- **Frontend**: Angular 19 + Angular Material
- **Base de datos**: MySQL


---

## Requisitos

### Backend

- PHP 8.1 o superior
- Composer
- MySQL 8+
- Laravel 12
- Extensiones PHP comunes (`pdo`, `mbstring`, `openssl`, etc.)

### Frontend

- Node.js 18.x o superior
- Angular CLI 19.x

---

## Instalación

### 1. Clonar el repositorio API

```bash
git clone https://github.com/MairaAnabella/e-commerce.API.git
cd e-commerce.API
```

### 2. Configurar el backend

```bash
cd laravel-api
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

- **Puerto por defecto**: `http://localhost:8000`

### 3. Configurar el frontend

```bash
git clone  https://github.com/MairaAnabella/e-commerce.git
cd e-commerce
```

```bash
cd e-commerce
npm install
ng serve
```

- **Puerto por defecto**: `http://localhost:4200`

---

## Funcionalidades

- Crear, eliminar y consultar carritos
- Agregar o eliminar productos de carritos
- Consultar total con descuentos según reglas
- Simulación de fecha
- Gestión de estado VIP de los clientes
- Visualización de compras finalizadas
- Consultas de clientes que pasaron a ser VIP, dejaron de ser VIP, etc.

---


