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
        this.counterPointer = setInterval(this.decrementCounter.bind(this),1000);
    }

    interruptCounter(){
        if (this.state == "started"){
            clearInterval(this.counterPointer);
            this.state= "paused";
        } else if (this.state == "paused") {
            this.startCounter();
        }

    }

    resetCounter(){
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
        clearInterval(this.counterPointer);
        this.callbackFunction();
    }

    initializeIcons(){
        this.playButtonIcon = document.createElement("div");
        this.playButtonIcon.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 485 485" style="enable-background:new 0 0 485 485;" xml:space="preserve"><g><path d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5 s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026 C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5 S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z"/>       <polygon points="181.062,336.575 343.938,242.5 181.062,148.425 	"/></g></svg>';

        this.pauseButtonIcon = document.createElement("div");
        this.pauseButtonIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"><g id="XMLID_105_">       <path id="XMLID_106_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300   c-74.439,0-135-60.561-135-135S90.561,30,165,30s135,60.561,135,135S239.439,300,165,300z"/><path id="XMLID_109_" d="M194.25,82.5c-8.284,0-15,6.716-15,15v135c0,8.284,6.716,15,15,15s15-6.716,15-15v-135   C209.25,89.216,202.534,82.5,194.25,82.5z"/>            <path id="XMLID_110_" d="M135.75,82.5c-8.284,0-15,6.716-15,15v135c0,8.284,6.716,15,15,15s15-6.716,15-15v-135   C150.75,89.216,144.034,82.5,135.75,82.5z"/></g>';

        this.stopButtonIcon = document.createElement("div");
        this.stopButtonIcon.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"><g id="XMLID_223_"><path id="XMLID_224_" d="M225.75,89.25h-121.5c-8.284,0-15,6.716-15,15v121.5c0,8.284,6.716,15,15,15h121.5c8.284,0,15-6.716,15-15 v-121.5C240.75,95.966,234.034,89.25,225.75,89.25z"/><path id="XMLID_225_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300 c-74.439,0-135-60.561-135-135S90.561,30,165,30s135,60.561,135,135S239.439,300,165,300z"/></g></svg>';

    }
}

function callbackFunction(){
    alert("the end");
}

