let input = document.querySelector("input");

let sections = document.querySelectorAll("section");
let header = document.querySelector("header");
let footer = document.querySelector("footer");
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

    
    sections.forEach(section=>{
         section.style.backgroundColor = "black";
    });
   
    

 
  } else {
    changes.textContent = "dark";
    changes.style.color = "black";
    header.style.backgroundColor = "white";
    footer.style.backgroundColor = "white";

    sections.forEach(section=>{
         section.style.backgroundColor = "white";
    });
   
     
    
 
  }
}

// console.log(document.getElementsByTagName('a'));
// console.log(document.getElementById("").textContent);
