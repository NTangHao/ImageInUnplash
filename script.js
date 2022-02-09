const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

/*Api unplash*/
const count = 20;
const userID = '47RiHcT1j7lX4vZb30RXcwAjEdZE78ghs1S4wPwU_rw';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${userID}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArrayUnplashApi = [];




/*Helper Function make setAttribute don't repeat yourself */
function setAttributes(element, object) {
    //dung forin (lặp qua tất cả những key của 1 object như là string và array)
    for (const elementKey in object) {
        element.setAttribute(elementKey, object[elementKey]);
    }
}

/*display photo from api unplash*/
function displayPhoto() {
    imagesLoaded= 0;
    totalImages = photoArrayUnplashApi.length;
    console.log(`totalImages : ${totalImages}`);

    /*Run function foreach object in photoArrayUnplashApi*/
    photoArrayUnplashApi.forEach(value => {
//    create <a> link to unplash
        const item = document.createElement('a');
        /* item.setAttribute('href', value.links.html);
         item.setAttribute('target', '_blank');*/
        setAttributes(item, {
            href: value.links.html,
            target: '_blank'
        });

//    Create img for photo
        const img = document.createElement('img');
        /* img.setAttribute('src',value.urls.regular);
         img.setAttribute('alt',value.alt_description);
       img.setAttribute('title',value.alt_description);*/

        setAttributes(img, {
            src: value.urls.regular,
            alt: value.alt_description,
            title: value.alt_description
        })
        // Event listener , checked when each is finish loading
        img.addEventListener('load',()=>{
           console.log('image loaded');
           imagesLoaded++;
           if (imagesLoaded === totalImages){
               ready=true;
               loader.hidden = true;
            console.log(`ready: ${ready}`);
           }
        });

        //Put img inside a tag, then put both inside img container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

/*Get photo from unplash api*/
const GetPhoto_UnplashApi = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        photoArrayUnplashApi = data;
        // displayPhoto();
        displayPhoto();
    } catch (e) {
        console.log(e);
    }
};

/*onload: Thông báo ngay khi hình ảnh đã dc load xong hoàn toàn*/


/*Check to see if scrolling at the bottom page, tigger the event and load more*/
/*Need 2 value:TOTAL height of the window, distance from top to the scrolled user*/
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        GetPhoto_UnplashApi();


    }
})


GetPhoto_UnplashApi();