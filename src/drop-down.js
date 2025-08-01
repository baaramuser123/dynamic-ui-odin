//
//add style rule to HTML for "invisible" class
//
    const styleEl = document.createElement("style");
    document.head.appendChild(styleEl);

    // Grab style element's sheet
    const styleSheet = styleEl.sheet;
    styleSheet.insertRule(".invisible { display: none }");
//

//reusable function that takes a container div element as input
// assumes container structure of div > button + div*...
// <div class="container">
//    <button>Press Me</button>
//    <div>Option1</div>
//    <div>Option2</div>
// </div>
//
export function enableDropdown(dropdownContainer){
    

    //select all options and assign invisible class
    let optionsList = dropdownContainer.querySelectorAll("div");
    optionsList.forEach((element) => {
        element.classList.add("invisible");
    });
    dropdownContainer.setAttribute("toggle-list", "invisible");
    //select dropdown's top "button" and assign listener
    let dropdownButton = dropdownContainer.querySelector("button");
    let desiredEvent = "click";
        // let desiredEvent = "mouseover";
    dropdownButton.addEventListener(desiredEvent, (event) => {
        if(dropdownContainer.getAttribute("toggle-list") == "invisible"){
            dropdownContainer.setAttribute("toggle-list", "visible");
            optionsList.forEach((element) => {
                element.classList.remove("invisible");
            });
        }
        else{
            dropdownContainer.setAttribute("toggle-list", "invisible");
            optionsList.forEach((element) => {
                element.classList.add("invisible");
            });
        }
    });
}
