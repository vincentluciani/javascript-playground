var addGoogleLoginSection = function(){
/*
    <div id="g_id_onload"
    data-client_id="YOUR_GOOGLE_CLIENT_ID"
    data-login_uri="https://localhost:3000"
    data-auto_prompt="false">
</div>
<div class="g_id_signin"
    data-type="standard"
    data-size="large"
    data-theme="outline"
    data-text="sign_in_with"
    data-shape="rectangular"
    data-logo_alignment="left">
</div>*/


    const googleLoginSection  = document.createElement("div");
    googleLoginSection.setAttribute("class","google-login-section"); 
    const newOnLoadButton = document.createElement("div");
    const newGoogleLoginButton = document.createElement("div");

    newOnLoadButton.setAttribute("id","g_id_onload");
    newOnLoadButton.setAttribute("data-client_id", secret.clientId);
    newOnLoadButton.setAttribute("data-auto_select", "true");
    newOnLoadButton.setAttribute("data-login_uri", "https://localhost:3000");
    newOnLoadButton.setAttribute("data-auto_prompt", "false" );

    newGoogleLoginButton.setAttribute("class", "g_id_signin");
    newGoogleLoginButton.setAttribute("data-type","standard");
    newGoogleLoginButton.setAttribute("data-size","large");
    newGoogleLoginButton.setAttribute("data-theme", "outline");
    newGoogleLoginButton.setAttribute("data-text","sign_in_with" );
    newGoogleLoginButton.setAttribute("data-shape", "rectangular");
    newGoogleLoginButton.setAttribute("data-logo_alignment", "left");

    googleLoginSection.appendChild(newOnLoadButton);
    googleLoginSection.appendChild(newGoogleLoginButton);

    document.getElementById('habits-container').appendChild(googleLoginSection);
 
};