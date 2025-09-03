import {recordedSessions} from "./sessions.js";

let getstatSesh = document.querySelector('.statSesh')
let jsstatSesh = parseFloat(getstatSesh.innerHTML)
let jsFileButton = document.querySelector('.fileButtonContainer')

let getBeta = document.querySelector('.powerBeta')
let getAlpha = document.querySelector('.powerAlpha')
let getTheta = document.querySelector('.powerTheta')
let jspowerBeta = parseFloat(getBeta.innerHTML)*1000
let jspowerAlpha = parseFloat(getAlpha.innerHTML)*1000
let jspowerTheta = parseFloat(getTheta.innerHTML)*1000

let getBetaCoins = document.querySelector('.coinsBeta')
let getAlphaCoins = document.querySelector('.coinsAlpha')
let getThetaCoins = document.querySelector('.coinsTheta')
let jscoinsBeta = parseFloat(getBetaCoins.innerHTML)
let jscoinsAlpha = parseFloat(getAlphaCoins.innerHTML)
let jscoinsTheta = parseFloat(getThetaCoins.innerHTML)

let getBetaCost = document.querySelector('.costBeta')
let getAlphaCost = document.querySelector('.costAlpha')
let getThetaCost = document.querySelector('.costTheta')
let jsCostBeta = parseFloat(getBetaCost.innerHTML)
let jsCostAlpha = parseFloat(getAlphaCost.innerHTML)
let jsCostTheta = parseFloat(getThetaCost.innerHTML)

let rateCostGrowth = 1.07
let baseCost = 5
let baseProdBoost = 2

let getBetaBoostVal = document.querySelector('.boostBetaVal')
let getAlphaBoostVal = document.querySelector('.boostAlphaVal')
let getThetaBoostVal = document.querySelector('.boostThetaVal')
let boostLvlBeta = 0
let boostLvlAlpha = 0
let boostLvlTheta = 0






const leafType = [
    {
    wave: "Beta"
    }
]

console.log(leafType[0])






function logSession() {
    jspowerBeta += Math.floor((Math.floor(Math.random() * 8) + 7)*(1+(boostLvlBeta*baseProdBoost/100))*1000)
    getBeta.innerHTML = jspowerBeta/1000
    
    jspowerAlpha += Math.floor((Math.floor(Math.random() * 8) + 7)*(1+(boostLvlAlpha*baseProdBoost/100))*1000)
    getAlpha.innerHTML = jspowerAlpha/1000
    
    jspowerTheta += Math.floor((Math.floor(Math.random() * 8) + 7)*(1+(boostLvlTheta*baseProdBoost/100))*1000)
    getTheta.innerHTML = jspowerTheta/1000

    jsstatSesh += 1
    getstatSesh.innerHTML = jsstatSesh
}

function logSessionFile(event) {
    let sesh = recordedSessions[jsstatSesh]


    if (sesh === undefined) {
        const x = Math.min(event.offsetX,140)
        const y = Math.min(event.offsetY,50)

        const div = document.createElement("div")
        div.innerHTML = "No Session to Log!"
        div.style.cssText = `color: red; position: absolute; top: ${y}px; left: ${x}px; pointer-events: none;`
        jsFileButton.appendChild(div)
        div.classList.add("seshUndefined")

        timeout(   div)

    } else {
        jspowerBeta += sesh.minsBeta*(1+(boostLvlBeta*baseProdBoost/100))*1000
        getBeta.innerHTML = jspowerBeta/1000

        jspowerAlpha += sesh.minsAlpha*(1+(boostLvlAlpha*baseProdBoost/100))*1000
        getAlpha.innerHTML = jspowerAlpha/1000

        jspowerTheta += sesh.minsTheta*(1+(boostLvlTheta*baseProdBoost/100))*1000
        getTheta.innerHTML = jspowerTheta/1000
        
        jsstatSesh += 1
        getstatSesh.innerHTML = jsstatSesh
    
    }
}

const timeout = (div) => {
    setTimeout(() => {
        div.remove()
    }, 2900)
}


