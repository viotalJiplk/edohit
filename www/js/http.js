
const checkurl = settings.baseurl + settings.checkurl;
const bcapurl = settings.baseurl + settings.bcapurl;
const loginurl = settings.baseurl + settings.loginurl;
const info = settings.browser_capability;

document.addEventListener("deviceready", ondeviceready, false);

function ondeviceready() {
    window.http = cordova.plugin.http;
    http.clearCookies();
    for(cookie in settings.cookies){
        http.setCookie(settings.baseurl, cookie + "=" + settings.cookies[cookie]);
    }

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
                    console.error("error in request");
                    console.log("urlhistory:");
                    console.log(urlhistory);
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
                    console.log("urlhistory:");
                    console.log(urlhistory);
                    console.error(response.error);
                    break;
            }
        });
    }
    

    //http.setHeader('Hostname', 'Header', 'Value');
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