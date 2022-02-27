var encourageIfPassedTarget=function(e,t){e==t&&(document.getElementById("positive-message").style.display="flex",document.getElementById("positive-message-title").innerHTML=buildCongratulationTitle("en_US")+" :)",document.getElementById("positive-message-subtitle").innerHTML=buildCongratulationSubTitle("en_US"))},closeMessage=function(){document.getElementById("positive-message").style.display="none"},buildCongratulationTitle=function(e){var t=translations[e].amazing;return t[getRandomNumber(0,t.length-1)]},buildCongratulationSubTitle=function(e){var t=translations[e].encouraging;return t[getRandomNumber(0,t.length-1)]},addHabitElement=function(e){const t=document.createElement("div");t.setAttribute("habitDescription",e.habitDescription),t.setAttribute("target",e.target),t.setAttribute("class","box habit-setting"),t.setAttribute("id",e.habitId.toString()),t.setAttribute("habitId",e.habitId),t.setAttribute("weekDay",e.weekDay),t.setAttribute("isNegative",e.isNegative);const n=document.createTextNode("Update habit:");var a=document.createElement("i");a.setAttribute("class","fa fa-tasks");const r=document.createElement("div");r.appendChild(a),r.appendChild(n),r.setAttribute("class","habit-title");const o=document.createTextNode("Habit description:"),s=document.createElement("div");s.appendChild(o);const i=document.createElement("textarea");i.value=e.habitDescription,i.setAttribute("class","habit-description-definition large"),i.setAttribute("rows",3);const d=document.createTextNode("Daily Target:"),l=document.createElement("div");l.appendChild(d);const u=document.createElement("input");u.setAttribute("class","habit-target-definition"),u.setAttribute("type","number"),u.value=e.target,t.appendChild(r),t.appendChild(s),t.appendChild(i),t.appendChild(l),t.appendChild(u);var c=dynamicWeekDaySelector(e.weekDay);t.appendChild(c);const g=document.createElement("div");var m="deleteHabit("+e.habitId.toString()+");";g.setAttribute("onClick",m),g.setAttribute("class","add-button"),g.innerHTML="Delete",t.appendChild(g),document.getElementById("habits-definition-container").appendChild(t)},deleteHabit=function(e){var t="habit-"+e.toString(),n=document.getElementById(e.toString());n.parentNode.removeChild(n),window.localStorage.removeItem(t)},displayJournalEditBox=function(){var e=document.getElementById("date-filter").value,t=document.getElementById("journal-edit-box"),n=document.getElementById("daily-journal"),a=getCurrentDateJournal(e);n.value="",a&&a.length>0&&(n.value=JSON.parse(a)),t.setAttribute("progressDate",e),t.style.display="flex"},getCurrentDateJournal=function(e){return window.localStorage.getItem("journal-"+e)},closeJournal=function(){var e=document.getElementById("journal-edit-box"),t=e.getAttribute("progressDate"),n=document.getElementById("daily-journal").value,a={id:"journal-"+t.toString(),value:JSON.stringify(n)};executePushToQueue(a),e.style.display="none"},convertJournalKeyToDateInt=function(e){var t=e.substring(8,12)+e.substring(13,15)+e.substring(16,19);return parseInt(t)},readJournal=function(e){if(0==e.length)return 0;e.sort(function(e,t){return convertJournalKeyToDateInt(t.key)-convertJournalKeyToDateInt(e.key)});for(var t=0;t<e.length;t++){var n=e[t].text;if(n.length>0){var a=document.createElement("br"),r=document.createElement("div"),o=document.createElement("div");o.innerHTML=e[t].key.substr(8),o.setAttribute("class","date-label");var s=document.createElement("div");s.innerHTML=n,s.setAttribute("class","text-label"),r.appendChild(o),r.appendChild(s),r.appendChild(a),document.getElementById("journal-container").appendChild(r)}}},addElement=function(e){const t=document.createElement("div");t.setAttribute("id",e.id),t.setAttribute("habitDescription",e.habitDescription),t.setAttribute("target",e.target),t.setAttribute("progressDate",e.progressDate),t.setAttribute("class","box habit-update"),t.setAttribute("isNew",e.isNew),t.setAttribute("habitId",e.habitId),t.setAttribute("isNegative",e.isNegative);document.createElement("div");const n=document.createTextNode(e.habitDescription),a=document.createElement("input"),r=document.createTextNode("Number of times completed:"),o=document.createTextNode("Check when completed:"),s=document.createTextNode("Percentage Completion:"),i=document.createElement("input"),d=document.createElement("div"),l=document.createTextNode(" of "+e.target),u=document.createElement("div");u.setAttribute("class","side-text"),u.appendChild(l);var c=0;null!=e.isNegative&&"true"==e.isNegative?e.numberOfCompletions<=e.target&&(c=100):c=Math.round(100*e.numberOfCompletions/e.target),i.setAttribute("class","number-of-completion"),d.setAttribute("class","percentage-completion"),d.setAttribute("progressDate",e.progressDate),d.innerHTML=c.toString();var g=document.createElement("div");g.setAttribute("class","habit-description");var m=document.createElement("i");m.setAttribute("class","fa fa-tasks"),g.appendChild(m),g.appendChild(n),t.appendChild(g);var p=document.createElement("div");if(p.setAttribute("class","progress-container"),e.target>1){i.setAttribute("type","number"),i.setAttribute("value",e.numberOfCompletions),p.appendChild(r);var y=document.createTextNode("+"),h=document.createElement("div");h.setAttribute("class","plus-button normal");var b=document.createTextNode("-"),f=document.createElement("div");h.appendChild(y),f.setAttribute("class","minus-button normal"),f.appendChild(b),h.addEventListener("click",function(e){return function(){var t=e.getElementsByClassName("number-of-completion")[0];addOneToProgress(t),refreshProgress(e),console.log("added progress:"),console.log(e),pushProgressToQueue(e)}}(t)),f.addEventListener("click",function(e){return function(){var t=e.getElementsByClassName("number-of-completion")[0];minusOneToProgress(t),refreshProgress(e),console.log("added progress"),console.log(e),pushProgressToQueue(e)}}(t)),t.appendChild(p),t.appendChild(f),t.appendChild(i),t.appendChild(h),t.appendChild(u)}else p.appendChild(o),i.setAttribute("type","checkbox"),1==e.numberOfCompletions?(i.checked=!0,i.setAttribute("value","1")):(i.checked=!1,i.setAttribute("value","0")),i.addEventListener("click",function(e){return function(){var t=e.getElementsByClassName("number-of-completion")[0];1==t.checked?t.setAttribute("value","1"):t.setAttribute("value","0"),refreshProgress(e),console.log("added progress"),console.log(e),pushProgressToQueue(e)}}(t)),t.appendChild(p),t.appendChild(i);var v=document.createElement("div");v.setAttribute("class","progress-container"),v.appendChild(s),t.appendChild(v),t.appendChild(d),a.value=e.target,document.getElementById("habits-container").appendChild(t),t.addEventListener("change",function(e){return function(){refreshProgress(e),console.log("added progress"),console.log(e),pushProgressToQueue(e)}}(t))},weekSelectionDiv=document.getElementById("week-day-selection"),mondayButtonInAddDiv=weekSelectionDiv.getElementsByClassName("monday")[0],tuesdayButtonInAddDiv=weekSelectionDiv.getElementsByClassName("tuesday")[0],wednesdayButtonInAddDiv=weekSelectionDiv.getElementsByClassName("wednesday")[0],thursdayButtonInAddDiv=weekSelectionDiv.getElementsByClassName("thursday")[0],fridayButtonInAddDiv=weekSelectionDiv.getElementsByClassName("friday")[0],saturdayButtonInAddDiv=weekSelectionDiv.getElementsByClassName("saturday")[0],sundayButtonInAddDiv=weekSelectionDiv.getElementsByClassName("sunday")[0];mondayButtonInAddDiv.addEventListener("click",function(e,t){return function(){setDayOfWeek(e,"monday",t)}}(weekSelectionDiv,mondayButtonInAddDiv)),tuesdayButtonInAddDiv.addEventListener("click",function(e,t){return function(){setDayOfWeek(e,"tuesday",t)}}(weekSelectionDiv,tuesdayButtonInAddDiv)),wednesdayButtonInAddDiv.addEventListener("click",function(e,t){return function(){setDayOfWeek(e,"wednesday",t)}}(weekSelectionDiv,wednesdayButtonInAddDiv)),thursdayButtonInAddDiv.addEventListener("click",function(e,t){return function(){setDayOfWeek(e,"thursday",t)}}(weekSelectionDiv,thursdayButtonInAddDiv)),fridayButtonInAddDiv.addEventListener("click",function(e,t){return function(){setDayOfWeek(e,"friday",t)}}(weekSelectionDiv,fridayButtonInAddDiv)),saturdayButtonInAddDiv.addEventListener("click",function(e,t){return function(){setDayOfWeek(e,"saturday",t)}}(weekSelectionDiv,saturdayButtonInAddDiv)),sundayButtonInAddDiv.addEventListener("click",function(e,t){return function(){setDayOfWeek(e,"sunday",t)}}(weekSelectionDiv,sundayButtonInAddDiv));var setDayOfWeek=function(e,t,n){var a=e.getAttribute("weekday"),r=a.split(" ");if(n.classList.contains("selected")){n.classList.remove("selected"),n.classList.add("unselected");const e=r.indexOf(t);e>-1&&r.splice(e,1)}else n.classList.add("selected"),n.classList.remove("unselected"),r.push(t);a=r.join(" "),e.setAttribute("weekday",a)},weekDayNumbers={1:"monday",2:"tuesday",3:"wednesday",4:"thursday",5:"friday",6:"saturday",0:"sunday"},isDayOfWeekInHabitWeeks=function(e,t){var n=e.getDay(),a=weekDayNumbers[n];return t.split(" ").indexOf(a)>-1},dynamicWeekDaySelector=function(e){var t=document.createElement("div");t.setAttribute("class","week-day-selection"),t.setAttribute("weekday",e);const n=document.createElement("label"),a=document.createTextNode("Applies to the following days of the week:");n.appendChild(a);var r=dayOfWeek("monday","M",e),o=dayOfWeek("tuesday","T",e),s=dayOfWeek("wednesday","W",e),i=dayOfWeek("thursday","T",e),d=dayOfWeek("friday","F",e),l=dayOfWeek("saturday","S",e),u=dayOfWeek("sunday","S",e);return addWeekDayListener(t,r,"monday"),addWeekDayListener(t,o,"tuesday"),addWeekDayListener(t,s,"wednesday"),addWeekDayListener(t,i,"thursday"),addWeekDayListener(t,d,"friday"),addWeekDayListener(t,l,"saturday"),addWeekDayListener(t,u,"sunday"),t.appendChild(n),t.appendChild(r),t.appendChild(o),t.appendChild(s),t.appendChild(i),t.appendChild(d),t.appendChild(l),t.appendChild(u),t},addWeekDayListener=function(e,t,n){t.addEventListener("click",function(e,t){return function(){setDayOfWeek(e,n,t)}}(e,t))},dayOfWeek=function(e,t,n){var a=document.createElement("div");if(1==isDayInListOfDaysString(e,n))var r="weekday "+e+" selected";else r="weekday "+e+" unselected";return a.setAttribute("class",r),a.innerHTML=t,a},isDayInListOfDaysString=function(e,t){return t.split(" ").indexOf(e)>-1},resetWeekDaySelector=function(e){e.setAttribute("weekday","");for(var t,n=e.getElementsByClassName("weekday");t<n.length;t++)n[t].style.removeClass("selected")};function getRandomNumber(e,t){var n=Math.random();return Math.floor(1e3*n)%2==0?randomNumber=Math.floor((t-e)*n+e):randomNumber=Math.ceil((t-e)*n+e),randomNumber}var translations={en_US:{amazing:["Amazing","Superb","Outstanding","Magnificient","Exceptional","Marvellous","Wonderful","Sublime","Supreme","Splendid","Fantastic","Awesome","Mind-blowing","Brilliant","Smashing"],encouraging:["A little progress each day adds up to big results!","You are stronger than you know!","You are capable of amazing things!","Believe in yourself and you will be unstoppable!","You are doing exactly what you should be doing!","You are being so strong and patient!","I admire how strong you are!","I cannot wait to see what you do next!","You are doing a great job!","You are getting better every day!","I am so proud of you!","You are on the right track!","You made it look easy!"]}},pushProgressToQueue=function(e){var t=readElement(e);encourageIfPassedTarget(t.numberOfCompletions,t.target);var n={id:"progress-"+t.id,value:JSON.stringify(t)};executePushToQueue(n)},pushProgressArrayToQueue=function(e){var t={id:"progress-"+e.id,value:JSON.stringify(e)};executePushToQueue(t)},executePushToQueue=function(e){console.log("pushing to queue:"),console.log(e);var t=updateQueue.length,n=updateQueue.pop();null!=n&&n.id!=e.id?(console.log("putting back previous"),updateQueue.push(n)):(console.log("did not put back previous:"),console.log(n)),updateQueue.push(e),console.log(updateQueue),console.log("size before push:"+t.toString()+" size after push:"+updateQueue.length.toString())},pushItemInQueue=function(e){updateQueue.push(e)},readQueueProgress=function(){for(;updateQueue.length>0;){var e=updateQueue.shift();console.log("reading from queue"),console.log(e),putInStorage(e.id,e.value);var t=new Date;document.getElementById("last-saved-information").innerHTML="Last saved: "+t.toLocaleTimeString()}},putInStorage=function(e,t){try{window.localStorage.setItem(e,t)}catch(e){console.error(e),console.error("Problem writing progress:"+elementToProcess.id.toString()),console.error(currentOutput)}},loggedIn=!1,maxForNonLoggedIn=200,updateQueue=[],currentDateTime=new Date,currentDate=currentDateTime.getFullYear().toString().padStart(2,"0")+"-"+(currentDateTime.getMonth()+1).toString().padStart(2,"0")+"-"+currentDateTime.getDate().toString().padStart(2,"0"),plusButtonInAddDiv=document.getElementById("plus-in-add-div"),minusButtonInAddDiv=document.getElementById("minus-in-add-div"),newTargetDiv=document.getElementById("new-target");onload=function(){"use strict";document.getElementById("date-filter").value=currentDate,getHabitProgress(),addEmptyProgressOnNewDay(),saveLoop()};var saveLoop=function(){setInterval(extractElementsForUpdate,5e3)};plusButtonInAddDiv.addEventListener("click",function(e){return function(){addOneToProgress(e)}}(newTargetDiv)),minusButtonInAddDiv.addEventListener("click",function(e){return function(){minusOneToProgress(e)}}(newTargetDiv));var getHabitProgress=function(){loggedIn?getHabitProgressWhenLoggedIn():getHabitProgressWhenNotLoggedIn()},getHabitProgressWhenLoggedIn=function(){var e={method:"GET",url:"http://localhost:5000/get-habit-progress"};new APICaller(e,ingestElements,getHabitProgressWhenNotLoggedIn).executeCall(e.url,{})},getHabitProgressWhenNotLoggedIn=function(){for(var e=[],t=[],n=[],a=0;a<localStorage.length&&a<maxForNonLoggedIn;a++){var r=localStorage.key(a);r.indexOf("progress-")>=0?e.push(JSON.parse(localStorage.getItem(r))):r.indexOf("habit-")>=0?t.push(JSON.parse(localStorage.getItem(r))):r.indexOf("journal-")>=0&&n.push({key:r,text:JSON.parse(localStorage.getItem(r))})}t.length>1?changeTabToProgress():t.length>0?(changeTabToProgress(),hideGraphsTab()):(changeTabToHabits(),hideProgressTab(),hideGraphsTab(),hideSaveButtonOnHabits(),hideStartProgressButtonOnHabits()),n.length<1&&hideJournalBox(),ingestElements(e,t,n)},hideJournalBox=function(){document.getElementById("journal-container").innerHTML="no entry yet"},hideProgressTab=function(){document.getElementById("progress-menu").style.display="none"},showProgressTab=function(){document.getElementById("progress-menu").style.display="block"},hideGraphsTab=function(){document.getElementById("graphs-menu").style.display="none"},showGraphsTab=function(){document.getElementById("graphs-menu").style.display="block"},hideSaveButtonOnHabits=function(){document.getElementById("save-button-in-habits").style.display="none"},showSaveButtonOnHabits=function(){document.getElementById("save-button-in-habits").style.display="flex"},hideStartProgressButtonOnHabits=function(){document.getElementById("go-to-progress-button").style.display="none"},showStartProgressButtonOnHabits=function(){document.getElementById("go-to-progress-button").style.display="flex"},ingestElements=function(e,t,n,a){for(var r=0;r<e.length;r++)addElement(e[r]);for(r=0;r<t.length;r++)addHabitElement(t[r]);applyFilters(),launchCharts(e,t),readJournal(n)},filterDivs=function(e,t,n,a){if(null!=n&&""!=n)for(var r=0;r<e.length;r++){var o=e[r].getAttribute(t);o==n&&a||o.indexOf(n)>=0&&!a||(e[r].style.display="none")}},resetElements=function(){for(var e=document.getElementsByClassName("habit-update"),t=0;t<e.length;t++){e[t].style.display="block";var n=e[t],a=n.getElementsByClassName("number-of-completion")[0];null!=a&&(refreshProgress(n),a.addEventListener("change",function(e){return function(){refreshProgress(e)}}(n)))}return e},refreshProgress=function(e){var t=e.getElementsByClassName("number-of-completion")[0],n=0,a=e.getAttribute("isNegative");null!=a&&"true"==a?t.value<=parseInt(e.getAttribute("target"))&&(n=100):n=Math.round(100*t.value/parseInt(e.getAttribute("target"))),e.getElementsByClassName("percentage-completion")[0].innerHTML=n,putColorBasedOnCompletion(e,n),updateDailyProgress()},putColorBasedOnCompletion=function(e,t){t>=100?(e.style.background="#f7fff6",e.style.boxShadow="rgb(55 110 57 / 20%) 1px 4px 16px 5px"):t>=50?(e.style.background="#fffded",e.style.boxShadow="rgb(219 213 191) -1px 2px 17px 0px"):t<50&&(e.style.background="#fff6f9",e.style.boxShadow="rgb(233 206 206) -1px 2px 10px 0px")},updateDailyProgress=function(){for(var e=document.getElementsByClassName("percentage-completion"),t=document.getElementById("date-filter").value,n=0,a=0,r=0;r<e.length;r++){if(e[r].getAttribute("progressDate")==t){var o=parseInt(e[r].innerHTML);n+=o=o>100?100:o,a++}}var s=Math.round(n/a),i=document.getElementById("daily-summary");if(s&&s>0)i.innerHTML=s.toString();else{s=0;i.innerHTML="0"}putColorBasedOnCompletion(i.parentNode,s)},applyFilters=function(){var e=resetElements(),t=document.getElementById("text-filter").value,n=document.getElementById("date-filter").value;filterDivs(e,"progressDate",n,!0),filterDivs(e,"habitDescription",t,!1)},dateFilter=document.getElementById("date-filter");dateFilter.addEventListener("input",function(e){applyFilters()});var textFilter=document.getElementById("text-filter");textFilter.addEventListener("input",function(e){applyFilters()});var minusOneToProgress=function(e){console.log("minus one"),parseInt(e.value)>0&&(e.value=(parseInt(e.value)-1).toString())},addOneToProgress=function(e){console.log("plus one"),e.value=(parseInt(e.value)+1).toString()},addElementFromForm=function(){var e={};e.id=Date.now(),e.habitId=10*e.id,e.habitDescription=document.getElementById("new-description").value,e.target=parseInt(document.getElementById("new-target").value),e.isNegative=document.getElementById("new-is-negative-flag").checked,e.progressDate=currentDate,e.numberOfCompletions=0,e.isNew=!0;var t=document.getElementById("week-day-selection");if(e.weekDay=t.getAttribute("weekDay"),e.weekDay)var n=isDayOfWeekInHabitWeeks(currentDateTime,e.weekDay);else n=!0;null!=n&&1==n&&addElement(e),addHabitElement(e),pushProgressArrayToQueue(e),document.getElementById("new-description").value=null,document.getElementById("new-target").value=1,document.getElementById("new-is-negative-flag").checked=!1,resetWeekDaySelector(t),showProgressTab(),showSaveButtonOnHabits(),showStartProgressButtonOnHabits()},displayAllElements=function(e){for(var t=0;t<e.length;t++){const e=document.createElement("div");document.body.appendChild(e)}},extractElementsForUpdate=function(){console.log("saving");var e=document.getElementsByClassName("habit-update"),t=document.getElementsByClassName("habit-setting");loggedIn?extractElementsForUpdateLoggedIn(e,t):extractElementsForUpdateNoneLoggedIn(e,t)},extractElementsForUpdateLoggedIn=function(e,t){for(var n=[],a=0;a<e.length&&a<maxForNonLoggedIn;a++){var r=readElement(e[a]);n.push(r)}console.log(n)},extractElementsForUpdateNoneLoggedIn=function(e,t){readQueueProgress();for(var n=0;n<t.length;n++){var a=readHabitElement(t[n]);window.localStorage.setItem("habit-"+a.habitId,JSON.stringify(a))}},readHabitElement=function(e){var t={};return t.habitId=e.getAttribute("habitId"),t.isNegative=e.getAttribute("isNegative"),t.habitDescription=e.getElementsByClassName("habit-description-definition")[0].value,t.target=parseInt(e.getElementsByClassName("habit-target-definition")[0].value),t.weekDay=e.getElementsByClassName("week-day-selection")[0].getAttribute("weekDay"),t},readElement=function(e){var t={};return t.id=e.getAttribute("id"),t.habitId=e.getAttribute("habitId"),t.habitDescription=e.getAttribute("habitDescription"),t.target=parseInt(e.getAttribute("target")),t.progressDate=e.getAttribute("progressDate"),t.isNew=e.getAttribute("isNew"),t.isNegative=e.getAttribute("isNegative"),t.numberOfCompletions=parseInt(e.getElementsByClassName("number-of-completion")[0].value),t};function APICaller(e,t,n){this.parameters=e,this.callback=t,this.executeCall=function(a,r){var o=new XMLHttpRequest;o.onreadystatechange=function(){4==this.readyState&&200==this.status?t(JSON.parse(this.responseText),r):n()},o.open(e.method,a,!0),o.send()}}var addEmptyProgressOnNewDay=function(){var e=document.getElementsByClassName("habit-update"),t=document.getElementsByClassName("habit-setting");document.getElementById("daily-summary").innerHTML="0";for(var n=0;n<t.length;n++){for(var a=!1,r=0;r<e.length;r++)t[n].getAttribute("habitId")==e[r].getAttribute("habitId")&&e[r].getAttribute("progressdate")==currentDate&&(a=!0);if(0==a){if(t[n].getAttribute("weekDay"))var o=isDayOfWeekInHabitWeeks(currentDateTime,t[n].getAttribute("weekDay"));else o=!0;null!=o&&1==o&&(newProgressObject={id:100*Date.now()+n,habitId:t[n].getAttribute("habitId"),habitDescription:t[n].getAttribute("habitDescription"),target:t[n].getAttribute("target"),progressDate:currentDate,isNew:!0,numberOfCompletions:0},addElement(newProgressObject),console.log("added progress"),console.log(newProgressObject),pushProgressArrayToQueue(newProgressObject))}}},launchCharts=function(e,t){for(var n=0;n<t.length;n++)launchChart(e,t[n])},changeTabToProgress=function(){document.getElementById("habits-section").style.display="none",document.getElementById("progress-section").style.display="block",document.getElementById("graphs-section").style.display="none",document.getElementById("progress-menu").classList.add("active"),document.getElementById("habits-menu").classList.remove("active"),document.getElementById("graphs-menu").classList.remove("active")},changeTabToHabits=function(){document.getElementById("habits-section").style.display="block",document.getElementById("progress-section").style.display="none",document.getElementById("graphs-section").style.display="none",document.getElementById("progress-menu").classList.remove("active"),document.getElementById("habits-menu").classList.add("active"),document.getElementById("graphs-menu").classList.remove("active"),document.getElementById("new-description").focus()},changeTabToGraphs=function(){document.getElementById("habits-section").style.display="none",document.getElementById("progress-section").style.display="none",document.getElementById("graphs-section").style.display="block",document.getElementById("progress-menu").classList.remove("active"),document.getElementById("habits-menu").classList.remove("active"),document.getElementById("graphs-menu").classList.add("active")},launchChart=function(e,t){for(var n=[],a=[],r=0;r<e.length;r++)e[r].habitId==t.habitId&&(n.push({x:new Date(e[r].progressDate),y:e[r].numberOfCompletions}),a.push({x:new Date(e[r].progressDate),y:e[r].target}));n.sort(function(e,t){return e.x-t.x}),n.length>1&&showGraphsTab(),a.sort(function(e,t){return e.x-t.x});var o=0;for(r=n.length-1;r>=0&&!(n[r].y<a[r].y);r--)o++;var s,i={},d=0,l=n.length-1;if(l<1)return!1;if(!(l>=0&&n[l]&&n[l].x))return!1;var u=n[l].x.getDay();n[l].y>=a[l].y?s="<i class='fa fa-circle icon'></i>":(s="x",d++),i[u]=null!=s?s:" ";do{if(--l<0)break;if(l>=0&&n[l]&&n[l].x){var c=n[l].x.getDay();if(0!=u){if(c>u||0==c)break}else if(0==c)break;n[l].y>=a[l].y?s="<i class='fa fa-circle icon'></i>":(s="x",d++),null==i[c]&&(i[c]=null!=s?s:" ")}}while(c>1);var g="<table><tr><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th><th>S</th></tr>";g+="<tr><td>"+getElementToPutOnTable(i[1])+"</td><td>"+getElementToPutOnTable(i[2])+"</td><td>"+getElementToPutOnTable(i[3])+"</td><td>"+getElementToPutOnTable(i[4])+"</td><td>"+getElementToPutOnTable(i[5])+"</td><td>"+getElementToPutOnTable(i[6])+"</td><td>"+getElementToPutOnTable(i[0])+"</td></tr></table>";var m=document.createElement("canvas"),p=document.createElement("div"),y=document.createElement("br");const h=document.createTextNode(t.habitDescription),b=document.createElement("div"),f=document.createElement("div");var v=document.createElement("i");v.setAttribute("class","fa fa-bar-chart");const E=document.createElement("div");E.innerHTML="Number of streaks: "+o.toString(),E.setAttribute("class","subtitle"),b.setAttribute("class","graph-title"),b.appendChild(v),b.appendChild(h);const I=document.createElement("div");I.innerHTML="This week summary:",I.setAttribute("class","subtitle"),f.setAttribute("class","table-summary"),f.innerHTML=g;const D=document.createElement("div");D.innerHTML="Graph:",D.setAttribute("class","subtitle"),m.setAttribute("id","graph-"+t.habitId),p.appendChild(b),p.appendChild(I),p.appendChild(f),p.appendChild(y),p.appendChild(E),p.appendChild(D),p.append(m),p.setAttribute("class","box canva-wrapper"),0==d?p.style.background="#f7fff6":1==d?p.style.background="#fffded":d>1&&(p.style.background="#fff6f9"),document.getElementById("graph-container").appendChild(p);var B=document.getElementById("graph-"+t.habitId).getContext("2d");o>=10?(graphBackgroundColor="#b5f7b1",graphColor="#3ce132"):(graphBackgroundColor="#f9dbdb",graphColor="#fd2121");let k={datasets:[{label:"Your daily score",data:n,backgroundColor:graphBackgroundColor,borderColor:graphColor,color:"blue",order:1}]};new Chart(B,{data:k,options:{responsive:!0,legend:{position:"bottom",display:!1},scales:{xAxes:[{type:"time",time:{parser:"YYYY-MM-DD",unit:"day"}}],yAxes:[{scaleLabel:{display:!0,labelString:"Progress",type:"line",suggestedMin:0,beginAtZero:!0}}]}},type:"line"})},getElementToPutOnTable=function(e){return e||" "};