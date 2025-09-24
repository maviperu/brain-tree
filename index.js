import {recordedSessions} from "./sessions.js";
import {userBuildings} from "./user_buildings.js";

let getstatSesh = document.querySelector('.statSesh')
let jsstatSesh = parseFloat(getstatSesh.innerHTML)
let getstatMins = document.querySelector('.statMins')
let jsstatMins = parseFloat(getstatMins.innerHTML)

let jsFileButton = document.querySelector('.TreeButtonContainer')
let jsTheGrid = document.querySelector('.theGrid')

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
let getAllBetaMintNums = document.querySelectorAll('.mintNumBeta')
let getAllAlphaMintNums = document.querySelectorAll('.mintNumAlpha')
let getAllThetaMintNums = document.querySelectorAll('.mintNumTheta')
let getBetaMintNums = document.querySelector('.mintNumBeta')
let getAlphaMintNums = document.querySelector('.mintNumAlpha')
let getThetaMintNums = document.querySelector('.mintNumTheta')

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
let getBetaMintUpCost = document.querySelector('.costMintUpBeta')
let getAlphaMintUpCost = document.querySelector('.costMintUpAlpha')
let getThetaMintUpCost = document.querySelector('.costMintUpTheta')
let jsMintUpCostBeta = parseFloat(getBetaMintUpCost.innerHTML)
let jsMintUpCostAlpha = parseFloat(getAlphaMintUpCost.innerHTML)
let jsMintUpCostTheta = parseFloat(getThetaMintUpCost.innerHTML)

let rateLeafCostGrowth = 1.07
let baseLeafCost = 5
let baseLeafProdBoost = 2

let rateBatCapCostGrowth = 2
let baseBatCapCost = 500
let baseBatCapBoost = 100

let rateMintUpCostGrowth = 2
let baseMintUpCost = 2000

let getBetaBoostVal = document.querySelector('.boostBetaVal')
let getAlphaBoostVal = document.querySelector('.boostAlphaVal')
let getThetaBoostVal = document.querySelector('.boostThetaVal')
let boostLvlBeta = 0
let boostLvlAlpha = 0
let boostLvlTheta = 0
let batCapLvlBeta = 0
let batCapLvlAlpha = 0
let batCapLvlTheta = 0
let mintUpLvlBeta = 1
let mintUpLvlAlpha = 1
let mintUpLvlTheta = 1

let getkJpsBeta = document.querySelector('.kJpsBeta')
let getkJpsAlpha = document.querySelector('.kJpsAlpha')
let getkJpsTheta = document.querySelector('.kJpsTheta')
let getcoinspsBeta = document.querySelector('.coinspsBeta')
let getcoinspsAlpha = document.querySelector('.coinspsAlpha')
let getcoinspsTheta = document.querySelector('.coinspsTheta')



function reparsefloats() {
    jspowerBeta = parseFloat(getBetaPower.innerHTML)*1000
    jspowerAlpha = parseFloat(getAlphaPower.innerHTML)*1000
    jspowerTheta = parseFloat(getThetaPower.innerHTML)*1000
    jscoinsBeta = parseFloat(getBetaCoins.innerHTML)
    jscoinsAlpha = parseFloat(getAlphaCoins.innerHTML)
    jscoinsTheta = parseFloat(getThetaCoins.innerHTML)
}

function setAllInners(thingToSet,mathToDo) {
    thingToSet.forEach(function(i) {
        i.innerHTML = mathToDo
    })
}

