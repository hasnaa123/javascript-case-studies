let task = [];
let ID = 0;

//add a new task
function addTask(title, description) {
    if (!title || !description) {
        console.log("title and description are required !!");
        return;
    }
    task.push({
        ID: ID++,
        title: title,
        description: description,
        status: "Incomplete",
    })
}

//remove a task based on title
function removeTask(title) {
    let removedCount = 0;
    for (let i = 0; i < task.length; i++) {
        if (task[i].title.toUpperCase() === title.toUpperCase()) {
            task.splice(i, 1);
            removedCount++;
            break;
        }
    }
    if (removedCount === 0) {
        console.log("please enter a valid title")
    }
}

//Mark a task as completed
function toCompleted(title) {
    for (let i = 0; i < task.length; i++) {
        if (task[i].title == title) {
            if (task[i].status === "Completed") {
                console.log("the task is already completed")
            }
            else {
                task[i].status = "Completed";
                console.log("Task marked as completed.");
            }
            return;
        }

    }
}

//Sort tasks alphabetically
function sortalphabetically() {
    let sortedArray = [...task];
    sortedArray.sort(
        (a, b) => {
            const titleA = a.title.toUpperCase(); // ignore upper and lowercase
            const titleB = b.title.toUpperCase(); // ignore upper and lowercase
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }

            // names must be equal
            return 0;
        }
    )

    return (sortedArray);
}

//sort tasks by status
function sortbystatus(status) {

    let sortedArray = [...task];
    sortedArray.sort((a, b) => a.status === status ? -1 : 1);

    return (sortedArray);
}

//filter tasks by status
function filterbystatus(status) {
    let filtered = task.filter((el) =>
        el.status == status);
    return (filtered);
}


function gettask(arr) {
    console.log("-------- TO DO LIST -----------");
    for (let i = 0; i < arr.length; i++) {
        console.log("                   ");
        console.log(`${arr[i].title} || ${arr[i].description} -----> ${arr[i].status}`)
        console.log("                   ");
    }
}


//Test Case
addTask("Wake up early", "Wake up at 8:00 am");
addTask("Go to gym", "go to gym at 9:00 am");
addTask("Reading", "Read A part of my book <little women>");
addTask("Shopping", "Go to supermarket at 10 pm");

//removing and changing status
removeTask("Go to gym");
toCompleted("Shopping");
gettask(task);

//task alredy completed
toCompleted("Shopping");

//remove non-exist task
removeTask("GO ON A WALK");

//sorting tasks
gettask(sortalphabetically());
gettask(sortbystatus("Completed"));
gettask(sortbystatus("Incomplete"));

//filter tasks
gettask(filterbystatus("Completed"));
gettask(filterbystatus("Incomplete"));
