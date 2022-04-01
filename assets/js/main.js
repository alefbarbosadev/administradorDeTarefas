const inputTasks = document.querySelector('.input-tarefa');
const btTask = document.querySelector('.bt-tarefa');
const task = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTasks.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTasks.value) return;
        criaTarefa(inputTasks.value);
    }
});

function limpaInput() {
    inputTasks.value = ' ';
    inputTasks.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar tarefa';
    li.appendChild(botaoApagar);
    botaoApagar.setAttribute('class', 'apagar');

}

function criaTarefa(textInput) {
    const li = criaLi();
    li.innerHTML = textInput;
    task.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btTask.addEventListener('click', function () {
    if (!inputTasks.value) return;
    criaTarefa(inputTasks.value);
})

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = task.querySelectorAll('li');
    const listTask = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim;
        listTask.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listTask);
    localStorage.setItem('task', tarefasJSON);
}

function adicionaTaskSave() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTaskSave();