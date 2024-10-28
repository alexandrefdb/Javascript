const AddTaskButton = document.querySelector('.app__button--add-task')
const Form = document.querySelector('.app__form-add-task')
const btnSave = document.querySelector('.app__form-footer__button app__form-footer__button--confirm')
const btnEdit = document.querySelector('.app_button-edit')
const btnCancel = document.querySelector('.app__form-footer__button--cancel')
const TextArea = document.querySelector('.app__form-textarea')
const Ul = document.querySelector('.app__section-task-list')
const ParagrafoDescricaoTask = document.querySelector('.app__section-active-task-description')
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')
let Tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelect = null
let LitarefaSelect = null

function atualizarTask() {
    localStorage.setItem('tarefas', JSON.stringify(Tarefas))
}

function addTaskElement(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const Paragrafo = document.createElement('p')
    Paragrafo.textContent = tarefa.descricao
    Paragrafo.setAttribute('class', 'app__section-task-list-item-description')

    const button = document.createElement('button')
    button.setAttribute('class', 'app_button-edit')
    const imgButton = document.createElement('img')

    button.onclick = () => {
        const EditnameTask = prompt("Qual o nome da tarefa?")
        if (EditnameTask) {
            Paragrafo.textContent = EditnameTask
            tarefa.descricao = EditnameTask
            atualizarTask()
        } else {
            alert("Insira um nome válido!")
        }

    }

    imgButton.setAttribute('src', './imagens/edit.png')
    button.append(imgButton)

    li.append(svg)
    li.append(Paragrafo)
    li.append(button)

    if (tarefa.completa == true) {
        li.classList.add('app__section-task-list-item-complete')
        button.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            document.querySelectorAll('.app__section-task-list-item-active').forEach(element => {
                element.classList.remove('app__section-task-list-item-active')

            })
            if (tarefaSelect == tarefa) {
                ParagrafoDescricaoTask.textContent = ''
                tarefaSelect = null
                LitarefaSelect = null
                return
            }
            tarefaSelect = tarefa
            LitarefaSelect = li
            ParagrafoDescricaoTask.textContent = tarefa.descricao

            li.classList.add('app__section-task-list-item-active')
        }
    }
    return li
}

btnCancel.addEventListener('click', () => {
    TextArea.value = ''
    Form.classList.toggle("hidden")
})
AddTaskButton.addEventListener('click', () => {
    Form.classList.toggle("hidden")
})

Form.addEventListener('submit', (event) => {
    event.preventDefault()
    let TarefaText = TextArea.value
    console.log(TarefaText)
    const tarefa = {
        descricao: TarefaText
    }
    Tarefas.push(tarefa)
    const ElementoTarefa = addTaskElement(tarefa)
    Ul.append(ElementoTarefa)
    atualizarTask()
    TextArea.value = ''
    Form.classList.add('hidden')
})
Tarefas.forEach(tarefa => {
    const ElementoTarefa = addTaskElement(tarefa)
    Ul.append(ElementoTarefa)
});

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelect && LitarefaSelect) {
        LitarefaSelect.classList.remove('app__section-task-list-item-active')
        LitarefaSelect.classList.add('app__section-task-list-item-complete')
        LitarefaSelect.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelect.completa = true
        atualizarTask()
    }
})
btnRemoverConcluidas.onclick = () => {
    const seletor = document.querySelectorAll('.app__section-task-list-item-complete').forEach(e => {
        e.remove()
    })
    Tarefas = Tarefas.filter(e => !e.completa)
    atualizarTask()
}
btnRemoverTodas.onclick = () => {
    document.querySelectorAll('.app__section-task-list-item').forEach(e => {
        e.remove()
    })
    Tarefas = Tarefas.splice(0, Tarefas.lenght)
    atualizarTask()
}