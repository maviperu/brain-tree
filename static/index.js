import {recordedSessions} from "./sessions.js";
import {userBuildings} from "./user_buildings.js";

console.log("PAGE INIT",localStorage)

let getstatSesh = document.querySelector('.statSesh')
let jsstatSesh = parseFloat(getstatSesh.innerHTML)
let sampleSeshCount = 0
let getstatMins = document.querySelector('.statMins')
let jsstatMins = parseFloat(getstatMins.innerHTML)

document.querySelector('.seshLen').innerHTML = recordedSessions.length - sampleSeshCount // sets the html # of sample sessions remaining on the tree button

let jsTheGrid = document.querySelector('.theGrid')

const power = {
    stat: "power",
    Beta: 0,
    Alpha: 0,
    Theta: 0,
}
const coins = {
    stat: "coins",
    Beta: 17000,
    Alpha: 7000,
    Theta: 7000,
}

const batCap = {
    stat: "batCap",
    Beta: 10,
    Alpha: 10,
    Theta: 10,
}

// Starting Costs
const cost = {
    stat: "cost",
    name: "leaf",
    Beta: 5000,
    Alpha: 5000,
    Theta: 5000,
}
const batCapCost = {
    stat: "cost",
    name: "batCap",
    Beta: 500,
    Alpha: 500,
    Theta: 500,
}
const mintUpCost = {
    stat: "cost",
    name: "mintUp",
    Beta: 4000,
    Alpha: 4000,
    Theta: 4000,
}

// Starting Quantities
const boostLvl = {
    Beta: 0,
    Alpha: 0,
    Theta: 0,
}
const batCapLvl = {
    Beta: 0,
    Alpha: 0,
    Theta: 0,
}
const mintUpLvl = {
    Beta: 1,
    Alpha: 1,
    Theta: 1,
}

let rateLeafCostGrowth = 1.07
let baseLeafCost = 5000
let baseLeafProdBoost = 2

let rateBatCapCostGrowth = 2
let baseBatCapCost = 500
let baseBatCapBoost = 100

let rateMintUpCostGrowth = 2
let baseMintUpCost = 2000

let getkJpsBeta = document.querySelector('.kJpsBeta')
let getkJpsAlpha = document.querySelector('.kJpsAlpha')
let getkJpsTheta = document.querySelector('.kJpsTheta')
let getcoinspsBeta = document.querySelector('.coinspsBeta')
let getcoinspsAlpha = document.querySelector('.coinspsAlpha')
let getcoinspsTheta = document.querySelector('.coinspsTheta')

const progress = {
    crankedTheCrank: {completed:false,unlocked:true,hint:"Click the crank a few times",elem:".stats",dispStyle:"block"},
    mindfulCranking: {completed:false,unlocked:true,hint:"Click the crank a few more times",elem:".laborBin.Alpha",dispStyle:"grid"},
    crankedSomeMore: {completed:false,unlocked:true,hint:"Click the crank lots of times!",elem:".treeButtonContainer",dispStyle:"block"},
    crankedSomeMore2: {completed:false,unlocked:false,hint:"Click the crank lots of times!",elem:".uploadBin",dispStyle:"grid"},
    usedTheTree: {completed:false,unlocked:false,hint:"Harvest some Brain Power",elem:".buildings",dispStyle:"grid"},
    boughtABat: {completed:false,unlocked:false,hint:"Buy a Battery",elem:".theGrid",dispStyle:"grid"},
}

const cheevs = {
    firstClick: {completed:false,msg:"The journey of 1000 clicks..."},
    firstHarvest: {completed:false,msg:"Mmm... Brains..."},
    clearedTheTut: {completed:false,msg:"Now the REAL fun begins!"},
}

function cheev(name) {
    cheevs[name].completed = true
    let elem = document.getElementById("cheevBox")
    let div = document.createElement("div")
    div.innerHTML = cheevs[name].msg
    div.classList.add("cheev")
    elem.appendChild(div)
    timeout(div,5000)
}

let progHints = document.getElementById("hints")
function dispHints() {
    const cleanupProg = document.getElementById("hints")
    while(cleanupProg.childNodes.length > 0){
        cleanupProg.removeChild(cleanupProg.lastChild)
    }
    for (const k in progress) {
        if (progress[k].unlocked === true) {
            let testdiv = document.createElement("div")
            testdiv.classList.add(`prog${k}`)
            testdiv.innerHTML = progress[k].hint
            progHints.appendChild(testdiv)
        }
    }
}
dispHints()

