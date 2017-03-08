window.fbAsyncInit = function() {
  FB.init({
    appId      : '1019370574861972',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
  FB.login();
  FB.api('/me&acess_token=EAAOfHLUCVpQBAHYfJF5mZCxKcIuPGZAyPEMAARAGuQZCIHNWPSfqGs0zUupI70x4N6ZAzlmvLQpF05VXOt5Yy4XAferpKZCWBGbsZAMrIIsiG4xK7POcWElxC0JVfWpWbBxRJXsIT8BEIj2ozUZAKgQ5Y8ZB9KPwJZBPLEPvVfAfNAtKEbuhZBjP5zdGjR9yZABZBocZD', function(response) {
    console.log(response);
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



// const accessGraph = (method, url) => {
//   let myPromise = new Promise((resolve, reject) => {

//     let xhr = (window.XMLHttpRequest)? 
//               new XMLHttpRequest() : new ActiveXObject("Microsoft.xmlhttp");

//     console.log(xhr);

//     xhr.open(method, url, true);

//     xhr.onload = () => {
//       if (xhr.status >= 200 && xhr.status < 300){
//         resolve(xhr.response);
//       }else {
//         reject({
//           xhr: xhr,
//           status: xhr.status,
//           statusText: xhr.statusText
//         });
//       }
//     };

//     xhr.onerror = () => {
//       reject({
//           xhr: xhr,
//           status: xhr.status,
//           statusText: xhr.statusText
//         });
//     };

//     xhr.send();
//   });
//   return myPromise;
// };


// let getTokenUrl = 'https://graph.facebook.com/oauth/access_token?client_id=1019370574861972&client_secret=4bff22224c713ca6ee931c7cc7fef4b7&grant_type=client_credentials';

// let host = "https://graph.facebook.com/";



// accessGraph('GET', getTokenUrl)
//   .then((auth_token) => {
//     console.log('Access Token: ' + auth_token);

//     let url = "https://graph.facebook.com/me&acess_token=EAAOfHLUCVpQBANr7Qv1LNHlLv8mVi6ZC2EzduAPGtJcoodT5bmB7R2UKWYhLcsQOsjhL7FgPH9i3pzW5uQm69hvm1pwrGy0ZB9vQzSnUrVCCq0ZCcckOemxS49vKWkKXst4iuK8kCmz1QRp5mbrREudo3ZA4GWQsdG2j94ZB94aUKpClDAuGKoBPgkKb00eQZD";

//     let debugToken = "https://graph.facebook.com/debug_token?input_token=" + auth_token.substring(13) + "&" + auth_token;

//     accessGraph('GET', url)
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((err) => {
//         console.log(err.xhr.response);
//         // throw err.response;
//       });
//   })
//   .catch((err) => {
//     console.log(err.response);
//     throw err.response;
//   })