# Botones elípticos por eje — CSS

Nunca la máscara squircle en un botón rectangular (se estira, sin importar el tamaño, incluso en botones pequeños/inline como un CTA "Ver más"). Usar el shorthand de dos ejes, que resuelve cada eje contra su propia dimensión:

```css
/* Primario: mayor diferencia entre radios, sensación de blob */
.btn-primary {
  border-radius: 60% 40% 55% 45% / 65% 55% 45% 35%;
}

/* Secundario: radios más parejos entre sí, curva más discreta */
.btn-secondary {
  border-radius: 45% 40% 42% 38% / 50% 45% 42% 40%;
}
```

Ícono-only: es cuadrado, usa la técnica de `references/squircle.md`, no esta.
