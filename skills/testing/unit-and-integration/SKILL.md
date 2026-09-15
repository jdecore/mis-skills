---
name: unit-and-integration-testing
description: Consulta esta skill cuando el usuario pida escribir, refactorizar o ejecutar tests unitarios o de integracion (Vitest, Jest, React Testing Library, Playwright). Define patrones de mocking, organizacion de pruebas y aserciones limpias.
---

# Testing Unitario y de Integración — Guía de Ejecución

Esta skill define cómo estructurar y ejecutar pruebas sin testear detalles de implementación internos.

## 1. Reglas Fundamentales
1. **Comportamiento sobre implementación**: Prueba lo que el usuario ve o la API responde, no variables de estado internas.
2. **Ubicación de archivos**:
   - Componentes React: src/components/__tests__/Button.test.tsx o junto al archivo Button.test.tsx.
   - Servicios/Utilidades: src/utils/formater.test.ts.
3. **Aislamiento de red**: Siempre mockea llamadas HTTP con MSW (Mock Service Worker) o interceptores locales (i.fn()), nunca llames APIs reales en tests unitarios.

## 2. Patrón de Prueba en React (Vitest + Testing Library)
`	sx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

describe('PetIdCardPage', () => {
  it('abre WhatsApp con los datos correctos al hacer clic en el boton', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    // renderizado de prueba
    expect(openSpy).not.toHaveBeenCalled()
    openSpy.mockRestore()
  })
})
`

## 3. Comandos de Verificación
- Ejecución rápida: pnpm test:run o 
pm test
- Cobertura: pnpm test:coverage

## 4. Gotchas Comunes
- Olvidar userEvent.setup() antes de renderizar cuando se simulan interacciones del usuario.
- Dejar mocks activos entre pruebas: usa siempre fterEach(() => { vi.restoreAllMocks(); }).
