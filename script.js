/* =====================================================================
   SCRIPT PRINCIPAL - Lógica interativa
   ===================================================================== */

// Estado global
const state = {
  cadeadoAberto: false,
  envelopeAberto: false,
  musicaTocando: false,
  motivosVisualizados: new Set(),
};

/* =====================================================================
   1. INICIALIZAÇÃO: Substituir templates com dados do CONFIG
   ===================================================================== */

function inicializarTemplates() {
  // Substituir variáveis simples no HTML
  document.querySelectorAll('[id*="senha"]').forEach((el) => {
    const placeholder = el.innerHTML;
    el.innerHTML = placeholder.replace('{{ CONFIG.cadeado.dica }}', CONFIG.cadeado.dica);
  });

  document.querySelectorAll('.dica-cadeado').forEach((el) => {
    el.textContent = CONFIG.cadeado.dica;
  });

  document.querySelectorAll('.mensagem-erro').forEach((el) => {
    el.textContent = CONFIG.cadeado.mensagemErro;
  });

  document.querySelector('.pergunta-texto').textContent = CONFIG.perguntaFinal.pergunta;
  document.getElementById('botaoSim').textContent = CONFIG.perguntaFinal.botaoSim;
  document.getElementById('botaoNao').textContent = CONFIG.perguntaFinal.botaoNao;
  document.getElementById('mensagemFinal').textContent = CONFIG.perguntaFinal.mensagemAposSim;

  // Contadores
  inicializarContadores();

  // Linha do tempo
  inicializarTimeline();

  // Motivos
  inicializarMotivos();

  // Carta
  inicializarCarta();

  // Música
  inicializarMusica();
}

/* =====================================================================
   2. TELA DE CADEADO
   ===================================================================== */

function inicializarCadeado() {
  const senhaInput = document.getElementById('senhaInput');
  const botaoCadeado = document.getElementById('botaoCadeado');
  const mensagemErro = document.getElementById('mensagemErro');

  botaoCadeado.addEventListener('click', () => {
    const senhaDigitada = senhaInput.value;
    const senhaCorreta = CONFIG.cadeado.senha;

    if (senhaDigitada === senhaCorreta) {
      state.cadeadoAberto = true;
      mensagemErro.style.display = 'none';

      // Transição suave para próxima seção
      document.getElementById('cadeado').classList.add('hidden');
      document.getElementById('envelope').classList.remove('hidden');

      // Scroll suave
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Mostrar erro com shake
      mensagemErro.style.display = 'block';
      senhaInput.classList.add('shake-error');

      setTimeout(() => {
        senhaInput.classList.remove('shake-error');
      }, 500);

      senhaInput.value = '';
    }
  });

  // Enter também abre
  senhaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      botaoCadeado.click();
    }
  });
}

// Corrigir animação shake no CSS (adicionar classe)
const style = document.createElement('style');
style.textContent = `
  .input-senha.shake-error {
    animation: shake 0.5s ease;
  }
`;
document.head.appendChild(style);

/* =====================================================================
   3. ENVELOPE
   ===================================================================== */

function inicializarEnvelope() {
  const envelopeCard = document.querySelector('.envelope-card');
  const botaoMudo = document.getElementById('botaoMudo');
  const audioMusica = document.getElementById('audioMusica');

  // Configurar música
  if (CONFIG.musica.spotifyEmbed) {
    // Spotify embed — não precisa de configuração de áudio aqui
    // Será inserido manualmente no HTML se necessário
  } else {
    audioMusica.src = CONFIG.musica.arquivo;
  }

  // Abrir envelope ao clicar
  envelopeCard.addEventListener('click', () => {
    if (!state.envelopeAberto) {
      state.envelopeAberto = true;
      envelopeCard.classList.add('aberto');

      // Explosão de flores e corações
      dispararFlores();

      // Iniciar música
      if (!CONFIG.musica.spotifyEmbed) {
        audioMusica.play().catch((e) => {
          console.warn('Erro ao reproduzir áudio:', e);
        });
        state.musicaTocando = true;
        atualizarIconeMudo();
      }

      // Mostrar próximas seções após animação
      setTimeout(() => {
        document.getElementById('envelope').classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    }
  });

  // Botão de mudo
  botaoMudo.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.musicaTocando) {
      audioMusica.pause();
      state.musicaTocando = false;
      botaoMudo.classList.add('mudo');
    } else {
      audioMusica.play();
      state.musicaTocando = true;
      botaoMudo.classList.remove('mudo');
    }
    atualizarIconeMudo();
  });
}

