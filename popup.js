$(function () {
    ///set the date of today
    setDate();


    var tasksList = new Array();
    chrome.storage.sync.get('list', function (val) {
        if(val.list.length>0)
            tasksList = val.list;

        //displaying the old items
        for (var i = 0; i < tasksList.length; i++) {
            addListItem(tasksList[i]);
        }


    })

    $('#addButtonTask').click(function () {

        var newTask = $('#taskInput').val();
        // if(tasksList.length>0)
        //adding the new item to tasklist array
        tasksList.push(newTask);

        addListItem(newTask);
        //adding the new list back to chrome storage
        chrome.storage.sync.set({
            'list': tasksList
        })


    });


    function addListItem(value) {
        var ul = document.getElementById("todo-listUl");
        var li = document.createElement("li");
        $("li").addClass("list-group-item");
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



    /*
     $('ul li').on("click", function(e) {
         var i = $(this).parent().index() + 1;
         console.log("h",i);
         alert(i);
     });*/
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
        /* myNodelist[i].addClass("current");

         myNodelist[i].setAttribute("class", "item");*/
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
    var checkedList = [];






    var list = document.querySelector('ul');
    console.log(list);

    list.addEventListener('click', function(ev) {

        console.log($(this).index());


        console.log(ev.target.classList);
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            checkedList.push(2);


            /* chrome.storage.sync.set({
                 'checked': checkedList
             })

             chrome.storage.sync.get('checked', function (val) {
                 console.log("hi " , val);
             })*/
        }
    }, false);

    function setDate() {
        var todayDate = new Date();
        console.log(todayDate);
        var locale = "en-us";
        var month = todayDate.toLocaleString(locale, {month: "long"});
        var day = todayDate.toLocaleString(locale, {weekday: "long"});

        document.getElementById('date').innerHTML = "Task checklist for " + day + ", " + todayDate.getDate()+" "
            + month;
    }
})