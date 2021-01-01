import {allProjects, getActiveProject} from './factory_logic.js'


function showProjects(){

    let projectList = document.querySelector('.project-list');
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
    let taskContainer = document.querySelector('.tasks');
    getActiveProject().todoList.forEach((item,i)=>{
        let taskElement = document.importNode(templateTask.content,true);
        let checkbox = taskElement.querySelector('input');
        checkbox.id = i;
        checkbox.checked = item.completion;
        let label = taskElement.querySelector('label');
        label.htmlFor = i
        label.append(item.name);
        taskContainer.appendChild(taskElement);
    });
};

export {showProjects, showTasks};