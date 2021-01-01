import {addProject,getActiveProject,createTask,displayProjects,displayTasks} from './modules/factory_logic.js'
import {showProjects,showTasks} from './modules/render'

addProject('new Project1', 'Test run1');
createTask('new task1', 'Test Task1', '31/12/2020');
createTask('new task2', 'Test Task2', '31/12/2020');

addProject('new Project2', 'Test run2');
createTask('Project2 task1', 'Project2 Test Task1','31/12/2020');
createTask('Project2 task2', 'Project2 Test Task2', '31/12/2020');

displayProjects();
showProjects();
showTasks();


