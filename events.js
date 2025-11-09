
let result = [];

async function getData() {
  const url = "/data/events.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    result = await response.json();
    console.log(result);
    displayData()
    getTotalEvents()
  } catch (error) {
    console.error(error.message);
  }
}


function displayData(){
    let events_div = document.getElementById("events-section");
    result.forEach(e =>{
        console.log("hi")
        let code = `
            <div
          class=" flex flex-col w-[23em] h-[15em] p-6 bg-gray-300 border border-gray-200 rounded-lg shadow-heavy"
        >
          <a href="#">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 "
            >
             ${e.title}
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 ">
            ${e.description}
          </p>
          <div class="flex justify-between items-center mt-auto">
              <a
            href="#"
            class=" w-36  inline-flex items-center btn  "
          >
            Read more
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
            <div>
              <a  class="btn bg-blue-500" >edit</a>
              <a class="btn bg-red-600" >delete</a>
            </div>
          </div>
        </div>
        `;
        events_div.innerHTML += code;
        
    })
}

function getTotalEvents(){
    let total_html = document.getElementById('total');
    total_html.innerHTML = `${result.length+1} events`;
}


getData()


