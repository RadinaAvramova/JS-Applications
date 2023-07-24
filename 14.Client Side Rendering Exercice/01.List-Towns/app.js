function attachEvents() {
    $('#btnLoadTowns').on('click', renderTowns);

    function renderTowns() {
        let towns = $('#towns')
            .val()
            .split(',')
            .map(e => ({
                name: e.trim()
            })).filter(e => e.name !== '');

        loadTowns(towns);
    }

    async function loadTowns(towns) {
        let source = await $.get('townTemplate.hbs');
        let compiled = Handlebars.compile(source);
        let template = compiled({
            towns
        });

        $('#root').html(template);
    }
}



import { render } from 'https://unpkg.com/lit-html?module'
import { townsTemplate } from './templates.js'

document.getElementsByTagName('form')[0].addEventListener('submit', e => {
	e.preventDefault()
	const formData = new FormData(e.target)
	const data = [...formData.values()][0].split(', ')

	render(townsTemplate(data), document.getElementById('root'))
})