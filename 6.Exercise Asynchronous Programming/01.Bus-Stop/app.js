//function getInfo() {
        //let baseServiceUrl =
                //'https://judgetests.firebaseio.com/businfo' ;
        //let request = {
            //method: 'GET',
            //url: baseServiceUrl + '.json'
        //};
        //$.ajax(request)
                //.then(displayStop)
                //.catch(displayError);

        //function displayStop(busInfo) {
            //$("#buses").empty();
            //$("#stopName").empty();
            //let stopId = $('#stopId').val();
            //let sotopIdInfo =busInfo[stopId];
            //let buses = sotopIdInfo['buses']
            //let name = sotopIdInfo['name'];
            //$('#stopName').text(name)
            //for(bus in buses){
               //$('#buses').append($('<li>').text(`Bus ${bus} arrives in ${buses[bus]} minutes`))
            //}
        //}
        //function displayError(err) {

            //$("#buses").empty();
            //$('#stopName').text("Error")
        //}
    //}

async function getInfo() {
    let inputField = document.getElementById('stopId');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${inputField.value}`;
    let StopName = document.getElementById('stopName');
    let busses = document.getElementById('buses');

    try {
        let res = await fetch(url);
        let data = await res.json();
        //if(res.starts !== 200 && !data){
        //    throw new Error('Error');
        //}

        StopName.textContent = data.name;
        busses.replaceChildren();

        Object.entries(data.buses).forEach((element) => {
            let li = document.createElement('li');
            li.textContent = `Bus ${element[0]} arrives in ${element[1]} minutes`;
            busses.appendChild(li);
            inputField.value = '';
        })
    } catch (err) {
        StopName.textContent = 'Error';
        busses.replaceChildren();
        inputField.value = '';
    }
}


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



async function getInfo() {
    console.log("TODO...");

    //TODO :
    //
    // 1. get busId from elem
    // 2 .fetch data from http://localhost:3030/jsonstore/bus/busInfo/:busId
    // 3. parse response from 2.
    // 4. add li elements per bus -> "Bus {busId} arrives in {time} minutes"
    // 5. error handling
    

    const busesListElement = document.getElementById('buses');
    busesListElement.innerHTML = "";
    
    const stopId = document.getElementById("stopId").value;

    try {
    //document.getElementById('stopName').textContent = "Loading...";

    //await new Promise((resolve, reject) => {
        //setTimeout(() => {
            //resolve();
        //}, 1000);
    //});

        const response = await fetch(`http://localhost:3030/jsonstore/bus/busInfo/${stopId}`);

        if(!response.ok) {
            const error = new Error(response,statusText);
            throw(error);
        }

        const data = await response.json();

        document.getElementById('stopName').textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            const liElement = document.createElement("li");
            liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesListElement.appendChild(liElement);
        });
    } catch (err) {
        console.log("...err...", err);

        document.getElementById("stopName").textContent = `Error`;
    }
}