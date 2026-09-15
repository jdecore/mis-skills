---
name: brutal-nouveau-core
description: Consulta esta skill antes de diseñar cualquier card, botón, modal, alerta o panel en cualquier plataforma (web, dashboard, iOS, Android). Define qué silueta usar en cada caso (squircle, esquinas asimétricas, torn edge), la jerarquía de botones, el color matrix y la tipografía del sistema de diseño Brutal Nouveau. No contiene código — solo decisiones de producto. Úsala junto con brutal-nouveau-web o brutal-nouveau-react-native según la plataforma.
---

# Brutal Nouveau — Core (decisiones de producto)

Define **qué** silueta, color y jerarquía usar en cada caso. No contiene código — el código vive en las skills de implementación (`brutal-nouveau-web`, `brutal-nouveau-react-native`). Cambiar una decisión de diseño se hace una sola vez, aquí.

## Las 3 técnicas del sistema (y solo estas 3)

1. **Squircle** — superelipse, solo para elementos ~1:1 (tiles, avatares, ícono-only buttons).
2. **Esquinas asimétricas** — `border-radius` distinto por esquina, sin máscara. Para cualquier rectángulo: cards, modales, botones secundarios de otras skills no-botón, alerts.
3. **Torn edge** — borde superior irregular. Un único panel de acento por pantalla, nunca repetido.

No se inventan técnicas nuevas. Un caso nuevo se resuelve combinando o adaptando una de estas.

## Tabla de decisión por caso

| Caso | Técnica | Nota |
|---|---|---|
| Card de contenido/información | Asimétrica | Cada card en un grid usa un patrón de esquinas distinto a sus vecinas |
| Tile de ícono, avatar, stat numérico | Squircle | Solo si el elemento es ~1:1 |
| Botón primario (CTA) | Elíptico por eje (`radio-x / radio-y`) | Nunca asimétrica, nunca squircle |
| Botón secundario | Elíptico por eje, radios más parejos entre sí | Misma técnica, menor intensidad |
| Botón de solo-ícono | Squircle | Única excepción a la regla de botones |
| Modal / diálogo centrado | Asimétrica, las 4 esquinas | |
| Bottom sheet (móvil) | Asimétrica, solo esquinas superiores | Inferiores en 0 |
| Panel de acento único | Torn edge | Máximo uno por pantalla |
| Alertas / toasts / banners | Asimétrica | |
| Fila de lista/tabla densa | Sin forma — divisor hairline | Card solo si la fila es seleccionable/expandible |
| Dashboards y tablas densas | Misma familia, radios al 40-50% | Nunca se elimina la forma del todo |
| Nav bar / tab bar | Sin forma orgánica — rectángulo simple | La marca vive en el contenido, no en el chrome |
| Elemento decorativo <60px (swatch, indicador) | Sin forma del sistema — cuadrado/círculo simple | A ese tamaño una máscara squircle no se distingue de un cuadrado |

## Color

Un matrix de 5 roles (canvas / panel / panel-alt / cta / stroke) por producto. Nunca mezclar swatches de dos matrices. Modo oscuro = mismo matrix, paleta oscura equivalente — nunca cambia la silueta.

| Matrix | Canvas | Panel | Panel Alt | CTA | Stroke |
|---|---|---|---|---|---|
| Mercado al Atardecer (Claro) | `#EDEDE9` | `#FFFFFF` | `#E2E2DB` | `#A85B12` | `#191B18` |
| Mercado al Atardecer (Oscuro) | `#141715` | `#1F2421` | `#2A312C` | `#E0A038` | `#ECEEE8` |
| Classic Earthy | `#FDFBF7` | `#8F9E8B` | `#E3A857` | `#C05C46` | `#1A1A1A` |
| Botanical Blush | `#FBF3EA` | `#D9A7A0` | `#A9BBA0` | `#7A3B4E` | `#2B211C` |
| Ochre & Teal | `#F6F1E4` | `#5F8A82` | `#E0A93C` | `#B25B3A` | `#211E1C` |
| Forest Noir (oscuro) | `#1B2B22` | `#3E5C46` | `#E3A857` | `#C0603F` | `#F5EFE2` |
| Wine & Gold (oscuro) | `#16232B` | `#4B1F3D` | `#C9A24B` | `#C9A24B` | `#F7F1E6` |

