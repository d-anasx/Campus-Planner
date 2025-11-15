let input = document.querySelector("input");



let changes = document.getElementById("changes");

let elem =document.querySelector(".light");

input.addEventListener("click", dark);

function dark() {
 if(elem.classList=="light"){

elem.classList.remove("light");
elem.classList.add("dark");
changes.textContent='dark';

 }
else{
  
elem.classList.remove("dark");
elem.classList.add("light");
changes.textContent='light';
}


  }
