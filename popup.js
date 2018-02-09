$(function () {
    $('#addButton').click(function () {
        chrome.storage.sync.get('list', function (val) {
            var tasksList = val.list;
            var newTask = $('#taskInput').val();
            tasksList.push(newTask);
            addListItem(newTask);

            chrome.storage.sync.set({
                'list': tasksList
            })



        });




    })

    function addListItem(value) {
        var ul = document.getElementById("listUl");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(value));
        ul.appendChild(li);
    }

    chrome.storage.sync.get('list', function (val) {
        var tasksList = val.list;
        console.log(tasksList);
    });
})