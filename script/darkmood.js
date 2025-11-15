let input = document.querySelector("input");



// let obj = [
//   {
//     name: "said",
//     age: 26,
//     hobbies: ["swiming", "football", "reading"],
//   },
//   {
//     name: "said",
//     age: 26,
//     hobbies: ["swiming", "football", "reading"],
//   },
// ];

// let ne = obj.filter((elem)=> elem.age<26)

// ne.forEach((obj) => {


//   let h1 = document.createElement("h1");
//   let para = document.createElement("p");

//   h1.textContent = obj.name;
//   para.textContent = obj.age;


//   div.appendChild(h1);
//   div.appendChild(para);


//   obj.hobbies.forEach((hub) => {
//       let span = document.createElement("span");
//     span.textContent = hub;
//       div.appendChild(span);

//   });


// });


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
