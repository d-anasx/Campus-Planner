let qsts = [{
    nom: "html",
    hint: "Je suis le squelette d'une page web. J'utilise des balises comme <h1> et <p> pour définir la structure et le contenu."
},
{
    nom: "css",
    hint: "Je suis la peau et les vêtements d'une page web. Je contrôle les couleurs, les polices, la mise en page et l'apparence visuelle."
},
{
    nom: "javascript",
    hint: "Je suis le cerveau et les muscles d'une page web. J'ajoute l'interactivité, comme les animations, les réponses aux boutons et le contenu dynamique."
},
{
    nom: "frontend",
    hint: "Je suis la partie du site web que vous voyez et avec laquelle vous interagissez directement dans votre navigateur."
},
{
    nom: "backend",
    hint: "Je suis le côté serveur du site web.Je gère la base de données, la logique et les processus qui se déroulent en coulisses."
}
]

const indexAleatoire = Math.floor(Math.random() * qsts.length);
let qstSelected = []
let keys = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n"]
let userScore = {
    id: "",
    score: 0
}




window.onload = function () {
    let keyBoard = document.getElementById("key-board")
    let hints = document.getElementById("hints")
    let word = document.getElementById("word")
    let reset = document.getElementById("resetbutton")
    reset.onclick = function () {
        userScore.score = 0
        localStorage.setItem("user", JSON.stringify(userScore))
        window.location.reload()
    }
    let next = document.getElementById("nextbutton")
    next.onclick=function(){
        window.location.reload()
    }
    const scoreHistoryObj = localStorage.getItem("user");
    userScore = scoreHistoryObj ? JSON.parse(scoreHistoryObj) : { id: "", score: " " }
    
    
    qstSelected.push(qsts[indexAleatoire])
    // console.log(qstSelected[0])
    hints.textContent = qstSelected[0].hint
    keys.forEach(k => {
        keyBoard.innerHTML += `<button id="btn" class=key-board >${k}</button>`
    })
    let scoreCounter = Number(userScore.score)
    let scoreHolder = document.getElementById("score")
    scoreHolder.innerHTML = "votre score: " + scoreCounter
    let rep = qstSelected[0].nom
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
                    // console.log(rep1)


                    if (word.textContent == rep) {
                        scoreCounter += 10
                        scoreHolder.innerHTML = "votre score: " + scoreCounter
                        userScore.score = scoreCounter
                        localStorage.setItem("user", JSON.stringify(userScore))


                    }


                }
            }
        })

    })

        ;
    

}





