
// make the checkbox div focusable
const captchaCheckbox = document.getElementById("captcha-checkbox")
const checkboxSpinner = document.getElementById("captcha-checkbox-spinner")
captchaCheckbox.addEventListener("mousedown",()=> {
    // console.log("focused")
    captchaCheckbox.classList.add("focused")
    captchaCheckbox.classList.remove("blurred")

})

captchaCheckbox.addEventListener("mouseup",()=> {
    // console.log("blurred")
    captchaCheckbox.classList.add("blurred")
    captchaCheckbox.classList.remove("focused")
})

captchaCheckbox.addEventListener("click",()=> {
    checkboxSpinner.style.display = "block"
    captchaCheckbox.style.display = "none"
    captchaCheckbox.style.visibility = "false"
    setTimeout(()=>{
        captchaCheckbox.style.display = "block"
        checkboxSpinner.style.display = "none"

        // show the solve box
        const solveBox = document.getElementById("solve-box")
        if (solveBox.style.display == "block") {
            solveBox.style.display = "none"
        }
        else {
            solveBox.style.display = "block"
        }
    },Math.floor(Math.random()*1000)+200)
})

// show error if submit button is click without checking the checkbox
document.getElementById("submit").addEventListener("click",()=>{
    // console.log("clicked")
    document.getElementById("captcha-main-div").classList.add("error")
    document.getElementById("captcha-error-msg").style.display = "block"
})

// fill up the solve-image-container
const rowCount = 3
const colCount = 3
const solveImageContainer = document.getElementById("solve-image-main-container")
const solveText = ["traffic cones", "traffic lights", "cars", "the hidden present!"]
document.getElementById("solve-title-text").textContent = solveText[0]
for (let i=0; i<3; i++) {
    for (let j=0; j<3; j++) {
        const imageContainer = document.createElement("div")
        imageContainer.classList.add("solve-image-container")
        const image = document.createElement("img")
        image.setAttribute("src",`./image1/image${i+1}_${j+1}.png`)
        image.classList.add("solve-image")
        image.classList.add("unhighlighted")
        image.addEventListener("click",()=>{
            invertHightlightImage(image)
        })
        imageContainer.appendChild(image)
        solveImageContainer.appendChild(imageContainer)
    }
}

// image on click will invert highlight
const invertHightlightImage = (image) => {
    if(image.classList.contains("unhighlighted")){
        image.classList.add("highlighted")
        image.classList.remove("unhighlighted")
    }
    else {
        image.classList.remove("highlighted")
        image.classList.add("unhighlighted")
    }
    
}

// advance image when verify is click
let puzzleStage = 1
document.getElementById("verify").addEventListener("click",()=> {
    if(puzzleStage < 4){
    puzzleStage += 1
    solveImageContainer.classList.add("fade-out")
    document.getElementById("solve-image-error-msg").style.display = "none"
    setTimeout(()=> {
        solveImageContainer.classList.remove("fade-out")
        solveImageContainer.innerHTML = ""
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                const imageContainer = document.createElement("div")
                imageContainer.classList.add("solve-image-container")

                const image = document.createElement("img")
                image.setAttribute("src",`./image${puzzleStage}/image${i+1}_${j+1}.png`)
                image.classList.add("solve-image")
                image.addEventListener("click",()=>{
                    invertHightlightImage(image)
                })
                imageContainer.appendChild(image)
                solveImageContainer.appendChild(imageContainer)
            }
        }
        document.getElementById("solve-title-text").textContent = solveText[puzzleStage - 1]
        refreshButton.style.pointerEvents = "auto"
    },1000)
    } else{
        document.getElementById("solve-subtitle-text").textContent = "Go find the"
    }
})

// refresh everything when refresh is clicked
const refreshButton = document.getElementById("refresh")
refreshButton.addEventListener("click",()=>{
    puzzleStage = 1
    refreshButton.style.pointerEvents = "none"
    solveImageContainer.classList.add("fade-out")
    document.getElementById("solve-image-error-msg").style.display = "none"
    setTimeout(()=> {
        solveImageContainer.classList.remove("fade-out")
        solveImageContainer.innerHTML = ""
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                const imageContainer = document.createElement("div")
                imageContainer.classList.add("solve-image-container")

                const image = document.createElement("img")
                image.setAttribute("src",`./image1/image${i+1}_${j+1}.png`)
                image.classList.add("solve-image")
                image.addEventListener("click",()=>{
                    invertHightlightImage(image)
                })
                imageContainer.appendChild(image)
                solveImageContainer.appendChild(imageContainer)
            }
        }
        document.getElementById("solve-title-text").textContent = solveText[puzzleStage - 1]
        refreshButton.style.pointerEvents = "auto"
    },1000)
   
})


// toggle information
document.getElementById("information").addEventListener("click",() =>{
    const information = document.getElementById("information-text")
    if (information.style.display == "block") {
        information.style.display = "none"
    }
    else {
        information.style.display = "block"
    }
})

// show audio div 
document.getElementById("audio").addEventListener("click",()=> {
    document.getElementById("solve-image-div").style.display = "none"
    document.getElementById("solve-audio-div").style.display = "block"
})