function dispGame(val) {
    dispGameElem(".main","flex")
    dispGameElem(".menu","none")
    consoleMsg ("Hello There!","short")
    if (val === "load") {load()}
    if (val === "new") {defaultGame()}
}
function dispGameElem(elem, dispStyle) {
    let loadWindow = document.querySelector(`${elem}`)
    loadWindow.style.display = `${dispStyle}`
    if (elem === ".laborBin.Alpha" && dispStyle != "none") {dispWaveElems(".contentAlpha")}
}
function dispWaveElems(elem) {
    document.querySelectorAll(`${elem}`).forEach(function(i) {
        i.classList.toggle('hide')
    })
}
function skipTut() { // [[[]]]can skip the homestead console stuff too
    for (const key in progress) {
        progress[key].completed = true
        progress[key].unlocked = false
        dispGameElem(progress[key].elem,progress[key].dispStyle)
    }
    jsCranksComplete = 10
    cheev("firstClick")
    cheev("firstHarvest")
    cheev("clearedTheTut")
    dispHints()
}

function consoleMsg (i,decay) {
    const div = document.querySelector(".console")
    const msg = document.createElement("span")
    const checkFirstChild = div.firstChild
    msg.innerHTML = i+"<br>"
    div.insertBefore(msg,checkFirstChild)
    //div.appendChild(msg)
    let time = 0
    if (decay == "long") {
        msg.classList.add("seshUndefinedLong")
        time = 4900
    } else {
        msg.classList.add("seshUndefinedShort")
        time = 2900
    }
    timeout(msg,time)
}

function setAllInners(thingToSet,mathToDo) {
    document.querySelectorAll(thingToSet).forEach(function(i) {
        i.innerHTML = mathToDo
    })
}

/*
-----------------
ENERGY GENERATION
-----------------
*/
function logSessionFile(event) {
    let sesh = recordedSessions[sampleSeshCount]

    if (sesh === undefined) {
        consoleMsg("No Session to Log!","short")
    } else {
        if (progress.usedTheTree.completed === false) { //Checks for first Brain Tree Progress
            progress.usedTheTree.completed = true
            progress.usedTheTree.unlocked = false
            dispGameElem(progress.usedTheTree.elem,progress.usedTheTree.dispStyle)
            consoleMsg("Ooh, upgrades! Now we're talking, let's get a battery!","long")
            if (cheevs.firstHarvest.completed === false) {cheev("firstHarvest")}
            progress.boughtABat.unlocked = true
            dispHints()
        }
        let harvestBeta = sesh.betaPower*(1+(boostLvl["Beta"]*baseLeafProdBoost/100))*1000
        let harvestAlpha = sesh.alphaPower*(1+(boostLvl["Alpha"]*baseLeafProdBoost/100))*1000
        let harvestTheta = sesh.thetaPower*(1+(boostLvl["Theta"]*baseLeafProdBoost/100))*1000
        incPower(harvestBeta,harvestAlpha,harvestTheta)
        
        jsstatMins += sesh.sessionMinutes
        getstatMins.innerHTML = jsstatMins

        jsstatSesh += 1 //global sessions value
        getstatSesh.innerHTML = jsstatSesh
        sampleSeshCount += 1 // sample sessions value

        document.querySelector('.seshLen').innerHTML = recordedSessions.length - sampleSeshCount

        makeBolts(sesh.betaPower,sesh.alphaPower,sesh.thetaPower)
        moveBolts (event)
        bolts.length = 0
    }
}

function nextSeshInfo() {
    let nextSesh = recordedSessions[sampleSeshCount]
    let msg = document.querySelector(".nextSeshInfo")
    let waste = document.querySelector(".nextSeshWaste")
    if (nextSesh === undefined) {
        msg.innerHTML = "No next session to Log!"
        waste.innerHTML = `Waste<br>0 kJ<br>0 kJ<br>0 kJ`
    } else {
        let nextBeta = nextSesh.betaPower
        let nextAlpha = nextSesh.alphaPower
        let nextTheta = nextSesh.thetaPower
        msg.innerHTML = `Your next session has...<br>${nextBeta} kJ Beta Power<br>${nextAlpha} kJ Alph Power<br>${nextTheta} kJ Theta Power`

        let wasteBeta = Math.ceil(Math.max(nextBeta*1000 - ((batCap["Beta"]*1000) - power["Beta"]),0)/100)/10
        let wasteAlpha = Math.ceil(Math.max(nextAlpha*1000 - ((batCap["Alpha"]*1000) - power["Alpha"]),0)/100)/10
        let wasteTheta = Math.ceil(Math.max(nextTheta*1000 - ((batCap["Theta"]*1000) - power["Theta"]),0)/100)/10
        waste.innerHTML = `Waste<br>${wasteBeta} kJ<br>${wasteAlpha} kJ<br>${wasteTheta} kJ`
        
    }
}

