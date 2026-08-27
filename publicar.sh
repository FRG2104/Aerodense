#!/bin/bash
# Publica Aerodense en GitHub Pages.
# Requisito: ya debe haber creado el repo VACIO "aerodense-web" en GitHub (publico).
# Uso:  bash publicar.sh   (o bien:  bash publicar.sh SU_USUARIO)
set -e
cd "$(dirname "$0")"

USUARIO="${1:-FRG2104}"
REPO="aerodense-web"

echo "=> Conectando al repo de $USUARIO/$REPO ..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$USUARIO/$REPO.git"

echo "=> Subiendo a GitHub (pedirá su usuario/contraseña o token) ..."
git push -u origin main

echo ""
echo "Listo. Ahora active GitHub Pages:"
echo "  GitHub -> $REPO -> Settings -> Pages -> Source: main / (root) -> Save"
echo "  La pagina estara en: https://$USUARIO.github.io/$REPO"
