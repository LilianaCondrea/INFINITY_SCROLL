const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];
// Unsplash API
//const apiKey='WaMXOZtLgE877gvhRGq-S-Oj3WVP6nixgtV-q67cKq8';
const apiUrl='https://api.unsplash.com/photos/random/?client_id=WaMXOZtLgE877gvhRGq-S-Oj3WVP6nixgtV-q67cKq8&count=30';

// check if all images were loaded
function imageLoaded()
{
    console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;
    }
}
// Helper function to set attributes on DOM elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}
// Create elements for links and photos,add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=>{
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        // create <img> for photo
        const img=document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // event listener,check when each is finished loading
        img.addEventListener('load',imageLoaded);
        // put <img> inside <a>,then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}
//Get photos from Unsplash API
async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();
    }catch(error){
    }
}


// check to see if scrolling near bottom of page,load more photos
window.addEventListener('scroll',()=>{
   if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready){
       ready=false;
        getPhotos();
   }
})
// On load
getPhotos();