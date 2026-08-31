# Artefacto de Evaluación UX/UI: Leyes UX & Heurísticas de Nielsen (App OSDE)

Aplicación web interactiva desarrollada para la materia **Diseño de Experiencia de Usuario (UX/UI)** de la **Universidad de San Andrés (UdeSA)**.

---

## 👥 Equipo de Trabajo
- **Franco Dragani Malavolta**
- **Simón Glücksmann**
- **Bautista Luque**
- **Santiago Straminsky**

---

## 🚀 Características del Artefacto
- **📊 Resumen Ejecutivo**: Métricas en tiempo real de cobertura, balance de leyes y distribución de severidades de Nielsen (0 a 4).
- **⚖️ Tablero 1 (Leyes UX)**: Evaluación estructurada de las 14 leyes UX principales con filtros por estado (`Cumple` / `Rompe`), preguntas guía, pantallas analizadas y evidencias.
- **🔍 Tablero 2 (Heurísticas de Nielsen)**: Evaluación exhaustiva de las 10 heurísticas de Jakob Nielsen (H1 a H10) con escala de severidad estandarizada (0 a 4), capturas HD, diagnóstico y análisis de impacto en la persona usuaria.
- **🖼️ Visor Lightbox HD**: Inspección visual con zoom interactivo y panel lateral sincronizado.
- **🎨 Sistema de Diseño OSDE**: Desarrollado con los lineamientos del Manual de Marca oficial de OSDE (`#1226AA` - Pantone Dark Blue C).

---

## 🛠️ Tecnologías Utilizadas
- **React 18 + TypeScript**
- **Tailwind CSS** (Tokens de marca OSDE y severidad accesible)
- **Lucide Icons**
- **Vite** (Bundler optimizado para despliegue en Vercel)

---

## 📂 Cómo Cargar y Editar Hallazgos del Equipo

Toda la información está centralizada en la carpeta `src/data/`:

1. **Leyes UX**: Edita `src/data/uxLawsData.ts` para cambiar el estado (`'cumple'` o `'rompe'`), el nombre de la pantalla, la ruta de la captura y la explicación escrita.
2. **Heurísticas de Nielsen**: Edita `src/data/nielsenData.ts` para asignar la severidad (`0`, `1`, `2`, `3`, `4`), el punto analizado, la explicación y el impacto en el usuario.
3. **Capturas de Pantalla**: Coloca tus imágenes dentro de `public/evidence/laws/` o `public/evidence/heuristics/`.

---

## 💻 Ejecución en Local

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

---

## 🌐 Despliegue en Vercel

1. Sube los cambios a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "feat: artefacto de evaluacion UX OSDE"
   git push origin main
   ```
2. En [Vercel](https://vercel.com/), crea un nuevo proyecto e importa este repositorio.
3. Vercel detectará automáticamente Vite y realizará el deploy en segundos.
