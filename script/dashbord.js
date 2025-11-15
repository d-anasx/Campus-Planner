let section=document.querySelector("section");
async function numbers_Event() {
  

  const response = await fetch('../data/events.json');
  const data = await response.json();

return data.length;

}
numbers_Event();

async function numbers_Formation() {
  

  const response = await fetch('../data/formation.json');
  const data = await response.json();
//  let events = data.length;
return data.length

}
numbers_Formation();

  //  const jsonData = fetch(events.json).length ;

  //  console.log(jsonData);


async function updateSection() {
  const formation = await numbers_Formation();
  const events = await numbers_Event();
 section.innerHTML=`
            <div class="relative flex flex-col items-center flex-grow pb-5 group">
            <span
              class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">
              ${formation}
            </span>

                <div
              class="relative flex justify-center w-20  h-[${formation/5}px]  bg-indigo-400"
            ></div>
            <span class="absolute bottom-0 text-xs font-bold dark:text-white">Formation</span>
          </div>

          <div class="relative flex flex-col items-center flex-grow pb-5 group">
            <span
              class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block dark:text-white">${events}
              </span>

            <div
              class="relative flex justify-center w-20 h-[${events/5}px] bg-indigo-400">
            </div>
            <span class="absolute bottom-0 text-xs font-bold dark:text-white">Evenememt</span>
          </div>`
}
updateSection();
