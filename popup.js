$(function () {
    var tasksList = [];
    chrome.storage.sync.get('list', function (val) {
        if(val.list.length>0)
            tasksList = val.list;
      /*  else
            tasksList = [];*/
       // if(tasksList.length>0) {
            for (var i = 0; i < tasksList.length; i++) {
                addListItem(tasksList[i]);
            }
       // }

    })

    $('#addButton').click(function () {

            var newTask = $('#taskInput').val();
           // if(tasksList.length>0)
                tasksList.push(newTask);

            addListItem(newTask);

            chrome.storage.sync.set({
                'list': tasksList
            })


        });





    function addListItem(value) {
        var ul = document.getElementById("listUl");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(value));
        if (value === '') {
            alert("You must write something!");
        } else {
            ul.appendChild(li);
        }

        document.getElementById("taskInput").value = "";

        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        $(".close").click(function () {
            var index = $(this).index(".close");

            console.log(index);
            var div = this.parentElement;
            div.style.display = "none";
            removeItem(index);
        });
    }

        // removeItem()
/*
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function() {
               /!* if (i > -1) {
                    tasksList = tasksList.splice(i, 1);
                }
                chrome.storage.sync.set({
                    'list': tasksList
                })*!/

                removeItem(i)
                var div = this.parentElement;
                div.style.display = "none";
            }

            console.log(tasksList);
            console.log(i);
        }*/
      /*  $('.close').click(function() {
            /!*console.log($('close').index(this));*!/
            //removeItem();
            console.log("cliced");
        });
*/
    



    function removeItem(itemIndex){

        chrome.storage.sync.get('list', function (val) {
            tasksList = val.list;
            tasksList.splice(itemIndex, 1);
            console.log("new list", tasksList);

            chrome.storage.sync.set({
                'list': tasksList
            })

           })

    }

    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

// Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);


})