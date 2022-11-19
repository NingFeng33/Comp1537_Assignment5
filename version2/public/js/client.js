ready(function () {
    console.log("client script loaded.");


    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        console.log("xhr", xhr);
        xhr.onload = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                callback(this.responseText);
            } else {
                console.log(this.status);
            }
        }
    }
    xhr.open("GET", url);
    xhr.send();


    document.querySelectorAll(".clear").forEach(function(currentElement, currentIndex, listObj){
    currentElement.addEventListener("click", function(e) {
        for (let i=0; i < this.parentNode.childNodes.length; i++) {
            if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                    this.parentNode.childNode[i].innerHTML = "";
                    break
                }
            }
        }
    });
});

  document.querySelector("#lucasJOSN").addEventListener("click", function(e) {
    let sth = null;
    ajaxGET("/lucas?format=json", function(data) {
        console.log("Before parsing", data);
        let parsedData = JSON.parse(data);
        sth = parsedData;
        console.log("what is sth in the AJAX call?", sth);
        console.log("Before parsing", parsedData);
        let str = "<ol>"
        for (let i = 0; i < parsedData.length; i++) {
            str += "<li>" + parsedData[i] + "</li>";
        }
        str += "</ol>";
        document.getElementById("lucas-json").innerHTML = str;
    });
    console.log("What is sth?", sth);
  })
})

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is complete");
    } else {
        document.addEventListener("DOMCountentLoaded", callback);
        console.log("Listener was invoked");
    }
}
