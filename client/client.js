'use strict';
// this grabs the form from html using a css selector
// any time you see document mean client side
// this listen when user clicks button to grab data from form
const form = document.querySelector('form');
const API_URL = 'http://localhost:5000/mews'
// hides loading when not loading
const loadingElement = document.querySelector('.loading')
loadingElement.style.display = '';
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
    // this creates a post request to server similar to ajax
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
            loadingElement.style.display = 'none';
          console.log(createdMew);
      } )
})

function listAllMews(){
    // this will make a get req to all the data
    fetch(API_URL)
    // parse the data using json
        .then(response => response.json())
        .then(mews => {
            console.log(mews,'fuck')
              
    })
}