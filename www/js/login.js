document.addEventListener("deviceready", onDeviceReady);
function onDeviceReady() {
    window.change_session = function(){
        window.cordova.plugins.CookiesPlugin.getCookie(settings.baseurl, (cookies) => {
            // log cookies
            cookies = cookies.split("; ");
            cookies.forEach(element =>{
                settings.cookies[element.split("=")[0]] = element.split("=")[1];
                http.setCookie(settings.baseurl, element);
            });
            save_settings()
        });
        location.href = "index.html";
    }
    window.get_sesioncookie = function(){
        let ref = cordova.InAppBrowser.open(loginurl, "_blank");
        ref.addEventListener("exit", change_session);
    }
    document.getElementById("get_sesioncookie").addEventListener("click", get_sesioncookie);
}