/*
-----------------
ENERGY GENERATION
-----------------
*/

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
        jspowerBeta += Math.floor(sesh.betaPower*(1+(boostLvlBeta*baseLeafProdBoost/100))*1000)
        let jpB = jspowerBeta / 1000
        setAllInners(getAllBetaPower,jpB)

        jspowerAlpha += Math.floor(sesh.alphaPower*(1+(boostLvlAlpha*baseLeafProdBoost/100))*1000)
        let jpA = jspowerAlpha / 1000
        setAllInners(getAllAlphaPower,jpA)

        jspowerTheta += Math.floor(sesh.thetaPower*(1+(boostLvlTheta*baseLeafProdBoost/100))*1000)
        let jpT = jspowerTheta / 1000
        setAllInners(getAllThetaPower,jpT)
        
        jsstatMins += sesh.sessionMinutes
        getstatMins.innerHTML = jsstatMins

        jsstatSesh += 1
        getstatSesh.innerHTML = jsstatSesh

        makeBolts(sesh.betaPower,sesh.alphaPower,sesh.thetaPower)
        bolts.forEach (function(i) {
            let x = event.clientX + (i.randX*30)
            let y = event.clientY + (i.randY*30)
            let element = document.querySelector(`.dest${i.type}`)
            let div = element.getBoundingClientRect()

            let particle = document.createElement("img")
            particle.src =`./assets/${i.type}Bolt.png`
            particle.style.cssText = `top: ${y}px; left: ${x}px; pointer-events: none;`
            particle.classList.add("particle")
            particle.classList.add("statsIcons")
            element.appendChild(particle)

            let dur = Math.random()-.5
            const moveToTarget = [
                {},
                {offset:.03,top:`${event.clientX + (i.randY*200)}px`,left:`${event.clientX + (i.randX*200)}px`},
                {top:`${div.y}px`,left:`${div.x}px`},
            ]
            let moveOptions = {
                iterations: 1,
                easing: 'ease-in-out',
            }
            moveOptions.duration = 2000+(dur*2000)           
            particle.animate(moveToTarget,moveOptions)
            setTimeout(() => {
                particle.remove()
            }, (1900+(dur*2000)))
        })
        bolts.length = 0
    }
}

//Creating the Array that enables bolt animation during session logging
const bolts = []
function makeBolts (seshBeta,seshAlpha,seshTheta) {
    for ( let i = 0; i<seshBeta; i++) {
        let randX = (Math.random()-.5)
        let randY = (Math.random()-.5)
        bolts.push({type:"Beta",randX:`${randX}`,randY:`${randY}`})
    }
    for ( let i = 0; i<seshAlpha; i++) {
        let randX = (Math.random()-.5)
        let randY = (Math.random()-.5)
        bolts.push({type:"Alpha",randX:`${randX}`,randY:`${randY}`})
    }
    for ( let i = 0; i<seshTheta; i++) {
        let randX = (Math.random()-.5)
        let randY = (Math.random()-.5)
        bolts.push({type:"Theta",randX:`${randX}`,randY:`${randY}`})
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

let jsCrankNum = 0
let cranking = 0
let fillBar = document.querySelectorAll('.indicatorLight')
let segment = 6
function rotateCrank() {
    if (cranking == 0) {
        cranking += 1
        let crankIsCranking = document.getElementById('crankbutton');
        crankIsCranking.classList.add("crankRot");
        
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
            crankIsCranking.classList.remove("crankRot");
            cranking = 0
        }, 250)

    }
}

//Functions for adding art assets to the game after purchases
function makeLeaf(type) {
    const reverse = Math.random() <.5
    let angle = Math.floor(Math.random() * 15) - 30
    
    const img = document.createElement("img")
    if (reverse === true) {
        img.src =`./assets/${type}WillowLeaf.png`
        img.style.transformOrigin = "top right"
    } else {
        img.src =`./assets/${type}WillowLeaf-r.png`
        angle = Math.abs(angle)
        img.style.transformOrigin = "top left"
    }
    img.classList.add("willowLeaf")
    img.classList.add("willowLeafExpand")
    img.style.transform = `rotate(${angle}deg)`
    const src = document.getElementById(`leafGarden${type}`)
    src.appendChild(img)
    
}
function makeAllLeaves(BetaVal,AlphaVal,ThetaVal) {
    const cleanupB = document.getElementById('leafGardenBeta')
    const cleanupA = document.getElementById('leafGardenAlpha')
    const cleanupT = document.getElementById('leafGardenTheta')
    while(cleanupB.firstChild){
        cleanupB.removeChild(cleanupB.firstChild)
    }
    while(cleanupA.firstChild){
        cleanupA.removeChild(cleanupA.firstChild)
    }
    while(cleanupT.firstChild){
        cleanupT.removeChild(cleanupT.firstChild)
    }
    for (let i = 0; i < BetaVal; i++) {
        makeLeaf("Beta")
    }
    for (let i = 0; i < AlphaVal; i++) {
        makeLeaf("Alpha")
    }
    for (let i = 0; i < ThetaVal; i++) {
        makeLeaf("Theta")
    }
}
function makeBuilding(type,wave) {
    const div = document.createElement("div")
        div.classList.add("buildHov")
    const img = document.createElement("img")
        img.src = `./assets/building-${wave}${type}.png`
    const span = document.createElement("span")
        span.classList.add("buildTooltip")
        span.innerHTML = `${type}`
    
    div.appendChild(img)
    div.appendChild(span)
    jsTheGrid.appendChild(div)
}

