//async function getInfo () {
	//const html = {
		//stopName: document.getElementById(`stopName`),
		//busses: document.getElementById(`buses`),
		//stopID: document.getElementById(`stopId`)
	//}

	//html.stopName.innerHTML = ''
	//html.busses.innerHTML = ''

	//try {
		//const data = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${html.stopID.value}/1`)
		//if (! data.ok) throw new Error()
		//const deserialized = await data.json()

		//html.stopName.innerHTML = deserialized.name
		//Object.entries(deserialized.buses).forEach(([bus, time]) => {
			//const e = document.createElement('li')
			//e.innerHTML = `Bus ${bus} arrives in ${time}`

			//html.busses.appendChild(e)
		//})

	//} catch (e) {
		//html.stopName.innerHTML = 'Error'
	//}
//}


async function getInfo() { 
    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo/'; 
    const input = document.getElementById('stopId'); 
    const result = document.getElementById('stopName'); 
    const buses = document.getElementById('buses'); 
   
    const busStop = input.value; 
   
    buses.innerHTML = ''; 
    input.value = ''; 
   
    try { 
      const response = await fetch(baseUrl + busStop); 
      const data = await response.json(); 
   
      result.textContent = data.name; 
   
      for (const busId in data.buses) { 
        const li = document.createElement('li'); 
        const time = data.buses[busId]; 
   
        li.textContent = `Bus ${busId} arrives in ${time} minutes`; 
        buses.appendChild(li); 
      } 
    } catch (error) { 
      result.textContent = 'Error'; 
    } 
  }