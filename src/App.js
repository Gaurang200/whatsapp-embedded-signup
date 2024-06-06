import './App.css';
import React, { useEffect, useState } from "react";


function App() {


  let facebookSDKLoaded = false;
  useEffect(() => {
    // Facebook Pixel initialization
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    window.fbq("init", "your-pixel-id-goes-here");
    window.fbq("track", "PageView");


  
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "here your app id", 
        cookie: true, 
        xfbml: true, 
        version: "v19.0", 
      });

      facebookSDKLoaded = true;
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const launchWhatsAppSignup = () => {
    if (facebookSDKLoaded && typeof window.FB !== "undefined") {
      window.fbq("trackCustom", "WhatsAppOnboardingStart", {
        appId: "here your app id",
        feature: "whatsapp_embedded_signup",
      });
      window.FB.login(
        function (response) {
          if (response.authResponse) {
            const code = response.authResponse.code;
            console.log(code, "code");
        
            console.log(response, "response");
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        {
          config_id: "here yoyr config id",
          response_type: "code",
          override_default_response_type: true,
          extras: {
            sessionInfoVersion: 2,
          },
        }
      );
    } else {
 
      setTimeout(launchWhatsAppSignup, 100);
    }
  };


  return (
    <>
    <button
                        onClick={launchWhatsAppSignup}
                        id="connect-with-facebook"
                        data-type="add"
                      >
                        <i className="bx bxl-facebook-circle"></i> Connect
                        with Facebook
                      </button>
 
</>
  );
}

export default App;
