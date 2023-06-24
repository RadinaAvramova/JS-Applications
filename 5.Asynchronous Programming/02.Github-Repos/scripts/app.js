function loadRepos() {
	console.log("TODO...");
}

function loadRepos() {
	let input = document.getElementById('username');
	let ul = document.getElementById('repos')
	let username = input.value;
	let url = `https://api.github.com/users/${username}/repos`;
	fetch(url)
		.then(response => {
			if(response.status != 200) {
				throw new Error(`${response.status} ${response.statusText}`);
			}

			return response.json();
		})
		.then(data => {
			data.forEach(element => {
				let li = createLi(element.full_name, element.html_url);
				ul.appendChild(li);
			});
		})
		.catch(e => {
			let li = createLi(e.message);
			ul.appendChild(li);
		})
}


function createLi(name, url) {
	let li = document.createElement('li');
	let a = document.createElement('a');
	a.textContent = name;
	a.href = url;
	li.appendChild(a);
	return li;
}

//async function loadRepos () {
	//const html = {
		//nameField: document.getElementById(`username`),
		//resultE: document.getElementById(`repos`),
	//}

	//const data = await fetch(`https://api.github.com/users/${html.nameField.value}/repos`)
	//const deserilized = await data.json()

	//html.resultE.innerHTML = ''

	//deserilized.forEach(({ full_name, html_url }) => {
		//const li = document.createElement('li')
		//const a = document.createElement('a')
		//a.innerHTML = full_name
		//a.href = html_url

		//li.appendChild(a)
		//html.resultE.appendChild(li)
	//})
//}