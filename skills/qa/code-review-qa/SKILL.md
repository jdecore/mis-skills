---
name: code-review-qa
description: Consulta esta skill antes de finalizar cualquier tarea, pull request o entrega de codigo. Revisa checklists de calidad, convenciones de nombres, tipos TypeScript estrictos, accesibilidad (a11y) y performance.
---

# QA & Code Review — Protocolo de Aprobación

Esta skill define el checklist de verificación antes de dar por terminado cualquier cambio o PR.

## 1. Checklist Obligatorio de Aprobación
- [ ] **TypeScript Estricto**: Cero usos de ny sin justificación explícita.
- [ ] **Sin Logs de Debugging**: No dejar console.log, debugger o prints de prueba en el código final.
- [ ] **Accesibilidad (a11y)**:
  - Todas las imágenes tienen lt descriptivo.
  - Los botones interactivos tienen nombre accesible legible por lectores de pantalla.
  - El contraste de colores cumple con estándar WCAG AA.
- [ ] **Manejo de Errores**: Toda promesa o llamada async tiene bloque 	ry/catch o boundary.
- [ ] **Responsive & Mobile First**: Probado mentalmente o con viewport en rangos 375px–430px.

## 2. Gotchas Comunes
- Añadir listeners de ventana (window.addEventListener) sin eliminarlos en el useEffect cleanup.
- Subir variables de entorno o credenciales sensibles en archivos .env o código fuente.
