let result = [];
let currentId;

document.addEventListener("DOMContentLoaded", async () => {

  // dark mode handling

  const html = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");

  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    html.classList.add("dark");
  } else if (saved === "light") {
    html.classList.remove("dark");
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    html.classList.add("dark");
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  //fetch
  async function getData() {
    if (localStorage.getItem("test")) {
      result = JSON.parse(localStorage.getItem("test"));
      displayData();
      getTotalEvents();
      return;
    }

    const url = "/data/events.json";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);
      result = await response.json();
      localStorage.setItem("test", JSON.stringify(result));
      displayData();
      getTotalEvents();
    } catch (error) {
      console.error(error.message);
    }
  }

  function displayData() {
    const events_div = document.getElementById("events-section");
    events_div.innerHTML = "";

    result.forEach((e) => {
      let code = `
  <div class="card flex flex-col w-[23em] h-[15em] p-6
               rounded-lg shadow-heavy
              theme-card">

    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight ">
        ${e.title}
      </h5>
    </a>

    <p class="mb-3 font-normal theme-muted">
      ${e.description}
    </p>

    <div class="flex justify-between items-center mt-auto">
      <button onclick="document.readMore('${e.id}')" class="w-36 inline-flex items-center btn" command="show-modal" commandfor="readmore-dialog">
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
          <iconify-icon icon="line-md:pencil-alt-twotone" width="24" height="24"></iconify-icon>
        </button>
        <a onclick="document.deleteEvent('${e.id}')">
          <iconify-icon icon="line-md:trash" width="24" height="24"></iconify-icon>
        </a>
      </div>
    </div>

  </div>
`;
      events_div.innerHTML += code;
    });


    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("mouseover", () => {
        const tools = card.querySelector(".tools");
        if (tools) tools.classList.remove("hidden");
      });
      card.addEventListener("mouseout", () => {
        const tools = card.querySelector(".tools");
        if (tools) tools.classList.add("hidden");
      });
    });
  }

  function getTotalEvents() {
    const total_html = document.getElementById("total");
    total_html.innerHTML = `${result.length} events`;
  }

  function deleteEvent(id) {
    if (confirm("are you sure to delete this event ?")) {
      result = result.filter((e) => e.id !== parseInt(id));
      displayData();
      getTotalEvents();
    }
  }

  function getCurrentId(id) {
    currentId = id;
    let event = result.find((ev) => ev.id == currentId);
    document.getElementById("title").value = event.title;
    document.getElementById("desc").value = event.description;
  }

  function readMore(id) {
    let event = result.find((e) => e.id == id);
    let readMoreDiv = document.querySelector(".readmore");
    readMoreDiv.innerHTML = "";
    for (let value in event) {
      readMoreDiv.innerHTML += `<div class="flex justify-center rounded-md bg-gray-500 items-center "><strong>${value} :</strong>  <p>${event[value]}</p></div>`;
    }
  }

  function handleSubmit(e) {
    let title = document.getElementById("title");
    let desc = document.getElementById("desc");

    if (!title.value.trim() || !desc.value.trim()) {
      e.preventDefault();
      return;
    }

    result = result.map((ev) => {
      if (ev.id == currentId) {
        ev.title = title.value;
        ev.description = desc.value;
      }
      return ev;
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
    const title = addForm.querySelector("#title").value;
    const date = addForm.querySelector("#date").value;
    const location = addForm.querySelector("#location").value;
    const desc = addForm.querySelector("#desc").value;

    if (!title.trim() || !date.trim() || !location.trim() || !desc.trim()) {
      e.preventDefault();
      return;
    }

    const event = {
      id: Date.now(),
      title,
      date,
      location,
      description: desc,
    };
    result.push(event);
    displayData();
    getTotalEvents();
    addForm.reset();
  }

  // modal submit button for edit 
  const submit_btn = document.querySelector(".submit-modal");
  if (submit_btn) submit_btn.addEventListener("click", handleSubmit);

  //  globals
  document.deleteEvent = deleteEvent;
  document.getCurrentId = getCurrentId;
  document.readMore = readMore;


  await getData();
});

// save on unload
window.addEventListener("beforeunload", () => {
  localStorage.setItem("test", JSON.stringify(result));
});
