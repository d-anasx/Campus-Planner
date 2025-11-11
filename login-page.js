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
        regex: /^(\+?\d{1,3}[- ]?)?\d{9,10}$/,
        errormessage: "invilade password"
    }
}
let form = document.getElementById("Sign-up");
form.addEventListener("submit", FormValidator)
function FormValidator(event) {
    event.preventDefault()
    let myinputs = form.querySelectorAll("input")
    myinputs.forEach(input => {
        let value = input.value.trim()
        let regex = ValidateRules[input.name].regex
        let errormessage = document.getElementsByClassName("errormessage")[input.name];

        if (!value.match(regex)) {
            errormessage.textContent = ValidateRules[input.name].errormessage
            errormessage.style.color = "red"

            input.style.border = " 3px solid red"
        } else[
            input.style.border = "3px solid green"
            
            
        ]
    });
} 