const html = document.querySelector('html')
const foco = document.querySelector('.app__card-button--foco')
const BtnComecar = document.getElementById('start-pause')
const TextButtonTimer = BtnComecar.querySelector('span')//Também é possível fazer desta forma: const ABC = document.querySelector("#ABC p")
const DescansoCurto = document.querySelector('.app__card-button--curto')
const DescansoLongo = document.querySelector('.app__card-button--longo')
const img = document.querySelector('.app__image')
const TextH1 = document.querySelector('.app__title')
const Music = document.getElementById('alternar-musica')

const TimerDiv = document.getElementById('timer')
const timerFoco = 1500 / 60
const timerDescanco = 300 / 60
const timerDescancoLongo = 900 / 60

TimerDiv.innerHTML = `${timerFoco}:00`

foco.onclick = function () {
    focoAlterar()
}
DescansoCurto.onclick = function () {
    DescCurto()
}
DescansoLongo.onclick = function () {
    DescLongo()
}
/*Funções de atualização de atributos visuais dos botões foco, descancoCurto, descancoLongo */
function focoAlterar() {
    html.setAttribute("data-contexto", "foco")
    img.setAttribute("src", "./imagens/foco.png")
    TextH1.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
    DescansoCurto.setAttribute("class", "app__card-button app__card-button--curto ")
    DescansoLongo.setAttribute("class", "app__card-button app__card-button--longo")
    foco.setAttribute("class", "app__card-button app__card-button--foco active")
    TimerDiv.innerHTML = `${timerFoco}:00`
}
function DescCurto() {
    html.setAttribute("data-contexto", "descanso-curto")
    img.setAttribute("src", "./imagens/descanso-curto.png")
    TextH1.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
    DescansoCurto.setAttribute("class", "app__card-button app__card-button--curto active")
    DescansoLongo.setAttribute("class", "app__card-button app__card-button--longo")
    foco.setAttribute("class", "app__card-button app__card-button--foco")
    TimerDiv.innerHTML = `${timerDescanco}:00`
}
function DescLongo() {
    html.setAttribute("data-contexto", "descanso-longo")
    img.setAttribute("src", "./imagens/descanso-longo.png")
    TextH1.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
    DescansoCurto.setAttribute("class", "app__card-button app__card-button--curto")
    DescansoLongo.setAttribute("class", "app__card-button app__card-button--longo active")
    foco.setAttribute("class", "app__card-button app__card-button--foco")
    TimerDiv.innerHTML = `${timerDescancoLongo}:00`
}
/*Musica do projeto. */
const Audios = { Play: new Audio("./sons/play.wav"), Pause: new Audio("./sons/pause.mp3"), Music: new Audio("./sons/luna-rise-part-one.mp3"), FimMusic: new Audio("./sons/beep.mp3") }
Audios.Music.loop = true
Music.onchange = function () {
    if (Audios.Music.paused) {
        Audios.Music.play()
    } else {
        Audios.Music.pause()
    }
}
/*Função do botão começar */
const imgsButtonGo = document.querySelector('.app__card-primary-butto-icon')
BtnComecar.onclick = function () {
    if (imgsButtonGo.getAttribute('src') == "./imagens/play_arrow.png") {
        BtnImgMudarC()
        Audios.Play.play()
    } else {
        BtnImgMudarP()
        Audios.Pause.play()
    }

}
function BtnImgMudarC() {
    imgsButtonGo.setAttribute('src', "./imagens/pause.png")
    TextButtonTimer.innerText = `Pausar`
    TimerRun()
}
function BtnImgMudarP() {
    imgsButtonGo.setAttribute('src', "./imagens/play_arrow.png")
    TextButtonTimer.innerText = `Começar`
    TimerStop()
}

/*Função do Timer */
let minutos = 0
let segundos = 0;
let timerFunction
function TimerRun() {
    const TempTimer = html.getAttribute("data-contexto")
    switch (TempTimer) {
        case 'foco':
            minutos = timerFoco
            segundos = 0
            break;
        case 'descanso-curto':
            minutos = timerDescanco
            segundos = 0
            break;
        case 'descanso-longo':
            minutos = timerDescancoLongo
            segundos = 0
            break;
        default:
            break;
    }
    timerFunction = setInterval(() => {
        if (TempTimer == html.getAttribute("data-contexto"))
            if (minutos <= 0 && segundos <= 0) {
                Audios.FimMusic.play()
                const focoAtivo = html.getAttribute('data-contexto') == 'foco'
                if (focoAtivo) {
                    const event = new CustomEvent('FocoFinalizado')
                    document.dispatchEvent(event)
                }
                clearInterval(timerFunction)
            } else {
                if (segundos == 0) {
                    segundos = 59;
                    TimerDiv.innerHTML = `${minutos--}`;
                }
                if (minutos == 0 && segundos >= 0) {
                    segundos--;
                }
                if (minutos == 0 && segundos < 10) {
                    TimerDiv.innerHTML = `${minutos}:0${segundos}`
                } else {
                    TimerDiv.innerHTML = `${minutos}:${segundos--}`
                    if (segundos < 10) {
                        TimerDiv.innerHTML = `${minutos}:0${segundos}`;
                    }
                }
            }
    }, 1000);
}
function TimerStop() {
    clearInterval(timerFunction)
}