import {recordedSessions} from "./sessions.js";

let getstatSesh = document.querySelector('.statSesh')
let jsstatSesh = parseFloat(getstatSesh.innerHTML)
let jsFileButton = document.querySelector('.TreeButtonContainer')

let getAllBetaPower = document.querySelectorAll('.powerBeta')
let getAllAlphaPower = document.querySelectorAll('.powerAlpha')
let getAllThetaPower = document.querySelectorAll('.powerTheta')
let getBetaPower = document.querySelector('.powerBeta')
let getAlphaPower = document.querySelector('.powerAlpha')
let getThetaPower = document.querySelector('.powerTheta')
let jspowerBeta = parseFloat(getBetaPower.innerHTML)*1000
let jspowerAlpha = parseFloat(getAlphaPower.innerHTML)*1000
let jspowerTheta = parseFloat(getThetaPower.innerHTML)*1000
let getBetaBatCap = document.querySelector('.batCapBeta')
let getAlphaBatCap = document.querySelector('.batCapAlpha')
let getThetaBatCap = document.querySelector('.batCapTheta')
let jsbatCapBeta = parseFloat(getBetaBatCap.innerHTML)
let jsbatCapAlpha = parseFloat(getAlphaBatCap.innerHTML)
let jsbatCapTheta = parseFloat(getThetaBatCap.innerHTML)

let getAllBetaCoins = document.querySelectorAll('.coinsBeta')
let getAllAlphaCoins = document.querySelectorAll('.coinsAlpha')
let getAllThetaCoins = document.querySelectorAll('.coinsTheta')
let getBetaCoins = document.querySelector('.coinsBeta')
let getAlphaCoins = document.querySelector('.coinsAlpha')
let getThetaCoins = document.querySelector('.coinsTheta')
let jscoinsBeta = parseFloat(getBetaCoins.innerHTML)
let jscoinsAlpha = parseFloat(getAlphaCoins.innerHTML)
let jscoinsTheta = parseFloat(getThetaCoins.innerHTML)

let getBetaLeafCost = document.querySelector('.costLeafBeta')
let getAlphaLeafCost = document.querySelector('.costLeafAlpha')
let getThetaLeafCost = document.querySelector('.costLeafTheta')
let jsLeafCostBeta = parseFloat(getBetaLeafCost.innerHTML)
let jsLeafCostAlpha = parseFloat(getAlphaLeafCost.innerHTML)
let jsLeafCostTheta = parseFloat(getThetaLeafCost.innerHTML)
let getBetaBatCapCost = document.querySelector('.costBatCapBeta')
let getAlphaBatCapCost = document.querySelector('.costBatCapAlpha')
let getThetaBatCapCost = document.querySelector('.costBatCapTheta')
let jsBatCapCostBeta = parseFloat(getBetaBatCapCost.innerHTML)
let jsBatCapCostAlpha = parseFloat(getAlphaBatCapCost.innerHTML)
let jsBatCapCostTheta = parseFloat(getThetaBatCapCost.innerHTML)

let rateLeafCostGrowth = 1.07
let baseLeafCost = 5
let baseLeafProdBoost = 2

let rateBatCapCostGrowth = 2
let baseBatCapCost = 500
let baseBatCapBoost = 100

let getBetaBoostVal = document.querySelector('.boostBetaVal')
let getAlphaBoostVal = document.querySelector('.boostAlphaVal')
let getThetaBoostVal = document.querySelector('.boostThetaVal')
let boostLvlBeta = 0
let boostLvlAlpha = 0
let boostLvlTheta = 0
let batCapLvlBeta = 0
let batCapLvlAlpha = 0
let batCapLvlTheta = 0




function setAllInners(thingToSet,mathToDo) {
    thingToSet.forEach(function(i) {
        i.innerHTML = mathToDo
    })
}