function atualizarIconeMudo() {
  const botaoMudo = document.getElementById('botaoMudo');
  const iconeSom = botaoMudo.querySelector('.icone-som');
  iconeSom.textContent = state.musicaTocando ? '🔊' : '🔇';
}

/* =====================================================================
   4. CONTADORES
   ===================================================================== */

function inicializarContadores() {
  const container = document.querySelector('.contadores-grid');
  const template = document.getElementById('templateContador');

  CONFIG.contadores.forEach((contador) => {
    const clone = template.content.cloneNode(true);

    // Substitui as variáveis
    const labelElement = clone.querySelector('.contador-label');
    labelElement.innerHTML = contador.rotulo;

    container.appendChild(clone);
  });

  atualizarContadores();
  setInterval(atualizarContadores, 1000);
}

function atualizarContadores() {
  const contadores = document.querySelectorAll('.contador-card');

  contadores.forEach((card, index) => {
    const tempoDesde = new Date(CONFIG.contadores[index].desde);
    const agora = new Date();
    const diferenca = agora - tempoDesde;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    const diasElement = card.querySelector('.dias');
    const horasElement = card.querySelector('.horas');
    const minutosElement = card.querySelector('.minutos');
    const segundosElement = card.querySelector('.segundos');

    // Atualizar com animação de pulse quando mudam
    if (diasElement.textContent !== String(dias).padStart(2, '0')) {
      diasElement.classList.add('pulse');
      setTimeout(() => diasElement.classList.remove('pulse'), 600);
    }

    diasElement.textContent = String(dias).padStart(2, '0');
    horasElement.textContent = String(horas).padStart(2, '0');
    minutosElement.textContent = String(minutos).padStart(2, '0');
    segundosElement.textContent = String(segundos).padStart(2, '0');
  });
}

/* =====================================================================
   5. LINHA DO TEMPO
   ===================================================================== */

function inicializarTimeline() {
  const container = document.querySelector('.timeline-container');
  const template = document.getElementById('templateMomento');

  CONFIG.linhaDoTempo.forEach((momento, index) => {
    const clone = template.content.cloneNode(true);

    const fotoContainer = clone.querySelector('.momento-foto-container');
    const fotoImg = clone.querySelector('.momento-foto');
    const textoDiv = clone.querySelector('.momento-texto');
    const dataP = clone.querySelector('.momento-data');
    const tituloH3 = clone.querySelector('.momento-titulo');
    const descricaoP = clone.querySelector('.momento-descricao');
    const buqueIcon = clone.querySelector('.icone-buque');
    const article = clone.querySelector('.timeline-momento');

    dataP.textContent = momento.data;
    tituloH3.textContent = momento.titulo;
    descricaoP.textContent = momento.texto;

    if (momento.foto) {
      fotoImg.src = momento.foto;
      fotoImg.alt = momento.titulo;
      fotoImg.addEventListener('click', () => {
        abrirLightbox(momento.foto, momento.titulo);
      });
    } else {
      article.classList.add('sem-foto');
    }

    if (momento.buque) {
      buqueIcon.style.display = 'block';
    }

    if (momento.destaque) {
      article.classList.add('destaque');
    }

    container.appendChild(clone);
  });

  // IntersectionObserver para animação ao scroll
  const observador = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observador.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  document.querySelectorAll('.timeline-momento').forEach((momento) => {
    observador.observe(momento);
  });
}

