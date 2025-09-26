import {recordedSessions} from "./sessions.js";
import {userBuildings} from "./user_buildings.js";

console.log("PAGE INIT",localStorage)

let getstatSesh = document.querySelector('.statSesh')
let jsstatSesh = parseFloat(getstatSesh.innerHTML)
let getstatMins = document.querySelector('.statMins')
let jsstatMins = parseFloat(getstatMins.innerHTML)

document.querySelector('.seshLen').innerHTML = recordedSessions.length - jsstatSesh

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
let getAllBetaBatCap = document.querySelectorAll('.batCapBeta')
let getAllAlphaBatCap = document.querySelectorAll('.batCapAlpha')
let getAllThetaBatCap = document.querySelectorAll('.batCapTheta')
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
function logSessionFile(event) {
    let sesh = recordedSessions[jsstatSesh]

    if (sesh === undefined) {
        const x = Math.min(event.offsetX,140)
        const y = Math.min(event.offsetY,305)
        
        const div = document.querySelector(".console")
        const msg = document.createElement("span")
        msg.innerHTML = "No Session to Log!"
        //msg.style.cssText = `color: darkredred; position: absolute; top: ${y}px; left: ${x}px; pointer-events: none;`
        div.appendChild(msg)
        msg.classList.add("seshUndefined")

        timeout(msg,2800)
    } else {
        jspowerBeta += Math.floor(sesh.betaPower*(1+(boostLvlBeta*baseLeafProdBoost/100))*1000)
        jspowerBeta = Math.min(jspowerBeta,jsbatCapBeta*1000)
        let jpB = jspowerBeta / 1000
        setAllInners(getAllBetaPower,jpB)
        batCapPercent("Beta")
        batCapPercentIndicator("Beta")
        
        jspowerAlpha += Math.floor(sesh.alphaPower*(1+(boostLvlAlpha*baseLeafProdBoost/100))*1000)
        jspowerAlpha = Math.min(jspowerAlpha,jsbatCapAlpha*1000)
        let jpA = jspowerAlpha / 1000
        setAllInners(getAllAlphaPower,jpA)
        batCapPercent("Alpha")
        batCapPercentIndicator("Alpha")

        jspowerTheta += Math.floor(sesh.thetaPower*(1+(boostLvlTheta*baseLeafProdBoost/100))*1000)
        jspowerTheta = Math.min(jspowerTheta,jsbatCapTheta*1000)
        let jpT = jspowerTheta / 1000
        setAllInners(getAllThetaPower,jpT)
        batCapPercent("Theta")
        batCapPercentIndicator("Theta")
        
        jsstatMins += sesh.sessionMinutes
        getstatMins.innerHTML = jsstatMins

        jsstatSesh += 1
        getstatSesh.innerHTML = jsstatSesh

        document.querySelector('.seshLen').innerHTML = recordedSessions.length - jsstatSesh

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


function batCapPercent(type) {
    let power = parseFloat(document.querySelector(`.power${type}`).innerHTML)
    let cap = parseFloat(document.querySelector(`.batCap${type}`).innerHTML)
    let cent = Math.floor((power / cap)*10000)/100
    document.querySelector(`.batCapPercent${type}`).innerHTML = cent
}
function batCapPercentIndicator(type) {
    let indicators = document.querySelectorAll(`.batCapIndicatorLight.${type}`)
    let cent = parseFloat(document.querySelector(`.batCapPercent${type}`).innerHTML)
    let numLit = Math.ceil(cent/10)
    
    for ( let i = 0; i<10; i++) {
        if (i<numLit) {indicators[i].classList.add("active")} else {indicators[i].classList.remove("active")}
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
    jspowerBeta = Math.min(jspowerBeta,jsbatCapBeta*1000)
    jspowerAlpha = Math.min(jspowerAlpha,jsbatCapAlpha*1000)
    jspowerTheta = Math.min(jspowerTheta,jsbatCapTheta*1000)
    let jpB = jspowerBeta / 1000
    let jpA = jspowerAlpha / 1000
    let jpT = jspowerTheta / 1000
    setAllInners(getAllBetaPower,jpB)
    setAllInners(getAllAlphaPower,jpA)
    setAllInners(getAllThetaPower,jpT)
    batCapPercent("Beta")
    batCapPercentIndicator("Beta")
    batCapPercent("Alpha")
    batCapPercentIndicator("Alpha")
    batCapPercent("Theta")
    batCapPercentIndicator("Theta")
}

let jsCrankNum = 0
let cranking = 0
let fillBar = document.querySelectorAll('.crankIndicatorLight')
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
     const src = document.getElementById("TreeButton")

    for (let i = 0; i<baseLeafProdBoost; i++) {
        const img = document.createElement("img")
        let randNode = Math.floor(Math.random() * 38)
        let radVec = Math.random()*2*Math.PI
        let mag = Math.random()*15
        let dx = Math.cos(radVec-(Math.PI/2))*mag
        let dy = Math.sin(radVec-(Math.PI/2))*mag
        let x = treeNodes[randNode].x
        let y = treeNodes[randNode].y
        img.src =`./assets/${type}WillowLeaf2.png`
        img.classList.add("willowLeaf")
        img.style.cssText = `top: ${y+7+dy}px; left: ${x+12+dx}px; pointer-events: none; rotate: ${radVec}rad;`
        
        src.appendChild(img)
    }
}

function makeAllLeaves(BetaVal,AlphaVal,ThetaVal) {
    const cleanup = document.getElementById('TreeButton')
    while(cleanup.childNodes.length > 7){
        cleanup.removeChild(cleanup.lastChild)
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
        batCapPercent("Beta")
        batCapPercentIndicator("Beta")
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
        batCapPercent("Alpha")
        batCapPercentIndicator("Alpha")
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
        batCapPercent("Theta")
        batCapPercentIndicator("Theta")
        makeLeaf("Theta")
    }
}

//Functions for buying Battery Upgrades
function buyBetaBatCap() {
    if(jscoinsBeta >= jsBatCapCostBeta) {
        batCapLvlBeta += 1
        jscoinsBeta -= jsBatCapCostBeta
        jsbatCapBeta = 100 + (batCapLvlBeta*baseBatCapBoost)
        setAllInners(getAllBetaBatCap,jsbatCapBeta)
        jsBatCapCostBeta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlBeta))
        getBetaBatCapCost.innerHTML = jsBatCapCostBeta
        let jcB = jscoinsBeta
        setAllInners(getAllBetaCoins,jcB)
        makeBuilding("Battery","Beta")
        jsuserBuildings.push({type:"Battery",wave:"Beta"})
    }
}
function buyAlphaBatCap() {
    if(jscoinsAlpha >= jsBatCapCostAlpha) {
        batCapLvlAlpha += 1
        jscoinsAlpha -= jsBatCapCostAlpha
        jsbatCapAlpha = 100 + (batCapLvlAlpha*baseBatCapBoost)
        setAllInners(getAllAlphaBatCap,jsbatCapAlpha)
        jsBatCapCostAlpha = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlAlpha))
        getAlphaBatCapCost.innerHTML = jsBatCapCostAlpha
        let jcA = jscoinsAlpha
        setAllInners(getAllAlphaCoins,jcA)
        makeBuilding("Battery","Alpha")
        jsuserBuildings.push({type:"Battery",wave:"Alpha"})
    }
}
function buyThetaBatCap() {
    if(jscoinsTheta >= jsBatCapCostTheta) {
        batCapLvlTheta += 1
        jscoinsTheta -= jsBatCapCostTheta
        jsbatCapTheta = 100 + (batCapLvlTheta*baseBatCapBoost)
        setAllInners(getAllThetaBatCap,jsbatCapTheta)
        jsBatCapCostTheta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlTheta))
        getThetaBatCapCost.innerHTML = jsBatCapCostTheta
        let jcT = jscoinsTheta
        setAllInners(getAllThetaCoins,jcT)
        makeBuilding("Battery","Theta")
        jsuserBuildings.push({type:"Battery",wave:"Theta"})
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
        jsuserBuildings.push({type:"Mint",wave:"Beta"})
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
        jsuserBuildings.push({type:"Mint",wave:"Alpha"})
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
        jsuserBuildings.push({type:"Mint",wave:"Theta"})
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
            .reduce((sum,p) => Math.floor(sum + (p.numBuilt * p.consumeAmtThing)),0)
        }
    if (pc==="prod")
        {return producers
            .filter(p => p.prodStat === stat)
            .filter(p => p.prodWave === wave)
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
let mintAlpha = document.getElementById("mintAlpha");
let mintTheta = document.getElementById("mintTheta");
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


    batCapPercent("Beta")
    batCapPercentIndicator("Beta")
    batCapPercent("Alpha")
    batCapPercentIndicator("Alpha")
    batCapPercent("Theta")
    batCapPercentIndicator("Theta")
    getkJpsBeta.innerHTML = getRates("power","Beta","con")/1000
    getkJpsAlpha.innerHTML = getRates("power","Alpha","con")/1000
    getkJpsTheta.innerHTML = getRates("power","Theta","con")/1000
    getcoinspsBeta.innerHTML = getRates("coins","Beta","prod")
    getcoinspsAlpha.innerHTML = getRates("coins","Alpha","prod")
    getcoinspsTheta.innerHTML = getRates("coins","Theta","prod")
    ratecolors()
    reparsefloats()
},1000)

