import {allProjects} from './factory_logic.js'


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

export {showProjects};