let uploadReturn = []
async function uploadFile(event) {
    const formData = new FormData();
    const file = document.getElementById("csvFile").files[0]
    formData.append("file", file);
    document.getElementById("csvFile").value=""
    addLoader("uploadButton")

    try {
       let r = await fetch('./upload', {
        method: "POST",
        body: formData,
        })
        console.log('HTTP response code:',r.status); 
        if (r.status === 422) {
            consoleMsg("No file Selected!","long")
        } else {

            uploadReturn = await r.json()
            console.log(uploadReturn)
            incPower(uploadReturn.betaPower*1000,uploadReturn.alphaPower*1000,uploadReturn.thetaPower*1000)

            jsstatMins += uploadReturn.sessionMinutes
            getstatMins.innerHTML = jsstatMins
            jsstatSesh += 1
            getstatSesh.innerHTML = jsstatSesh

            makeBolts(uploadReturn.betaPower,uploadReturn.alphaPower,uploadReturn.thetaPower)
            moveBolts (event)
            bolts.length = 0
            if (progress.usedTheTree.completed === false) {
                progress.usedTheTree.completed = true
                progress.usedTheTree.unlocked = false
                dispGameElem(progress.usedTheTree.elem,progress.usedTheTree.dispStyle)
                consoleMsg("Ooh, upgrades! Now we're talking, let's get a battery!","long")
                if (cheevs.firstHarvest.completed === false) {cheev("firstHarvest")}
                progress.boughtABat.unlocked = true
                dispHints()
            }
        }

    } catch(e) {
       console.log('Huston we have problem...:', e);
    }
    let test = document.getElementById("uploadButton")
    test.removeChild(test.lastChild)
}

