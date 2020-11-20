/*
 * Based op Bootstrap Cookie Alert by Wruczek
 * https://github.com/Wruczek/Bootstrap-Cookie-Alert
 * Released under MIT license
 */
(function () {
    "use strict";
    var cookieAlert = document.querySelector(".cookiealert");
    var acceptCookies = document.querySelector(".acceptcookies");

    if (!cookieAlert) {
       return;
    }

    cookieAlert.offsetHeight; // Force browser to trigger reflow (https://stackoverflow.com/a/39451131)


    // Show the alert if we cant find the "cookiesOK" cookie
    // Else cookiesOK so enable Google Analytics
    if (!getCookie("cookiesOK")) {
        cookieAlert.classList.add("show");
    } else {
        enableAnalytics ();
    }

    // When clicking on the agree button, create a 90 day
    // cookie to remember user's choice, enable Google Analytics
    // and close the banner
    acceptCookies.addEventListener("click", function () {
        setCookie("cookiesOK", true, 90);
        cookieAlert.classList.remove("show");
        enableAnalytics ();

        // dispatch the accept event
        window.dispatchEvent(new Event("cookieAlertAccept"))
    });


    // Enable Google Analytics (only called if accepted)
    function enableAnalytics (){
      console.log("enable Google Analytics...");

      $.ajax({
        url: "https://www.googletagmanager.com/gtag/js?id=G-TY2N829KV3",
        dataType: "script",
        cache: true,
        success: function() {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TY2N829KV3');
          console.log("tag Google Analytics pageload");
        }
      });

    }



    // Cookie functions from w3schools
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
})();