let jsuserBuildings = userBuildings
function makeAllBuildings() {
    const cleanupBuildings = document.getElementById('theGrid')
    while(cleanupBuildings.firstChild){
        cleanupBuildings.removeChild(cleanupBuildings.firstChild)
    }
    
        jsuserBuildings.map((div) =>{
            makeBuilding(div.type,div.wave)
        })
}

/*
---------------
UPGRADE BUTTONS
---------------
*/

//Functions for buying Leaf Upgrades
function buyBetaLeaf() {
    if (jspowerBeta >= (jsLeafCostBeta*1000)) {
        boostLvlBeta += 1
        jspowerBeta -= (jsLeafCostBeta*1000)
        jsLeafCostBeta = Math.round(baseLeafCost*(rateLeafCostGrowth**boostLvlBeta))
        getBetaLeafCost.innerHTML = jsLeafCostBeta
        let jpB = jspowerBeta / 1000
        setAllInners(getAllBetaPower,jpB)
        getBetaBoostVal.innerHTML = (boostLvlBeta*baseLeafProdBoost)
        makeLeaf("Beta")
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
        makeLeaf("Alpha")
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
        makeLeaf("Theta")
    }
}

//Functions for buying Battery Upgrades
function buyBetaBatCap() {
    if(jscoinsBeta >= jsBatCapCostBeta) {
        batCapLvlBeta += 1
        jscoinsBeta -= jsBatCapCostBeta
        jsbatCapBeta = 100 + (batCapLvlBeta*baseBatCapBoost)
        getBetaBatCap.innerHTML = jsbatCapBeta
        jsBatCapCostBeta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlBeta))
        getBetaBatCapCost.innerHTML = jsBatCapCostBeta
        let jcB = jscoinsBeta
        setAllInners(getAllBetaCoins,jcB)
        makeBuilding("Battery","Beta")
    }
}
function buyAlphaBatCap() {
    if(jscoinsAlpha >= jsBatCapCostAlpha) {
        batCapLvlAlpha += 1
        jscoinsAlpha -= jsBatCapCostAlpha
        jsbatCapAlpha = 100 + (batCapLvlAlpha*baseBatCapBoost)
        getAlphaBatCap.innerHTML = jsbatCapAlpha
        jsBatCapCostAlpha = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlAlpha))
        getAlphaBatCapCost.innerHTML = jsBatCapCostAlpha
        let jcA = jscoinsAlpha
        setAllInners(getAllAlphaCoins,jcA)
        makeBuilding("Battery","Alpha")
    }
}
function buyThetaBatCap() {
    if(jscoinsTheta >= jsBatCapCostTheta) {
        batCapLvlTheta += 1
        jscoinsTheta -= jsBatCapCostTheta
        jsbatCapTheta = 100 + (batCapLvlTheta*baseBatCapBoost)
        getThetaBatCap.innerHTML = jsbatCapTheta
        jsBatCapCostTheta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlTheta))
        getThetaBatCapCost.innerHTML = jsBatCapCostTheta
        let jcT = jscoinsTheta
        setAllInners(getAllThetaCoins,jcT)
        makeBuilding("Battery","Theta")
    }
}

