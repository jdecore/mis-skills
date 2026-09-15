---
name: brutal-nouveau-web
description: Usa esta skill al escribir HTML/CSS o React para web (incluye despliegues estáticos tipo Cloudflare Pages) dentro del sistema de diseño Brutal Nouveau. Traduce las decisiones de brutal-nouveau-core a CSS real. Consulta primero brutal-nouveau-core para saber qué técnica corresponde a cada caso; esta skill solo resuelve el código.
---

# Brutal Nouveau — Implementación Web

Traduce a CSS las decisiones de `brutal-nouveau-core`. Esta skill no redefine qué técnica usar en cada caso — consulta el core para eso.

## Técnicas — carga la referencia solo si la vas a usar

- Construyendo un tile, avatar o ícono-only button (~1:1) → lee `references/squircle.md`
- Construyendo cards, modales o alertas (esquinas asimétricas) → lee `references/asymmetric-corners.md`
- Construyendo el panel de acento único de la página → lee `references/torn-edge.md`
- Construyendo cualquier botón rectangular → lee `references/buttons.md`

No cargues las cuatro si la tarea solo necesita una — cada referencia trae su propio snippet listo para copiar.

## Tipografía

```css
/* Ruta webfont */
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

/* Ruta nativa, sin request externo */
h1, h2, h3 { font-family: 'Big Caslon', Didot, 'Iowan Old Style', 'Palatino Linotype', Georgia, serif; }
body { font-family: 'Avenir Next', 'Century Gothic', 'Segoe UI', -apple-system, sans-serif; }
```

## Dashboards/tablas densas

Mismas técnicas, radios al 40-50% del valor normal (ej. si una card normal usa `30px 8px 30px 8px`, en dashboard usa `14px 4px 14px 4px`). No quitar el borde/sombra, solo reducir su intensidad.

## Gotchas

- Un elemento con `mask-image` (squircle) que además lleva `border` o `box-shadow` normal se ve roto — la máscara los corta de forma dispareja. Ver `references/squircle.md`.
- Copiar el mismo `border-radius` a las 3+ cards de un grid en vez de variar el patrón por card — el error más común al aplicar este sistema.
- Dejar una regla CSS vieja sin borrar al reemplazarla en una edición posterior (mismo selector, mismo cuerpo, duplicado).

## Antes de entregar: correr el validador

```bash
python3 scripts/validate.py archivo.html
```

Si reporta problemas, corrígelos y vuelve a correr el script hasta que pase. El script detecta automáticamente: squircles con border/box-shadow indebido, botones sin radio elíptico, grids con el mismo patrón de esquina repetido, más de un torn edge o botánico por página, colores hardcodeados fuera del matrix, y reglas CSS duplicadas. No reemplaza el criterio de diseño (sigue revisando contra la tabla de `brutal-nouveau-core`), pero sí atrapa los errores mecánicos más comunes.
