// Business Logic for AddressBook ---------
function ToDoList() {
  this.tasks = [],
  this.currentId = 0
}

ToDoList.prototype.addTasks = function(tasks) {
  tasks.id = this.assignId();
  this.tasks.push(tasks);
}

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.findTasks = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        return this.tasks[i];
      }
    }
  };
  return false;
}

ToDoList.prototype.deleteTask = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        delete this.tasks[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Tasks(task, notes) {
  this.task = task,
  this.notes = notes
}

// User Interface Logic ---------
var tasksList = new ToDoList();

function displayToDoDetails(toDoToDisplay) {
  var toDoList = $("ul#task");
  var htmlForTasks = "";
  toDoToDisplay.tasks.forEach(function(task) {
    htmlForTasks += "<li id=" + task.id + ">" + task.task + "</li>";
  });
  toDoList.html(htmlForTasks);
};

function showTaskInfo(id) {
  var list = tasksList.findTasks(id);
  $("#show-task").show();
  $(".field1").html(list.task);
  $(".field2").html(list.notes);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + id + ">Delete</button>");
}

function attachListeners() {
  $("ul#task").on("click", "li", function() {
    showTaskInfo(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    tasksList.deleteTask(this.id);
    $("#show-task").hide();
    displayToDoDetails(tasksList);
  });
};

$(document).ready(function() {
  attachListeners();
  $("form#toDo").submit(function(event) {
    event.preventDefault();
    var arr = [];
    for(var i = 1;i<=2;i++)
    {
      arr.push($("input#field"+i).val());
      $("input#field"+i).val("");
    }
    var newItem = new Tasks(arr[0], arr[1]);
    tasksList.addTasks(newItem);
    displayToDoDetails(tasksList);
  })
})