function abrirLightbox(src, alt) {
  const lightbox = document.getElementById('lightbox');
  const img = lightbox.querySelector('.lightbox-imagem');

  img.src = src;
  img.alt = alt;
  lightbox.style.display = 'flex';

  // Fechar ao clicar no X ou fora da imagem
  lightbox.querySelector('.lightbox-fechar').addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });
}

/* =====================================================================
   6. MOTIVOS
   ===================================================================== */

function inicializarMotivos() {
  const container = document.querySelector('.motivos-container');
  const template = document.getElementById('templateMotivo');

  CONFIG.motivos.forEach((motivo, index) => {
    const clone = template.content.cloneNode(true);

    const numeroP = clone.querySelector('.motivo-numero');
    const textoP = clone.querySelector('.motivo-texto');
    const card = clone.querySelector('.motivo-card');

    numeroP.textContent = index + 1;
    textoP.textContent = motivo;

    // Flip ao clicar
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    container.appendChild(clone);
  });
}

/* =====================================================================
   7. CARTA FINAL
   ===================================================================== */

function inicializarCarta() {
  const container = document.querySelector('.carta-corpo');
  const template = document.getElementById('templateParagrafo');

  CONFIG.carta.paragrafos.forEach((paragrafo) => {
    const clone = template.content.cloneNode(true);
    const p = clone.querySelector('.paragrafo-carta');
    p.textContent = paragrafo;
    container.appendChild(clone);
  });

  const assinatura = document.querySelector('.carta-assinatura');
  assinatura.textContent = CONFIG.carta.assinatura;

  // Typewriter effect ao scroll na seção
  const cartaSecao = document.getElementById('carta');
  const observador = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !state.cartaAnimada) {
        state.cartaAnimada = true;
        animarCarta();
        observador.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observador.observe(cartaSecao);
}

function animarCarta() {
  const paragrafos = document.querySelectorAll('.paragrafo-carta');
  let delay = 0;

  paragrafos.forEach((p, index) => {
    const texto = p.textContent;
    p.textContent = '';
    p.style.opacity = '1';

    const caracteres = texto.split('');
    let indice = 0;

    const intervalo = setInterval(() => {
      if (indice < caracteres.length) {
        p.textContent += caracteres[indice];
        indice++;
      } else {
        clearInterval(intervalo);
      }
    }, 30);

    delay += texto.length * 30 + 500;
  });
}

/* =====================================================================
   8. PERGUNTA FINAL
   ===================================================================== */

function inicializarPergunta() {
  const botaoSim = document.getElementById('botaoSim');
  const botaoNao = document.getElementById('botaoNao');
  const mensagemFinal = document.getElementById('mensagemFinal');

  botaoSim.addEventListener('click', () => {
    mensagemFinal.style.display = 'block';

    // Confete de corações e pétalas
    dispararConfete();
  });

  // Botão "Não" foge
  botaoNao.addEventListener('mouseover', (e) => {
    fugirBotao(botaoNao);
  });

  botaoNao.addEventListener('touchstart', (e) => {
    fugirBotao(botaoNao);
  });

  botaoNao.addEventListener('focus', (e) => {
    fugirBotao(botaoNao);
  });
}

function fugirBotao(botao) {
  const container = botao.parentElement;
  const containerRect = container.getBoundingClientRect();
  const botaoRect = botao.getBoundingClientRect();

  // Gerar posição aleatória dentro do container
  const novaX = Math.random() * (containerRect.width - botaoRect.width);
  const novaY = Math.random() * (containerRect.height - botaoRect.height);

  botao.style.position = 'relative';
  botao.style.left = novaX + 'px';
  botao.style.top = novaY + 'px';
  botao.style.transition = 'all 0.3s ease';
}