function logSession() {
    jspowerBeta += Math.floor((Math.floor(Math.random() * 8) + 7)*(1+(boostLvlBeta*baseLeafProdBoost/100))*1000)
    let jpB = jspowerBeta / 1000
    setAllInners(getAllBetaPower,jpB)
    
    jspowerAlpha += Math.floor((Math.floor(Math.random() * 8) + 7)*(1+(boostLvlAlpha*baseLeafProdBoost/100))*1000)
    let jpA = jspowerAlpha / 1000
    setAllInners(getAllAlphaPower,jpA)
    
    jspowerTheta += Math.floor((Math.floor(Math.random() * 8) + 7)*(1+(boostLvlTheta*baseLeafProdBoost/100))*1000)
    let jpT = jspowerTheta / 1000
    setAllInners(getAllThetaPower,jpT)

    jsstatSesh += 1
    getstatSesh.innerHTML = jsstatSesh
}
function logSessionFile(event) {
    let sesh = recordedSessions[jsstatSesh]

    if (sesh === undefined) {
        const x = Math.min(event.offsetX,140)
        const y = Math.min(event.offsetY,305)
        
        const div = document.createElement("div")
        div.innerHTML = "No Session to Log!"
        div.style.cssText = `color: red; position: absolute; top: ${y}px; left: ${x}px; pointer-events: none;`
        jsFileButton.appendChild(div)
        div.classList.add("seshUndefined")

        timeout(div,2800)
    } else {
        jspowerBeta += sesh.minsBeta*(1+(boostLvlBeta*baseLeafProdBoost/100))*1000
        let jpB = jspowerBeta / 1000
        setAllInners(getAllBetaPower,jpB)

        jspowerAlpha += sesh.minsAlpha*(1+(boostLvlAlpha*baseLeafProdBoost/100))*1000
        let jpA = jspowerAlpha / 1000
        setAllInners(getAllAlphaPower,jpA)

        jspowerTheta += sesh.minsTheta*(1+(boostLvlTheta*baseLeafProdBoost/100))*1000
        let jpT = jspowerTheta / 1000
        setAllInners(getAllThetaPower,jpT)
        
        jsstatSesh += 1
        getstatSesh.innerHTML = jsstatSesh
    }
}

const timeout = (div,time) => {
    setTimeout(() => {
        div.remove()
    }, time)
}

function crankPower(be,al,th) {
    jspowerBeta += be
    jspowerAlpha += al
    jspowerTheta += th
    let jpB = jspowerBeta / 1000
    let jpA = jspowerAlpha / 1000
    let jpT = jspowerTheta / 1000
    setAllInners(getAllBetaPower,jpB)
    setAllInners(getAllAlphaPower,jpA)
    setAllInners(getAllThetaPower,jpT)
}

/*
function convertToCoins() {
    jscoinsBeta += Math.floor(jspowerBeta/1000)
    setAllInners(getAllBetaCoins,jscoinsBeta)
    jspowerBeta = jspowerBeta%1000

    jscoinsAlpha += Math.floor(jspowerAlpha/1000)
    setAllInners(getAllAlphaCoins,jscoinsAlpha)
    jspowerAlpha = jspowerAlpha%1000

    jscoinsTheta += Math.floor(jspowerTheta/1000)
    setAllInners(getAllThetaCoins,jscoinsTheta)
    jspowerTheta = jspowerTheta%1000

    let jpB = jspowerBeta / 1000
    setAllInners(getAllBetaPower,jpB)
    let jpA = jspowerAlpha / 1000
    setAllInners(getAllAlphaPower,jpA)
    let jpT = jspowerTheta / 1000
    setAllInners(getAllThetaPower,jpT)
}
*/

