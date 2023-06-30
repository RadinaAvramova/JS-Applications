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

//async function getInfo() {
    //let inputField = document.getElementById('stopId');

    //let url = `http://localhost:3030/jsonstore/bus/businfo/${inputField.value}`;
    //let StopName = document.getElementById('stopName');
    //let busses = document.getElementById('buses');

    //try {
        //let res = await fetch(url);
        //let data = await res.json();
        //if(res.starts !== 200 && !data){
        //    throw new Error('Error');
        //}

        //StopName.textContent = data.name;
        //busses.replaceChildren();

        //Object.entries(data.buses).forEach((element) => {
            //let li = document.createElement('li');
            //li.textContent = `Bus ${element[0]} arrives in ${element[1]} minutes`;
            //busses.appendChild(li);
            //inputField.value = '';
        //})
    //} catch (err) {
        //StopName.textContent = 'Error';
        //busses.replaceChildren();
        //inputField.value = '';
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