function dispararFlores() {
  // Explosão de flores com emojis (criando elementos DOM)
  const emojis = ['🌹', '🌷', '💐', '💕', '❤️', '🌸', '🌺', '💖'];
  const container = document.body;

  function criarFlor() {
    const flor = document.createElement('div');
    flor.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    flor.style.position = 'fixed';
    flor.style.left = Math.random() * window.innerWidth + 'px';
    flor.style.top = '50%';
    flor.style.fontSize = (20 + Math.random() * 40) + 'px';
    flor.style.pointerEvents = 'none';
    flor.style.zIndex = '10000';
    flor.style.opacity = '1';
    flor.style.transition = 'all 2s ease-out';

    container.appendChild(flor);

    // Animar para cima e desaparecer
    setTimeout(() => {
      flor.style.transform = `translateY(-${400 + Math.random() * 200}px) rotate(${Math.random() * 360}deg)`;
      flor.style.opacity = '0';
    }, 10);

    // Remover do DOM depois de animar
    setTimeout(() => {
      flor.remove();
    }, 2000);
  }

  // Criar flores em explosão
  for (let i = 0; i < 50; i++) {
    setTimeout(() => criarFlor(), i * 30);
  }
}

function dispararConfete() {
  // Confete de corações para pergunta final
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.6 },
    emoji: ['💖', '🌷', '💕'],
    scalar: 1.5,
  });

  // Confete adicional com pétalas
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 100,
      origin: { y: 0.5 },
      emoji: ['🌹', '💐'],
      scalar: 2,
    });
  }, 200);
}

/* =====================================================================
   9. CORAÇÕEZINHOS AO TOCAR
   ===================================================================== */

function inicializarCoracoes() {
  const canvas = document.getElementById('canvasCoracoes');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let coracoes = [];

  function desenharCoracao(x, y, size, opacity) {
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#E8799B';
    ctx.font = `${size}px Arial`;
    ctx.fillText('❤️', x - size / 4, y + size / 4);
  }

  function animarCoracoes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    coracoes = coracoes.filter((coracao) => {
      coracao.y -= coracao.velocidade;
      coracao.opacity -= 0.02;

      if (coracao.opacity > 0) {
        desenharCoracao(coracao.x, coracao.y, coracao.size, coracao.opacity);
        return true;
      }
      return false;
    });

    if (coracoes.length > 0) {
      requestAnimationFrame(animarCoracoes);
    }
  }

  document.addEventListener('click', (e) => {
    coracoes.push({
      x: e.clientX,
      y: e.clientY,
      size: 30 + Math.random() * 20,
      velocidade: 1 + Math.random() * 2,
      opacity: 1,
    });

    if (coracoes.length === 1) {
      animarCoracoes();
    }
  });

  document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    coracoes.push({
      x: touch.clientX,
      y: touch.clientY,
      size: 30 + Math.random() * 20,
      velocidade: 1 + Math.random() * 2,
      opacity: 1,
    });

    if (coracoes.length === 1) {
      animarCoracoes();
    }
  });

  // Redimensionar canvas ao rotacionar
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* =====================================================================
   10. MÚSICA
   ===================================================================== */

function inicializarMusica() {
  const audioMusica = document.getElementById('audioMusica');

  if (CONFIG.musica.spotifyEmbed) {
    // Se usar Spotify, você pode inserir um embed iframe manual no HTML
    // ou usar a API web do Spotify para controle
  } else {
    // Arquivo local MP3 — já configurado no inicializarEnvelope
  }

  // Garantir que a música respeita as preferências de usuário
  audioMusica.addEventListener('play', () => {
    state.musicaTocando = true;
  });

  audioMusica.addEventListener('pause', () => {
    state.musicaTocando = false;
  });
}

/* =====================================================================
   11. SCROLL - Apenas para inicializar elementos ao scroll
   ===================================================================== */

function inicializarScrollObservers() {
  // Nada aqui por enquanto - seções são mostradas naturalmente ao scroll
}

/* =====================================================================
   INICIALIZAÇÃO GERAL
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎉 Página carregada!');

  // Ordem de inicialização importante
  inicializarTemplates();
  inicializarCadeado();
  inicializarEnvelope();
  inicializarPergunta();
  inicializarCoracoes();

  console.log('✨ Tudo pronto!');
});
