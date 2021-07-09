
const  deskTaskInput = document.querySelector('#description-task'),
       addTaskBtn = document.querySelector('#add-task-btn'),
       todosWrapper = document.querySelector('.todos-wrapper');

//local storage =============================
// const task = {
//     description: 'walk my dog',
//     completed: false
// }
let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
let todoItemElems = [];
function Task(description){  // task is going to LS
    this.description = description;
    this.completed =false; // default (means- has not been done yet)
}
//local storage =============================

// create template todo==================================
const createTemplate = (task, index) =>{
return  `
<div class="todo-item ${task.completed ? 'checked' : ''}">
    <div class="description">${task.description}</div>
    <div class="buttons">              
        <input  onclick='completeTask(${index})' type="checkbox" class="btn-complete" ${task.completed ? 'checked' : '' }>
        <button onclick='deleteTask(${index})' class="btn-delete">Delete</button>
    </div>
</div>
        `
}
// filtered done-tasks will go down================
const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(i => i.completed == false);
    const completedTasks = tasks.length && tasks.filter(i => i.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}
// filtered done-tasks will go down================

const fillHtmlList = () => { 
    todosWrapper.innerHTML = '';
    if(tasks.length >0){
        filterTasks();
        tasks.forEach((item,index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item')
    }
}
fillHtmlList(); // call it first time
// create template todo==================================

// sending it to LS ==========================
const updateLocalStorage = ()=>{ // we need it in several places 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}
// sending it to LS ==========================


const completeTask = index => {
 tasks[index].completed = !tasks[index].completed;
 if(tasks[index].completed){
    todoItemElems[index].classList.add('checked');
 }else{
    todoItemElems[index].classList.remove('checked');
 }
 updateLocalStorage();
 fillHtmlList();
}

const deleteTask = index => {
    todoItemElems[index].classList.add('deletion')
    setTimeout(()=>{
        tasks.splice(index, 1);
        updateLocalStorage();
        fillHtmlList();
    },1000)
}


addTaskBtn.addEventListener('click', ()=>{ // btn
     tasks.push(new Task(deskTaskInput.value));
     updateLocalStorage();
     fillHtmlList(); // call it second time
     deskTaskInput.value = '';
})
//done105mi 

// localStorage,JSON,  DOM, spread, func constructor, this.