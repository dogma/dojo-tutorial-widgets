dojo.provide("example.Todo");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("example.Task");
dojo.declare("example.Todo",[dijit._Widget,dijit._Templated], {
    baseClass: "exTodo",
    baseApi: "/todos",
    tasks: [],
    templateString: "<div>" +
            "<div class='header' dojoAttachPoint='header'></div>" +
            "<div class='todos' dojoAttachPoint='taskLists'></div>" +
            "<div class='footer'>" +
                "<input type='text' name='newTodo' dojoAttachPoint='newTodo' dojoAttachEvent='onkeypress:createOnEnter' class='newTodo' />" +
                "<div class='addButton' dojoAttachPoint='addButton' dojoAttachEvent='onclick:createTask'>Add</div>" +
            "</div>" +
            "</div>",
    attributeMap: {
        title: { node: 'header', type: 'innerHTML' }
    },
    postCreate: function () {
        this.set("title", "My Tasks");
        this.loadTasks();
    },
    _render: function () {

    },
    loadTasks: function () {
        var ob = this;
        dojo.xhrGet({
            url: this.baseApi+".json",
            handleAs: 'json',
            load: function (data) {
                //Should receive a list of tasks.
                for(var i in data) {
                    ob.addTask(data[i].todo);
                }
            }
        })
    },
    addTask: function (taskData) {
        console.info("Is chrome here");
        var t = new example.Task({
            data: taskData
        });

        this.taskLists.appendChild(t.domNode);
    },
    deleteTask: function () {

    },
    //event call for creating a new task from the task form.
    createTask: function () {
        console.info("Creating");
        var ob = this;
        var name = this.newTodo.value;
        dojo.xhrPost({
            url: this.baseApi+".json",
            handleAs: 'json',
            content: { "todo[name]": name },
            load: function (data) {
                ob.addTask(data.todo);
                ob.newTodo.value = "";
            },
            error: function (){
                console.info("Error creating task");
            }
        })
    },
    createOnEnter: function (event) {
        if(event.keyCode == 13) {
            this.createTask();
        }
    }
});