function buyBetaLeaf() {
    if (jspowerBeta >= (jsLeafCostBeta*1000)) {
        boostLvlBeta += 1
        jspowerBeta -= (jsLeafCostBeta*1000)
        jsLeafCostBeta = Math.round(baseLeafCost*(rateBatCapCostGrowth**boostLvlBeta))
        getBetaLeafCost.innerHTML = jsLeafCostBeta
        let jpB = jspowerBeta / 1000
        setAllInners(getAllBetaPower,jpB)
        getBetaBoostVal.innerHTML = (boostLvlBeta*baseLeafProdBoost)
    }
}
function buyAlphaLeaf() {
    if (jspowerAlpha >= (jsLeafCostAlpha*1000)) {
        boostLvlAlpha += 1
        jspowerAlpha -= (jsLeafCostAlpha*1000)
        jsLeafCostAlpha = Math.round(baseLeafCost*(rateLeafCostGrowth**boostLvlAlpha))
        getAlphaLeafCost.innerHTML = jsLeafCostAlpha
        let jpA = jspowerAlpha / 1000
        setAllInners(getAllAlphaPower,jpA)
        getAlphaBoostVal.innerHTML = (boostLvlAlpha*baseLeafProdBoost)
    }
}
function buyThetaLeaf() {
    if (jspowerTheta >= (jsLeafCostTheta*1000)) {
        boostLvlTheta += 1
        jspowerTheta -= (jsLeafCostTheta*1000)
        jsLeafCostTheta = Math.round(baseLeafCost*(rateLeafCostGrowth**boostLvlTheta))
        getThetaLeafCost.innerHTML = jsLeafCostTheta
        let jpT = jspowerTheta / 1000
        setAllInners(getAllThetaPower,jpT)
        getThetaBoostVal.innerHTML = (boostLvlTheta*baseLeafProdBoost)
    }
}

function buyBetaBatCap() {
    if(jscoinsBeta >= jsBatCapCostBeta) {
        batCapLvlBeta += 1
        jscoinsBeta -= jsBatCapCostBeta
        jsbatCapBeta += baseBatCapBoost
        getBetaBatCap.innerHTML = jsbatCapBeta
        jsBatCapCostBeta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlBeta))
        getBetaBatCapCost.innerHTML = jsBatCapCostBeta
        let jcB = jscoinsBeta
        setAllInners(getAllBetaCoins,jcB)
    }
}
function buyAlphaBatCap() {
    if(jscoinsAlpha >= jsBatCapCostAlpha) {
        batCapLvlAlpha += 1
        jscoinsAlpha -= jsBatCapCostAlpha
        jsbatCapAlpha += baseBatCapBoost
        getAlphaBatCap.innerHTML = jsbatCapAlpha
        jsBatCapCostAlpha = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlAlpha))
        getAlphaBatCapCost.innerHTML = jsBatCapCostAlpha
        let jcA = jscoinsAlpha
        setAllInners(getAllAlphaCoins,jcA)
    }
}
function buyThetaBatCap() {
    if(jscoinsTheta >= jsBatCapCostTheta) {
        batCapLvlTheta += 1
        jscoinsTheta -= jsBatCapCostTheta
        jsbatCapTheta += baseBatCapBoost
        getThetaBatCap.innerHTML = jsbatCapTheta
        jsBatCapCostTheta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlTheta))
        getThetaBatCapCost.innerHTML = jsBatCapCostTheta
        let jcT = jscoinsTheta
        setAllInners(getAllThetaCoins,jcT)
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
            let jpB = jspowerBeta / 1000
            setAllInners(getAllBetaPower,jpB)
            if (craftBeta >= 9) {
                craftBeta -= 9
                jscoinsBeta += 1
                setAllInners(getAllBetaCoins,jscoinsBeta)
            }
        }
    }
    if (sliderAlpha.checked == true)  {
        if (jspowerAlpha <=0) {
            sliderAlpha.checked = false
        } else {    
            jspowerAlpha -= 1
            craftAlpha += 1
            let jpA = jspowerAlpha / 1000
            setAllInners(getAllAlphaPower,jpA)
            if (craftAlpha >= 9) {
                craftAlpha -= 9
                jscoinsAlpha += 1
                setAllInners(getAllAlphaCoins,jscoinsAlpha)
            }
        }
    }
    if (sliderTheta.checked == true)  {
        if (jspowerTheta <=0) {
            sliderTheta.checked = false
        } else {
            jspowerTheta -= 1
            craftTheta += 1
            let jpT = jspowerTheta / 1000
            setAllInners(getAllThetaPower,jpT)
            if (craftTheta >= 9) {
                craftTheta -= 9
                jscoinsTheta += 1
                setAllInners(getAllThetaCoins,jscoinsTheta)
            }
        }
    }
},1000)

