dojo.provide("example.Todo");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("example.Task");
dojo.declare("example.Todo",[dijit._Widget,dijit._Templated], {
    baseClass: "exTodo",
    baseApi: "/tasks",
    tasks: [],
    templateString: "<div>" +
            "<div class='header' dojoAttachPoint='header'></div>" +
            "<div class='todos' dojoAttachPoint='tasks'></div>" +
            "<div class='todoFooter'>" +
                "" +
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
                    ob.addTask(data[i]);
                }
            }
        })
    },
    addTask: function (taskData) {
        var t = new example.Task({
            data: taskData
        });

        this.tasks.appendChild(t.domNode);
    },
    deleteTask: function () {

    },
    createTask: function () {

    }

});