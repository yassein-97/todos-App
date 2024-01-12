let apiKey = "659f23202681618c591bcecc";
const inputTask = document.querySelector('#inputTask');
const addBtn = document.querySelector('#addBtn');
const show = document.querySelector('#show');


async function addTask(){
    let body = {
        title:inputTask.value,
        apiKey:apiKey
    }
    let request = await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method: 'POST',
        body: JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json'
        }
    });

    // let result = await request.json();
    getData();
    clearInput();
};

inputTask.addEventListener('keyup',function(e){

    if(e.code == 'Enter'){
        addTask();
    };
});
addBtn.addEventListener('click',function(){
        addTask();
});

async function getData(){
    let request = await fetch(`https://todos.routemisr.com/api/v1/todos/${apiKey}`);

    let result = await request.json();

    showData(result.todos);
    // return result.todos;
    console.log(result.todos);
};

async function showData(arr){
    let container = '';
    for (let i=0 ;i< arr.length;i++){
        container += 
        `<div class="d-flex justify-content-between py-3 px-2 fs-4">
            <div class="d-flex">
                <i onclick="copleteTask('${arr[i]._id}')"${arr[i].completed ?`class="fa-solid fa-circle-check text-success me-3 pt-3"`:`class="fa-regular fa-circle me-3 pt-3"`}></i>
                <p id = "${arr[i]._id}" data-flag = "${arr[i].completed}" ${arr[i].completed ?`class="text-decoration-line-through text-secondary pt-2"`:`class="pt-2"`} >${arr[i].title}</p>
            </div>
            <i onclick="deleteTask('${arr[i]._id}')" class="fa-solid fa-trash-can fs-5 pt-2  text-danger"></i>
        </div>`;
    }
    show.innerHTML = container;
};
getData();

async function deleteTask(id){
    let body = {
        todoId:id
    }
    let request = await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method : "DELETE",
        body: JSON.stringify(body),
        headers:{
            "Content-Type":"application/json"
        }
    });
    let result = await request.json();
    console.log(result);
    getData();
};


async function copleteTask(id){
    let body = {
        todoId:id
    }
    let request = await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method : "PUT",
        body: JSON.stringify(body),
        headers:{
            "Content-Type":"application/json"
        }
    });
    // let result = await request.json();

    let p = document.getElementById(id);
    let i = p.previousElementSibling;
    if(p.getAttribute('data-flag')){
        // p.classList.add("text-decoration-line-through text-muted");
        p.style.textDecoration="line-through";
        p.style.color="#6C757D";
        i.setAttribute('class',"fa-solid fa-circle-check text-success me-3 pt-3")
    };
};


function clearInput(){
    inputTask.value = "";
};




