let input = document.querySelector("input");

let section = document.querySelector(".section__1");
let header = document.querySelector("header");
let footer = document.querySelector("footer");
let span= document.getElementById("span");
let link = document.querySelectorAll("el-popover-group");
let num = document.getElementById("number");

let changes = document.getElementById("changes");

input.addEventListener("click", dark);

function dark() {
  if (changes.textContent == "dark") {
    changes.textContent = "light";
    changes.style.color = "white";
    header.style.backgroundColor = "black";
    footer.style.backgroundColor = "black";
    span.style.color='white';

    
   
         section.style.backgroundColor = "black";
  
   
    

 
  } else {
    changes.textContent = "dark";
    changes.style.color = "black";
    header.style.backgroundColor = "white";
    footer.style.backgroundColor = "white";
    span.style.color='var(--color-gray-600)';

    
         section.style.backgroundColor = "white";
  
   
     
    
 
  }
}

// console.log(document.getElementsByTagName('a'));
// console.log(document.getElementById("").textContent);
