

const reactOnLogin = function(apiResponse) {
    document.getElementById("login-text").innerHTML = "Hi "+apiResponse.givenName+", how are you doing today?";
    document.getElementById("google-image").setAttribute("src", apiResponse.picture);
    document.getElementById("signout_button").style.display= 'block';

    var listOfButtons = document.getElementsByClassName("g_id_signin");

    for (var i=0; i< listOfButtons.length;i++){
        listOfButtons[i].style.display = 'none';
    }

    document.getElementById("google-container").classList.add("new-habit");
    document.getElementById("google-container").classList.remove("new-habit-focused");
    document.getElementById("new-habit").classList.remove("new-habit");
    document.getElementById("new-habit").classList.add("new-habit-focused");
    document.getElementById("google-image").style.display="block";
   
     
}


const reactOnLogout = function() {
    document.getElementById("login-text").innerHTML = "Being logged in, you can use the application on all devices and keep an unlimited number of days.";
    document.getElementById("google-image").setAttribute("src", "");
    document.getElementById("google-image").style.display = 'none';
    document.getElementById("signout_button").style.display= 'none';

    var listOfButtons = document.getElementsByClassName("g_id_signin");

    for (var i=0; i< listOfButtons.length;i++){
        listOfButtons[i].style.display = 'block';
    }

    document.getElementById("google-container").classList.remove("new-habit");
    document.getElementById("google-container").classList.add("new-habit-focused");
    document.getElementById("new-habit").classList.add("new-habit");
    document.getElementById("new-habit").classList.remove("new-habit-focused");
    document.getElementById("google-image").style.display="none";

}