//Functions for buying Mint Upgrades
function buyBetaMint() {
    if(jscoinsBeta >= jsMintUpCostBeta) {
        mintUpLvlBeta += 1
        producers.find(p => p.name === "mintBeta").numBuilt = mintUpLvlBeta
        jscoinsBeta -= jsMintUpCostBeta
        jsMintUpCostBeta = Math.round(baseMintUpCost*(rateMintUpCostGrowth**mintUpLvlBeta))
        setAllInners(getAllBetaMintNums,mintUpLvlBeta)
        getBetaMintUpCost.innerHTML = jsMintUpCostBeta
        let jcB = jscoinsBeta
        setAllInners(getAllBetaCoins,jcB)
        makeBuilding("Mint","Beta")
    }
}
function buyAlphaMint() {
    if(jscoinsAlpha >= jsMintUpCostAlpha) {
        mintUpLvlAlpha += 1
        producers.find(p => p.name === "mintAlpha").numBuilt = mintUpLvlAlpha
        jscoinsAlpha -= jsMintUpCostAlpha
        jsMintUpCostAlpha = Math.round(baseMintUpCost*(rateMintUpCostGrowth**mintUpLvlAlpha))
        setAllInners(getAllAlphaMintNums,mintUpLvlAlpha)
        getAlphaMintUpCost.innerHTML = jsMintUpCostAlpha
        let jcB = jscoinsAlpha
        setAllInners(getAllAlphaCoins,jcB)
        makeBuilding("Mint","Alpha")
    }
}
function buyThetaMint() {
    if(jscoinsTheta >= jsMintUpCostTheta) {
        mintUpLvlTheta += 1
        producers.find(p => p.name === "mintTheta").numBuilt = mintUpLvlTheta
        jscoinsTheta -= jsMintUpCostTheta
        jsMintUpCostTheta = Math.round(baseMintUpCost*(rateMintUpCostGrowth**mintUpLvlTheta))
        setAllInners(getAllThetaMintNums,mintUpLvlTheta)
        getThetaMintUpCost.innerHTML = jsMintUpCostTheta
        let jcB = jscoinsTheta
        setAllInners(getAllThetaCoins,jcB)
        makeBuilding("Mint","Theta")
    }
}


/*
---------------------------
Consume / Produce Functions
---------------------------
*/

let producers = [ // timer is per second
    {name:"mintBeta",numBuilt:1,consumeWave:"Beta",consumeStat:"power",consumeAmtThing:-1,consumeAmtTime:1,prodWave:"Beta",prodStat:"coins",prodAmtThing:1,prodAmtTime:9,active:false},
    {name:"mintAlpha",numBuilt:1,consumeWave:"Alpha",consumeStat:"power",consumeAmtThing:-1,consumeAmtTime:1,prodWave:"Alpha",prodStat:"coins",prodAmtThing:1,prodAmtTime:9,active:false},
    {name:"mintTheta",numBuilt:1,consumeWave:"Theta",consumeStat:"power",consumeAmtThing:-1,consumeAmtTime:1,prodWave:"Theta",prodStat:"coins",prodAmtThing:1,prodAmtTime:9,active:false},
]
let fractAmts = [
    {stat:"coins",wave:"Beta",fract:0},
    {stat:"coins",wave:"Alpha",fract:0},
    {stat:"coins",wave:"Theta",fract:0},
]

function getRates(stat,wave,pc) {
    if (pc==="con")
        {return producers
            .filter(p => p.consumeStat === stat)
            .filter(p => p.consumeWave === wave)
            .filter(p => p.active)
            .reduce((sum,p) => sum + (p.numBuilt * p.consumeAmtThing),0)
        }
    if (pc==="prod")
        {return producers
            .filter(p => p.prodStat === stat)
            .filter(p => p.consumeWave === wave)
            .filter(p => p.active)
            .reduce((sum,p) => sum + Math.floor((p.numBuilt * p.prodAmtThing / p.prodAmtTime)*100)/100,0)
        }
}
function consume (stat,wave) {
    let str = stat+wave
    let enoughStat = true
    let getElement = document.querySelector(`.${str}`)
    let jsElement = parseFloat(getElement.innerHTML)*1000
    jsElement += getRates(stat,wave,"con")
    if (jsElement <= 0) {
        jsElement = 0
        getElement.innerHTML = 0
        enoughStat = false
    } else {
        getElement.innerHTML = jsElement/1000
        enoughStat = true
    }
    return enoughStat
}
function produce (stat, wave) {
    let str = stat+wave
    let getElement = document.querySelector(`.${str}`)
    let fractObj = fractAmts.find(p => p.stat === stat && p.wave === wave)
    let jsElement = (parseFloat(getElement.innerHTML) + fractObj.fract)*100
    jsElement += Math.floor(getRates(stat,wave,"prod")*100)
    if (jsElement >= 100) {
        getElement.innerHTML = Math.floor(jsElement/100)
        fractObj.fract = (jsElement % 100) / 100
    }
    
}

