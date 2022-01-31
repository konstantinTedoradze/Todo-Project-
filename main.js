//Get Dom Elements
let textInfoElement = document.getElementById("text");
let dateElement = document.getElementById("date");
let timeElement = document.getElementById("time");

let cardsDiv = document.getElementById("cards-div");

//Get Tasks  from Local Storage 
let savedTasks = JSON.parse(localStorage.getItem("tasks"));

//If Tasks Exist in Local Storage when the Browser Will load You'll See All Of Tasks
if(savedTasks) {
    for(let i = 0; i < savedTasks.length; i++) {
        createTask(savedTasks[i]);
    }
}


//Main Function 
function save() {

    try {
        isValidFields();
        saveInfoLocalStorage();
        resetInputs();
    } 
    catch(e) {
        let errorDiv = document.getElementById("errorDiv");
        errorDiv.innerHTML = e.message;
    }

}

//Create Task Section

function createTask(task){

    let textValue = task.text;
    let dateValue = task.date;
    let timeValue = task.time;

    
    let card = document.createElement("div");
    card.setAttribute("class","card");
    cardsDiv.append(card);

    let imageInfo = document.createElement("img");
    imageInfo.setAttribute("src","images/notebg1.png");
    imageInfo.setAttribute("class","imageInfo");
    card.append(imageInfo);

    /*Create Delete Button */
    let deleteButton = document.createElement("i");
    deleteButton.setAttribute("class","fas fa-times-circle deleteButton");
    card.append(deleteButton);


    let cardInfo = document.createElement("div");
    cardInfo.setAttribute("class","textInfo");
    cardInfo.append(textValue);
    card.append(cardInfo);
    
    let dateInfoElement = document.createElement("div");
    dateInfoElement.setAttribute("class","dateInfo");
    dateInfoElement.append(dateValue);
    card.append(dateInfoElement);

    let timeInfoElement = document.createElement("div");
    timeInfoElement.setAttribute("class","timeInfo");
    timeInfoElement.append(timeValue);
    card.append(timeInfoElement);       

}

//Save Tasks In Local Storage

function saveInfoLocalStorage(){   
  
    //Create Object of Task's 
    let task = {
        text: textInfoElement.value,
        date: dateElement.value,
        time: timeElement.value
    }

    let getTasks = JSON.parse(localStorage.getItem("tasks"));

    let tasks;

    // if strTasks is null/undefined
    if (!getTasks) {

        tasks = [];
        createTask(task);
        tasks.push(task);

    }
    else {
        
        tasks = getTasks;
     
        // check if in strTask includes the task which you are going to add 
        let found = false;
   
        for (let j = 0; j < getTasks.length; j++) {
           
            if (task.text === getTasks[j].text && task.date === getTasks[j].date
                 && task.time === getTasks[j].time) {
                found = true;
            }

        }

        if (found) {
            alert("This task already exists!");
        } 
        else {
            tasks.push(task);
            createTask(task);
        }
       
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


//Section Of Delete Tasks

cardsDiv.addEventListener('click',deleteCheck);

function deleteCheck(e) {

    let item = e.target;
    if(item.classList[2] === "deleteButton") {
        let task = item.parentElement;
        removeLocalStorage(task);
        task.remove();
    }
}


function removeLocalStorage(task) {

    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    

     //Create new object get Information from LocalStorage 

     let textElement = task.getElementsByClassName("textInfo");
     let dateElement = task.getElementsByClassName("dateInfo");
     let timeElement = task.getElementsByClassName("timeInfo");
    
     let textValue = textElement[0].textContent;
     let dateValue = dateElement[0].textContent;
     let timeValue = timeElement[0].textContent;
    
 
     let objectToDelete = {
         
         text: textValue,
         date: dateValue,
         time: timeValue
     }
 
     //Find Delete Object 

     let foundIndex = tasks.findIndex(x => x.text === objectToDelete.text && x.date === objectToDelete.date &&
         x.time === objectToDelete.time);
 
     tasks.splice(foundIndex, 1);
    
    //if tasks are empty after splice remove (key = "tasks") from local Storage else reset it again

    if(tasks.length == 0) {
        localStorage.removeItem("tasks");
    } else {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
 
}


function isValidFields() {
    
    clearAllFields();
    let message = "";

    if(isEmptyFields(textInfoElement.value)) {
        showError("text");
        message += "please fill the field of text <br>";
    } 

    if(isEmptyFields(dateElement.value)) {
        showError("date");
        message += "please fill the field of date <br>";
    } 

    if(isEmptyFields(timeElement.value)) {
        showError("time");
        message += "please fill the field of time <br>";
    }

    if(message != "") {
        throw new Error(message);
    }
}

function resetInputs(){
    clearInput("text");
    clearInput("date");
    clearInput("time");
}

function clearInput(id) {
    let node = document.getElementById(id);
    node.value = "";
}

function clearAllFields() {
    clearError("text");
    clearError("date");
    clearError("time");
    clearErrorDiv();
}

function clearErrorDiv() {
    let node = document.getElementById("errorDiv");
    node.innerHTML = "";
}

function clearError(id){

    let node = document.getElementById(id);
    node.style.border = "";
}

function showError(id){

    let node = document.getElementById(id);
    node.style.border = "2px solid red";
}

function isEmptyFields(text) {

    if(text == null) {
        return true;
    }
    if(text == "") {
        return true;
    }
    return false;
}

