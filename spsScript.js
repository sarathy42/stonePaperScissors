let player;
let playerCount = 2;
const handPossiable = ["","stone", "paper", "scissor"]

function creatHand() {
    document.getElementById("getReadyHand").style.display = "none";
    document.getElementById("spsGamePlay").style.display = "flex";
    const handHOl = document.getElementById("showHand");
    const scoreBoard = document.getElementById("scoreDis");
    handHOl.innerHTML = "";
    scoreBoard.innerHTML = "";
    for (i = 1; i <= playerCount; i++) {
        //create player hand
        let hand = document.createElement("div");
        let handImg = document.createElement("img");
        handImg.setAttribute("id", i);
        handImg.src = "./stone.png";
        handImg.alt = "hand";
        handImg.dataset.id = "2";
        hand.appendChild(handImg);
        handHOl.appendChild(hand);
        //create player score
        let scoreHolder = document.createElement("div");
        let playerName = document.createElement("p");
        let playerScore = document.createElement("b");
        playerName.innerText = player[`player${i}`].name;
        playerScore.innerText = player[`player${i}`].score;
        playerScore.setAttribute("id", `player${i}Score`);
        scoreHolder.appendChild(playerName);
        scoreHolder.appendChild(playerScore);
        scoreBoard.appendChild(scoreHolder);
    }
}

function adjustPlayerCount(adjPly) {
    player = {
        "player1" : {"name" : "bot1", "type" : "user", "score" : 0},
        "player2" : {"name" : "bot2", "type" : "bot", "score" : 0},
        "player3" : {"name" : "bot3", "type" : "bot", "score" : 0},
        "player4" : {"name" : "bot4", "type" : "bot", "score" : 0}
    };
    document.getElementById("getReadyHand").style.display = "flex";
    document.getElementById("spsGamePlay").style.display = "none";
    document.getElementById("setPlayer").style.display = "none";
    document.getElementById("setPlayerCnt").style.display = "flex";
    let playerCntDisplay = document.getElementById("cnt");
    playerCntDisplay.innerText = playerCount;
    if (adjPly == "add") {
        ++playerCount == 5 ? playerCount-- : playerCount;
    } else if (adjPly == "min") {
        --playerCount == 1 ? playerCount++ : playerCount;
    }
    playerCntDisplay.innerText = playerCount;
}

function playerDetails() {
    document.getElementById("setPlayerCnt").style.display = "none";
    document.getElementById("setPlayer").style.display = "flex";
    let plyDet = document.getElementById("getPlayerDetail");
    plyDet.innerHTML = "";
    for (i = 1; i <= playerCount; i++) {
        let inPly = document.createElement("input");
        inPly.type = "text";
        inPly.placeholder = `Player${i} name`;
        inPly.setAttribute("id", `player${i}Detail`);
        plyDet.appendChild(inPly);
    }
}

function assignPlayer() {
    let ply1 = document.getElementById("player1Detail");
    if (ply1.value.trim() == "") {
        ply1.style.border = "red 2px solid"
        return;
    }
    for (i = 1; i <= playerCount; i++) {
        let inVal = document.getElementById(`player${i}Detail`).value.trim();
        if (inVal != "") {
            player[`player${i}`].name = inVal;
            player[`player${i}`].type = "user";
        }
    }
    creatHand();
}

function shakeHand() {
    for (i = 1; i <= playerCount; i++) {
        let randomValue = Math.floor(Math.random() * 3) + 1;
        let playerHand = document.getElementById(`${i}`);
        playerHand.src = `./${handPossiable[randomValue]}.png`
        playerHand.dataset.handposs = handPossiable[randomValue];
    }
    scoreAssign();
}

function scoreAssign() {
    for (i = 1; i <= playerCount; i++) {
        let cuPlayer = player[`player${i}`]
        let score = cuPlayer.score;
        let cuPlayerHand = document.getElementById(i).dataset.handposs;
        for (j = 1; j <= playerCount; j++) {
            let otherPlayerHand = document.getElementById(j).dataset.handposs;
            if (j != i && cuPlayerHand != otherPlayerHand) {
                if (cuPlayerHand == "scissor" && otherPlayerHand == "paper") {
                    score++;
                } else if (cuPlayerHand == "stone" && otherPlayerHand == "scissor") {
                    score++;
                } else if (cuPlayerHand == "paper" && otherPlayerHand == "stone") {
                    score++;
                }
            }
        }
        document.getElementById(`player${i}Score`).innerText = score;
        cuPlayer.score = score;
    }
}