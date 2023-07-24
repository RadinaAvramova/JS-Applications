function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      //   TODO:

   }
}

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
       let searchElement = document.getElementById('searchField');
       let rowElements = Array.from(document.querySelectorAll('.container tbody tr'));
       let searchText = searchElement.value;

       // After every search ("Search" button is clicked), 
       // remove all already selected classes (if any) from the previous search, 
       // for the new search to contain only the new result.
       rowElements.forEach(row => {
           row.className = '';
       });

       // If any of the rows contain the submitted string, 
       // add a class select to that row. Note that more than one row may contain the given string. 
       let filteredRows = rowElements.filter(row => {
           let values = Array.from(row.children);

           if (values.some(td => td.textContent.includes(searchText))) {
               row.className = 'select';
           }
       });

       // After every search ("Search" button is clicked), clear the input field
       searchElement.value = '';
   }
}


function solve() {
   let input = document.getElementById('searchField');
   let body = document.querySelectorAll('tbody tr');

   if (input === null || body === null) {
      throw new Error('Missing HTML elements!');
   }

   document.getElementById('searchBtn').addEventListener('click', main);
   function main() {
      for (let tr of body) {
         tr.classList.remove('select');
      }
      if (input.value == '') {
         return '';
      }
      for (let tr of body) {
         if (tr.textContent.includes(input.value)) {
            tr.classList.add('select');
         }
      }
      input.value = '';
   }
}


import { render } from 'https://unpkg.com/lit-html?module'
import { table } from './templates.js'

async function getData () {
	const response = await fetch('http://localhost:3030/jsonstore/advanced/table')

	return response.json()
}

const data = await getData()

const tableData = {
	headers: ['Student name', 'Student email', 'Student course',],
	bodyData: Object.values(data)
}

render(table(tableData), document.querySelector('body'))

document.addEventListener('click', e => {
	if (e.target.tagName === 'BUTTON' && e.target.id === 'searchBtn') {
		const input = document.getElementById('searchField')
		const rows = [...document.getElementsByTagName('tr')].slice(1)
		rows.forEach(x => x.className = '')

		const selectedRows = rows
			.filter(x => x.textContent.toLocaleLowerCase()
				.includes(input.value.toLocaleLowerCase()))

		selectedRows.forEach(x => x.className = 'select')
		input.value = ''
	}
})