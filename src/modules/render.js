import {allProjects, getActiveProject} from './factory_logic.js'

const taskContainer = document.querySelector('.tasks');
const projectList = document.querySelector('.project-list');

taskContainer.addEventListener('click',(e)=>{
    if(e.target.tagName.toLowerCase() === 'input'){
       getActiveProject().todoList[Number(e.target.dataset.value)].completion = e.target.checked;
       console.log(e);
    }
    showTaskCount();
});


function showProjects(){

    allProjects.forEach((project, i)=>{
        let list = document.createElement('li');
        list.dataset.value = i;
        list.classList.add(`project${i}`);
        list.textContent = project.name;
        projectList.append(list);
    });

};

function showTasks(){
    let templateTask = document.getElementById('task');
    let listTitle = document.querySelector('.list-title');
    let currentProject = getActiveProject();
    currentProject.todoList.forEach((item,i)=>{
        let taskElement = document.importNode(templateTask.content,true);
        let checkbox = taskElement.querySelector('input');
        checkbox.id = i;
        checkbox.checked = item.completion;
        checkbox.dataset.value = i;
        let label = taskElement.querySelector('label');
        label.htmlFor = i
        label.append(item.name);
        taskContainer.appendChild(taskElement);
    });
    listTitle.textContent = `${currentProject.name} tasks`;
    showTaskCount();

};

function showTaskCount(){
    let taskCount = document.querySelector('.task-count');
    let count = getActiveProject().todoList.filter(item => item.completion!=true).length;
    taskCount.textContent = `${count} tasks pending`;
}

export {showProjects, showTasks};