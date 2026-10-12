#!/usr/bin/env python3
"""
Gera um QR code com tema rosa/lírio para a landing page.

Uso:
  python3 qrcode-generator.py "https://seu-usuario.github.io/sitemay"
"""

import sys
import qrcode
from PIL import Image, ImageDraw
import os

def criar_qrcode_tematico(url, output_path="qrcode.png"):
    """
    Cria um QR code com:
    - Cores: rosa (fundo) e branco (padrão)
    - Correção de erro alta (para logo no centro)
    - Emoji lírio (🌷) ou coração (❤️) no centro
    """

    # Criar QR code com correção de erro alta (L=7%, M=15%, Q=25%, H=30%)
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # Máxima correção
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Cores (do config.js)
    cor_lirio = "#F4A6C1"    # Rosa lírio
    cor_branco = "#FFFFFF"    # Branco

    # Criar imagem
    img = qr.make_image(fill_color=cor_lirio, back_color=cor_branco).convert("RGB")

    # Adicionar logo/emoji no centro
    width, height = img.size
    logo_size = width // 4  # Logo ocupa 1/4 da imagem

    # Criar fundo branco para o logo
    logo = Image.new("RGB", (logo_size + 20, logo_size + 20), cor_branco)

    # Desenhar borda rosa ao redor do logo
    draw = ImageDraw.Draw(logo)
    draw.rectangle(
        [(5, 5), (logo_size + 15, logo_size + 15)],
        outline=cor_lirio,
        width=3
    )

    # Colar logo no centro
    logo_pos = ((width - logo_size - 20) // 2, (height - logo_size - 20) // 2)
    img.paste(logo, logo_pos)

    # Adicionar emoji 🌷 no centro (usando PIL Text)
    draw = ImageDraw.Draw(img)

    # Nota: Para adicionar emoji com PIL, é melhor usar uma fonte que suporte
    # Por enquanto, vamos apenas deixar o QR code bonito

    # Salvar
    img.save(output_path)
    print(f"✅ QR code gerado: {output_path}")
    print(f"📏 Tamanho: {width}x{height} pixels")
    print(f"🎨 Cores: rosa lírio (#F4A6C1) + branco")
    print(f"🔒 Correção de erro: Alta (30%)")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❌ Uso: python3 qrcode-generator.py <URL>")
        print("Exemplo: python3 qrcode-generator.py 'https://seu-usuario.github.io/sitemay'")
        sys.exit(1)

    url = sys.argv[1]

    # Validar URL
    if not url.startswith("http"):
        print("❌ URL deve começar com http:// ou https://")
        sys.exit(1)

    try:
        criar_qrcode_tematico(url)
    except ImportError:
        print("❌ Bibliotecas necessárias não instaladas!")
        print("Instale com: pip install qrcode[pil] pillow")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Erro: {e}")
        sys.exit(1)
