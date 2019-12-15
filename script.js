var myText = document.getElementById('myText')
var myaddtodobutton = document.getElementById('myIdAddToDoButton')

var myhosturl = "https://evening-everglades-23712.herokuapp.com/"
window.onload = async function(){
    let myAllTodos = await fetchAllTodos()
    let todolist = myAllTodos.data
    console.log(todolist)
    document.getElementById('myTodoUL').innerHTML= "";
    todolist.forEach(createMyTodo)
}

async function fetchAllTodos(){
    let result = await fetch(myhosturl);
    let mytododata = await result.json();
    console.log(mytododata)
    return mytododata;
}

async function onClick(){
    await addToDoinDB()
    let tododataafterclick = await fetchAllTodos()
    let tododataarray = tododataafterclick.data
    document.getElementById('myTodoUL').innerHTML= "";
    tododataarray.forEach(createMyTodo)
}

function createMyTodo(todo){
    var myTodoUL = document.getElementById('myTodoUL');

    var li = document.createElement('li');
    li.classList.add('individualTodos')
    li.setAttribute("id", todo._id);
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox') 
    checkBox.classList.add("checkboxclass")

    var mytodotext = document.createElement("div");
    mytodotext.classList.add("todotextsclass")
    mytodotext.innerHTML = todo.caption;

    var update = document.createElement("button");
    update.setAttribute('onClick', 'updateMyTodo()');
    update.classList.add("updateButton");
    update.innerHTML = "Update";

    var del = document.createElement("button");
    del.setAttribute('onClick', 'deleteMyTodo()');
    del.classList.add("crossButton");
    del.innerHTML = "Delete";

    li.appendChild(checkBox);
    li.appendChild(mytodotext);
    li.appendChild(update);
    li.appendChild(del);
    myTodoUL.appendChild(li);
    document.getElementById("todotasks").appendChild(myTodoUL);
}


async function addToDoinDB(){
    var myCaption = myText.value;
    myText.value=""
    console.log(myCaption)
    let captiontobeposted = JSON.stringify({
        "caption": myCaption
      });

      let res = await fetch(myhosturl, {
         method : "POST",
         body:captiontobeposted,
         headers : {
            "Content-Type": "application/json"
         } 
      })

      let jsondata = await (res.json)
}

async function updateMyTodo(){
    var myCaption = myText.value;
    myText.value=""
    console.log(myCaption)
    let captiontobeput = JSON.stringify({
        "caption": myCaption
      });
    let mytodo = event.target.parentNode;
    console.log(mytodo.id)
    let todoIdtobeupdated = mytodo.id;
    let res = await fetch(myhosturl+todoIdtobeupdated, {
         method : "PUT",
         body:captiontobeput,
         headers : {
            "Content-Type": "application/json"
         } 
      })
      let myAllTodos = await fetchAllTodos()
    let todolist = myAllTodos.data
    console.log(todolist)
    document.getElementById('myTodoUL').innerHTML= "";
    todolist.forEach(createMyTodo)
}

async function deleteMyTodo(){
    let mytodo = event.target.parentNode;
    console.log(mytodo.id)
    let todoIdtobedeleted = mytodo.id;
    let res = await fetch(myhosturl+todoIdtobedeleted, {
         method : "DELETE",
         headers : {
            "Content-Type": "application/json"
         } 
      })

      let myAllTodos = await fetchAllTodos()
    let todolist = myAllTodos.data
    console.log(todolist)
    document.getElementById('myTodoUL').innerHTML= "";
    todolist.forEach(createMyTodo)
    
}