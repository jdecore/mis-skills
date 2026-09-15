# Esquinas asimétricas — CSS

`border-radius` normal, distinto valor por esquina. Sin máscara, así que `border` funciona sin problema:

```css
.card-a { border-radius: 30px 8px 30px 8px; }
.card-b { border-radius: 8px 30px 8px 30px; }
.card-c { border-radius: 30px 30px 8px 8px; }
```

Cada card de un mismo grid debe usar un patrón distinto al de sus vecinas — nunca copiar el mismo valor en todas (ver Gotchas en `brutal-nouveau-core`).

Para bottom sheets: solo esquinas superiores, inferiores en `0`:

```css
.bottom-sheet { border-radius: 28px 28px 0 0; }
```
