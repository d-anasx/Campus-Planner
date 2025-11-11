let result = [];

document.addEventListener('DOMContentLoaded', async () => {

  async function getData() {
    const url = "/data/events.json";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Response status: ${response.status}`);

      result = await response.json();

      if (result) {
        displayData();
        getTotalEvents();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  function displayData() {
    const events_div = document.getElementById("events-section");
    events_div.innerHTML = ""; 

    result.forEach(e => {
      let code = `
        <div class="card flex flex-col w-[23em] h-[15em] p-6 bg-gray-300 border border-gray-200 rounded-lg shadow-heavy">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${e.title}</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700">${e.description}</p>
          <div class="flex justify-between items-center mt-auto">
            <a onclick="document.readMore('${e.id}')"  class="w-36 inline-flex items-center btn">
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
            </a>
            <div class="tools hidden">
            <button onclick="document.editEvent('${e.id}')" command="show-modal" commandfor="dialog">
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
    cards.forEach(card => {
      card.addEventListener("mouseover", e => {
        e.preventDefault();
        card.querySelector(".tools").classList.remove("hidden");
      });
      card.addEventListener("mouseout", e => {
        e.preventDefault();
        card.querySelector(".tools").classList.add("hidden");
      });
    });
  }


  //total events function
  function getTotalEvents() {
    const total_html = document.getElementById('total');
    total_html.innerHTML = `${result.length} events`;
  }


  //delete event function
  function deleteEvent(id) {
    if (confirm("are you sure to delete this event ?")) result = result.filter(e => e.id !== id);
    
    displayData();
    getTotalEvents();
  }



  // edit event function

  function editEvent(id){
    let submit_btn = document.querySelector('.submit-modal');
    let title = document.getElementById('title');
    let desc = document.getElementById('desc');

    submit_btn.addEventListener("click",(e)=>{
        
        if(!title.value.trim() || !desc.value.trim() ){
          console.log("empty")
          e.preventDefault()
        }

        result.map((ev)=>{
          ev.id == id ? (ev.title = title.value , ev.description = desc.value) : ev
        })
        displayData();
        getTotalEvents();

        title.value = '';
        desc.value = '';
        
    })
  }

  function readMore(id){
    ev = result.filter(e => e.id == id)
    document.body.innerHTML+= `
      <div class="readmore bg-gray-300 rounded-md shadow-2xl  fixed inset-0 flex text-center place-self-center w-40 h-44" >p</div>
      ${ev}
    
    `
  }



  document.deleteEvent = deleteEvent;
  document.editEvent = editEvent;
  document.readMore = readMore;

  await getData();
});