function addLoader(elemID) {
    let element = document.getElementById(elemID)
    let loader = document.createElement("img")

    loader.src = "./assets/loader.png"
    loader.classList.add("loader")

    element.appendChild(loader)

    const spinning = [
        {transform: "rotate(360deg)"}
    ]
    let spinOptions = {
        duration: 500,
        easing: 'ease-in-out',
        iterations: Infinity,
    }
    loader.animate(spinning,spinOptions)
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
function moveBolts (event) {
    bolts.forEach (function(i) {
            let x = event.clientX + (i.randX*30)
            let y = event.clientY + (i.randY*30)
            let element = document.querySelector(`.dest${i.type}`)
            let div = element.getBoundingClientRect()

            let particle = document.createElement("img")
            particle.src =`./assets/${i.type}Bolt.png`
            particle.style.cssText = `top: ${y}px; left: ${x}px; pointer-events: none; z-index: 1000`
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
}

const timeout = (div,time) => {
    setTimeout(() => {
        div.remove()
    }, time)
}

function incPower(be,al,th) {
    power["Beta"] += be
    power["Alpha"] += al
    power["Theta"] += th
    power["Beta"] = Math.min(power["Beta"],batCap["Beta"]*1000)
    power["Alpha"] = Math.min(power["Alpha"],batCap["Alpha"]*1000)
    power["Theta"] = Math.min(power["Theta"],batCap["Theta"]*1000)
    let jpB = power["Beta"] / 1000
    let jpA = power["Alpha"] / 1000
    let jpT = power["Theta"] / 1000
    setAllInners('.powerBeta',jpB)
    setAllInners('.powerAlpha',jpA)
    setAllInners('.powerTheta',jpT)
    batCapPercent("Beta")
    batCapPercentIndicator("Beta")
    batCapPercent("Alpha")
    batCapPercentIndicator("Alpha")
    batCapPercent("Theta")
    batCapPercentIndicator("Theta")
}

let jsCrankNum = 0
let jsCranksComplete = 0
let cranking = 0
let fillBar = document.querySelectorAll('.crankIndicatorLight')
let segment = 6
const startupLog = [
    "Oh hey, little bolts!",
    "",
    "wow, this is quite a bit of work, eh?",
    "Time to get in the zone",
    "",
    "",
    "If only there was a way to get those bolts easier...",
    "",
    "",
    "A hah! a BRAIN TREE! I wonder what this does?",
]
function rotateCrank(event) {
    if (cranking == 0) {
        cranking += 1
        let crankIsCranking = document.getElementById('crankbutton');
        crankIsCranking.classList.add("crankRot");
        
        jsCrankNum += 1
        if (jsCrankNum == 1 && cheevs.firstClick.completed === false) {cheev("firstClick")}
        //Checks First Progress Milestone
        if (jsCrankNum == 5 && progress.crankedTheCrank.completed === false) {
            progress.crankedTheCrank.completed = true
            progress.crankedTheCrank.unlocked = false
            dispHints()
            dispGameElem(progress.crankedTheCrank.elem,progress.crankedTheCrank.dispStyle)
            consoleMsg("Ooh, a stats screen!","long")
        }
        //Indexes the Indicator lights or resets the indicators
        if (jsCrankNum < 7) {
            let activeSegment = segment-jsCrankNum
            fillBar[activeSegment].classList.add("active")
            incPower(Math.ceil(jsCrankNum/2),Math.ceil(counting/5),0)
            makeBolts(1,Math.ceil(counting/10),0)
            moveBolts (event)
            bolts.length = 0
        } else {
            jsCrankNum = 0
            if (jsCranksComplete < 10) {
                consoleMsg(startupLog[jsCranksComplete],"long")
                jsCranksComplete += 1
            }
            incPower(4,1,1)
            makeBolts(4,1,1)
            moveBolts (event)
            bolts.length = 0
            fillBar.forEach(function(i) {
                i.classList.remove("active")
            })
        }
        //Checks Alpha Button Progress Milestone
        if (jsCranksComplete == 4 && progress.mindfulCranking.completed === false) {
            progress.mindfulCranking.completed = true
            progress.mindfulCranking.unlocked = false
            dispGameElem(progress.mindfulCranking.elem,progress.mindfulCranking.dispStyle)
            dispHints()
        }
        //Checks Tree Progress Milestone
        if (jsCranksComplete == 10 && progress.crankedSomeMore.completed === false) {
            progress.crankedSomeMore.completed = true
            progress.crankedSomeMore.unlocked = false
            dispGameElem(progress.crankedSomeMore.elem,progress.crankedSomeMore.dispStyle)
            progress.crankedSomeMore2.completed = true
            progress.crankedSomeMore2.unlocked = false
            dispGameElem(progress.crankedSomeMore2.elem,progress.crankedSomeMore2.dispStyle)
            progress.usedTheTree.unlocked = true
            dispHints()
        }

        setTimeout(() => {
            crankIsCranking.classList.remove("crankRot");
            cranking = 0
        }, 250)

    }
}
let counting = 0
function countdown() {
    if (counting == 0) {
        const drainBar = document.getElementById("drainBar")
        drainBar.animate([
            {height:`100%`},
            {height:`0%`},
        ],{
            duration: 11000,
            iterations: 1,
            easing: 'linear',
        })

        counting = 11
        let cdT = setInterval(function() {
            counting -= 1
            document.querySelector(".countdownTimer").innerHTML = String(counting).padStart(2,"0")

            if (counting==0) {
                clearInterval(cdT)
            }
        },1000)
    }
}

//Functions for adding art assets to the game after purchases
function makeLeaf(type) {
    const src = document.getElementById("treeButton")

    for (let i = 0; i<baseLeafProdBoost; i++) { //Makes 2 leaves (baseLeafProdBoost) every time it's called
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
    const cleanup = document.getElementById('treeButton')
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
        div.classList.add("tooltipHover")
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

let upgradeTips = document.querySelectorAll('.upgradeTooltip')
document.addEventListener("mousemove", showTipBelow, false)
function showTipBelow(event) {
    for (let i=upgradeTips.length; i--;) {
        upgradeTips[i].style.left = (event.offsetX)/10 - 25 + 'px' 
    }
}

let infoTips = document.querySelectorAll('.tooltip')
document.addEventListener("mousemove", showTipCursor, false)
function showTipCursor(event) {
    for (let i=infoTips.length; i--;) {
        infoTips[i].style.left = 0 //(event.offsetX) + 'px' 
        infoTips[i].style.top = (event.offsetY +15) + 'px' 
    }
}
function upgradeInfo(upgrade,wave) {
    let upgradeButton = document.querySelector(`.${upgrade}.${wave}`)
    let buttonSpan = upgradeButton.querySelector(".upgradeEffect")
    if (upgrade === "leaf") {buttonSpan.innerHTML = `${boostLvl[wave] * baseLeafProdBoost}% => <span class="positive-value">${(boostLvl[wave]+1) * baseLeafProdBoost}%</span> ${wave}`}
    if (upgrade === "batCap") {buttonSpan.innerHTML = `${batCap[wave]} => <span class="positive-value">${batCap[wave] + baseBatCapBoost}</span> ${wave}`}
    if (upgrade === "mintUp") {buttonSpan.innerHTML = `${mintUpLvl[wave]} => <span class="positive-value">${mintUpLvl[wave]+1}</span> ${wave}`}
}


function buyLeaf(wave) { //Function for buying Leaf Upgrades
    if (power[wave] >= cost[wave]) {
        boostLvl[wave] += 1
        power[wave] -= cost[wave]
        cost[wave] = Math.round(baseLeafCost*(rateLeafCostGrowth**boostLvl[wave]))
        document.querySelector(`.leaf${wave}Cost`).innerHTML = cost[wave]/1000
        let innerPower = power[wave] / 1000
        setAllInners(`.power${wave}`,innerPower)
        batCapPercent(wave)
        batCapPercentIndicator(wave)
        makeLeaf(wave)
        upgradeInfo("leaf",wave)
    }
}

function buyBattery(wave) { //Function for buying Battery Upgrades
    if(coins[wave] >= batCapCost[wave]) {
        batCapLvl[wave] += 1
        coins[wave] -= batCapCost[wave]
        batCap[wave] = 10 + (batCapLvl[wave]*baseBatCapBoost)
        setAllInners(`.batCap${wave}`,batCap[wave])
        batCapCost[wave] = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvl[wave]))
        document.querySelector(`.batCap${wave}Cost`).innerHTML = batCapCost[wave]
        setAllInners(`.coins${wave}`,coins[wave])
        makeBuilding("Battery",wave)
        jsuserBuildings.push({type:"Battery",wave:`${wave}`})
    }
    if (progress.boughtABat.completed === false) {
        progress.boughtABat.completed = true
        progress.boughtABat.unlocked = false
        dispGameElem(progress.boughtABat.elem,progress.boughtABat.dispStyle)
        consoleMsg("Some extra breathing room for all this power","long")
        if (cheevs.clearedTheTut.completed === false) {cheev("clearedTheTut")}
        dispHints()
    }
    upgradeInfo("batCap",wave)
}

function buyMint(wave) { //Function for buying Mint Upgrades
    if(coins[wave] >= mintUpCost[wave]) {
        mintUpLvl[wave] += 1
        producers.find(p => p.name === `mint${wave}`).numBuilt = mintUpLvl[wave]
        coins[wave] -= mintUpCost[wave]
        mintUpCost[wave] = Math.round(baseMintUpCost*(rateMintUpCostGrowth**mintUpLvl[wave]))
        setAllInners(`.mintNum${wave}`,mintUpLvl[wave])
        document.querySelector(`.mintUp${wave}Cost`).innerHTML = mintUpCost[wave]
        setAllInners(`.coins${wave}`,coins[wave])
        makeBuilding("Mint",wave)
        jsuserBuildings.push({type:"Mint",wave:`${wave}`})
    }
    upgradeInfo("mintUp",wave)
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
    let str = stat["stat"]+wave
    let enoughStat = true
    stat[wave] += getRates(stat["stat"],wave,"con")
    if (stat[wave] <= 0) {
        stat[wave] = 0
        setAllInners(`.${str}`,0)
        enoughStat = false
    } else {
        setAllInners(`.${str}`,stat[wave]/1000)
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
    let enoughBeta = consume(power,"Beta")
    let enoughAlpha = consume(power,"Alpha")
    let enoughTheta = consume(power,"Theta")
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
    if(document.querySelector(".main").style.display === "flex") {
        localStorage.clear()

        localStorage.setItem("jsstatSesh",JSON.stringify(jsstatSesh))
        localStorage.setItem("sampleSeshCount",JSON.stringify(sampleSeshCount))
        localStorage.setItem("jsstatMins",JSON.stringify(jsstatMins))
        localStorage.setItem("power['Beta']",JSON.stringify(power['Beta']))
        localStorage.setItem("power['Alpha']",JSON.stringify(power['Alpha']))
        localStorage.setItem("power['Theta']",JSON.stringify(power['Theta']))
        localStorage.setItem("jsCrankNum",JSON.stringify(jsCrankNum))
        localStorage.setItem("jsCranksComplete",JSON.stringify(jsCranksComplete))
        localStorage.setItem("coins['Beta']",JSON.stringify(coins['Beta']))
        localStorage.setItem("coins['Alpha']",JSON.stringify(coins['Alpha']))
        localStorage.setItem("coins['Theta']",JSON.stringify(coins['Theta']))
        localStorage.setItem("cost['Beta']",JSON.stringify(cost['Beta']))
        localStorage.setItem("cost['Alpha']",JSON.stringify(cost['Alpha']))
        localStorage.setItem("cost['Theta']",JSON.stringify(cost['Theta']))
        localStorage.setItem("boostLvl['Beta']",JSON.stringify(boostLvl['Beta']))
        localStorage.setItem("boostLvl['Alpha']",JSON.stringify(boostLvl['Alpha']))
        localStorage.setItem("boostLvl['Theta']",JSON.stringify(boostLvl['Theta']))
        localStorage.setItem("batCapLvl['Beta']",JSON.stringify(batCapLvl['Beta']))
        localStorage.setItem("batCapLvl['Alpha']",JSON.stringify(batCapLvl['Alpha']))
        localStorage.setItem("batCapLvl['Theta']",JSON.stringify(batCapLvl['Theta']))
        localStorage.setItem("mintBeta",JSON.stringify(mintBeta.checked))
        localStorage.setItem("mintAlpha",JSON.stringify(mintAlpha.checked))
        localStorage.setItem("mintTheta",JSON.stringify(mintTheta.checked))
        localStorage.setItem("mintUpLvl['Beta']",JSON.stringify(mintUpLvl['Beta']))
        localStorage.setItem("mintUpLvl['Alpha']",JSON.stringify(mintUpLvl['Alpha']))
        localStorage.setItem("mintUpLvl['Theta']",JSON.stringify(mintUpLvl['Theta']))
        localStorage.setItem("mintUpCost['Beta']",JSON.stringify(mintUpCost['Beta']))
        localStorage.setItem("mintUpCost['Alpha']",JSON.stringify(mintUpCost['Alpha']))
        localStorage.setItem("mintUpCost['Theta']",JSON.stringify(mintUpCost['Theta']))

        localStorage.setItem("jsuserBuildings",JSON.stringify(jsuserBuildings))
        localStorage.setItem("producers",JSON.stringify(producers))
        localStorage.setItem("progress",JSON.stringify(progress))
        localStorage.setItem("cheevs",JSON.stringify(cheevs))

        consoleMsg("Saved!","short")
    } else {console.log("autosave aborted")}
    console.log(localStorage)
}

function load() {
    jsstatSesh = JSON.parse(localStorage.getItem("jsstatSesh"))
    sampleSeshCount = JSON.parse(localStorage.getItem("sampleSeshCount"))
    jsstatMins = JSON.parse(localStorage.getItem("jsstatMins"))
    power['Beta'] = JSON.parse(localStorage.getItem("power['Beta']"))
    power['Alpha'] = JSON.parse(localStorage.getItem("power['Alpha']"))
    power['Theta'] = JSON.parse(localStorage.getItem("power['Theta']"))
    jsCrankNum = JSON.parse(localStorage.getItem("jsCrankNum"))
    jsCranksComplete = JSON.parse(localStorage.getItem("jsCranksComplete"))
    coins['Beta'] = JSON.parse(localStorage.getItem("coins['Beta']"))
    coins['Alpha'] = JSON.parse(localStorage.getItem("coins['Alpha']"))
    coins['Theta'] = JSON.parse(localStorage.getItem("coins['Theta']"))
    cost['Beta'] = JSON.parse(localStorage.getItem("cost['Beta']"))
    cost['Alpha'] = JSON.parse(localStorage.getItem("cost['Alpha']"))
    cost['Theta'] = JSON.parse(localStorage.getItem("cost['Theta']"))
    boostLvl['Beta'] = JSON.parse(localStorage.getItem("boostLvl['Beta']"))
    boostLvl['Alpha'] = JSON.parse(localStorage.getItem("boostLvl['Alpha']"))
    boostLvl['Theta'] = JSON.parse(localStorage.getItem("boostLvl['Theta']"))
    batCapLvl['Beta'] = JSON.parse(localStorage.getItem("batCapLvl['Beta']"))
    batCapLvl['Alpha'] = JSON.parse(localStorage.getItem("batCapLvl['Alpha']"))
    batCapLvl['Theta'] = JSON.parse(localStorage.getItem("batCapLvl['Theta']"))
    mintBeta.checked = JSON.parse(localStorage.getItem("mintBeta"))
    mintAlpha.checked = JSON.parse(localStorage.getItem("mintAlpha"))
    mintTheta.checked = JSON.parse(localStorage.getItem("mintTheta"))
    mintUpLvl['Beta'] = JSON.parse(localStorage.getItem("mintUpLvl['Beta']"))
    mintUpLvl['Alpha'] = JSON.parse(localStorage.getItem("mintUpLvl['Alpha']"))
    mintUpLvl['Theta'] = JSON.parse(localStorage.getItem("mintUpLvl['Theta']"))
    mintUpCost['Beta'] = JSON.parse(localStorage.getItem("mintUpCost['Beta']"))
    mintUpCost['Alpha'] = JSON.parse(localStorage.getItem("mintUpCost['Alpha']"))
    mintUpCost['Theta'] = JSON.parse(localStorage.getItem("mintUpCost['Theta']"))
    
    getstatSesh.innerHTML = jsstatSesh
    document.querySelector('.seshLen').innerHTML = recordedSessions.length - sampleSeshCount
    getstatMins.innerHTML = jsstatMins

    let n=0
    fillBar.forEach(function(i) {
        if (n >= (6-jsCrankNum)) {
            i.classList.add("active")
            } else {i.classList.remove("active")}
        n += 1
    })

    let jpB = power["Beta"] / 1000
    setAllInners('.powerBeta',jpB)
    let jpA = power["Alpha"] / 1000
    setAllInners('.powerAlpha',jpA)
    let jpT = power["Theta"] / 1000
    setAllInners('.powerTheta',jpT)

    setAllInners('.mintNumBeta',mintUpLvl['Beta'])
    setAllInners('.mintNumAlpha',mintUpLvl['Alpha'])
    setAllInners('.mintNumTheta',mintUpLvl['Theta'])
    document.querySelector(`.mintUpBetaCost`).innerHTML = mintUpCost['Beta']
    document.querySelector(`.mintUpAlphaCost`).innerHTML = mintUpCost['Alpha']
    document.querySelector(`.mintUpThetaCost`).innerHTML = mintUpCost['Theta']

    setAllInners('.coinsBeta',coins['Beta'])
    setAllInners('.coinsAlpha',coins['Alpha'])
    setAllInners('.coinsTheta',coins['Theta'])
    document.querySelector('.leafBetaCost').innerHTML = cost["Beta"]/1000
    document.querySelector('.leafAlphaCost').innerHTML = cost["Alpha"]/1000
    document.querySelector('.leafThetaCost').innerHTML = cost["Theta"]/1000
    
    makeAllLeaves(boostLvl["Beta"],boostLvl["Alpha"],boostLvl["Theta"])

    jsuserBuildings = JSON.parse(localStorage.getItem("jsuserBuildings"))
    makeAllBuildings()

    let loadproducers = JSON.parse(localStorage.getItem("producers"))
    for (const key in loadproducers) {
        producers[key] = loadproducers[key]
    }

    let loadprogress = JSON.parse(localStorage.getItem("progress"))
    for (const key in loadprogress) {
        progress[key] = loadprogress[key]
        if (progress[key].completed === true) {
            dispGameElem(progress[key].elem,progress[key].dispStyle)
        }
    }
    dispHints()

    let loadcheevs = JSON.parse(localStorage.getItem("cheevs"))
    for (const key in loadcheevs) {
        cheevs[key] = loadcheevs[key]
    }

    batCap["Beta"] = 10 + (batCapLvl["Beta"]*baseBatCapBoost)
    setAllInners('.batCapBeta',batCap["Beta"])
    batCapCost["Beta"] = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvl["Beta"]))
    document.querySelector(`.batCapBetaCost`).innerHTML = batCapCost["Beta"]

    batCap["Alpha"] = 10 + (batCapLvl["Alpha"]*baseBatCapBoost)
    setAllInners('.batCapAlpha',batCap["Alpha"])
    batCapCost["Alpha"] = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvl["Alpha"]))
    document.querySelector(`.batCapAlphaCost`).innerHTML = batCapCost["Alpha"]

    batCap["Theta"] = 10 + (batCapLvl["Theta"]*baseBatCapBoost)
    setAllInners('.batCapTheta',batCap["Theta"])
    batCapCost["Theta"] = Math.round(baseBatCapCost*(rateBatCapCostGrowth**batCapLvl["Theta"]))
    document.querySelector(`.batCapThetaCost`).innerHTML = batCapCost["Theta"]
}