/*
--------------
SAVE FUNCTIONS
--------------
*/
setInterval(function() {
    save()
},300000)
document.onvisibilitychange = () => {
    if (document.visibilityState === "hidden") {
        save()
    }
}
function save() {
    localStorage.clear()

    localStorage.setItem("jsstatSesh",JSON.stringify(jsstatSesh))
    localStorage.setItem("jsstatMins",JSON.stringify(jsstatMins))
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
    localStorage.setItem("mintUpLvlBeta",JSON.stringify(mintUpLvlBeta))
    localStorage.setItem("mintUpLvlAlpha",JSON.stringify(mintUpLvlAlpha))
    localStorage.setItem("mintUpLvlTheta",JSON.stringify(mintUpLvlTheta))
    localStorage.setItem("jsMintUpCostBeta",JSON.stringify(jsMintUpCostBeta))
    localStorage.setItem("jsMintUpCostAlpha",JSON.stringify(jsMintUpCostAlpha))
    localStorage.setItem("jsMintUpCostTheta",JSON.stringify(jsMintUpCostTheta))

    localStorage.setItem("jsuserBuildings",JSON.stringify(jsuserBuildings))

    const div = document.querySelector(".console")
    const msg = document.createElement("span")
    msg.innerHTML = "Saved!"
    div.appendChild(msg)
    msg.classList.add("seshUndefined")
    timeout(msg,2000)
console.log(localStorage)
}

