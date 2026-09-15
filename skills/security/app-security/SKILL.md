---
name: app-security-guidelines
description: Consulta esta skill para auditar la seguridad en frontend y backend. Cubre prevencion de XSS, inyeccion SQL, proteccion CSRF, configuracion segura de cabeceras HTTP, sanitizacion de inputs y manejo seguro de tokens y secretos.
---

# Seguridad de Aplicaciones — Estándares y Protección

Esta skill define cómo prevenir vulnerabilidades comunes y proteger la aplicación contra vectores de ataque.

## 1. Reglas de Prevención Frontend
1. **Prevención de XSS**:
   - Nunca usar dangerouslySetInnerHTML con contenido provisto por el usuario.
   - Si es necesario renderizar HTML enriquecido, sanitizar previamente con DOMPurify.
2. **Enlaces y Navegación Segura**:
   - Todo enlace o botón externo (	arget=_blank) debe llevar el=noopener noreferrer.
3. **Manejo de Tokens**:
   - Nunca almacenar JWTs o API keys sensibles en localStorage si son susceptibles a robo por XSS. Preferir cookies con flags HttpOnly, Secure y SameSite=Strict.

## 2. Gotchas Comunes
- Hardcodear API keys o secretos de servidor en código de cliente.
- Desactivar reglas de validación en inputs creyendo que la base de datos es segura.