function convertToCoins() {
    jscoinsBeta += Math.floor(jspowerBeta/1000)
    getBetaCoins.innerHTML = jscoinsBeta
    jspowerBeta = jspowerBeta%1000
    getBeta.innerHTML = jspowerBeta/1000

    jscoinsAlpha += Math.floor(jspowerAlpha/1000)
    getAlphaCoins.innerHTML = jscoinsAlpha
    jspowerAlpha = jspowerAlpha%1000
    getAlpha.innerHTML = jspowerAlpha/1000

    jscoinsTheta += Math.floor(jspowerTheta/1000)
    getThetaCoins.innerHTML = jscoinsTheta
    jspowerTheta = jspowerTheta%1000
    getTheta.innerHTML = jspowerTheta/1000
}

function buyLeaf(leafType){

}
function buyBeta() {
    if (jscoinsBeta >= jsCostBeta) {
        boostLvlBeta += 1
        jscoinsBeta -= jsCostBeta
        jsCostBeta = Math.round(baseCost*(rateCostGrowth**boostLvlBeta))
        getBetaCost.innerHTML = jsCostBeta
        getBetaCoins.innerHTML = jscoinsBeta
        getBetaBoostVal.innerHTML = (boostLvlBeta*baseProdBoost)
    }
}
function buyAlpha() {
    if (jscoinsAlpha >= jsCostAlpha) {
        boostLvlAlpha += 1
        jscoinsAlpha -= jsCostAlpha
        jsCostAlpha = Math.round(baseCost*(rateCostGrowth**boostLvlAlpha))
        getAlphaCost.innerHTML = jsCostAlpha
        getAlphaCoins.innerHTML = jscoinsAlpha
        getAlphaBoostVal.innerHTML = (boostLvlAlpha*baseProdBoost)
    }
}
function buyTheta() {
    if (jscoinsTheta >= jsCostTheta) {
        boostLvlTheta += 1
        jscoinsTheta -= jsCostTheta
        jsCostTheta = Math.round(baseCost*(rateCostGrowth**boostLvlTheta))
        getThetaCost.innerHTML = jsCostTheta
        getThetaCoins.innerHTML = jscoinsTheta
        getThetaBoostVal.innerHTML = (boostLvlTheta*baseProdBoost)
    }
}


//This is the conversion timer between power and coins
let sliderBeta = document.getElementById("sliderBeta");
let craftBeta = 0
let sliderAlpha = document.getElementById("sliderAlpha");
let craftAlpha = 0
let sliderTheta = document.getElementById("sliderTheta");
let craftTheta = 0
setInterval(() => {
    if (sliderBeta.checked == true)  {
        if (jspowerBeta <=0) {
            sliderBeta.checked = false
        } else {
            jspowerBeta -= 1
            craftBeta += 1
            getBeta.innerHTML = jspowerBeta/1000
            if (craftBeta >= 1000) {
                craftBeta -= 1000
                jscoinsBeta += 1
                getBetaCoins.innerHTML = jscoinsBeta
            }
        }
    }
    if (sliderAlpha.checked == true)  {
        if (jspowerAlpha <=0) {
            sliderAlpha.checked = false
        } else {    
            jspowerAlpha -= 1
            craftAlpha += 1
            getAlpha.innerHTML = jspowerAlpha/1000
            if (craftAlpha >= 1000) {
                craftAlpha -= 1000
                jscoinsAlpha += 1
                getAlphaCoins.innerHTML = jscoinsAlpha
            }
        }
    }
    if (sliderTheta.checked == true)  {
        if (jspowerTheta <=0) {
            sliderTheta.checked = false
        } else {
            jspowerTheta -= 1
            craftTheta += 1
            getTheta.innerHTML = jspowerTheta/1000
            if (craftTheta >= 1000) {
                craftTheta -= 1000
                jscoinsTheta += 1
                getThetaCoins.innerHTML = jscoinsTheta
            }
        }
    }
},1000)
console.log(localStorage)
function save() {
    localStorage.clear()

    localStorage.setItem("jsstatSesh",JSON.stringify(jsstatSesh))
    localStorage.setItem("jspowerBeta",JSON.stringify(jspowerBeta))
    localStorage.setItem("jspowerAlpha",JSON.stringify(jspowerAlpha))
    localStorage.setItem("jspowerTheta",JSON.stringify(jspowerTheta))
    localStorage.setItem("jscoinsBeta",JSON.stringify(jscoinsBeta))
    localStorage.setItem("jscoinsAlpha",JSON.stringify(jscoinsAlpha))
    localStorage.setItem("jscoinsTheta",JSON.stringify(jscoinsTheta))
    localStorage.setItem("jsCostBeta",JSON.stringify(jsCostBeta))
    localStorage.setItem("jsCostAlpha",JSON.stringify(jsCostAlpha))
    localStorage.setItem("jsCostTheta",JSON.stringify(jsCostTheta))
    localStorage.setItem("boostLvlBeta",JSON.stringify(boostLvlBeta))
    localStorage.setItem("boostLvlAlpha",JSON.stringify(boostLvlAlpha))
    localStorage.setItem("boostLvlTheta",JSON.stringify(boostLvlTheta))
    localStorage.setItem("craftBeta",JSON.stringify(craftBeta))
    localStorage.setItem("craftAlpha",JSON.stringify(craftAlpha))
    localStorage.setItem("craftTheta",JSON.stringify(craftTheta))

console.log(localStorage)
}
 