/*document.addEventListener('DOMContentLoaded', function(){
    load()
    const div = document.querySelector(".loading")
    div.innerHTML = "Loaded!"
    div.classList.add("seshUndefined")
    timeout(div,2800)
})*/
function load() {
    jsstatSesh = JSON.parse(localStorage.getItem("jsstatSesh"))
    jsstatMins = JSON.parse(localStorage.getItem("jsstatMins"))
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
    mintUpLvlBeta = JSON.parse(localStorage.getItem("mintUpLvlBeta"))
    mintUpLvlAlpha = JSON.parse(localStorage.getItem("mintUpLvlAlpha"))
    mintUpLvlTheta = JSON.parse(localStorage.getItem("mintUpLvlTheta"))
    jsMintUpCostBeta = JSON.parse(localStorage.getItem("jsMintUpCostBeta"))
    jsMintUpCostAlpha = JSON.parse(localStorage.getItem("jsMintUpCostAlpha"))
    jsMintUpCostTheta = JSON.parse(localStorage.getItem("jsMintUpCostTheta"))
    
    getstatSesh.innerHTML = jsstatSesh
    document.querySelector('.seshLen').innerHTML = recordedSessions.length - jsstatSesh
    getstatMins.innerHTML = jsstatMins

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
    setAllInners(getAllThetaPower,jpT)
    setAllInners(getAllThetaPower,jpT)
    setAllInners(getAllThetaPower,jpT)

    setAllInners(getAllBetaMintNums,mintUpLvlBeta)
    setAllInners(getAllAlphaMintNums,mintUpLvlAlpha)
    setAllInners(getAllThetaMintNums,mintUpLvlTheta)
    getBetaMintUpCost.innerHTML = jsMintUpCostBeta
    getAlphaMintUpCost.innerHTML = jsMintUpCostAlpha
    getThetaMintUpCost.innerHTML = jsMintUpCostTheta

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

    jsuserBuildings = JSON.parse(localStorage.getItem("jsuserBuildings"))
    makeAllBuildings()

    jsbatCapBeta = 100 + (batCapLvlBeta*baseBatCapBoost)
    setAllInners(getAllBetaBatCap,jsbatCapBeta)
    jsBatCapCostBeta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlBeta))
    getBetaBatCapCost.innerHTML = jsBatCapCostBeta

    jsbatCapAlpha = 100 + (batCapLvlAlpha*baseBatCapBoost)
    setAllInners(getAllAlphaBatCap,jsbatCapAlpha)
    jsBatCapCostAlpha = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlAlpha))
    getAlphaBatCapCost.innerHTML = jsBatCapCostAlpha

    jsbatCapTheta = 100 + (batCapLvlTheta*baseBatCapBoost)
    setAllInners(getAllThetaBatCap,jsbatCapTheta)
    jsBatCapCostTheta = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvlTheta))
    getThetaBatCapCost.innerHTML = jsBatCapCostTheta
}

