import "./reset.css";
import "./style.css";
import { enableDropdown } from "./drop-down";
import { nextSlide, previousSlide, calculateOffset } from "./carousel";


let dropdownContainer1 = document.getElementById("container1");
let dropdownContainer2 = document.getElementById("container2");
enableDropdown(dropdownContainer1);
enableDropdown(dropdownContainer2);

let carouselElement = document.getElementById("carousel");
document.addEventListener("click", (event)=>{
    if (event.target.id == "next"){
        nextSlide(carouselElement);
    }
    else if (event.target.id == "prev"){
        previousSlide(carouselElement);
    }
    else if (event.target.classList.contains("circle")){
        let targetSlide = event.target.dataset.slide;
        let imageSet = carouselElement.children;
        calculateOffset(carouselElement,imageSet, targetSlide)
    }
})

setInterval(nextSlide, 5000, carouselElement);