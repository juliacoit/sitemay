// =====================================================================
// config.js — TODO o conteúdo pessoal do site fica aqui.
// Para mudar textos, fotos ou datas, edite só este arquivo.
// =====================================================================

const CONFIG = {
  // ---------------------------------------------------------------
  // Nomes e apelidos
  // ---------------------------------------------------------------
  nomes: {
    eu: "Julha",
    ela: "Mayumi",
  },
  apelidos: {
    eu: "Julha",
    ela: "May",
  },

  // ---------------------------------------------------------------
  // Contadores ao vivo (fuso de Brasília, -03:00)
  // ---------------------------------------------------------------
  contadores: [
    {
      rotulo: "Namorando oficialmente há",
      desde: "2026-09-12T14:30:00-03:00", // pedido, por volta das 14:30
    },
    {
      rotulo: "Juntas há",
      desde: "2026-06-12T00:00:00-03:00", // dia em que nos conhecemos (hora desconhecida)
    },
  ],

  // ---------------------------------------------------------------
  // Tela de cadeado
  // ---------------------------------------------------------------
  cadeado: {
    senha: "12092026", // data do pedido, DDMMAAAA
    dica: "O dia em que você me pediu em namoro 💍 (DDMMAAAA)",
    mensagemErro: "Hmm, quase! Pensa no dia dos lírios 🌷",
  },

  // ---------------------------------------------------------------
  // Música
  // Use UM dos dois: o arquivo MP3 local OU o link de embed do Spotify.
  // Se spotifyEmbed estiver preenchido, ele tem prioridade.
  // ---------------------------------------------------------------
  musica: {
    titulo: "Último Romance",
    artista: "Los Hermanos",
    arquivo: "assets/ultimo-romance.mp3",
    spotifyEmbed: "", // ex.: "https://open.spotify.com/embed/track/..."
  },

  // ---------------------------------------------------------------
  // Tema visual
  // Inspiração principal: lírios rosa (as flores do pedido).
  // ---------------------------------------------------------------
  tema: {
    inspiracao: "lírios rosa",
    cores: {
      lirio: "#F4A6C1",
      rosa: "#E8799B",
      vermelho: "#B5223B",
      vinho: "#6B1A2B",
      creme: "#FFF6F3",
      branco: "#FFFFFF",
    },
  },

  // ---------------------------------------------------------------
  // Linha do tempo
  // foto: caminho em assets/ ou null (card só com texto)
  // destaque: true -> card maior, com lírios ao redor
  // buque: true -> marcador especial de buquê
  // ---------------------------------------------------------------
  linhaDoTempo: [
    {
      data: "7 de junho",
      titulo: "Quando você soube que eu existia",
      texto: "O dia em que você ficou sabendo da minha existência e me achou bonita.",
      foto: "assets/00-ela-me-viu.jpg",
    },
    {
      data: "12 de junho",
      titulo: "A primeira vez que nos vimos",
      texto: "O dia em que tudo começou.",
      foto: "assets/01-primeiro-encontro.jpg",
    },
    {
      data: "17 de junho",
      titulo: "Ficando sério",
      texto: "Saímos e decidimos que era sério, e postamos nossa primeira foto juntas.",
      foto: "assets/02-primeira-foto.jpg",
    },
    {
      data: "20 de junho",
      titulo: "Jogo da Copa",
      texto: "Dia de jogo, e voltamos juntas do meu trabalho.",
      foto: "assets/03-copa.jpg",
    },
    {
      data: "4 a 6 de julho",
      titulo: "Três dias lá em casa",
      texto: "Você ficou três dias comigo lá em casa.",
      foto: "assets/04-tres-dias.jpg",
    },
    {
      data: "6 de julho",
      titulo: "Meu primeiro buquê",
      texto: "O primeiro buquê que eu ganhei, e foi de você.",
      foto: "assets/05-primeiro-buque.jpg",
      buque: true,
    },
    {
      data: "10 de julho",
      titulo: "Bolo e macarrão",
      texto: "O dia em que fizemos bolo e macarrão juntas.",
      foto: "assets/06-bolo.jpg",
    },
    {
      data: "11 de julho",
      titulo: "Samba com os meninos",
      texto: "No dia seguinte, fomos pro samba com os meninos.",
      foto: "assets/07-samba.jpg",
    },
    {
      data: "25 de julho",
      titulo: "Conhecendo meus pais",
      texto: "O dia em que você conheceu meus pais.",
      foto: "assets/08-meus-pais.jpg",
    },
    {
      data: "30 de julho",
      titulo: "Um buquê pra você",
      texto: "Te dei um buquê antes de viajar de volta pra minha cidade.",
      foto: "assets/09-buque-dela.jpg",
      buque: true,
    },
    {
      data: "2 de agosto",
      titulo: "Matando a saudade",
      texto: "Chamada de vídeo pra aguentar a distância.",
      foto: "assets/10-chamada.jpg",
    },
    {
      data: "9 de agosto",
      titulo: "Tacacá no Empório Paraense",
      texto: "Voltei de viagem e você me levou pra comer tacacá no Empório Paraense.",
      foto: "assets/11-tacaca.jpg",
    },
    {
      data: "16 e 17 de agosto",
      titulo: "Aniversário e piscina",
      texto: "Fomos no aniversário de um amigo nosso e, no dia seguinte, caímos na piscina.",
      foto: "assets/12-piscina.jpg",
    },
    {
      data: "29 de agosto",
      titulo: "Festa juntas",
      texto: "Uma noite de festa, nós duas.",
      foto: "assets/13-festa.jpg",
    },
    {
      data: "7 de setembro",
      titulo: "Folhas de manga",
      texto: "Você foi catar folhas de manga pra fazer um banho e limpar minhas energias.",
      foto: "assets/14-folhas.jpg",
    },
    {
      data: "12 de setembro",
      titulo: "O pedido 💍",
      texto: "Você planejou por meses: marcamos um piquenique e você apareceu de surpresa com lírios rosa, uma aliança e uma cartinha (mesmo com nossos amigos quase estragando tudo).",
      foto: "assets/15-pedido.jpg",
      destaque: true,
    },
    {
      data: "7 de outubro",
      titulo: "Surpresa no trabalho",
      texto: "Você me surpreendeu no trabalho com um buquê.",
      foto: "assets/16-buque-surpresa.jpg",
      buque: true,
    },
    {
      data: "11 de outubro",
      titulo: "De volta ao nosso bar",
      texto: "Voltamos ao bar onde decidimos que estávamos ficando sério.",
      foto: "assets/17-bar.jpg",
    },
  ],

  // ---------------------------------------------------------------
  // Motivos
  // ---------------------------------------------------------------
  motivos: [
    "É meu porto seguro nos dias cansativos.",
    "Amo dormir em você.",
    "Sempre faz questão de demonstrar o quanto me ama e não tem vergonha disso.",
    "Tem a melhor risada do mundo.",
    "Tem o tamanho que encaixa certinho no meu abraço.",
    "É a mulher mais linda do mundo (inclusive, todo mundo quer, mas é só minha!).",
    "Tem o mesmo senso de humor quebrado que o meu.",
    "Me defende e me protege sempre.",
    "Me vê de forma vulnerável e não muda o jeito como me enxerga.",
    "Quer me ver crescer e me apoia sempre.",
    "Tem uma linda visão de futuro e quer construir as mesmas coisas que eu.",
    "Ama bichinhos, cachorrinhos e gatinhos.",
    "Tem um coração lindo.",
    "Consegue me desestabilizar só com um olhar.",
    "Quer ter uma casinha bonitinha comigo.",
    "Tem uma energia magnética que me prende do início ao fim.",
    "Tem uma espiritualidade muito forte e descobre as coisas sozinha.",
  ],

  // ---------------------------------------------------------------
  // Carta final (efeito máquina de escrever)
  // ---------------------------------------------------------------
  carta: {
    paragrafos: [
      "Estamos oficialmente fazendo um mês juntas como namoradas e quatro meses juntas como casal.",
      "Me alegra saber que, em tão pouco tempo, construímos coisas tão sólidas, e parece que vivemos tanto. Mas, ao mesmo tempo, sei que isso é só o começo de algo muito grande que vem pela frente.",
      "Amo a forma como construímos essa relação e fortalecemos uma a outra.",
      "Comprei umas lembrancinhas pra você e fiz esse presentinho pra não deixar passar em branco. Que seja o primeiro de muitos meses que passaremos juntas.",
    ],
    assinatura: "Julha",
  },

  // ---------------------------------------------------------------
  // Pergunta final
  // (textos sugeridos — edite à vontade)
  // ---------------------------------------------------------------
  perguntaFinal: {
    pergunta: "Aceita mais um mês comigo, May?",
    botaoSim: "Sim! 💖",
    botaoNao: "Não",
    mensagemAposSim: "Mais um mês, e muitos outros. Te amo! 🌷",
  },
};