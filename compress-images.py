#!/usr/bin/env python3
"""
Comprime imagens para celular (reduz tamanho e qualidade)
"""

from PIL import Image
import os
from pathlib import Path

def comprimir_imagem(caminho_entrada, caminho_saida, max_width=800, qualidade=75):
    """
    Comprime uma imagem:
    - Redimensiona para max 800px de largura
    - Reduz qualidade JPEG para 75%
    """
    try:
        img = Image.open(caminho_entrada)

        # Redimensionar mantendo proporção
        img.thumbnail((max_width, max_width), Image.Resampling.LANCZOS)

        # Converter PNG para RGB (se necessário)
        if img.mode == 'RGBA':
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[3])
            img = rgb_img

        # Salvar com qualidade reduzida
        img.save(caminho_saida, 'JPEG', quality=qualidade, optimize=True)

        tamanho_original = os.path.getsize(caminho_entrada) / 1024
        tamanho_novo = os.path.getsize(caminho_saida) / 1024
        reducao = 100 * (1 - tamanho_novo / tamanho_original)

        print(f"✅ {Path(caminho_entrada).name}: {tamanho_original:.0f}KB → {tamanho_novo:.0f}KB (-{reducao:.1f}%)")

        return True
    except Exception as e:
        print(f"❌ Erro em {caminho_entrada}: {e}")
        return False

def main():
    pasta = "assets"

    # Listar arquivos
    arquivos = list(Path(pasta).glob("*.JPEG")) + list(Path(pasta).glob("*.PNG"))

    print(f"🖼️  Comprimindo {len(arquivos)} imagens...\n")

    total_antes = sum(os.path.getsize(str(f)) for f in arquivos)

    for arquivo in sorted(arquivos):
        # Manter nome original mas tudo como JPEG
        saida = arquivo.with_suffix(".jpg")
        comprimir_imagem(str(arquivo), str(saida), max_width=800, qualidade=75)

        # Remover original se não for JPEG
        if arquivo.suffix.upper() != '.JPEG':
            os.remove(str(arquivo))

    # Calcular tamanho final
    arquivos_novos = list(Path(pasta).glob("*.jpg"))
    total_depois = sum(os.path.getsize(str(f)) for f in arquivos_novos)

    reducao_total = 100 * (1 - total_depois / total_antes)
    print(f"\n📊 Total: {total_antes/1024/1024:.2f}MB → {total_depois/1024/1024:.2f}MB (-{reducao_total:.1f}%)")

if __name__ == "__main__":
    main()
