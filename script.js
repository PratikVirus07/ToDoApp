var myText = document.getElementById('myText')
var myaddtodobutton = document.getElementById('myIdAddToDoButton')

window.onload = async function(){
    let myAllTodos = await fetchAllTodos()
    let todolist = myAllTodos.caption
}

async function fetchAllTodos(){
    let result = await fetch("http://127.0.0.1:80/myapi/todos");
    let mytododata = await result.json();
    console.log(mytododata)
    return mytododata;
}

function addToDo(){
    var myCaption = myText.value;
    myText.value=""
    console.log(myCaption)
    var data = JSON.stringify({
        "caption": myCaption
      });
      console.log(data)

    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;
  
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        console.log(this.responseText);
        }
    });
 
    xhr.open("POST", "http://localhost:5555/api/todos");
    xhr.setRequestHeader("Content-Type", "application/json");  
    xhr.send(data);

    addToDom(myCaption)

}

function addToDom(myCaption){
    var ultodolists = document.getElementById("todolist")
    ultodolists.style.display = "block"
    var li = document.createElement('li')
    var checkBox = document.createElement('input')
    checkBox.type = "checkbox"
    checkBox.value = "value"
    checkBox.style.margin = '2px';
    var textLi = myCaption;
    li.append(checkBox)
    li.append ( textLi)
    var todoUL = document.getElementById('todoUL')
    todoUL.appendChild(li); 
}