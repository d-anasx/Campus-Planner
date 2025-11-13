// 1- task :fonction tvalider lform
// method :
let ValidateRules = {
   theme: {
      regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
      errormessage: "invilade Course name"
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
   }
}

formationsdetails = [];
let courslist = document.querySelector("#courses-details")
let myform = document.getElementById("course-details")
let createcoursebtn = document.getElementById("creatcourse")
let modal = document.getElementById("addformation")
let cursedetails = document.getElementById("curse-title")
createcoursebtn.addEventListener("click", showform)
let submit = document.getElementById("Submit")
myform.addEventListener('submit', newformation)
//  submit.addEventListener("click",newformation)

//  here I fech the data 
fetch("../data/formation.json")
   .then(res => res.json())
   .then(data => {
      formationsdetails = data
      
      showcourses()
   })

// fonction of display the data 
function showcourses() {
   let output = ""

   for (let item of formationsdetails) {

      output += `
            
        <div id="course-details" class="bg-white p-10 grid place-content-center   gap-5  curse-details">
                  <img   src="../public/coding.jpg" alt="code";>
               <p  id="curse-title"><bold class = "font-bold">Title : </bold>${item.theme}</p>
                <p id="formater-name"><bold class = "font-bold">Formater : </bold> ${item.trainer} </p>
                
                <p class = "grid grid-cols-3"  id="course-duration"><bold class = "font-bold">Duration :  </bold>${item.duration}h
                <span><img height="20px" width="20px" src="../public/three-o-clock-clock.png"></span> </p>
               <p class = "grid grid-cols-3"><bold class = "font-bold">Capacity</bold> : ${item.participants.length}/${item.capacity}<span><img height="20px" width="20px" src="../public/user.png"></span></p>
            <button class="grid place-content-center"> <a class=" grid  place-items-center  btn" href="#">Start The
                course</a></button>
          </div>

   
     `;
      console.log(formationsdetails)
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
   if (wronginput>0) {
     return;
   } else {
      myInputs.forEach((input) => {
         newformation[input.name] = input.value
      });

   }
   console.log(newformation)
   formationsdetails.push(newformation);
   modal.style.display = "none"

   showcourses()

}
