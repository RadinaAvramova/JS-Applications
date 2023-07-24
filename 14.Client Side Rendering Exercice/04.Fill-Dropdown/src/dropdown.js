import { render } from 'https://unpkg.com/lit-html?module'
import { dropdownTemp } from './templates.js'
import { getData, postEntry } from './requests.js'


async function drawOptions () {
	const data = await getData()

	render(dropdownTemp(Object.values(data)), document.querySelector('body'))
}

await drawOptions()

document.addEventListener('submit', async e => {
	e.preventDefault()
	const input = document.getElementById(`itemText`)

	await postEntry({
		text: input.value
	})
	await drawOptions()
	input.value = ''
})


function addItem() {
    console.log('TODO:...');
}

function addItem() {
    let text = document.getElementById('newItemText');
    let val = document.getElementById('newItemValue');
    let select = document.getElementById('menu');
    let option = document.createElement('option');
    option.value = val.value;
    option.textContent = text.value;
    select.appendChild(option);
    text.value = '';
    val.value = '';
  }