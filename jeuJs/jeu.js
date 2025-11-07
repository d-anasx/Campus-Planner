let qsts = [{
    nom: "html",
    hint: "Je suis le squelette d'une page web. J'utilise des balises comme <h1> et <p> pour définir la structure et le contenu."
},
{
    nom: "CSS",
    hint: "Je suis la peau et les vêtements d'une page web. Je contrôle les couleurs, les polices, la mise en page et l'apparence visuelle."
},
{
    nom: "JavaScript",
    hint: "Je suis le cerveau et les muscles d'une page web. J'ajoute l'interactivité, comme les animations, les réponses aux boutons et le contenu dynamique."
},
{
    nom: "Frontend",
    hint: "Je suis la partie du site web que vous voyez et avec laquelle vous interagissez directement dans votre navigateur."
},
{
    nom: "Backend",
    hint: "Je suis le côté serveur du site web.Je gère la base de données, la logique et les processus qui se déroulent en coulisses."
}
]

const indexAleatoire = Math.floor(Math.random() * qsts.length);
let qstSelected = []
let keys=["a","z","e","r","t","y","u","i","o","p","q","s","d","f","g","h","j","k","l","m","w","x","c","v","b","n"]

window.onload = function () {
    let keyBoard=document.getElementById("key-board")
    let hints = document.getElementById("hints")
    let word= document.getElementById("word")
    qstSelected.push(qsts[indexAleatoire])
    // console.log(qstSelected[0])
    hints.textContent = qstSelected[0].hint
    keys.forEach(k=>{
      keyBoard.innerHTML+=`<button id="btn" class=key-board >${k}</button>`
    
    })
    
    let rep=qstSelected[0].nom
    let rep2=rep.split("")
    let rep3=rep.split('')
    console.log(rep2)
    for(let i=0;i<rep2.length;i++){
        rep3[i]="_"
    }
    let temp
    word.textContent=rep3
    let button=document.querySelectorAll("#btn")
    button.forEach(buttn => {
        buttn.addEventListener('click',function(){
         for(let i=0;i<rep2.length;i++){
            if(buttn=rep2[i]){
                temp=rep2[i]
                rep2[i]=rep3[i]
                rep3[i]=temp
                
                console.log('hello')
            }
         }
        })

    });
   
}





