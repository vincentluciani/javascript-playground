

const reactOnLogin = function(apiResponse) {
    var message="Discipline pumps strength in your body and mind"
    document.getElementById("login-text").innerHTML = message;
    document.getElementById("login-text-progress").innerHTML = message;
    
    /*document.getElementById("google-image").setAttribute("src", apiResponse.picture);*/
    /*document.getElementById("google-image-progress").setAttribute("src", apiResponse.picture);*/
    document.getElementById('allegory').style.display='block';
    document.getElementById('allegory-habit').style.display='block';
    document.getElementById("signout_button").style.display= 'block';
    document.getElementById("signout_button_habits").style.display= 'block';
    document.getElementById('account-link').style.display='list-item';
    // document.getElementById("signout_button_progress").style.display= 'block';
    document.getElementById("login-title-box").style.display='none';
    document.getElementById("login-title-box-habits").style.display='none';
    document.getElementById("assure-login").style.display='none';

    var listOfButtons = document.getElementsByClassName("g_id_signin");

    for (var i=0; i< listOfButtons.length;i++){
        listOfButtons[i].style.display = 'none';
    }

    document.getElementById("google-container").classList.add("new-habit");
    document.getElementById("google-container").classList.remove("new-habit-focused");

    document.getElementById("google-container-progress").style.borderColor = "lightgrey";
    document.getElementById("google-container-progress").style.borderWidth = "1px";
    document.getElementById("google-container-progress").style.background = "white";

    document.getElementById("new-habit").classList.remove("new-habit");
    document.getElementById("new-habit").classList.add("new-habit-focused");
    /*document.getElementById("google-image").style.display="block";*/
   /* document.getElementById("google-image-progress").style.display="block";*/

/*
   document.getElementById("google-container").style.display="block"; 
    document.getElementById("google-container-progress").style.display="block"; 
*/

    /*document.getElementById("streak-box").style.display="flex"; */
}


const reactOnLogout = function() {
    document.getElementById("login-text").innerHTML = "Being logged in, you can use the application on all devices and keep an unlimited number of days.";
    document.getElementById("login-text-progress").innerHTML = "Being logged in, you can use the application on all devices and keep an unlimited number of days.";
    
    /*document.getElementById("google-image").setAttribute("src", "");
    document.getElementById("google-image").style.display = 'none';*/
    document.getElementById("signout_button").style.display= 'none';
    document.getElementById("signout_button_habits").style.display= 'none';
    document.getElementById('account-link').style.display='none';

    /*document.getElementById("google-image-progress").setAttribute("src", "");
    document.getElementById("google-image-progress").style.display = 'none';*/
    document.getElementById('allegory').style.display='none';
    document.getElementById('allegory-habit').style.display='none';
    // document.getElementById("signout_button_progress").style.display= 'none';
    document.getElementById("assure-login").style.display='block';

    document.getElementById("login-title-box").style.display='block';
    document.getElementById("login-title-box-habits").style.display='block';

    var listOfButtons = document.getElementsByClassName("g_id_signin");

    for (var i=0; i< listOfButtons.length;i++){
        listOfButtons[i].style.display = 'block';
    }

    document.getElementById("google-container").classList.remove("new-habit");
    document.getElementById("google-container").classList.add("new-habit-focused");

    document.getElementById("google-container-progress").style.borderColor = "#c369bc";
    document.getElementById("google-container-progress").style.borderWidth = "5px";
    document.getElementById("google-container-progress").style.background = "#fffceb";
    
    document.getElementById("new-habit").classList.add("new-habit");
    document.getElementById("new-habit").classList.remove("new-habit-focused");
    /*document.getElementById("google-image").style.display="none";*/
    /*document.getElementById("google-image-progress").style.display="none";*/
    /*document.getElementById("streak-box").style.display="none";*/
    

    googleToken = '';
    applicationToken = '';
    loggedIn = false;

    try {
        google.accounts.id.disableAutoSelect();
    } catch(e){
        console.log("Did not find google account to disable");
    }
    
    deleteEntry("retain").then(value=>{
        console.log("entry deleted");
    }, reason=>{
        console.log(reason);
    })

}

