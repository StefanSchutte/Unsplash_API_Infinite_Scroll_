const imageContainer = document.getElementById("image-container");

const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;
//Unsplash API

let count = 5;

const apiKey = "LmKjjyFRbt9Pwl0NK72QUDiKH3-hpx60PwOt6TUASCg";

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check id imgs were loaded

function imageLoaded() {
  imagesLoaded++;

  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
    initialLoad = false;
    count = 30;
  }
}

//helper function to set attributes on dom elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links and photos and add to Dom

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  //run function for each obj in arr
  photosArray.forEach((photo) => {
    // create <a> to link to unslpash
    const item = document.createElement("a");
    //item.setAttribute("href", photo.links.html);
    //item.setAttribute("target", "_blank");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //create <img> for photo

    const img = document.createElement("img");
    //img.setAttribute("src", photo.urls.regular);
    //img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //eventlistener, check when each is finished loading

    img.addEventListener("load", imageLoaded);

    //put <Img> inside <a>, then put both inside img container element

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//get photos from unsplash api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    //catch err
  }
}

//check to see if scrolling near bottom of page, load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
