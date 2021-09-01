//this is main js file it provides definition of const and methods for other parts of app

function save_settings(){
    localStorage.setItem("settings" , JSON.stringify(settings));    
}


//settings settings
const settings_preset ={
    "version": 1,
    "cookies": { //cookies for advanced http plugin
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0"
    },
    "timetable_now":"/timetable/?do=familyTimetable-resetFilter",
    "timetable_plusweek": "/timetable/?familyTimetable-value=7&do=familyTimetable-changeFilter",
    "timetable_minusweek":"/timetable/?familyTimetable-value=-7&do=familyTimetable-changeFilter",
    "baseurl": "https://gym-tisnov.edookit.net",
    "checkurl": "/check-browser.php",
    "bcapurl": "/browser-capabilities.php",
    "loginurl": "/user/login",
    "nav_sites": [
        {
            "url": "index.html",
            "text": "home"
        },
        {
            "url": "login.html",
            "text": "login"
        },
        {
            "url": "settings.html",
            "text": "settings"
        }
    ],
    "browser_capability" :{
        "app": {
            "name": "Netscape",
            "type": "Mozilla",
            "version": "5.0 (X11)",
            "language": "en-US",
            "platform": "Linux x86_64",
            "product": "Gecko",
            "userAgent": "Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0",
            "vendor": "",
            "isIE": false,
            "mobile": 0
        },
        "features": {
            "htmlimports": false,
            "flash": true,
            "transferables": true,
            "applicationcache": true,
            "cookies": true,
            "cors": true,
            "customelements": true,
            "customprotocolhandler": true,
            "eventlistener": true,
            "geolocation": true,
            "history": true,
            "json": true,
            "notification": true,
            "postmessage": true,
            "queryselector": true,
            "serviceworker": false,
            "svg": true,
            "templatestrings": true,
            "typedarrays": true,
            "websockets": true,
            "xdomainrequest": false,
            "webaudio": true,
            "cssescape": true,
            "supports": true,
            "target": true,
            "passiveeventlisteners": true,
            "picture": true,
            "strictmode": true,
            "arrow": true,
            "generators": true,
            "promises": true,
            "filereader": true,
            "eventsource": true,
            "fetch": true,
            "localstorage": true,
            "sessionstorage": true,
            "websqldatabase": false,
            "urlparser": true,
            "urlsearchparams": true,
            "websocketsbinary": true,
            "atobbtoa": true,
            "atob-btoa": true,
            "sharedworkers": true,
            "webworkers": true,
            "contains": false,
            "contextmenu": true,
            "cssall": true,
            "classlist": true,
            "documentfragment": true,
            "audio": true,
            "canvas": true,
            "canvastext": true,
            "contenteditable": true,
            "emoji": true,
            "video": true,
            "webanimations": true,
            "adownload": true,
            "audioloop": true,
            "csspointerevents": true,
            "cssremunit": true,
            "rgba": true,
            "hidden": true,
            "progressbar": true,
            "meter": true,
            "template": true,
            "capture": false,
            "fileinput": true,
            "placeholder": true,
            "srcdoc": true,
            "srcset": true,
            "scriptasync": true,
            "scriptdefer": true,
            "inlinesvg": true,
            "textareamaxlength": true,
            "videocrossorigin": true,
            "videopreload": true,
            "inputsearchevent": false,
            "csscalc": true,
            "cssgradients": true,
            "opacity": true,
            "csspositionsticky": true,
            "csschunit": true,
            "hsla": true,
            "xhrresponsetypearraybuffer": true,
            "xhrresponsetypeblob": true,
            "xhrresponsetypejson": true,
            "xhrresponsetypetext": true,
            "svgforeignobject": true,
            "blobconstructor": true,
            "blob-constructor": true,
            "svgasimg": true,
            "hiddenscroll": true,
            "mathml": true,
            "touchevents": false,
            "unicode": true,
            "checked": true,
            "displaytable": true,
            "display-table": true,
            "fontface": true,
            "cssinvalid": true,
            "lastchild": true,
            "nthchild": true,
            "cssscrollbar": false,
            "siblinggeneral": true,
            "cssvalid": true,
            "cssvhunit": true,
            "cssvmaxunit": true,
            "cssvminunit": true,
            "cssvwunit": true,
            "oninput": true,
            "formvalidation": true,
            "localizednumber": false,
            "mediaqueries": true,
            "hovermq": true,
            "fileinputdirectory": true,
            "textshadow": true,
            "batteryapi": false,
            "battery-api": false,
            "crypto": true,
            "fullscreen": true,
            "intl": true,
            "pagevisibility": true,
            "performance": true,
            "lowbattery": false,
            "getrandomvalues": true,
            "objectfit": true,
            "object-fit": true,
            "filesystem": false,
            "speechrecognition": false,
            "peerconnection": true,
            "datachannel": true,
            "matchmedia": true,
            "bloburls": true,
            "ligatures": true,
            "cssanimations": true,
            "appearance": true,
            "backdropfilter": false,
            "backgroundcliptext": true,
            "bgpositionxy": true,
            "bgrepeatround": true,
            "bgrepeatspace": true,
            "backgroundsize": true,
            "borderimage": true,
            "borderradius": true,
            "boxshadow": true,
            "boxsizing": true,
            "csscolumns": true,
            "csscolumns-width": true,
            "csscolumns-span": true,
            "csscolumns-fill": true,
            "csscolumns-gap": true,
            "csscolumns-rule": true,
            "csscolumns-rulecolor": true,
            "csscolumns-rulestyle": true,
            "csscolumns-rulewidth": true,
            "csscolumns-breakbefore": false,
            "csscolumns-breakafter": false,
            "csscolumns-breakinside": false,
            "cssgridlegacy": false,
            "cssgrid": true,
            "ellipsis": true,
            "cssfilters": true,
            "flexbox": true,
            "flexboxlegacy": true,
            "flexwrap": true,
            "overflowscrolling": false,
            "cssreflections": false,
            "cssresize": true,
            "shapes": true,
            "textalignlast": true,
            "csstransforms": true,
            "csstransitions": true,
            "csspseudotransitions": true,
            "indexeddb": false,
            "apng": true,
            "webp": true,
            "datauri": true,
            "webp-alpha": true,
            "webp-animation": true,
            "webp-lossless": true,
            "dataworkers": false,
            "videoautoplay": true,
            "audiopreload": false
        }
    }
}

function reset_settings(){
    localStorage.setItem("settings" , JSON.stringify(settings_preset));
}

if(!localStorage.getItem("settings")){
    //no settings defined yet
    reset_settings();
}

const settings =  JSON.parse(localStorage.getItem("settings"));
//there should be some updating mechanism


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

/**
 * function to notify user if something unexpected happened
 * @param {String} notification text of notification
 */
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

/**
 * function to close notification
 * @param {HTMLElement} element notification element
 * @param {Number} timer reference to timer from setTimeout 
 */
function close(element, timer = null){
    if(timer != null){
        clearTimeout(timer);
    }
    element.remove()
}