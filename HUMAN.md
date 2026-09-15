# MANUAL DE USO: Mis Skills (Instalador Multi-Skill)

Este repositorio contiene tu catálogo privado de skills para **Google Antigravity**, **Gemini CLI** y agentes de IA compatibles.

---

## 📂 Categorías Disponibles

| Categoría | Skill Interna | Propósito |
| :--- | :--- | :--- |
| **design** | rutal-nouveau-core & rutal-nouveau-web | Sistema de diseño Brutal Nouveau, siluetas asimétricas, torn-edge y paleta *Mercado al Atardecer*. |
| **	esting** | unit-and-integration-testing | Estándares de tests unitarios/integración con Vitest, React Testing Library, Playwright y aislamiento de red. |
| **qa** | code-review-qa | Checklist de revisión previo a entrega (TypeScript estricto, accesibilidad a11y, limpieza de logs). |
| **security** | pp-security-guidelines | Prevención de XSS, inyección, manejo seguro de cookies/JWT y sanitización de inputs. |

---

## 🚀 Comandos de Instalación con 
px

> **Nota:** Como el repositorio es privado, solo necesitas tener tu terminal autenticada en GitHub (gh auth login o tus llaves SSH).

### 1. Instalar en el Proyecto Actual (.agents/skills/)
Abre tu terminal en la carpeta de tu proyecto (por ejemplo C:\Users\jenri\Videos\floro) y corre:

- **Instalar TODAS las skills:**
  `ash
  npx github:jdecore/mis-skills --all
  `
- **Instalar solo una categoría específica:**
  `ash
  # Solo testing:
  npx github:jdecore/mis-skills testing

  # Solo diseño:
  npx github:jdecore/mis-skills design

  # Solo QA:
  npx github:jdecore/mis-skills qa

  # Solo seguridad:
  npx github:jdecore/mis-skills security
  `

---

### 2. Instalar Globalmente en tu Máquina (~/.gemini/config/skills/)
Si quieres que las skills estén disponibles en **cualquier proyecto de tu PC** sin tener que instalarlas en cada repositorio:

- **Instalar TODAS globalmente:**
  `ash
  npx github:jdecore/mis-skills --all --global
  `
- **Instalar solo una categoría globalmente:**
  `ash
  npx github:jdecore/mis-skills testing --global
  `

---

## 🤖 ¿Cómo las usa el Agente de IA?

Tú **no necesitas ejecutar scripts manualmente** después de instalarlas.

El agente lee la descripción de cada SKILL.md y las activa de forma inteligente y progresiva cuando le das una instrucción:
- Si le dices: *Escribe pruebas para este formulario*, activará la skill de **	esting**.
- Si le dices: *Revisa este código antes de hacer commit*, activará la skill de **qa**.
- Si le dices: *Revisa si hay vulnerabilidades o fugas de tokens*, activará la skill de **security**.
- Si le dices: *Diseña una tarjeta con la paleta Mercado al Atardecer*, activará las skills de **design**.