function load() {
    jsstatSesh = JSON.parse(localStorage.getItem("jsstatSesh"))
    jspowerBeta = JSON.parse(localStorage.getItem("jspowerBeta"))
    jspowerAlpha = JSON.parse(localStorage.getItem("jspowerAlpha"))
    jspowerTheta = JSON.parse(localStorage.getItem("jspowerTheta"))
    jscoinsBeta = JSON.parse(localStorage.getItem("jscoinsBeta"))
    jscoinsAlpha = JSON.parse(localStorage.getItem("jscoinsAlpha"))
    jscoinsTheta = JSON.parse(localStorage.getItem("jscoinsTheta"))
    jsCostBeta = JSON.parse(localStorage.getItem("jsCostBeta"))
    jsCostAlpha = JSON.parse(localStorage.getItem("jsCostAlpha"))
    jsCostTheta = JSON.parse(localStorage.getItem("jsCostTheta"))
    boostLvlBeta = JSON.parse(localStorage.getItem("boostLvlBeta"))
    boostLvlAlpha = JSON.parse(localStorage.getItem("boostLvlAlpha"))
    boostLvlTheta = JSON.parse(localStorage.getItem("boostLvlTheta"))
    craftBeta = JSON.parse(localStorage.getItem("craftBeta"))
    craftAlpha = JSON.parse(localStorage.getItem("craftAlpha"))
    craftTheta = JSON.parse(localStorage.getItem("craftTheta"))

    getstatSesh.innerHTML = jsstatSesh
    getBeta.innerHTML = jspowerBeta/1000
    getAlpha.innerHTML = jspowerAlpha/1000
    getTheta.innerHTML = jspowerTheta/1000
    getBetaCoins.innerHTML = jscoinsBeta
    getAlphaCoins.innerHTML = jscoinsAlpha
    getThetaCoins.innerHTML = jscoinsTheta
    getBetaCost.innerHTML = jsCostBeta
    getAlphaCost.innerHTML = jsCostAlpha
    getThetaCost.innerHTML = jsCostTheta
    getBetaBoostVal.innerHTML = (boostLvlBeta*baseProdBoost)
    getAlphaBoostVal.innerHTML = (boostLvlAlpha*baseProdBoost)
    getThetaBoostVal.innerHTML = (boostLvlTheta*baseProdBoost)
}

window.logSession = logSession
window.logSessionFile = logSessionFile
window.convertToCoins = convertToCoins
window.buyBeta = buyBeta
window.buyAlpha = buyAlpha
window.buyTheta = buyTheta
window.save = save
window.load = load