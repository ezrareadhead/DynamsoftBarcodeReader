const container = document.querySelector(".holder");

function getRandNum() {
    return Math.floor(Math.random() * 100);
}

function getRandomXPosition() {
    // 50vh + random value
    return (Math.random() * 500 - 250); // 50vh + random value between 0 and 500px
}

function getRandomRotation() {
    // Random rotation between -45 and 45 degrees, plus 90
    return 90 + (Math.random() * 50 - 25);
}

function getRandomMarginBottom() {
    // Random margin-bottom value between 10px and 500px
    return Math.random() * 490 + 10;  // Generates a value between 10px and 500px
}
let isLoading = false;

window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && !isLoading) {
        isLoading = true;
        loadImages();
    }
});

function loadImages() {
    const container = document.querySelector(".holder");
    const images = [];
    let imagesLoaded = 0;

    for (let i = 1; i <= 10; i++) {
        const avatarImg = document.createElement('img');
        avatarImg.src = `https://picsum.photos/1024/512?random=${getRandNum()}`;

        // Track loaded images
        avatarImg.addEventListener('load', () => {
            imagesLoaded++;

            // Once all 10 images are loaded, append them to the container
            if (imagesLoaded === 10) {
                images.forEach(img => container.appendChild(img));
                isLoading = false;  // Reset the flag after loading is complete
            }
        });

        // Get random X position and margin-bottom
        const x = getRandomXPosition();
        const marginBottom = getRandomMarginBottom();

        // Determine if the image should have a rotation (50% chance)
        const hasRotation = Math.random() > 0.5;
        let rotation = hasRotation ? getRandomRotation() : 90;

        // Apply random styles (X position, rotation, margin-bottom)
        avatarImg.style.marginRight = `${x}px`;
        avatarImg.style.transform = `rotate(${rotation}deg)`;
        avatarImg.style.marginBottom = `${marginBottom}px`;

        // Store the image in the array until all are loaded
        images.push(avatarImg);
    }
}

loadImages();
// Listen for scroll events to load images dynamically when nearing the bottom of the page

window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && !isLoading) {
        isLoading = true;
        loadImages();
        isLoading = false; // Reset the flag after loading is complete
    }
});

// Event delegation for showing div on image click
container.addEventListener('click', (event) => {
    console.log("hi")
    if (event.target.tagName === 'IMG') {
        showDiv(event.target);
    }
});


// Function to apply scale based on position of an image
// function applyScale(img) {
//     const rect = img.getBoundingClientRect();
//     const distanceFromTop = rect.top;
//     const scaleFactor = Math.max(0.5, 0.8 + distanceFromTop / window.innerHeight);
//     img.style.transform = `scale(${scaleFactor})`;
// }


// Function to show the div when an image is clicked
function showDiv(image) {
    const div = document.createElement('div');
    div.classList.add('info-div');
    
    // Clear any previous content
    div.innerHTML = ""; 

    const hiddenButton = document.createElement('button');
    hiddenButton.style.opacity = "0";
    hiddenButton.style.cursor = "revert";
    div.appendChild(hiddenButton);

    // Append the clicked image to the div
    const clonedImage = image.cloneNode();  // Clone the image to prevent DOM manipulations on the original image
    div.appendChild(clonedImage);
    
    // Style the div (you can customize the styles as needed)
    div.style.position = 'fixed';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = '#0036FA';
    div.style.color = 'white';
    div.style.zIndex = '9999';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'space-evenly';

    clonedImage.style.width = "50%";
    clonedImage.style.position = "relative";
    clonedImage.style.transform = "none";
    clonedImage.style.margin = "0";
    clonedImage.style.boxShadow = "0 20px 40px 0 rgba(0, 0, 0, 0.4)";
    clonedImage.style.border = "solid 10px white";


    // Append the div to the body
    document.body.appendChild(div);

    // Optionally, add a close button to hide the div when clicked
    const closeButton = document.createElement('button');
    closeButton.id = 'scan-button'; 
    closeButton.style.backgroundImage = "url('./assets/stop.png')";
    closeButton.style.width = "20px";
    closeButton.style.height = "20px";

    closeButton.addEventListener('click', () => {
        div.remove();
    });
    div.appendChild(closeButton);

    const likeButton = document.createElement('button');
    likeButton.innerText = "Like";
    likeButton.style.backgroundColor = "transparent";
    likeButton.style.color = "red";
    likeButton.style.border = "solid red 1px";
    likeButton.style.padding = "10px 20px";
    likeButton.style.borderRadius = "5px";

    likeButton.addEventListener('click', () => {
        likeButton.style.backgroundColor = "red";
    });
    div.appendChild(likeButton);

    closeButton.style.position = "absolute";
    closeButton.style.left = "5em";
    closeButton.style.top = "5em";
}


// Scale all images based on their position relative to the top of the viewport.
// function scaleImagesOnScroll() {
//     const images = document.querySelectorAll('.holder img');
//     images.forEach((img) => {
//         applyScale(img);
//     });
// }

// loadImages();