### Paleta Extendida "Mercado al Atardecer"
- **Modo claro:**
  - `--color-bg`: `#EDEDE9` (Papel archivo)
  - `--color-surface`: `#FFFFFF` (Blanco expediente)
  - `--color-surface-2`: `#E2E2DB` (Gris legajo)
  - `--color-border`: `#D5D5CB` (Hilo de costura)
  - `--color-text`: `#191B18` (Tinta registro)
  - `--color-muted`: `#5A5E58` (Gris sello)
  - `--color-primary`: `#1D3A5F` (Azul despacho)
  - `--color-primary-hover`: `#162A44` (Azul despacho oscuro)
  - `--color-on-primary`: `#FFFFFF` (Blanco sobre azul)
  - `--color-accent`: `#A85B12` (Mango tostado)
  - `--color-accent-hover`: `#8F5A00` (Mango quemado)
  - `--color-on-accent`: `#FFFFFF` (Blanco sobre mango)
  - `--color-success`: `#1E6B45` (Selva profunda)
  - `--color-warning`: `#8A5A00` (Cúrcuma seria)
  - `--color-danger`: `#9E2B47` (Flor de jamaica)
  - `--color-danger-soft`: `color-mix(in srgb, var(--color-danger) 9%, transparent)`
  - `--color-warning-soft`: `color-mix(in srgb, var(--color-warning) 12%, transparent)`
  - `--color-accent-soft`: `color-mix(in srgb, var(--color-accent) 10%, transparent)`
- **Modo oscuro:**
  - `--color-bg`: `#141715`, `--color-surface`: `#1F2421`, `--color-surface-2`: `#2A312C`, `--color-border`: `#39413A`
  - `--color-text`: `#ECEEE8`, `--color-muted`: `#A9AEA2`, `--color-primary`: `#7FA8D0`, `--color-primary-hover`: `#93B9DA`, `--color-on-primary`: `#141715`
  - `--color-accent`: `#E0A038`, `--color-accent-hover`: `#EDB457`, `--color-on-accent`: `#141715`
  - `--color-success`: `#4ADE80`, `--color-warning`: `#FBBF24`, `--color-danger`: `#F87171`

Todo color es plano y sólido: sin degradados, sin glass/blur.

## Tipografía

Dos familias distintas y nombradas, nunca la misma para título y cuerpo:
- **Webfont**: título `Playfair Display` / `Cormorant Garamond` / `Fraunces`; cuerpo `Poppins` / `Inter` / `Source Sans 3`.
- **Nativa**: título `'Big Caslon', Didot, 'Iowan Old Style', Georgia, serif`; cuerpo `'Avenir Next', 'Century Gothic', -apple-system, sans-serif`.

## Estructura

Todo elemento estructural primario (nav, headers, botones, cada card) lleva borde 2-4px y sombra plana offset sin blur. Se aplica a **todos**, no a uno o dos de ejemplo.

## Gotchas

- **Cards repetidas con el mismo patrón de esquina.** Al construir un grid de 3+ items con esquinas asimétricas, es fácil copiar el mismo `border-radius` a los cuatro/cinco elementos por descuido. Revisa explícitamente que cada uno sea distinto a sus vecinos antes de terminar — este fue el error real más común al aplicar el sistema.
- **Reglas CSS duplicadas.** Al editar un archivo varias veces en la misma sesión, es fácil dejar una regla vieja sin borrar cuando se reemplaza por una nueva con el mismo selector. Antes de entregar, busca selectores repetidos en el archivo.
- **Colores hardcodeados fuera del matrix.** Un `stroke="#F7F1E6"` escrito directo en un SVG en vez de `var(--bg)` se desincroniza si cambias de paleta después. Todo color debe venir de una variable del matrix, nunca un hex suelto en el markup.
- **Botones tratados como si fueran cards.** Es tentador reusar la técnica de esquinas asimétricas en un botón porque "ya está la clase lista" — pero un botón siempre es elíptico por eje, sin excepción salvo ícono-only.

## Checklist antes de construir

1. ¿Identifiqué qué caso de la tabla corresponde a este componente?
2. ¿Estoy reutilizando una de las 3 técnicas, o inventando una cuarta?
3. ¿El botón usa `border-radius` elíptico por eje (nunca asimétrica ni squircle, salvo ícono-only)?
4. ¿Reduje los radios en pantallas densas en datos, en vez de eliminar la forma?
5. ¿Hay más de un torn edge o botánico en la misma pantalla?
6. ¿Una sola ruta de tipografía, consistente en todo el producto?
7. ¿Un solo matrix de color, sin mezclar swatches de otro?
8. ¿Cada card de un mismo grid tiene un patrón de esquina distinto a sus vecinas?
