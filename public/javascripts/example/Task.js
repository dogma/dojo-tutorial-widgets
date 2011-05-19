dojo.provide("example.Task");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("example.Task",[dijit._Widget,dijit._Templated],{
    baseClass: 'todoTask',
    baseApi: "/tasks",
    model: null,
    data: {}, //Used to store the data of a task. This will be name, done, group, created_at, updated_at and id
    templateString: "<div>" +
            "<div class='state' dojoAttachPoint='state'></div>" +
            "<div class='task' dojoAttachPoint='name'></div>" +
            "<div class='delete' dojoAttachPoint='delete'></div>" +
        "</div>",
    task: "",
    attributeMap: {
        done: { node: "state", type: 'class' },
        task: { node: 'name', type: 'innerHTML' },
        deleteButton: { node: 'delete', type: 'innerHTML' }
    },
    postCreate: function () {
        if(this.id != null) {
            this.load(this.id);
        }
        else if(this.data != null && this.data.id != null) {
            this._render();
        }
    },
    load: function (id) {
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
    create: function (data) {
        var ob = this;
        dojo.xhrPut({
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
        dojo.xhrPost({
            url: ".json",
            content: this._convertData(this.model),
            handleAs: 'json',
            load: function (data) {
                //reacts to the data returned by the request.
                //The data will be returned as a processed json object.
            },
            error: function (error) {
                //Handler used to react to a failure in either the returned data or the request itself
            }
        });
    },
    remove: function () {
        var ob = this;
        dojo.xhrDelete({
            url: ".json",
            content: this._convertData(this.model),
            handleAs: 'json',
            load: function (data) {
                //Delete usually has no response.
            },
            error: function (error) {
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
        this.set("state", this.data.done == null ? 'undone' : 'done' );
    }

});