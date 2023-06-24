function loadCommits() {
    // Try it with Fetch API
    console.log('TODO...');
}

async function loadCommits() {
    let ul = document.getElementById('commits');
    let usernameInput = document.getElementById('username');
    let repoInput = document.getElementById('repo');
    let username = usernameInput.value;
    let repo = repoInput.value;

    let url = `https://api.github.com/repos/${username}/${repo}/commits`;

    let commits = await fetch(url)
        .then(response => response.json())

    Object.values(commits).forEach(c => {
        let li = createLi(c.commit.author.name, c.commit.message);
        ul.appendChild(li);
    })
}

function createLi(author, message) {
    let li = document.createElement('li');
    li.textContent = `${author}: ${message}`;
    return li;
}


//async function loadCommits () {
	//const html = {
		//nameField: document.getElementById(`username`),
		//repoField: document.getElementById(`repo`),
		//resultE: document.getElementById(`commits`),
	//}

	//html.resultE.innerHTML = ''

	//const eFactory = (tag, content = '') => {
		//const e = document.createElement(tag)
		//e.innerHTML = content

		//return e
	//}

	//try {
		//const data = await fetch(`https://api.github.com/repos/${html.nameField.value}/${html.repoField.value}/commits`)

		//if (! data.ok) throw new Error(`${data.status} (${data.statusText})`)

		//const deserialized = await data.json()

		//deserialized.forEach(({ commit }) => html.resultE.appendChild(eFactory(
			//'li',
			//`${commit.author.name}: ${commit.message}`
		//)))

	//} catch (e) {
		//html.resultE.appendChild(eFactory('li', e))
	//}

//}