function reset() {
    localStorage.clear()

    localStorage.setItem("jsstatSesh",JSON.stringify(0))
    localStorage.setItem("jsstatMins",JSON.stringify(0))
    localStorage.setItem("jspowerBeta",JSON.stringify(0))
    localStorage.setItem("jspowerAlpha",JSON.stringify(0))
    localStorage.setItem("jspowerTheta",JSON.stringify(0))
    localStorage.setItem("jsCrankNum",JSON.stringify(0))
    localStorage.setItem("jscoinsBeta",JSON.stringify(17000))
    localStorage.setItem("jscoinsAlpha",JSON.stringify(7000))
    localStorage.setItem("jscoinsTheta",JSON.stringify(7000))
    localStorage.setItem("jsLeafCostBeta",JSON.stringify(5))
    localStorage.setItem("jsLeafCostAlpha",JSON.stringify(5))
    localStorage.setItem("jsLeafCostTheta",JSON.stringify(5))
    localStorage.setItem("boostLvlBeta",JSON.stringify(0))
    localStorage.setItem("boostLvlAlpha",JSON.stringify(0))
    localStorage.setItem("boostLvlTheta",JSON.stringify(0))
    localStorage.setItem("batCapLvlBeta",JSON.stringify(0))
    localStorage.setItem("batCapLvlAlpha",JSON.stringify(0))
    localStorage.setItem("batCapLvlTheta",JSON.stringify(0))
    localStorage.setItem("mintBeta",JSON.stringify(false))
    localStorage.setItem("mintAlpha",JSON.stringify(false))
    localStorage.setItem("mintTheta",JSON.stringify(false))
    localStorage.setItem("mintUpLvlBeta",JSON.stringify(1))
    localStorage.setItem("mintUpLvlAlpha",JSON.stringify(1))
    localStorage.setItem("mintUpLvlTheta",JSON.stringify(1))
    localStorage.setItem("jsMintUpCostBeta",JSON.stringify(500))
    localStorage.setItem("jsMintUpCostAlpha",JSON.stringify(500))
    localStorage.setItem("jsMintUpCostTheta",JSON.stringify(500))
    localStorage.setItem("jsuserBuildings",JSON.stringify(userBuildings))

    console.log(localStorage)

    load()

    window.location.reload()
}

window.logSessionFile = logSessionFile
window.rotateCrank = rotateCrank
window.buyBetaLeaf = buyBetaLeaf
window.buyAlphaLeaf = buyAlphaLeaf
window.buyThetaLeaf = buyThetaLeaf
window.buyBetaBatCap = buyBetaBatCap
window.buyAlphaBatCap = buyAlphaBatCap
window.buyThetaBatCap = buyThetaBatCap
window.buyBetaMint = buyBetaMint
window.buyAlphaMint = buyAlphaMint
window.buyThetaMint = buyThetaMint
window.save = save
window.load = load
window.reset = reset



const treeNodes = [
{x:227,y:126},
{x:220,y:115},
{x:237,y:108},
{x:240,y:93},
{x:236,y:78},
{x:228,y:68},
{x:204,y:85},
{x:178,y:100},
{x:161,y:111},
{x:226,y:50},
{x:220,y:45},
{x:208,y:36},
{x:200,y:32},
{x:174,y:60},
{x:188,y:25},
{x:180,y:22},
{x:164,y:14},
{x:149,y:12},
{x:140,y:40},
{x:136,y:7},
{x:123,y:7},
{x:108,y:21},
{x:98,y:7},
{x:89,y:10},
{x:79,y:14},
{x:82,y:37},
{x:64,y:22},
{x:51,y:27},
{x:41,y:38},
{x:32,y:45},
{x:28,y:59},
{x:19,y:69},
{x:17,y:83},
{x:14,y:95},
{x:28,y:111},
{x:23,y:122},
{x:60,y:78},
{x:84,y:100},
]