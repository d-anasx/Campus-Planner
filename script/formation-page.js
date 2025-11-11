let createcourseform = document.getElementById("modal")
let createcoursebtn = document.getElementById("creatcourse");
let submitcourseinfo = document.getElementById("Submit")
 submitcourseinfo.addEventListener("click",submitcourseinformation)
createcoursebtn.addEventListener("click",Createcours)
let output = ""
// 9ad line dyal derution 
let cursedetails = document.getElementById("curse-title")
fetch("./data/formation.json")

   .then(res => res.json())
   .then(formation => {

      for (let item of formation) {

         output += `
            
            <div style="box-shadow: 10px 10px rgba(134, 119, 119, 0.085); "
          class="grid grid-cols-1 border border-gray-200 rounded-xl curse-card">
          <img src="./public/coding.jpg" width="100%" height="30%" alt="html curse">
       
          <div id="course-details" class="p-10 grid  gap-1  curse-details">

               <p  id="curse-title">Title : ${item.theme}</p>
                <p id="formater-name">Formater : ${item.trainer} </p>
                
                <p class = "grid grid-cols-2"  id="course-duration">Duration : ${item.duration}h
                 <span><img height="20px" width="20px" src="public/three-o-clock-clock.png"></span></p>
                Capacity : ${item.participants.length}/${item.capacity}</p>
            <button class="grid place-content-center"> <a class=" grid  place-items-center  btn" href="#">Start The
                course</a></button>
          </div>
   
     `;



         document.querySelector("#courses-details").innerHTML = output
      }
   })
   function Createcours(){
   createcourseform.style.display = "grid"
   }
 function submitcourseinformation(){
   createcourseform.style.display = "none"
   
 }