let getAllRateText = document.querySelectorAll('.rate')
function ratecolors() {
    getAllRateText.forEach(function(i) {
        if (i.innerHTML < 0) {
            i.classList.add("negative-value")
            i.classList.remove("positive-value")
        } else if (i.innerHTML > 0) {
            i.classList.add("positive-value")
            i.classList.remove("negative-value")
        } else {
            i.classList.remove("positive-value")
            i.classList.remove("negative-value")
        }
    })
}

//This is the conversion timer for minting coins
let mintBeta = document.getElementById("mintBeta");
let craftBeta = 0
let mintAlpha = document.getElementById("mintAlpha");
let craftAlpha = 0
let mintTheta = document.getElementById("mintTheta");
let craftTheta = 0
setInterval(() => {
    let enoughBeta = consume("power","Beta")
    let enoughAlpha = consume("power","Alpha")
    let enoughTheta = consume("power","Theta")
    produce ("coins","Beta")
    produce ("coins","Alpha")
    produce ("coins","Theta")
    
    if (mintBeta.checked == true)  {
        producers.find(p => p.name === "mintBeta").active = true
        mintBeta.checked = enoughBeta
    } else {producers.find(p => p.name === "mintBeta").active = false}
    if (mintAlpha.checked == true)  {
        producers.find(p => p.name === "mintAlpha").active = true
        mintAlpha.checked = enoughAlpha
    } else {producers.find(p => p.name === "mintAlpha").active = false}
    if (mintTheta.checked == true)  {
        producers.find(p => p.name === "mintTheta").active = true
        mintTheta.checked = enoughTheta
    } else {producers.find(p => p.name === "mintTheta").active = false}


    getkJpsBeta.innerHTML = getRates("power","Beta","con")/1000
    getkJpsAlpha.innerHTML = getRates("power","Alpha","con")/1000
    getkJpsTheta.innerHTML = getRates("power","Theta","con")/1000
    getcoinspsBeta.innerHTML = getRates("coins","Beta","prod")
    getcoinspsAlpha.innerHTML = getRates("coins","Alpha","prod")
    getcoinspsTheta.innerHTML = getRates("coins","Theta","prod")
    ratecolors()
    reparsefloats()
},1000)

