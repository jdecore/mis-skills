# Torn edge — CSS

`clip-path: polygon()` con muchos puntos cercanos y variación de 0–4% en altura. Máximo un panel de este tipo por página:

```css
.torn-panel {
  clip-path: polygon(
    0% 2%, 5% 0%, 10% 3%, 15% 1%, 20% 3%, 25% 0%, 30% 2%, 35% 0%, 40% 3%, 45% 1%,
    50% 3%, 55% 0%, 60% 2%, 65% 0%, 70% 3%, 75% 1%, 80% 3%, 85% 0%, 90% 2%, 95% 0%, 100% 3%,
    100% 100%, 0% 100%
  );
}
```

Un `border-bottom` recto sí funciona en este panel (el corte irregular es solo arriba); no pongas borde en el borde superior, se corta de forma despareja contra el polígono.

Si se usa un acento botánico (línea SVG) dentro del panel, máximo una instancia, ancla a un borde estructural.
