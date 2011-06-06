dojo.provide('my.Todo');
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.declare("my.Todo",[dijit._Widget,dijit._Templated],{
         baseClass: 'exTodo', //This is the basic class that we want the widget to use.
         baseApi: '/todos', //This is the API URL that we will use to build json calls for todo items.
    templateString: "<div>" +
            "<div class='header' dojoAttachPoint='header'></div>" +
            "<div class='todos' dojoAttachPoint='taskLists'></div>" +
            "<div class='footer'>" +
                "<input type='text' name='newTodo' dojoAttachPoint='newTodo' class='newTodo' />" +
                "<div class='addButton' dojoAttachPoint='addButton'>Add</div>" +
            "</div>" +
            "</div>",

         tasks: [], //Once we load the tasks we want a place to store them.
         //Now a function:
         postCreate: function () {
       //The postCreate function is a special one that the widget class looks for.
      //You use this space to perform actions when the widget is created.
   }
});