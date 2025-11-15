// 1- task : localstorage
// method :
let ValidateRules = {
   theme: {
      regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
      errormessage: "invilade course name"
   },
   trainer: {
      regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
      errormessage: "invilade trainer"
   },
   duration: {
      regex: /^\d+$/,
      errormessage: "invilade course duration"
   },
   capacity: {
      regex: /^\d+$/,
      errormessage: "invilade course capacity"
   },
   username: {
      regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
      errormessage: "invilade username"
   },
   email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errormessage: "invilade email"

   },
   password: {
      regex: /^(\+?\d{1,3}[- ]?)?\d{9,10}$/,
      errormessage: "invilade email"

   }

}

let formationsdetails = [];
let courslist = document.querySelector("#courses-details")
let myform = document.getElementById("course-details")
let createcoursebtn = document.getElementById("creatcourse")
let modal = document.getElementById("addformation")
let cursedetails = document.getElementById("curse-title")
myform.addEventListener('submit', newformation)
createcoursebtn.addEventListener("click", showform)
//  here I fech the data 
if (typeof (localStorage.getItem("data")) == "object") {
   fetch("../data/formation.json")
      .then(res => res.json())
      .then(data => {
         localStorage.setItem("data", JSON.stringify(data))
         formationsdetails = JSON.parse(localStorage.getItem("data"))
      })
} else {
   formationsdetails = JSON.parse(localStorage.getItem("data"))
   showcourses()
}
let joincoursebtn = document.querySelectorAll(".entercourse")
joincoursebtn.array.forEach(btn => {
   let formationnumber = btn.name

});
// fonction of display the data 
function showcourses() {
   let output = ""

   for (let item of formationsdetails) {
      output += `
            
        <div name = "${item.id}"  id="course-details" class="bg-white p-4 grid place-content-center   gap-5  curse-details">
                  <img   src="../public/coding.jpg" alt="code";>
               <p  id="curse-title"><bold class = "font-bold">Title : </bold>${item.theme}</p>
                <p id="formater-name"><bold class = "font-bold">Formater : </bold> ${item.trainer} </p>
                
                <p class = "grid grid-cols-3"  id="course-duration"><bold class = "font-bold">Duration :  </bold>${item.duration}h
                <span><img height="20px" width="20px" src="../public/three-o-clock-clock.png"></span> </p>
               <p class = "grid grid-cols-3"><bold class = "font-bold">Capacity</bold> : ${item.participants.length}/${item.capacity}<span><img height="20px" width="20px" src="../public/user.png"></span></p>
            <button class="entercourse" class="grid place-content-center"> <a class=" grid  place-items-center  btn" href="login-page.html">Start The
                course</a></button>
          </div>

   
     `;
      courslist.innerHTML = output
   }
}
//the fonction that show the form when user click create course
function showform() {
   modal.style.display = "grid"
}
//the function that check if the form is validate or not
function FormValidator() {
   let myInputs = myform.querySelectorAll("input")
   let wronginput = 0;
   console.log(myInputs)
   myInputs.forEach(input => {
      let value = input.value.trim()
      let regex = ValidateRules[input.name].regex
      let errormessage = document.getElementsByClassName("errormessage")[input.name];
      console.log(regex)

      if (!value.match(regex)) {
         errormessage.textContent = ValidateRules[input.name].errormessage
         errormessage.style.color = "red"
         input.style.border = " 3px solid red"
         wronginput++
      } else {
         input.style.border = "3px solid green"
         errormessage.textContent = ""



      }
   });

   return wronginput
}
//the fonction that allows user to add formation
function newformation(e) {
   let myInputs = e.target.querySelectorAll("input");
   e.preventDefault()
   let newformation = {
      participants: []
   }
   let wronginput = FormValidator()
   if (wronginput > 0) {
      return;
   } else {
      myInputs.forEach((input) => {
         newformation[input.name] = input.value
      });

      localStorage.setItem("data", JSON.stringify(newformation))
   }
   console.log(newformation)
   formationsdetails.push(newformation);
   modal.style.display = "none"
   localStorage.setItem("data", JSON.stringify(formationsdetails))
   showcourses()

}
