document.addEventListener("deviceready", ondeviceready, false);
document.body.content = document.getElementById("content");


function ondeviceready() {
    window.checkConnection = function(){
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'UNKNOWN';
        states[Connection.ETHERNET] = 'ETHERNET';
        states[Connection.WIFI]     = 'WIFI';
        states[Connection.CELL_2G]  = '2G';
        states[Connection.CELL_3G]  = '3G';
        states[Connection.CELL_4G]  = '4G';
        states[Connection.CELL]     = 'CELL';
        states[Connection.NONE]     = 'NONE';
        return states[networkState];
    } 
}

function usernotify(notification){
    const div = document.createElement("div");
    div.setAttribute("class", "usernotify");
    let timer = setTimeout(function(){close(div)}, 2500);
    div.addEventListener("click", function(event){close(event.currentTarget, timer)});
    const p = document.createElement("p");
    p.innerText = notification;
    div.appendChild(p);
    document.body.appendChild(div);
}

function close(element, timer = null){
    if(timer != null){
        clearTimeout(timer);
    }
    element.remove()
}