function save() {
    localStorage.clear()

    localStorage.setItem("jsstatSesh",JSON.stringify(jsstatSesh))
    localStorage.setItem("jspowerBeta",JSON.stringify(jspowerBeta))
    localStorage.setItem("jspowerAlpha",JSON.stringify(jspowerAlpha))
    localStorage.setItem("jspowerTheta",JSON.stringify(jspowerTheta))
    localStorage.setItem("jscoinsBeta",JSON.stringify(jscoinsBeta))
    localStorage.setItem("jscoinsAlpha",JSON.stringify(jscoinsAlpha))
    localStorage.setItem("jscoinsTheta",JSON.stringify(jscoinsTheta))
    localStorage.setItem("jsLeafCostBeta",JSON.stringify(jsLeafCostBeta))
    localStorage.setItem("jsLeafCostAlpha",JSON.stringify(jsLeafCostAlpha))
    localStorage.setItem("jsLeafCostTheta",JSON.stringify(jsLeafCostTheta))
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
    jsLeafCostBeta = JSON.parse(localStorage.getItem("jsLeafCostBeta"))
    jsLeafCostAlpha = JSON.parse(localStorage.getItem("jsLeafCostAlpha"))
    jsLeafCostTheta = JSON.parse(localStorage.getItem("jsLeafCostTheta"))
    boostLvlBeta = JSON.parse(localStorage.getItem("boostLvlBeta"))
    boostLvlAlpha = JSON.parse(localStorage.getItem("boostLvlAlpha"))
    boostLvlTheta = JSON.parse(localStorage.getItem("boostLvlTheta"))
    craftBeta = JSON.parse(localStorage.getItem("craftBeta"))
    craftAlpha = JSON.parse(localStorage.getItem("craftAlpha"))
    craftTheta = JSON.parse(localStorage.getItem("craftTheta"))

    getstatSesh.innerHTML = jsstatSesh

    let jpB = jspowerBeta / 1000
    setAllInners(getAllBetaPower,jpB)
    let jpA = jspowerAlpha / 1000
    setAllInners(getAllAlphaPower,jpA)
    let jpT = jspowerTheta / 1000
    setAllInners(getAllThetaPower,jpT)

    setAllInners(getAllBetaCoins,jscoinsBeta)
    setAllInners(getAllAlphaCoins,jscoinsAlpha)
    setAllInners(getAllThetaCoins,jscoinsTheta)
    getBetaLeafCost.innerHTML = jsLeafCostBeta
    getAlphaLeafCost.innerHTML = jsLeafCostAlpha
    getThetaLeafCost.innerHTML = jsLeafCostTheta
    getBetaBoostVal.innerHTML = (boostLvlBeta*baseLeafProdBoost)
    getAlphaBoostVal.innerHTML = (boostLvlAlpha*baseLeafProdBoost)
    getThetaBoostVal.innerHTML = (boostLvlTheta*baseLeafProdBoost)
}

let jsCrankNum = 0
let cranking = 0
let fillBar = document.querySelectorAll('.indicatorLight')
let segment = 6

function rotateCrank() {
    if (cranking == 0) {
        cranking += 1
        let testcrank = document.getElementById('crankbutton');
        testcrank.classList.add("crankRot");
        
        jsCrankNum += 1
        if (jsCrankNum < 7) {
            let activeSegment = segment-jsCrankNum
            fillBar[activeSegment].classList.add("active")
        } else {
            jsCrankNum = 0
            crankPower(5,5,5)
            fillBar.forEach(function(i) {
                i.classList.remove("active")
            })
        }

        setTimeout(() => {
            testcrank.classList.remove("crankRot");
            cranking = 0
        }, 250)

    }
}

window.rotateCrank = rotateCrank


window.logSession = logSession
window.logSessionFile = logSessionFile
window.crankPower = crankPower
//window.convertToCoins = convertToCoins
window.buyBetaLeaf = buyBetaLeaf
window.buyAlphaLeaf = buyAlphaLeaf
window.buyThetaLeaf = buyThetaLeaf
window.buyBetaBatCap = buyBetaBatCap
window.buyAlphaBatCap = buyAlphaBatCap
window.buyThetaBatCap = buyThetaBatCap
window.save = save
window.load = load