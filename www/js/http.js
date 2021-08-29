const checkurl = "https://gym-tisnov.edookit.net/check-browser.php";
const bcapurl = "https://gym-tisnov.edookit.net/browser-capabilities.php";
const loginurl = "https://gym-tisnov.edookit.net/user/login";
const info = {
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
document.addEventListener("deviceready", ondeviceready, false);

function ondeviceready() {
    window.http = cordova.plugin.http;

    /**
     * function for geting edookit pages :)
     * @param {String} url url of resource
     * @param {Object} options options of req
     * @param {Function} callback function to call after the request procesed
     */
    window.request = function(url, options, callback=console.log, urlhistory = []){
        urlhistory.unshift(url);
        http.sendRequest(url, options, function(response) {
            if (urlhistory[0] !=bcapurl & response.url == checkurl) {
                //browser checek workarounds
                request(bcapurl,{method: "post", data: info}, function(response, urlhistory){
                    let i = 0;
                    while((urlhistory[i] == bcapurl | urlhistory[i] == checkurl) & i < urlhistory.length){
                        i++;
                    }
                    request(urlhistory[i], options, callback, urlhistory);
                }, urlhistory);
            }else {
                //finaly respose
                callback(response, urlhistory);   
            }
        }, function(response) {
            switch (response.status) {
                case 403:
                    console.log(403); 
                    break;
                case 302:
                    if(formURL([url,response.headers.location]).includes(loginurl)){
                        location.href = "login.html";
                    }
                    console.log("302" + " at " + url + "redirecting to: " + response.headers.location);
                    request(formURL([url,response.headers.location]), options, callback, urlhistory);
                    break;
                default:
                    console.error("error in request");
                    console.log("urlhistory");
                    console.log(urlhistory);
                    break;
            }
            //prints Permission denied
            console.error(response.error);
        });
    }
    

    //http.setHeader('Hostname', 'Header', 'Value');
    http.setCookie("https://gym-tisnov.edookit.net/", "User-Agent=Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0");
    http.setFollowRedirect(false);
    
    //request('https://gym-tisnov.edookit.net/',{method: "get", data: { id: 12, message: 'test' }, headers: { Authorization: 'OAuth2: token' }}, );
    console.log("http module on");
}
/**
 * form url from parameters
 * @param {[String, String]} url array of URL ["https://example.com/index.html", "/test.html"] => https://example.com/test.html
 */
function formURL(url){
    let finalURL = String(url[0].trimStart());
    url[1] = String(url[1]);
    if (/^\s*\//m.test(url[1])) {
        finalURL = finalURL.match(/^[^/:]*\:\/\/[^/:]*/m)[0] + url[1]; 
    }else if(/^\s*[^/:]*(?=:\/\/)/m.test(url[1])){
        finalURL = url[1];
    }else{
        finalURL = finalURL + url[1];
    }
    return finalURL;
}