class DigitalCounter {
    constructor(initialValue,parentDivId,countDownDivId,autoStart,callbackFunction) {
        this.numberOfMinutes=0;
        this.numberOfSeconds=0;
        this.initialValue = initialValue;
        this.callbackFunction = callbackFunction;
        this.initializeIcons();
        this.initializeDivs(countDownDivId);
        this.inializeCounter(initialValue);
        this.attachResultingDiv(parentDivId);
        this.state="new";
        if (autoStart){
            this.startCounter();
        }
    }

    initializeDivs(countDownDivId){
        this.countDownStartButtonId = "start-button-"+countDownDivId
        this.countDownStartButton = document.createElement("div");
        this.countDownStartButton.setAttribute("id","start-button-"+countDownDivId);
        this.countDownStartButton.setAttribute("class","counter-start-button countdown-button");

        this.countDownInterruptButtonId = "interrupt-button-"+countDownDivId
        this.countDownInterruptButton = document.createElement("div");
        this.countDownInterruptButton.setAttribute("id","interrupt-button-"+countDownDivId);
        this.countDownInterruptButton.setAttribute("class","interrupt-button countdown-button");

        this.countDownResetButtonId = "reset-button-"+countDownDivId
        this.countDownResetButton = document.createElement("div");
        this.countDownResetButton.setAttribute("id","reset-button-"+countDownDivId);
        this.countDownResetButton.setAttribute("class","reset-button countdown-button");

        this.counterDiv = document.createElement("div");
        this.counterDiv.setAttribute("id",countDownDivId);
        this.counterDiv.setAttribute("class","countdown-container");
        this.minutesSecondsSeparator = document.createElement("div");
        this.minutesSecondsSeparator.setAttribute("id","minutes-second-separator-"+countDownDivId);
        this.minutesSecondsSeparator.setAttribute("class","minutes-second-separator");
        this.numberOfMinutesDiv = document.createElement("div");
        this.numberOfMinutesDiv.setAttribute("id","number-of-minutes-"+countDownDivId);
        this.numberOfMinutesDiv.setAttribute("class","number-of-minutes");
        this.minutesSecondsSeparator.innerHTML=":";
        this.numberOfSecondsDiv = document.createElement("div");
        this.numberOfSecondsDiv.setAttribute("id","number-of-seconds-"+countDownDivId);
        this.numberOfSecondsDiv.setAttribute("class","number-of-seconds");

        this.counterDiv.appendChild(this.numberOfMinutesDiv);
        this.counterDiv.appendChild(this.minutesSecondsSeparator);
        this.counterDiv.appendChild(this.numberOfSecondsDiv);
        this.counterDiv.appendChild(this.countDownStartButton);
        this.counterDiv.appendChild(this.countDownInterruptButton)
        this.counterDiv.appendChild(this.countDownResetButton)

        this.countDownStartButton.appendChild(this.playButtonIcon);
        this.countDownInterruptButton.appendChild(this.pauseButtonIcon);
        this.countDownResetButton.appendChild(this.stopButtonIcon);
        this.countDownStartButton.addEventListener('click', this.startCounter.bind(this));
        this.countDownInterruptButton.addEventListener('click', this.interruptCounter.bind(this));
        this.countDownResetButton.addEventListener('click', this.resetCounter.bind(this));

        this.myVideo = document.createElement("video");
        this.myVideo.setAttribute("id","video");
        this.myVideo.setAttribute("width","1px");
        this.myVideo.setAttribute("height","1px");
        /*video id="video" width="1px" height="1px" controls>*/
        this.sourcemp4 = document.createElement("source");
        this.sourceogg = document.createElement("source");
        this.sourcemp4.setAttribute("src","resources/muted-blank.mp4");
        this.sourceogg.setAttribute("src","resources/muted-blank.ogg");
        this.sourcemp4.setAttribute("type","video/mp4");
        this.sourceogg.setAttribute("type","video/ogg");
        this.myVideo.appendChild(this.sourcemp4);
        this.myVideo.appendChild(this.sourceogg);

    }

    attachResultingDiv(parentDivId){
        document.getElementById(parentDivId).appendChild(this.counterDiv);
    }
    inializeCounter(counterValue){
        this.numberOfMinutes = counterValue;
        this.numberOfSeconds = 0;
        this.setSecondsInDiv(this.numberOfSeconds);
        this.setMinutesInDiv(this.numberOfMinutes);
    }

    setMinutesInDiv(numberOfMinutes){
        this.numberOfMinutesDiv.innerHTML = this.getTextValueForCounter(this.numberOfMinutes);
    }

    setSecondsInDiv(numberOfSeconds){
        this.numberOfSecondsDiv.innerHTML = this.getTextValueForCounter(this.numberOfSeconds);
    }

