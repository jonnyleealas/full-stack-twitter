'use strict';
// this grabs the form from html using a css selector
// any time you see document mean client side
// this listen when user clicks button to grab data from form
const form = document.querySelector('form'); 
// grabs mews from fetch to give to html. will later use in mewElement.appendchild(div)
const mewsElement = document.querySelector('.mews');
const API_URL = 'http://localhost:5000/mews'
// hides loading when not loading
const loadingElement = document.querySelector('.loading')
// after too many request to post wait 30sec to un-hide post form 
// setTimeout(()=>{
//     loadingElement.style.display = '';
// },30000)
// when page loads request all the mews from get request
listAllMews()
form.addEventListener('submit', (event)=>{
    //tell browser do this with js
    event.preventDefault();
    //grabs user input from page
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    
    const mew = {
        name, 
        content
    }
    console.log(mew)
    //this give direction to hide form at send and show loading gif
    form.style.display = 'none';
    loadingElement.style.display = '';
    // submitting to server.this creates a post request to server similar to ajax
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response =>response.json())
        .then(createdMew =>{
            // resets form after submitting
            form.reset()
            // show form when you're done submitting instead of load gif
            form.style.display = '';
            // adding this here refresh the list so it pops up in page
            listAllMews()
      } )
})

function listAllMews(){
    // blank out everything and add something new
    mewsElement.innerHTML = '';
    // this will make a get req to all the data
    fetch(API_URL)
    // parse the data using json
        .then(response => response.json())
        .then(mews => {
            console.log('fuck', mews)
            // this reverse the text to show latest mews at the top like a stack
            mews.reverse()
            mews.forEach(mew =>{
                // this create div/h3/p tag to each mew object based on class
                const div = document.createElement('div')
                const header = document.createElement('h3')
                header.textContent = mew.name;
                const contents = document.createElement('p')
                contents.textContent = mew.content;
                const date = document.createElement('small')
                date.textContent = new Date(mew.created)
                // we need to then append it to the page by appending
                div.appendChild(header)
                div.appendChild(contents)
                div.appendChild(date);
                mewsElement.appendChild(div)

            })       
            // hides loading element after post is sent to page
            loadingElement.style.display = 'none';
    })

}