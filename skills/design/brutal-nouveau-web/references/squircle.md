# Squircle — CSS

Se construye con una máscara SVG, nunca con `clip-path` de coordenadas fijas (esas solo funcionan si el elemento mide exactamente el tamaño del path, y se rompen en cualquier otro tamaño).

```css
.squircle-tile {
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M 0 34 C 0 7, 7 0, 34 0 L 66 0 C 93 0, 100 7, 100 34 L 100 66 C 100 93, 93 100, 66 100 L 34 100 C 7 100, 0 93, 0 66 Z'/></svg>");
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M 0 34 C 0 7, 7 0, 34 0 L 66 0 C 93 0, 100 7, 100 34 L 100 66 C 100 93, 93 100, 66 100 L 34 100 C 7 100, 0 93, 0 66 Z'/></svg>");
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
}
```

**Sombra:** `box-shadow` ignora la máscara y dibuja alrededor de la caja rectangular. Usar siempre `filter: drop-shadow()`, que sí sigue la forma real recortada:

```css
.squircle-tile {
  filter: drop-shadow(6px 6px 0px var(--stroke));
}
```

No poner `border` en un elemento con máscara — se corta de forma dispareja. Si necesitas un trazo visible, usa `box-shadow: 0 0 0 Npx var(--stroke) inset` en vez de `border`.
