// let qsts = [{
//     nom: "html",
//     hint: "Je suis le squelette d'une page web. J'utilise des balises comme <h1> et <p> pour définir la structure et le contenu."
// },
// {
//     nom: "css",
//     hint: "Je suis la peau et les vêtements d'une page web. Je contrôle les couleurs, les polices, la mise en page et l'apparence visuelle."
// },
// {
//     nom: "javascript",
//     hint: "Je suis le cerveau et les muscles d'une page web. J'ajoute l'interactivité, comme les animations, les réponses aux boutons et le contenu dynamique."
// },
// {
//     nom: "frontend",
//     hint: "Je suis la partie du site web que vous voyez et avec laquelle vous interagissez directement dans votre navigateur."
// },
// {
//     nom: "backend",
//     hint: "Je suis le côté serveur du site web.Je gère la base de données, la logique et les processus qui se déroulent en coulisses."
// }
// ]

function affichage(words) {
    const indexAleatoire = Math.floor(Math.random() * words.length);

    let qstSelected = []
    let keys = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n"]
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
    let scoreCounter
    reset.onclick = function reset () {
        userScore.score = 0
        localStorage.setItem("user", JSON.stringify(userScore))
        scoreCounter = userScore.score
        scoreHolder.innerHTML = "votre score: " + scoreCounter
    }
    let next = document.getElementById("nextbutton")
    next.onclick = function () {
        window.location.reload()
    }
    const scoreHistoryObj = localStorage.getItem("user");
    userScore = scoreHistoryObj ? JSON.parse(scoreHistoryObj) : { id: "", score: " " }

    qstSelected.push(words[indexAleatoire])
    // console.log(qstSelected[0])
    hints.textContent = qstSelected[0].hint

    keys.forEach(k => {
        keyBoard.innerHTML += `<button id="btn" class="btn" >${k}</button>`
    })
    scoreCounter = Number(userScore.score)
    let scoreHolder = document.getElementById("score")
    scoreHolder.innerHTML = "votre score: " + scoreCounter
    tentative.innerHTML = "tentatives:  " + tentativeCount
    let rep = qstSelected[0].word
    console.log(qstSelected[0].word)
    // let rep1 = rep.split('')
    let rep2 = rep.split('')
    let rep3 = rep.split('')
    for (let i = 0; i < rep2.length; i++) {
        rep3[i] = '_'
    }
    let temp
    word.textContent = rep3.join("")
    let button = document.querySelectorAll("#btn")
    button.forEach(buttn => {
        buttn.addEventListener('click', function () {

            for (let i = 0; i < rep2.length; i++) {
                if (buttn.textContent == rep2[i]) {
                    temp = rep2[i]
                    rep2[i] = rep3[i]
                    rep3[i] = temp
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





