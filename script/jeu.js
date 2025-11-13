
let scoreHolder
let scoreCounter
function localStorageCheck() {
    const scoreHistoryObj = localStorage.getItem("user");
    userScore = scoreHistoryObj ? JSON.parse(scoreHistoryObj) : { id: "", score: " " }
}
function affichageDuclavier(words, qstSelected, keys, keyBoard) {
    const indexAleatoire = Math.floor(Math.random() * words.length);
    qstSelected.push(words[indexAleatoire])

    hints.textContent = qstSelected[0].hint

    keys.forEach(k => {
        keyBoard.innerHTML += `<button id="btn" class="btn" >${k}</button>`
    })
}
function affichageDuscore(tentative, tentativeCount) {
    scoreCounter = Number(userScore.score)
    scoreHolder = document.getElementById("score")
    scoreHolder.innerHTML = "votre score: " + scoreCounter
    tentative.innerHTML = "tentatives:  " + tentativeCount
}
function transformMot(qstSelected) {
    let rep = qstSelected[0].word
    console.log(qstSelected[0].word)
    let rep2 = rep.split('')
    let rep3 = rep.split('')
    for (let i = 0; i < rep2.length; i++) {
        rep3[i] = '_'
    }

    return {rep , rep2, rep3};
}
function affichage(words) {
    let qstSelected = []
    let keys = "azertyuiopqsdfghjklmwxcvbn".split('')
    let userScore = {
        id: "",
        score: 0
    }
    let tentativeCount = 7
    let tentative = document.getElementById("tentative")
    let keyBoard = document.getElementById("key-board")
    let hints = document.getElementById("hints")
    let word = document.getElementById("word")
    let reset = document.getElementById("resetbutton")
    reset.onclick = function reset() {
        userScore.score = 0
        localStorage.setItem("user", JSON.stringify(userScore))
        scoreCounter = userScore.score
        scoreHolder.innerHTML = "votre score: " + scoreCounter
    }
    let next = document.getElementById("nextbutton")
    next.onclick = function () {
        window.location.reload()
    }
    localStorageCheck()
    affichageDuclavier(words, qstSelected, keys, keyBoard)
    affichageDuscore(tentative, tentativeCount)
    const {rep, rep2, rep3} = transformMot(qstSelected)
    word.textContent = rep3.join("")
    let temp
    let button = document.querySelectorAll("#btn")
    button.forEach(buttn => {
        buttn.addEventListener('click', function () {

            for (let i = 0; i < rep2.length; i++) {
                if (buttn.textContent == rep2[i]) {
                    rep3[i] = buttn.textContent
                    word.textContent = rep3.join("")
                    buttn.setAttribute("class", "btn2")
                    // console.log(rep1)
                    if (word.textContent == rep) {
                        scoreCounter += 10
                        scoreHolder.innerHTML = "votre score: " + scoreCounter
                        userScore.score = scoreCounter
                        button.forEach(buttn => {
                            buttn.disabled = true
                        })
                        localStorage.setItem("user", JSON.stringify(userScore))
                    }
                }
                else if (buttn.getAttribute('class') !== "btn2") {
                    buttn.setAttribute("class", "btn3")

                }
            }
            if (buttn.getAttribute('class') == "btn3") {
                tentativeCount -= 1
                tentative.innerHTML = "tentatives:  " + tentativeCount
            }
            if (tentativeCount == 0) {
                tentative.innerHTML = "game over"
                button.forEach(buttn => {
                    buttn.disabled = true


                })

                // document.getElementById("btn").disabled=true

            }
        })

    })

        ;

}
window.onload = function () {
    const wordsHistoryArray = localStorage.getItem("questions")
    if (wordsHistoryArray) {
        let words = JSON.parse(wordsHistoryArray)
        affichage(words)
    }
    else {
        fetch("https://mocki.io/v1/f64d2ff5-72de-47ea-a59d-c8e8bfae08ef")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((words) => {
                localStorage.setItem("questions", JSON.stringify(words))
                affichage(words)
            })
            .catch(error => console.log(error))
    }
}





