//
//  functions almost out of the box. Supports image carousel where a framing div
//  encapsulates a much larger carousel div, which in turn houses image elements
//  
//  <div id="frame">
//      <div id="carousel">
//        <img />
//        <img />
//        <img />
//        <img />
//      </div>
//  </div>
//  
//  
//  
//  
//  
//  

export function nextSlide(carouselElement){
    let currentSlide;
    if(carouselElement.getAttribute("current-slide") == undefined){
        currentSlide = 0;
    }
    else{
        currentSlide = +carouselElement.getAttribute("current-slide");
    }
    let imageSet = carouselElement.children;
    //if on last slide and click next, return to start
    let nextSlide;
    if(currentSlide == imageSet.length-1){
        nextSlide = 0;
    }
    else{
        nextSlide = currentSlide+1
    }
    calculateOffset(carouselElement, imageSet, nextSlide);
}

export function calculateOffset(carouselElement, imageSet, targetSlide){

    //find calculated padding on leftside of carousel(provided by CSS)
    let paddingLeftOfCarousel = parseInt(window.getComputedStyle(carouselElement, null).getPropertyValue('padding-left'));

    //find offset that will place next slide at start of frame if applied to carousel's "right" property
    let offset = paddingLeftOfCarousel;
    //NEEDS TO BE EXPANDED FOR ALL SLIDES, NOT JUST FIRST 
    let carouselGap = parseInt(window.getComputedStyle(carouselElement, null).getPropertyValue('gap'))
    //add carouselGap and slide width for each passed slide
    for(let i = 0; i<targetSlide; i++){
        offset += imageSet[i].getBoundingClientRect().width;
        offset += carouselGap;
    }
    //find width of frame
    let frameElement = carouselElement.parentElement;
    let frameBorder = parseInt(window.getComputedStyle(frameElement, null).getPropertyValue('border-width'));
    let frameWidth = frameElement.getBoundingClientRect().width - frameBorder*2;

    //get rectangle(dimensions) of next slide
    let nextSlideBox = imageSet[targetSlide].getBoundingClientRect();

    //find space that next slide does not inhabit of the frame, then cut in half
    let nextFrameCorrection = (frameWidth - nextSlideBox.width)/2;
    // let offset = currentSlideBox.width + carouselGap + paddingLeftOfCarousel;
    offset = offset - nextFrameCorrection;
    if (targetSlide ==0) offset = 0;

    carouselElement.style.right = offset +"px";
    carouselElement.setAttribute("current-slide", String(targetSlide));

    let circlesElement = document.getElementById("circles");
    let circleArray = circlesElement.children;
    for(let i=0; i<circleArray.length; i++){
        let circle = circleArray[i];
        console.log(circle);
        console.log(circle.dataset.slide);
        console.log(targetSlide);
        if(circle.dataset.slide == targetSlide){
            circle.style.backgroundColor = "blue";
        }
        else{
            circle.style.backgroundColor = "white";
        }
    }
}

export function previousSlide(carouselElement){
    let currentSlide;
    if(carouselElement.getAttribute("current-slide") == undefined){
        currentSlide = 0;
    }
    else{
        currentSlide = +carouselElement.getAttribute("current-slide");
    }
    let imageSet = carouselElement.children;
    //if on last slide and click next, return to start
    // if(currentSlide == 1){
    //     carouselElement.setAttribute("current-slide", "0");
    //     carouselElement.style.right = "0px";
    //     return;
    // }
    let prevSlide;
    if(currentSlide == 0) prevSlide = imageSet.length-1;
    else prevSlide = currentSlide - 1;
    calculateOffset(carouselElement, imageSet, prevSlide);
}