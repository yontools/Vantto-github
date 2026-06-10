# Vantto — Sistema logístico de volquetes

SaaS B2B de gestión logística de activos en tiempo real para empresas de volquetes en Argentina (Añelo & Neuquén).

## Stack Tecnológico
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Estilos:** Tailwind CSS v4, Motion (framer-motion)
- **Base de Datos & Auth:** Supabase (Auth, PostgreSQL, Row Level Security)
- **UI & Iconos:** Lucide React, Shadcn/ui

## Instrucciones de Setup Local (4 pasos)

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/yontools/Vantto-github.git
cd Vantto-github
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto y copia las variables de `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 3. Ejecutar el servidor de desarrollo
Inicia el entorno de desarrollo local con:
```bash
npm run dev
```

### 4. Compilar para producción
Para asegurar que todo compile perfectamente y generar los archivos estáticos optimizados:
```bash
npm run build
```
