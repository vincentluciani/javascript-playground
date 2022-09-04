
var checkboxWithTitle = function(title,variable){

    const divContainer = document.createElement("div");
    const divText = document.createElement("div");
    divText.setAttribute("class","input-title")
    divText.innerHTML=title;
    divContainer.appendChild(divText);
    
    var checkBoxContainer = document.createElement("label");
    checkBoxContainer.setAttribute("class","custom-checkbox-container")
    
    const newInput = document.createElement("input");
    newInput.setAttribute("id","is-critical");
    newInput.setAttribute("class","simple-checkbox");
    if (variable!=null && variable == "true") {
        newInput.checked = true;  
    } else if (variable == "false"){
        newInput.checked = false;
    }
    newInput.value=newInput.checked;
    
    var checkMark = document.createElement("span");
    checkMark.setAttribute("class","checkmark");
    
    newInput.setAttribute("type","checkbox");
    
    checkBoxContainer.appendChild(newInput);
    checkBoxContainer.appendChild(checkMark);
    divContainer.appendChild(checkBoxContainer);

    return divContainer;
}
