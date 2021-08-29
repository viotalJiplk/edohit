document.addEventListener("deviceready", onDeviceReady);
function onDeviceReady() {
    window.change_session = function(){
        window.cordova.plugins.CookiesPlugin.getCookie("https://gym-tisnov.edookit.net", (cookies) => {
            // log cookies
            cookies = cookies.split("; ");
            localStorage.setItem("cookies", JSON.stringify(cookies));
            cookies.forEach(element => {
                http.setCookie("https://gym-tisnov.edookit.net/", element);     
            });
        });
        location.href = "index.html";
    }
    window.get_sesioncookie = function(){
        let ref = cordova.InAppBrowser.open(loginurl, "_blank");
        ref.addEventListener("exit", change_session);
    }
    document.getElementById("get_sesioncookie").addEventListener("click", get_sesioncookie);
}