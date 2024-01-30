const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');
const audioPlay = new Audio ("./sons/play.wav");
const audioPausa = new Audio ("./sons/pause.mp3");
const audioTempoFinalizado = new Audio ("./sons/beep.mp3");
const IniciarOuPausarBt = document.querySelector('#start-pause span');
const playPauseIcon = document.getElementById('play-pause-icon');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musicas = [
    "./sons/Face My Fears.mp3",
    "./sons/Dont think Twice.mp3",
    "./sons/Hell or High Water.mp3",
    "./sons/Legacy.mp3",
    "./sons/Glassy Sky.mp3",
    "./sons/Passion.mp3",
    "./sons/Simple and Clean.mp3",
    "./sons/White Silence.mp3"
  ];
  
  let tempoDecorridoEmSegundos = 1500;
  let intervaloId = null;

  // parte do código destinada a reprodução das músicas
  let indiceMusicaAtual = 0;
const musica = new Audio(musicas[indiceMusicaAtual]);
musica.autoplay = false;
musica.addEventListener('ended', () => {
    
    indiceMusicaAtual = (indiceMusicaAtual + 1) % musicas.length;
    musica.src = musicas[indiceMusicaAtual];
    musica.play();
});

function reproduzirMusicaAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * musicas.length);
    indiceMusicaAtual = indiceAleatorio;
    musica.src = musicas[indiceMusicaAtual]; 
    musica.play(); 
}

musicaFocoInput.addEventListener('change', () => {
    if (musicaFocoInput.checked) {
        if (musica.paused) {
            reproduzirMusicaAleatoria(); 
        }
    } else {
        musica.pause();
    }
});



  
  

function alterarContexto(contexto) {
    mostrarTempo()

    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade.<br>
            <strong class="app__title-strong">Foque-se nos estudos.</strong>`

            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>`

            break;
        
        case "descanso-longo":
            titulo.innerHTML = `Hora de relaxar a mente.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            
            default:
                break;
    }
}

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')

})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        const focoAtivo = html.getAttribute ('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent ('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        audioPausa.play()
        zerar()
        playPauseIcon.src = "./imagens/play_arrow.png";
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    IniciarOuPausarBt.textContent = "Pausar"
    playPauseIcon.src = "./imagens/pause.png";
    
}

function zerar() {
    clearInterval(intervaloId)
    IniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
    playPauseIcon.src = "./imagens/play_arrow.png";
}


function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()