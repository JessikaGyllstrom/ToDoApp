const ul = document.querySelector("list");
const completed = document.querySelector("completed");
document.getElementById("submitBtn").addEventListener("click", checkInput);
localStorage.setItem("index", "150");

async function getTodos() {
    const response = await fetch('https://dummyjson.com/todos?limit=5');
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const list = await response.json();
    return list;
}
getTodos().then((list) => {
    for (let i = 0; i < 10; i++) {
        console.log(list.todos[i].id);
        console.log(list.todos[i].todo);
        let li = document.createElement('li');
        li.innerHTML = `<div id="${list.todos[i].id}" class="row" value="value"><div class="number">${list.todos[i].id}</div><div id="${list.todos[i].todo}" class="todo">${list.todos[i].todo}</div><input type="checkbox" id="check" name="check"><button name="deleteBtn">Delete</button></div>`;
        document.getElementById('list').appendChild(li);
    }
}).catch(error => {
    error.message; 
});
document.getElementById('list').addEventListener('click', handleClick);
document.getElementById('completed').addEventListener('click', handleClick);

function handleClick(e) {
    console.log("handle click");
    let item = e.target.parentNode;
    let id = e.target.parentNode.id;
    if (e.target.name == 'deleteBtn') {
        deleteItem(id, item);
    }
    if (e.target.name == 'check') {
        let todo = e.target.previousSibling.id;
        e.target.value;
        completeItem(id, todo);
        item.remove();
    }
}
function deleteItem(id, item) {
    item.remove();
    alert("Item deleted!");
}
function completeItem(id, todo) {
    var todos = JSON.parse(localStorage.getItem("allTodos"));
    if(todos == null) todos = [];
    var todo = {
        id: `${id}`, 
        todo: `${todo}`,
        completed: "true"
    };
    localStorage.setItem('todo', JSON.stringify(todo));
    todos.push(todo);
    localStorage.setItem("allTodos", JSON.stringify(todos));
    

    alert("Item complete!");
    displayCompleted(id);
}
function displayCompleted(id) {
    const data = JSON.parse(localStorage.getItem('allTodos'));
    for (var i = 0; i < data.length; i++) {
        if ((data[i].id == id) && (data[i].completed == "true")) {
        let li = document.createElement('li');
        li.innerHTML = `<div id="${data[i].id}" class="row" value="value"><div>${data[i].id}</div><div id="${data[i].todo}" class="todo">${data[i].todo}</div><button name="deleteBtn">Delete</button></div>`;
        document.getElementById('completed').appendChild(li);
        li.classList.toggle('checked');
        }
    }
}
function checkInput() {
    let todotxt = document.getElementById("todotxt").value;
    if (!todotxt) {
        console.log("no input");
        alert("Input cant be empty!")
    }
    else {
        addItem(todotxt);
    }
}
function addItem(todotxt) {
    var tempIndex = localStorage.getItem("index");
    tempIndex++;
    localStorage.setItem("index", tempIndex);
    var todos = JSON.parse(localStorage.getItem("allTodos"));
    if(todos == null) todos = [];
        const todo = {
        id: `${tempIndex}`, 
        todo: `${todotxt}`,
        completed: "false"
    };
    localStorage.setItem('todo', JSON.stringify(todo));
    todos.push(todo);
    localStorage.setItem("allTodos", JSON.stringify(todos));
    let li = document.createElement('li');
    li.innerHTML = `<div id="${tempIndex}" class="row" value="value"><div>${tempIndex}</div><div id="${todotxt}" class="todo">${todotxt}</div><input type="checkbox" id="check" name="check"><button name="deleteBtn">Delete</button></div>`;
    document.getElementById('list').appendChild(li);
    alert("Item added!");
}