    getTextValueForCounter(numericValue){
        return numericValue.toString().padStart(2,"0");
    }

    startCounter(){
        this.state="started";
        this.preventSleep();
        this.counterPointer = setInterval(this.decrementCounter.bind(this),1000);
    }

    interruptCounter(){
        if (this.state == "started"){
            this.allowSleep()
            clearInterval(this.counterPointer);
            this.state= "paused";
        } else if (this.state == "paused") {
            this.startCounter();
        }

    }

    resetCounter(){
        this.allowSleep();
        clearInterval(this.counterPointer);
        this.setNumberOfMinutes(this.initialValue);
        this.setNumberOfSeconds(0);
    }


    getNumberOfSeconds(){
        return this.numberOfSeconds;
    }
    getNumberOfMinutes(){
        return this.numberOfMinutes;
    }
    setNumberOfMinutes(numberOfMinutes){
        this.numberOfMinutes = numberOfMinutes;
        this.setMinutesInDiv(this.numberOfMinutes);
    }
    setNumberOfSeconds(numberOfSeconds){
        this.numberOfSeconds = numberOfSeconds;
        this.setSecondsInDiv(this.numberOfSeconds);
    }
    decrementCounter(){
        if (this.numberOfMinutes == 0 && this.numberOfSeconds == 1){
            this.setNumberOfSeconds(this.initialValue);
            this.stopCounter();
            return;
        }
        if ( this.numberOfSeconds > 0 ){
            this.setNumberOfSeconds(this.numberOfSeconds - 1);
        } else {
            this.setNumberOfSeconds(59);
            this.setNumberOfMinutes(this.numberOfMinutes - 1);
        }
    }
    stopCounter(){
        this.state="new";
        this.allowSleep();
        clearInterval(this.counterPointer);
        this.setNumberOfMinutes(this.initialValue);
        this.setNumberOfSeconds(0);
        this.callbackFunction();
    }

    initializeIcons(){
        this.playButtonIcon = document.createElement("div");
        this.playButtonIcon.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 485.74 485.74" style="enable-background:new 0 0 485.74 485.74;" xml:space="preserve"><g><g><path d="M242.872,0C108.732,0,0.004,108.736,0.004,242.864c0,134.14,108.728,242.876,242.868,242.876 c134.136,0,242.864-108.736,242.864-242.876C485.736,108.736,377.008,0,242.872,0z M338.412,263.94l-134.36,92.732 c-16.776,11.588-30.584,4.248-30.584-16.316V145.38c0-20.556,13.808-27.9,30.584-16.312l134.32,92.732 C355.136,233.384,355.176,252.348,338.412,263.94z"/></g></svg>';

        this.pauseButtonIcon = document.createElement("div");
        this.pauseButtonIcon.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300.003 300.003" style="enable-background:new 0 0 300.003 300.003;" xml:space="preserve"><g><g><path d="M150.001,0c-82.838,0-150,67.159-150,150c0,82.838,67.162,150.003,150,150.003c82.843,0,150-67.165,150-150.003 C300.001,67.159,232.846,0,150.001,0z M134.41,194.538c0,9.498-7.7,17.198-17.198,17.198s-17.198-7.7-17.198-17.198V105.46 c0-9.498,7.7-17.198,17.198-17.198s17.198,7.7,17.198,17.198V194.538z M198.955,194.538c0,9.498-7.701,17.198-17.198,17.198 c-9.498,0-17.198-7.7-17.198-17.198V105.46c0-9.498,7.7-17.198,17.198-17.198s17.198,7.7,17.198,17.198V194.538z"/></g></svg>';
        this.stopButtonIcon = document.createElement("div");
        this.stopButtonIcon.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455 455" style="enable-background:new 0 0 455 455;" xml:space="preserve"><g><g><path d="M227.5,0C101.761,0,0,101.75,0,227.5C0,353.239,101.75,455,227.5,455C353.24,455,455,353.25,455,227.5 C455,101.761,353.25,0,227.5,0z M308.27,289.139c0,10.548-8.582,19.13-19.131,19.13H165.862c-10.548,0-19.13-8.582-19.13-19.13 V165.861c0-10.548,8.582-19.13,19.13-19.13h123.277c10.549,0,19.131,8.582,19.131,19.13V289.139z"/></g></svg>';

    }

    addVideo(){
        document.body.appendChild(this.myVideo);
    }
    preventSleep()
    {
        this.addVideo();
        this.myVideo.loop=true;
        this.myVideo.play(); 
    } ;

    allowSleep()
    {
        this.myVideo.removeAttribute('loop');
        this.myVideo.pause();
        try{
        document.body.removeChild(this.myVideo);
        } catch(e){

        }
    };

}

function callbackFunction(){
    alert("the end");
}