function defaultGame() {
        localStorage.clear()

        localStorage.setItem("jsstatSesh",JSON.stringify(0))
        localStorage.setItem("sampleSeshCount",JSON.stringify(0))
        localStorage.setItem("jsstatMins",JSON.stringify(0))
        localStorage.setItem("power['Beta']",JSON.stringify(0))
        localStorage.setItem("power['Alpha']",JSON.stringify(0))
        localStorage.setItem("power['Theta']",JSON.stringify(0))
        localStorage.setItem("jsCrankNum",JSON.stringify(0))
        localStorage.setItem("jsCranksComplete",JSON.stringify(0))
        localStorage.setItem("coins['Beta']",JSON.stringify(17000))
        localStorage.setItem("coins['Alpha']",JSON.stringify(7000))
        localStorage.setItem("coins['Theta']",JSON.stringify(7000))
        localStorage.setItem("cost['Beta']",JSON.stringify(5000))
        localStorage.setItem("cost['Alpha']",JSON.stringify(5000))
        localStorage.setItem("cost['Theta']",JSON.stringify(5000))
        localStorage.setItem("boostLvl['Beta']",JSON.stringify(0))
        localStorage.setItem("boostLvl['Alpha']",JSON.stringify(0))
        localStorage.setItem("boostLvl['Theta']",JSON.stringify(0))
        localStorage.setItem("batCapLvl['Beta']",JSON.stringify(0))
        localStorage.setItem("batCapLvl['Alpha']",JSON.stringify(0))
        localStorage.setItem("batCapLvl['Theta']",JSON.stringify(0))
        localStorage.setItem("mintBeta",JSON.stringify(false))
        localStorage.setItem("mintAlpha",JSON.stringify(false))
        localStorage.setItem("mintTheta",JSON.stringify(false))
        localStorage.setItem("mintUpLvlBeta",JSON.stringify(1))
        localStorage.setItem("mintUpLvlAlpha",JSON.stringify(1))
        localStorage.setItem("mintUpLvlTheta",JSON.stringify(1))
        localStorage.setItem("mintUpCost['Beta']",JSON.stringify(4000))
        localStorage.setItem("mintUpCost['Alpha']",JSON.stringify(4000))
        localStorage.setItem("mintUpCost['Theta']",JSON.stringify(4000))
        localStorage.setItem("jsuserBuildings",JSON.stringify(userBuildings))

        for (const key in progress) {
            progress[key].completed = false
            dispGameElem(progress[key].elem,"none")
        }
        progress.crankedTheCrank.unlocked = true
        progress.mindfulCranking.unlocked = true
        progress.crankedSomeMore.unlocked = true
        progress.crankedSomeMore2.unlocked = false
        for (const key in cheevs) {cheevs[key].completed = false}
    console.log(localStorage)
}
function reset() {
    defaultGame()
    load()
    window.location.reload()
}

window.dispGame = dispGame

window.skipTut = skipTut
window.logSessionFile = logSessionFile
window.uploadFile = uploadFile
window.nextSeshInfo = nextSeshInfo
window.rotateCrank = rotateCrank
window.countdown = countdown
window.upgradeInfo = upgradeInfo
window.buyLeaf = buyLeaf
window.buyBattery = buyBattery
window.buyMint = buyMint
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
// [[[]]]