window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpanBox = document.querySelector('#chute')
const IdMenorValor = document.getElementById('menor-valor')
const IdMaiorValor = document.getElementById('maior-valor')
const MenorValor = 1
const MaiorValor = 100
const numberSecret = parseInt(Math.random(0, MaiorValor) * MaiorValor + 1)
console.log(numberSecret)
const spanMaiorMenor = document.getElementById("Menor/Maior")
IdMaiorValor.innerHTML = MaiorValor
IdMenorValor.innerHTML = MenorValor

const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br'
recognition.start()

recognition.addEventListener('result', onSpeak)

function onSpeak(e) {
    const ValorUser = e.results[0][0].transcript
    const ValorUserNumb = parseInt(e.results[0][0].transcript)
    console.log(ValorUser)
    SpanBox.innerHTML = `
    <div>Você disse:</div>
    <span class="box">${ValorUser}</span>
    <div>O número secreto é <span id="Menor/Maior"></span><i class="fa-solid fa-arrow-right"></i></div>
    `
    if (ValorUser == "Game Over.") {
        document.body.classList.add('GAMEOVER-BACKGROUND')
        document.body.innerHTML = `<h1>Game-Over</h1><div><button onclick="JogarNvmt()">Tentar Novamente</button></div>`
    }
    if (ValorUserNumb !== Number) {
        SpanBox.innerHTML = `Insira um valor válido`
    }
    if (ValorUserNumb > MaiorValor) {
        SpanBox.innerHTML = `Insira um número entre ${MenorValor} e ${MaiorValor}`
    } else {
        if (ValorUserNumb == numberSecret) {
            console.log("Acertou!")
            document.body.innerHTML = `
                <h2>Você acertou!</h2>
                <h3>O número secreto era ${numberSecret}</h3>
                <div><button onclick="JogarNvmt()">Tentar Novamente</button></div>
                `
        } else if (numberSecret < ValorUserNumb) {
            console.log("O número é menor")
            SpanBox.innerHTML = `
            <div>Você disse:</div>
            <span class="box">${ValorUserNumb}</span>
            <div>O número secreto é menor <i class="fa-solid fa-arrow-down"></i></div>`
        } else if (numberSecret > ValorUserNumb) {
            console.log("O número é maior")
            SpanBox.innerHTML = `
            <div>Você disse:</div>
            <span class="box">${ValorUserNumb}</span>
            <div>O número secreto é maior <i class="fa-solid fa-arrow-up"></i></div>`
        }
    }
}
function JogarNvmt() {
    location.reload()
}
recognition.addEventListener('end', () => recognition.start())