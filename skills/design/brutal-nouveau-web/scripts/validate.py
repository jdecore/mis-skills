#!/usr/bin/env python3
"""
Valida un archivo HTML/CSS contra las reglas de Brutal Nouveau.
Uso: python3 validate.py archivo.html
Sale con código != 0 si encuentra violaciones — revisa y corrige antes de entregar.
"""
import re
import sys
from collections import defaultdict

def main():
    if len(sys.argv) != 2:
        print("Uso: python3 validate.py archivo.html")
        sys.exit(2)

    path = sys.argv[1]
    with open(path, encoding="utf-8") as f:
        content = f.read()

    issues = []

    # Aislar el CSS real (dentro de <style>...</style>) para no arrastrar
    # markup HTML como si fuera parte de un selector.
    style_blocks = re.findall(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
    css_content = "\n".join(style_blocks) if style_blocks else content

    # 1. Extraer bloques de reglas CSS: selector { propiedades }
    rule_pattern = re.compile(r'([^{}]+)\{([^{}]*)\}', re.MULTILINE)
    rules = rule_pattern.findall(css_content)

    nth_child_groups = defaultdict(list)

    for selector, body in rules:
        selector = selector.strip()
        if not selector or selector.startswith('@') or selector.startswith(':root'):
            continue

        # 2. Squircle (mask-image) no debe tener border ni box-shadow
        if 'mask-image' in body:
            if re.search(r'(?<!-webkit-mask-)border\s*:', body) and 'border: none' not in body:
                issues.append(f"[squircle] Selector '{selector}' usa mask-image pero también tiene 'border' — se corta de forma dispareja. Usa box-shadow inset si necesitas trazo.")
            if re.search(r'box-shadow\s*:', body):
                issues.append(f"[squircle] Selector '{selector}' usa mask-image con box-shadow — box-shadow no sigue la máscara. Usa filter: drop-shadow() en su lugar.")

        # 3. Botones deben ser elípticos (con "/") si el selector sugiere botón
        if re.search(r'\bbutton\b|\.btn', selector, re.IGNORECASE):
            radius_match = re.search(r'border-radius\s*:\s*([^;]+);', body)
            if radius_match and '/' not in radius_match.group(1):
                issues.append(f"[botones] Selector '{selector}' parece un botón pero su border-radius no usa el shorthand elíptico (x% / y%): '{radius_match.group(1).strip()}'")

        # 4. Agrupar reglas :nth-child para detectar patrones de esquina repetidos
        nth_match = re.match(r'^(.+):nth-child\((\d+)\)$', selector)
        if nth_match:
            prefix = nth_match.group(1).strip()
            radius_match = re.search(r'border-radius\s*:\s*([^;]+);', body)
            if radius_match:
                nth_child_groups[prefix].append(radius_match.group(1).strip())

    # 5. Selectores CSS duplicados EXACTOS (mismo selector Y mismo cuerpo) — una
    #    regla repetida con distinto cuerpo dentro de @media es responsive válido,
    #    no un residuo de edición.
    exact_seen = defaultdict(int)
    for selector, body in rules:
        selector = selector.strip()
        if not selector or selector.startswith('@') or selector.startswith(':root'):
            continue
        normalized_body = re.sub(r'\s+', ' ', body.strip())
        exact_seen[(selector, normalized_body)] += 1

    for (selector, body), count in exact_seen.items():
        if count > 1:
            issues.append(f"[duplicado] El selector '{selector}' repite EXACTAMENTE el mismo cuerpo {count} veces — es un residuo de edición, no un override responsive.")

    # 6. Grupos de :nth-child con el mismo border-radius en todos (grid sin variar patrón)
    for prefix, radii in nth_child_groups.items():
        if len(radii) > 1 and len(set(radii)) == 1:
            issues.append(f"[asimetría] Todas las reglas '{prefix}:nth-child(...)' usan el mismo border-radius ('{radii[0]}') — deben variar entre sí.")

    # 7. Torn edge: máximo un clip-path: polygon en toda la página
    torn_count = len(re.findall(r'clip-path\s*:\s*polygon', content))
    if torn_count > 1:
        issues.append(f"[torn-edge] Se encontraron {torn_count} usos de clip-path: polygon — máximo 1 por página.")

    # 8. Botánico: máximo una instancia de class="botanical" (o similar) en el HTML
    botanical_count = len(re.findall(r'class="[^"]*botanical[^"]*"', content))
    if botanical_count > 1:
        issues.append(f"[botánico] Se encontraron {botanical_count} elementos con clase 'botanical' — máximo 1 por página.")

    # 9. Colores hex sueltos dentro de atributos SVG inline (deberían ser var(--...))
    hardcoded = re.findall(r'(?:stroke|fill)="(#[0-9A-Fa-f]{3,6})"', content)
    if hardcoded:
        issues.append(f"[color] Colores hex hardcodeados en atributos SVG en vez de var(--...): {set(hardcoded)}")

    if issues:
        print(f"❌ {len(issues)} problema(s) encontrado(s) en {path}:\n")
        for i, issue in enumerate(issues, 1):
            print(f"{i}. {issue}")
        sys.exit(1)
    else:
        print(f"✅ {path} pasa todas las validaciones de Brutal Nouveau.")
        sys.exit(0)

if __name__ == "__main__":
    main()
