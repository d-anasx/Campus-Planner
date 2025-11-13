let result = [];
let currentId;

document.addEventListener("DOMContentLoaded", async () => {
  async function getData() {
    if (localStorage.getItem("test")) {
      result = JSON.parse(localStorage.getItem("test"));
      console.log(result)
      displayData();
        getTotalEvents();
      return  
    }
    const url = "/data/events.json";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      result = await response.json();

      if (result) {
        localStorage.setItem("test", JSON.stringify(result));

        displayData();
        getTotalEvents();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function displayData() {
    const events_div = document.getElementById("events-section");
    console.log(events_div)
    events_div.innerHTML = "";

    result.forEach((e) => {
      let code = `
        <div class="card flex flex-col w-[23em] h-[15em] p-6 bg-gray-300 border border-gray-200 rounded-lg shadow-heavy">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${e.title}</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700">${e.description}</p>
          <div class="flex justify-between items-center mt-auto">
            <button onclick="document.readMore('${e.id}')"  class="w-36 inline-flex items-center btn" command="show-modal" commandfor="readmore-dialog">
              Read more
              <svg
                class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
            <div class="tools hidden">
            <button onclick="getCurrentId('${e.id}')" command="show-modal" commandfor="dialog">
            <a>
              
                <iconify-icon icon="line-md:pencil-alt-twotone" width="24" height="24" style="color:#10705d"></iconify-icon>
              </a></button>
              
              <a onclick="document.deleteEvent('${e.id}')"> 
                <iconify-icon icon="line-md:trash" width="24" height="24" style="color:#e3200f"></iconify-icon>
              </a>
            </div>
          </div>
        </div>
        
      `;
      events_div.innerHTML += code;
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mouseover", (e) => {
        e.preventDefault();
        card.querySelector(".tools").classList.remove("hidden");
      });
      card.addEventListener("mouseout", (e) => {
        e.preventDefault();
        card.querySelector(".tools").classList.add("hidden");
      });
    });
  }

  //total events function
  function getTotalEvents() {
    const total_html = document.getElementById("total");
    total_html.innerHTML = `${result.length} events`;
  }

  //delete event function
  function deleteEvent(id) {
    
    if (confirm("are you sure to delete this event ?")){
        result = result.filter((e) => e.id !== parseInt(id));
        displayData();
        getTotalEvents();
  }
    }
      

    

  // edit event function

  function getCurrentId(id) {
    currentId = id;
    let event = result.find((ev) => ev.id == currentId);
    document.getElementById("title").value = event.title;
    document.getElementById("desc").value = event.description;
  }

  //read more function

  function readMore(id) {
    let event = result.find((e) => e.id == id);

    let readMoreDiv = document.querySelector(".readmore");
    readMoreDiv.innerHTML = "";
    for (let value in event) {
      readMoreDiv.innerHTML += ` <div class="flex justify-center rounded-md bg-gray-500 items-center ">
                                  <strong>${value} :</strong>  <p>${event[value]}</p>
                               </div>
      
      `;
    }
  }

  //updating function
  function handleSubmit(e) {
    console.log(e);

    let title = document.getElementById("title");
    let desc = document.getElementById("desc");

    if (!title.value.trim() || !desc.value.trim()) {
      console.log("empty");
      e.preventDefault();
    }

    result.map((ev) => {
      ev.id == currentId
        ? ((ev.title = title.value), (ev.description = desc.value))
        : ev;
    });

    displayData();
    getTotalEvents();

    title.value = "";
    desc.value = "";
  }

  //new event function
  let addForm = document.querySelector(".add-form");
  addForm[4].addEventListener("click", addNewEvent);

  function addNewEvent(e) {
    let title = addForm[0].value;
    let date = addForm[1].value;
    let location = addForm[2].value;
    let desc = addForm[3].value;

    if (!title.trim() || !date.trim() || !location.trim() || !desc.trim()) {
      e.preventDefault();
    } else {
      let event = {
        id: result.length ,
        title: title,
        date: date,
        location: location,
        description: desc,
      };
      result.push(event);
      displayData();
      getTotalEvents();
      addForm.reset();
    }
  }

  //handling modal submit button
  let submit_btn = document.querySelector(".submit-modal");
  submit_btn.addEventListener("click", handleSubmit);

  //defining global functions
  document.deleteEvent = deleteEvent;
  document.getCurrentId = getCurrentId;
  document.readMore = readMore;

  await getData();
});

window.addEventListener("beforeunload", (e) => {
  
  localStorage.setItem("test", JSON.stringify(result)); 

  
});




