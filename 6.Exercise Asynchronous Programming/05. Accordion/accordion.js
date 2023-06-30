function solution() {
    //TODO .....
}

function toggle() {
    let button = document.querySelector(`span.button`);
    let divHiden = document.getElementById(`extra`);
    if (button.textContent == `More`) {
        divHiden.style.display = `block`;
        button.textContent = `Less`;
    } else if (button.textContent == `Less`) {
        divHiden.style.display = `none`;
        button.textContent = `More`;
    }
}


function toggle() {

    let el = document.getElementsByClassName("button")[0]
  
    let extra = document.getElementById("extra")
  
    extra.style.display = extra.style.display == "none" ? "block" : "none"
  
    el.textContent= el.textContent == "Less" ? "More" : "Less"
  
  }


  function toggle() {
    let button = document.getElementsByClassName('button')[0];
    let divElement = document.getElementById('extra');

    if(button.textContent === 'More'){
        button.textContent = 'Less';
        divElement.style.display = 'block';
    }else if(button.textContent === 'Less'){
        button.textContent = 'More';
        divElement.style.display = 'none';
    }
}