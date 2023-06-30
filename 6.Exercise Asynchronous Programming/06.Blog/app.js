function attachEvents() {
    console.log('TODO...');
}

attachEvents();


function attachEvents() {
 
    $('#btnLoadPosts').on('click', loadPosts);
    $('#btnViewPost').on('click', loadPost);
    const mainURL = 'https://baas.kinvey.com/appdata/kid_SJNmiOkwb/';
    const credentials = 'pesho:p';
    let postsOption = $('#posts');
    let comments = $('#post-comments');
 
 
    loadPosts();
 
    async function loadPost() {
        let selectedPost = $('option:selected');
        let postData = await getPostData(selectedPost.val());
 
        $('#post-title').text(`${postData.title}`);
        $('#post-body').text(`${postData.body}`);
        
        let commentsData = await getCommentsData(selectedPost.val());
        comments.empty();
        for (let comment in commentsData) {
            comments.append($('<li>').text(commentsData[comment]['text']));
        }
        // 10001
    }
 
    async function getCommentsData(postId) {
        return await $.ajax({
            url: `${mainURL}comments/?query={"post_id":"${postId}"}`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(credentials)}`
            }
        });
    }
    async function getPostData(postId) {
        return await $.ajax({
            url: `${mainURL}posts/${postId}`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(credentials)}`
            }
        });
    }
 
    async function loadPosts(data) {
        let posts = await getPosts();
 
        for (let postId in posts) {
            postsOption.append($('<option>').text(posts[postId].title).val(posts[postId]['_id']));
        }
 
    }
 
    async function getPosts() {
        return await $.ajax({
            url: `${mainURL}posts`,
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(credentials)}`
            }
        });
    }
 
}

const app = Sammy("body", function () {

    this.use("Handlebars", "hbs");

    this.get('#/home', function(ctx){

        ctx.loadPartials(commonPartial).partial('./view/home.hbs')

    });

    this.get('#/login', function(ctx){

        ctx.loadPartials(commonPartial).partial('./view/user/login.hbs')

    });

    this.get('#/profile', function(ctx){

        ctx.loadPartials(commonPartial).partial('./view/user/profile.hbs')

    });

    this.get('#/register', function(ctx){

        ctx.loadPartials(commonPartial).partial('./view/user/register.hbs')

    });

  const commonPartial={

      header: './view/common/header.hbs',

      footer: './view/common/footer.hbs'

  }

});

app.run('#/home');


function solve(){
    let author = document.querySelector('form > p:nth-of-type(1) input');
    let title = document.querySelector('form > p:nth-of-type(2) input');
    let category = document.querySelector('form > p:nth-of-type(3) input');
    let content = document.querySelector('form > p:nth-of-type(4) textarea');
    let buttonAdd = document.querySelector('form > button');
    let section = document.querySelector('main > section');
    let archive = document.querySelector('.archive-section > ul');
    
    buttonAdd.addEventListener('click', e => {
       e.preventDefault();
  
       let article = document.createElement('article');
       
       let h1Element = document.createElement('h1');
       h1Element.textContent = title.value;
       let pCategoryElement = document.createElement('p');
       pCategoryElement.innerHTML = `Category: <strong>${category.value}</strong>`;
  
       let pCreatorElement = document.createElement('p');
       pCreatorElement.innerHTML = `Creator: <strong>${author.value}</strong>`
  
       let pInputFieldElement = document.createElement('p');
       pInputFieldElement.textContent = content.value;
  
       let divElement = document.createElement('div');
       divElement.setAttribute('class', 'buttons');
  
       let btnDelete = document.createElement('button');
       btnDelete.textContent = 'Delete';
       btnDelete.setAttribute('class', 'btn delete')
       let btnArchive= document.createElement('button');
       btnArchive.textContent = 'Archive';
       btnArchive.setAttribute('class', 'btn archive')
       divElement.appendChild(btnDelete);
       divElement.appendChild(btnArchive);
  
       article.appendChild(h1Element);
       article.appendChild(pCategoryElement);
       article.appendChild(pCreatorElement);
       article.appendChild(pInputFieldElement);
       article.appendChild(divElement);
  
       section.appendChild(article);
  
       author.value = ''
       title.value = ''
       category.value = ''
       content.value = ''
  
       
       btnArchive.addEventListener('click', e => {
          
          let liElement = document.createElement('li');
          liElement.textContent = h1Element.textContent;
          // archive.appendChild(liElement)
          
          let allh1Element = Array.from(section.querySelectorAll('h1'))
          let sortedLiElement = allh1Element.sort((a,b) => a.textContent.localeCompare(b.textContent))
          
          for (const el of sortedLiElement) {
                let liElement = document.createElement('li');
                liElement.textContent = el.textContent;
                archive.appendChild(liElement);
             }
  
          e.target.parentElement.parentElement.remove()
       })
  
       btnDelete.addEventListener('click', e => {
  
          e.target.parentElement.parentElement.remove()
       })
  
    })
 }


// TODO:
// attachEvents
// get/load all posts data
// add posts options to 'select' (update html)
// load data per post by postId
// show post data (update html)
// get/load all comments data
// filter comments based on the selected post
// show filtered comments (update html) 
//
// error handling ?!?

function attachEvents() {
    console.log("TODO...");

    document.getElementById("btnLoadPosts").addEventListener("click", loadPosts);
}

async function loadPosts(e) {
    console.log("...loadPosts...");

    try {
        const url = "http://localhost:3030/jsonstore/blog/posts";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const data = await response.json();

        Object.entries(data).forEach(([key, value]) => {
            const optionElem = document.createElement("option");
            optionElem.value = key;
            optionElem.textContent = value.title;
            document.getElementById("posts").appendChild(optionElem);
        });
    } catch(err) {
        console.log(err);
    }

async function viewPost(e) {
    console.log("...viewPost...");

    let postId = "";
    document.querySelectorAll("option").forEach((o) => {
        if(o.selected) {
            postId = o.value;
        }
    });

    const postUrl = `http://localhost:3030/jsonstore/blog/posts/${postId}`;
    const postResponse = await fetch(postUrl);
    const postData = await postResponse.json();

    document.getElementById("post-title").textContent = postData.title;
    document.getElementById("post-body").textContent = postData.body;

    const commentUrl = `http://localhost:3030/jsonstore/blog/comments/`;
    const commentsResponse = await fetch(commentUrl);
    const commentsData = await commentsResponse.json();

    const filteredComments = Object.values(commentsData).filter((x) => x.postId === postId);

    document.getElementById('post-comments').innerHTML = "";

    filteredComments.forEach((c) => {
        const liElem = document.createElement("li");
        liElem.textContent = c.text;
        document.getElementById("post-comments").appendChild(liItem);
    });
}

attachEvents();