let ValidateRules = {
    username: {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
        errormessage: "invilade username"
    },
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errormessage: "invilade email"
    },
    password: {
        regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        errormessage: "invilade password"
    }
}
let students = []
let form = document.getElementById("Sign-up");
form.addEventListener("submit",Tojoininformation)
      //   students  = JSON.parse(localStorage.getItem("students"))

if (typeof (localStorage.getItem("students")) == "object") {
         students = JSON.parse(localStorage.getItem("students"))
      
} else {
   students = JSON.parse(localStorage.getItem("students"))
}

function FormValidator() {
   let myInputs = form.querySelectorAll("input")
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
function Tojoininformation (e ) {
   let myInputs = e.target.querySelectorAll("input");
   e.preventDefault()
   let student = {
   }

   let wronginput = FormValidator()
   console.log(wronginput)
   if (wronginput > 0) {
      return;
   } else {
      myInputs.forEach((input) => {
         student[input.name] = input.value
      });

   }
   students.push(student);
   localStorage.setItem("students", JSON.stringify(students))

}