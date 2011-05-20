dojo.provide("example.Task");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("example.Task",[dijit._Widget,dijit._Templated],{
    baseClass: 'todoTask',
    baseApi: "/todos",
    model: "todo",
    data: {}, //Used to store the data of a task. This will be name, done, group, created_at, updated_at and id
    templateString: "<div>" +
            "<div class='state' dojoAttachPoint='state' dojoAttachEvent='onclick:changeState'></div>" +
            "<div class='task' dojoAttachPoint='name'></div>" +
            "<div class='delete' dojoAttachPoint='removeButton' dojoAttachEvent='onclick:remove'></div>" +
        "</div>",
    task: "",
    attributeMap: {
        done: { node: "state", type: 'class' },
        task: { node: 'name', type: 'innerHTML' },
        deleteButton: { node: 'removeButton', type: 'innerHTML' }
    },
    postCreate: function () {
        this.set("deleteButton", "Delete");
        if(this.data != null && this.data.id != null) {
            this._render();
        }
    },
    load: function (id) {
        console.info("Running load");
        var ob = this;
        dojo.xhrGet({
            url: this.baseApi+"/"+id+".json",
            content: {},
            handleAs: 'json',
            load: function (data) {
                ob.data = data;
            }
        });
    },
    createTodo: function (data) {
        var ob = this;
        dojo.xhrPost({
            url: this.baseApi+"/new.json",
            content: this._convertData(this.model),
            handleAs: "json",
            load: function (data) {
                ob.data = data;
            }
        });
    },
    update: function () {
        var ob = this;
        dojo.xhrPut({
            url: this.baseApi+"/"+this.data.id+".json",
            content: this._convertData(this.model),
            handleAs: 'json',
            load: function (data) {
                //reacts to the data returned by the request.
                //The data will be returned as a processed json object.
                if(ob.data.done != null && ob.data.done != "") {
                    ob.set("done","done");
                } else {
                    ob.set("done","undone");
                }
            },
            error: function (error) {
                console.info("Returned error state");
                //Handler used to react to a failure in either the returned data or the request itself
            }
        });
    },
    remove: function () {
        var ob = this;
        dojo.xhrDelete({
            url: this.baseApi+"/"+this.data.id+".json",
            content: "",
            load: function (data) {
                //Delete usually has no response.
                ob.domNode.parentNode.removeChild(ob.domNode);
            },
            error: function (error) {
                console.info("Error returned");
                //which can result in an error being called.
            }
        });
    },
    _convertData: function (key) {
        var content = new Object();
        for(var i in this.data) {
            content[key+"["+i+"]"] = this.data[i];
        }

        return content;
    },
    _render: function () {
        this.set("task",this.data.name);
        this.set("done", this.data.done == null ? 'undone' : 'done' );
    },
    changeState: function () {
        if(this.data.done != null && this.data.done != "") {
            this.data.done = ""
        } else {
            this.data.done = new Date();
        }

        this.update();
    }

});