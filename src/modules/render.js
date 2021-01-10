import {allProjects, setActiveProject, getActiveProject,clearActiveProjects, deleteActiveProject, clearCompletedTasks, addProject, createTask} from './factory_logic.js'
import {format, formatDistanceToNow, subDays} from 'date-fns';

const taskBody = document.querySelector('.todo-list');
const taskContainer = document.querySelector('.tasks');
const projectList = document.querySelector('.project-list');
const delete_btn = taskBody.querySelector('.delete-items');
const projectForm = document.querySelector('.new-list-form');
const taskForm = document.querySelector('.new-task-form');
console.log(delete_btn);

taskContainer.addEventListener('click',(e)=>{
    if(e.target.tagName.toLowerCase() === 'input'){
       getActiveProject().todoList[Number(e.target.dataset.value)].completion = e.target.checked;
       console.log(e);
    }
    showTaskCount();
});

projectList.addEventListener('click',(e)=>{
    if(e.target.tagName.toLowerCase() == 'li'){
        setActiveProject(e.target.dataset.value);
        console.log(e);
        console.log(taskBody);
    }
    showTasks();
    showTaskCount();
});

delete_btn.addEventListener('click',(e)=>{
    if(e.target.id == 'clear-tasks'){
        clearTaskBody();
        clearCompletedTasks();
        showTasks();
    }
    else if(e.target.id == 'clear-list'){
        deleteActiveProject();
        clearProjectsDOM();
        clearTaskBody();
        showProjects();
    }
});

taskForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const taskName = taskForm.querySelector('input:nth-child(1)').value;
    let taskDate = taskForm.querySelector('input:nth-child(2)').value;
    taskDate = taskDate.split('-')
    console.log(new Date());
    console.log(e);
    console.log(taskDate);
    if(taskName != ''){
    clearTaskBody();
    createTask(taskName, 'abc', taskDate);
    showTasks();
    }
});

projectForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const projectName = projectForm.firstElementChild.value;
    console.log(e);
    if(projectName != ''){
    clearProjectsDOM();
    clearTaskBody();
    addProject(projectName, 'abc');
    showProjects();
    }
});

function clearProjectsDOM(){
    while(projectList.firstChild){
        projectList.removeChild(projectList.firstChild);
    }
};


function showProjects(){

    allProjects.forEach((project, i)=>{
        let list = document.createElement('li');
        list.dataset.value = i;
        list.classList.add(`project${i}`);
        list.textContent = project.name;
        projectList.append(list);
    });

};

function clearTaskBody(){
    while(taskContainer.firstChild){
        taskContainer.removeChild(taskContainer.firstChild);
    }
    taskBody.style.display = 'none';
}

function showTasks(){
    let templateTask = document.getElementById('task');
    let listTitle = document.querySelector('.list-title');
    let currentProject = getActiveProject();
    clearTaskBody();
    if(currentProject){
    currentProject.todoList.forEach((item,i)=>{
        let taskElement = document.importNode(templateTask.content,true);
        let checkbox = taskElement.querySelector('input');
        checkbox.id = i;
        checkbox.checked = item.completion;
        checkbox.dataset.value = i;
        let label = taskElement.querySelector('label');
        let dueLabel = formatDistanceToNow(new Date(item.dueDate[0], item.dueDate[1]-1, item.dueDate[2]), {addSuffix: true});
        label.htmlFor = i
        label.append(`${item.name} | Due: ${dueLabel}`);
        taskContainer.appendChild(taskElement);
    });
    
    listTitle.textContent = `${currentProject.name} tasks`;
    showTaskCount();
    taskBody.style.display = 'block';
    }

};

function showTaskCount(){
    let taskCount = document.querySelector('.task-count');
    let count = getActiveProject().todoList.filter(item => item.completion!=true).length;
    taskCount.textContent = `${count} tasks pending`;
}

export {showProjects, showTasks};