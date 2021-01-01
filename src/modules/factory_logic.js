
    let allProjects = [];

    const addProject = (name, description) =>{
        clearActiveProjects();
        allProjects.push({
            name,
            description,
            todoList:[],
            active:true,
        });
    };

    const clearActiveProjects = ()=>{
        allProjects.forEach(project => project.active = false);
    };

    const getActiveProject = ()=>{
        let activeArray =  allProjects.filter(project => project.active == true);
        return activeArray[0];
    };

    const createTask = function(name, description, dueDate){
        getActiveProject().todoList.push({
            name,
            description,
            dueDate,
            completion:false,
        });
    };

    const displayProjects = ()=>{
        allProjects.forEach(project => console.log(project));
    }

    const displayTasks = ()=>{
        getActiveProject().todoList.forEach(item=>console.log(item));
    }

    export {allProjects, addProject,getActiveProject,createTask,displayProjects,displayTasks};

