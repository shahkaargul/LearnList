const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
    updateTaskCounter();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateTaskCounter();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

function filterTasks(filterType) {
    const tasks = document.querySelectorAll('#list-container li');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    tasks.forEach(task => {
        switch(filterType) {
            case 'all':
                task.style.display = 'block';
                break;
            case 'active':
                task.style.display = task.classList.contains('checked') ? 'none' : 'block';
                break;
            case 'completed':
                task.style.display = task.classList.contains('checked') ? 'block' : 'none';
                break;
        }
    });
}

function clearCompleted() {
    const completedTasks = document.querySelectorAll('#list-container li.checked');
    completedTasks.forEach(task => task.remove());
    updateTaskCounter();
}

function updateTaskCounter() {
    const remainingTasks = document.querySelectorAll('#list-container li:not(.checked)').length;
    document.getElementById('task-counter').textContent = 
        `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
}

showTask();

