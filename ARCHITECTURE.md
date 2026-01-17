# Arquitectura de la Plataforma de Empleos Temporales

## 1. Visión General
La plataforma sigue una arquitectura de diseño basada en microservicios o monolito modular (según escala), separando claramente el Frontend (Cliente) del Backend (API REST segura).

## 2. Componentes del Sistema

### A. Backend (NestJS)
**Estructura:**
- **Core Module:** Configuración global, interceptores, guardias.
- **Auth Module:** Gestión de identidades, JWT, control de acceso (RBAC).
- **Users Module:** Gestión de perfiles, candidatos y empleadores.
- **Jobs Module:** Publicación y búsqueda de empleos temporales.

**Ciberseguridad & Protección:**
1.  **Autenticación:** Estrategia JWT (JSON Web Tokens) usando `@nestjs/passport`. Token sin estado.
2.  **Hashing:** Las contraseñas se almacenan hasheadas (recomiendo Argon2 o Bcrypt).
3.  **Validación de Datos:** Uso de `class-validator` y DTOs (Data Transfer Objects) para prevenir inyección de datos y asegurar integridad.
4.  **Base de Datos:** PostgreSQL con TypeORM. El uso de ORM mitiga inyección SQL estándar.

### B. Frontend (React + Vite)
**Tecnologías Clave:**
- **React:** UI declarativa.
- **Vite:** Build tool de alto rendimiento.
- **Lucide React:** Iconografía optimizada.
- **Framer Motion:** Animaciones fluidas para UX moderna.

**Estructura de Carpetas Sugerida:**
- `/src/components`: Componentes reutilizables (Botones, Inputs).
- `/src/features`: Módulos de funcionalidad (Auth, JobBoard).
- `/src/hooks`: Lógica de estado y llamadas a API.
- `/src/context` o `/src/store`: Estado global.

## 3. Flujo de Datos Seguro
1.  El cliente se autentica (`/auth/login`) y recibe `access_token`.
2.  El token se envía en el header `Authorization: Bearer <token>` para requests protegidas.
3.  El Backend valida el token con `AuthGuard` antes de procesar la solicitud.

## 4. Próximos Pasos (Recomendaciones de Experto)
- Habilitar **CORS** restringido en `main.ts`.
- Configurar **Helmet** para headers de seguridad HTTP.
- Implementar **Rate Limiting** para evitar fuerza bruta.
