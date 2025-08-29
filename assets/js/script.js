const btnAdd = document.getElementById('addTask');

let list = [];

let containerMessage = document.getElementById('msg');
let message = document.createElement('p');
let sectionAdd = document.querySelector('section.add');

let time = new Date();
let year = time.getFullYear();

btnAdd.addEventListener('click', () => {
    let taskName = document.getElementById('task').value;
    let spanTaskName = document.createElement('span');
    spanTaskName.textContent = taskName;

    let taskList = document.getElementById('task-list');
    let liTaskList = document.createElement('li');
    liTaskList.classList.add('li-container');

    if (list.length > -1) {
        sectionAdd.style.marginTop = '2rem';
    } else {
        sectionAdd.style.marginTop = '0rem';
    }

    let hour = time.getHours();
    let minutes = time.getMinutes().toString().padStart(2, "0");
    let day = time.getDate();
    let month = (time.getMonth() + 1).toString().padStart(2, "0");
    let taskTime = document.createElement('p');
    taskTime.textContent = `Tarefa adicionada às ${hour}h${minutes} em ${day}/${month}/${year}`;

    

    document.getElementById('task').value = '';
    message.textContent = '';

    if (taskName.trim() === '') {
        message.textContent = 'Por favor, preencha o campo "Tarefa".';
        containerMessage.appendChild(message);
        return;
    }

    if (list.includes(taskName)) {
        message.textContent = `Você já inseriu "${taskName}" nas suas tarefas!`;
        containerMessage.appendChild(message);
        return;
    }

    let containerButtons = document.createElement('div');
    containerButtons.classList.add('buttons');

    const btnDone = document.createElement('button');
    btnDone.type = 'button';
    btnDone.id = 'done';

    let iconDone = document.createElement('i');
    iconDone.classList.add('fa-regular', 'fa-circle-check', 'icon');

    btnDone.appendChild(iconDone);
    btnDone.append(" Concluir");

    const btnEdit = document.createElement('button');
    btnEdit.type = 'button';
    btnEdit.id = 'edit';

    let iconEdit = document.createElement('i');
    iconEdit.classList.add('fa-regular', 'fa-pen-to-square', 'icon');


    btnEdit.appendChild(iconEdit);
    btnEdit.append(" Editar");

    const btnRemove = document.createElement('button');
    btnRemove.type = 'button';
    btnRemove.id = 'remove';

    let iconRemove = document.createElement('i');
    iconRemove.classList.add("fa-regular", "fa-trash-can", "icon");


    btnRemove.appendChild(iconRemove);
    btnRemove.append(" Excluir")

    btnDone.addEventListener('click', () => {
        taskTime.textContent = '';
        spanTaskName.style.textDecoration = 'line-through';
        spanTaskName.style.opacity = '0.5';

        time = new Date();
        hour = time.getHours();
        minutes = time.getMinutes().toString().padStart(2, "0");
        day = time.getDate();
        month = (time.getMonth() + 1).toString().padStart(2, "0");
        year = time.getFullYear();

        taskTime.textContent = `Tarefa concluída às ${hour}h${minutes} em ${day}/${month}/${year}`;
        liTaskList.appendChild(taskTime);

        btnDone.remove();
        btnEdit.remove();
    });

    btnEdit.addEventListener('click', () => {
        let renameTask = document.createElement('input');
        renameTask.type = 'text';
        renameTask.id = 'renameInput';

        let btnSave = document.createElement('button');
        btnSave.type = 'button';
        btnSave.textContent = 'Salvar';

        spanTaskName.replaceWith(renameTask);

        btnDone.remove();
        btnRemove.remove();

        taskTime.textContent = '';

        btnSave.onclick = () => {
            let renameText = document.getElementById('renameInput').value;
            spanTaskName.textContent = renameText;

            list.shift()
            list.push(renameText);
            renameTask.replaceWith(spanTaskName);
            btnSave.replaceWith(btnEdit);

            hour = time.getHours();
            minutes = time.getMinutes();

            taskTime.textContent = `Tarefa alterada às ${hour}h${minutes} em ${day}/${month}/${year}`;

            liTaskList.appendChild(taskTime);
            containerButtons.append(btnDone, btnEdit, btnRemove);
        }

        btnEdit.replaceWith(btnSave);
    });

    btnRemove.addEventListener('click', () => {
        liTaskList.remove();
        list.pop();
        message.textContent = '';
    });

    containerButtons.appendChild(btnDone);
    containerButtons.appendChild(btnEdit);
    containerButtons.appendChild(btnRemove);
    
    list.push(taskName);
    liTaskList.appendChild(spanTaskName);
    liTaskList.appendChild(containerButtons);
    liTaskList.appendChild(taskTime);
    taskList.appendChild(liTaskList);
})