function save() {
    localStorage.clear()

    localStorage.setItem("jsstatSesh",JSON.stringify(jsstatSesh))
    localStorage.setItem("jspowerBeta",JSON.stringify(jspowerBeta))
    localStorage.setItem("jspowerAlpha",JSON.stringify(jspowerAlpha))
    localStorage.setItem("jspowerTheta",JSON.stringify(jspowerTheta))
    localStorage.setItem("jsCrankNum",JSON.stringify(jsCrankNum))
    localStorage.setItem("jscoinsBeta",JSON.stringify(jscoinsBeta))
    localStorage.setItem("jscoinsAlpha",JSON.stringify(jscoinsAlpha))
    localStorage.setItem("jscoinsTheta",JSON.stringify(jscoinsTheta))
    localStorage.setItem("jsLeafCostBeta",JSON.stringify(jsLeafCostBeta))
    localStorage.setItem("jsLeafCostAlpha",JSON.stringify(jsLeafCostAlpha))
    localStorage.setItem("jsLeafCostTheta",JSON.stringify(jsLeafCostTheta))
    localStorage.setItem("boostLvlBeta",JSON.stringify(boostLvlBeta))
    localStorage.setItem("boostLvlAlpha",JSON.stringify(boostLvlAlpha))
    localStorage.setItem("boostLvlTheta",JSON.stringify(boostLvlTheta))
    localStorage.setItem("batCapLvlBeta",JSON.stringify(batCapLvlBeta))
    localStorage.setItem("batCapLvlAlpha",JSON.stringify(batCapLvlAlpha))
    localStorage.setItem("batCapLvlTheta",JSON.stringify(batCapLvlTheta))
    localStorage.setItem("mintBeta",JSON.stringify(mintBeta.checked))
    localStorage.setItem("mintAlpha",JSON.stringify(mintAlpha.checked))
    localStorage.setItem("mintTheta",JSON.stringify(mintTheta.checked))
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
    jsCrankNum = JSON.parse(localStorage.getItem("jsCrankNum"))
    jscoinsBeta = JSON.parse(localStorage.getItem("jscoinsBeta"))
    jscoinsAlpha = JSON.parse(localStorage.getItem("jscoinsAlpha"))
    jscoinsTheta = JSON.parse(localStorage.getItem("jscoinsTheta"))
    jsLeafCostBeta = JSON.parse(localStorage.getItem("jsLeafCostBeta"))
    jsLeafCostAlpha = JSON.parse(localStorage.getItem("jsLeafCostAlpha"))
    jsLeafCostTheta = JSON.parse(localStorage.getItem("jsLeafCostTheta"))
    boostLvlBeta = JSON.parse(localStorage.getItem("boostLvlBeta"))
    boostLvlAlpha = JSON.parse(localStorage.getItem("boostLvlAlpha"))
    boostLvlTheta = JSON.parse(localStorage.getItem("boostLvlTheta"))
    batCapLvlBeta = JSON.parse(localStorage.getItem("batCapLvlBeta"))
    batCapLvlAlpha = JSON.parse(localStorage.getItem("batCapLvlAlpha"))
    batCapLvlTheta = JSON.parse(localStorage.getItem("batCapLvlTheta"))
    mintBeta.checked = JSON.parse(localStorage.getItem("mintBeta"))
    mintAlpha.checked = JSON.parse(localStorage.getItem("mintAlpha"))
    mintTheta.checked = JSON.parse(localStorage.getItem("mintTheta"))
    craftBeta = JSON.parse(localStorage.getItem("craftBeta"))
    craftAlpha = JSON.parse(localStorage.getItem("craftAlpha"))
    craftTheta = JSON.parse(localStorage.getItem("craftTheta"))

    getstatSesh.innerHTML = jsstatSesh

    let n=0
    fillBar.forEach(function(i) {
        if (n >= (6-jsCrankNum)) {
            i.classList.add("active")
            } else {i.classList.remove("active")}
        n += 1
    })

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
    makeAllLeaves(boostLvlBeta,boostLvlAlpha,boostLvlTheta)
    makeAllBuildings()

    jsbatCapBeta = 100 + (batCapLvlBeta*baseBatCapBoost)
    getBetaBatCap.innerHTML = jsbatCapBeta
    jsBatCapCostBeta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlBeta))
    getBetaBatCapCost.innerHTML = jsBatCapCostBeta

    jsbatCapAlpha = 100 + (batCapLvlAlpha*baseBatCapBoost)
    getAlphaBatCap.innerHTML = jsbatCapAlpha
    jsBatCapCostAlpha = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlAlpha))
    getAlphaBatCapCost.innerHTML = jsBatCapCostAlpha

    jsbatCapTheta = 100 + (batCapLvlTheta*baseBatCapBoost)
    getThetaBatCap.innerHTML = jsbatCapTheta
    jsBatCapCostTheta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlTheta))
    getThetaBatCapCost.innerHTML = jsBatCapCostTheta
}



window.logSession = logSession
window.logSessionFile = logSessionFile
window.crankPower = crankPower
window.rotateCrank = rotateCrank
window.makeLeaf = makeLeaf
window.makeAllLeaves = makeAllLeaves
window.makeBuilding = makeBuilding
window.makeAllBuildings = makeAllBuildings
window.buyBetaLeaf = buyBetaLeaf
window.buyAlphaLeaf = buyAlphaLeaf
window.buyThetaLeaf = buyThetaLeaf
window.buyBetaBatCap = buyBetaBatCap
window.buyAlphaBatCap = buyAlphaBatCap
window.buyThetaBatCap = buyThetaBatCap
window.buyBetaMint = buyBetaMint
window.buyAlphaMint = buyAlphaMint
window.buyThetaMint = buyThetaMint
window.getRates = getRates
window.save = save
window.load = load