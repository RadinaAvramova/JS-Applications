function solve() {
    const url = 'https://judgetests.firebaseio.com/schedule/';
    let nameBusStation = '';
    let nextID = 'depot';

    function depart() {
        $('#depart').prop('disabled', true);

        $.get(url + nextID + '.json').then((response)=> {
            //console.log(response);
            nameBusStation = response.name;
            nextID = response.next;
            $('#info').find('span').text('Next stop '+ nameBusStation);
            $('#arrive').prop('disabled', false);
        })
    }
    function arrive() {
        $('#depart').prop('disabled', false);
        $('#arrive').prop('disabled', true);
        $('#info').find('span').text('Arriving at '+ nameBusStation);
    }
    return {
        depart,
        arrive
    };
}
let result = solve();


function solve() {
    let infoSpan = $("#info span");
    let departButton = $("#depart");
    let arriveButton = $("#arrive");
    let nextId = "depot";
    let nextStop = "";
    
    function update() {
    let link = "https://judgetests.firebaseio.com/schedule/" + nextId + ".json";
    $.ajax({
        url: link,
        method: "GET",
        success: updateDepartStop,
        error: drawError
    });
    
    function updateDepartStop(obj) {
        nextStop = obj.name;
        nextId = obj.next;
        infoSpan.text("Next stop " + nextStop);
    }
    
    function drawError() {
        infoSpan.text("Error");
        departButton.prop("disabled", true);
        arriveButton.prop("disabled", true);
    }
    }
    
    function depart() {
    departButton.prop("disabled", true);
    arriveButton.prop("disabled", false);
    update();
    }
    
    function arrive() {
    arriveButton.prop("disabled", true);
    departButton.prop("disabled", false);
    infoSpan.text("Arriving at " + nextStop);
    }
    
    return {
    depart,
    arrive
    };
}




<!DOCTYPE html>
 
<html lang="en">
 
<head>
 
    <meta charset="UTF-8">
 
    <title>Bus Schedule</title>
 
    <style>
 
        #schedule { text-align: center; width: 400px; }
 
        input { width: 120px; }
 
        #info { background-color:aquamarine; border:1px solid black; margin:0.25em; }
 
        .info { font-size: 1.5em; padding: 0.25em; }
 
    </style>
 
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
 
</head>
 
<body>
 
<div id="schedule">
 
    <div id="info"><span class="info">Not Connected</span></div>
 
    <div id="controls">
 
        <input id="depart" value="Depart" type="button" onclick="result.depart()">
 
        <input id="arrive" value="Arrive" type="button" onclick="result.arrive()" disabled="true">
 
    </div>
 
</div>
 
<script>
 
    function solve() {
    let apiUrl = 'https://judgetests.firebaseio.com/schedule/';
    let currentStop = 'depot';
    let nextStop = 'depot';
 
    function depart() {
        toggleButtons('#arrive', '#depart');
        $.ajax({
            method: 'GET',
            url: apiUrl + currentStop + '.json',
            success: function (data) {
                nextStop = data.next;
                $('#info').find('span').text(`Next stop ${data.name}`);
            }
        });
    }
 
    function arrive() {
        toggleButtons('#depart', '#arrive');
        $.ajax({
            method: 'GET',
            url: apiUrl + currentStop + '.json',
            success: function (data) {
                $('#info').find('span').text(`Arriving at ${data.name}`);
                currentStop = nextStop;
            }
        });
    }
 
    function toggleButtons(buttonA, buttonB) {
        $(buttonA).removeAttr('disabled');
        $(buttonB).attr('disabled', 'disabled');
    }
 
    return {
        depart,
        arrive
    };

 
</script>
 
</body>
 
</html>



function solve() {
    // TODO:
    //
    // get used elements - stop info, depart btn, arrive btn
    //
    // nextStopId = 'depot' | stopName = ''
    // get next stop information with nextStopId - http://localhost:3030/jsonstore/bus/schedule/:id
    // parse response -> get actual data
    // update the html content
    //
    // error handling  - show Error msg + disable the buttons

    const stopInfoElem = document.querySelector("div#info span.info");
    const departBtn = document.getElementById("depart");
    const arriveBtn = document.getElementById("arrive");

    let nextStopId = "depot";
    let stopName = "";

    async function depart() {
        console.log("Depart TODO...");

        try {

            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`);

            if(!response.ok) {
                const error = new Error();
                error.message = response.statusText;
                error.status = response.status;

                throw error;
            }

            const data = await response.json();
         
            stopName = data.name;
            nextStopId = data.next;

            stopInfoElem.textContent = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (err) {
            stopInfoElem.textContent = "Error";
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
 
    function arrive() {
        console.log("Arrive TODO");

        stopInfoElem.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart, 
        arrive,
    };

}