const container = document.querySelector(".holder");

function getRandNum(){
    return Math.floor(Math.random() * 100);
}

function loadImages(){
    const images = [];
    let imagesLoaded = 0;

    // Create 10 images and load them in memory
    for (let i = 1; i <= 10; i++) {
        const avatarImg = document.createElement('img');
        avatarImg.src = `https://picsum.photos/1024/512?random=${getRandNum()}`;

        // Track loaded images
        avatarImg.addEventListener('load', () => {
            imagesLoaded++;

            // Once all 10 images are loaded, append them to the container at the same time
            if (imagesLoaded === 10) {
                images.forEach(img => container.appendChild(img));
                
                // Use requestAnimationFrame to ensure layout is fully updated before scaling
                requestAnimationFrame(() => {
                    images.forEach(applyScale);
                });
            }
        });

        // Add a click event listener to show the div when the image is clicked
        avatarImg.addEventListener('click', () => {
            showDiv(avatarImg); // Pass the clicked image to the showDiv function
        });

        // Store the image in the array until all are loaded
        images.push(avatarImg);
    }
}

// Function to apply scale based on position of an image
function applyScale(img) {
    const rect = img.getBoundingClientRect();
    const distanceFromTop = rect.top;
    const scaleFactor = Math.max(0.5, 0.8 + distanceFromTop / window.innerHeight);
    img.style.transform = `scale(${scaleFactor})`;
}

// Function to show the div when an image is clicked
function showDiv(image) {
    const div = document.createElement('div');
    div.classList.add('info-div');
    
    // Clear any previous content
    div.innerHTML = ""; 

    // Append the clicked image to the div
    const clonedImage = image.cloneNode();  // Clone the image to prevent DOM manipulations on the original image
    div.appendChild(clonedImage);
    
    // Style the div (you can customize the styles as needed)
    div.style.position = 'fixed';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = '#0036FA';
    div.style.color = 'white';
    div.style.padding = '20px';
    div.style.zIndex = '9999';
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'space-around';

    clonedImage.style.width = "50%";
    clonedImage.style.position = "relative";

    // Append the div to the body
    document.body.appendChild(div);

    // Optionally, add a close button to hide the div when clicked
    const closeButton = document.createElement('button');
    closeButton.innerText = "Close";
    closeButton.addEventListener('click', () => {
        div.remove();
    });
    div.appendChild(closeButton);

    closeButton.style.position = "absolute";
    closeButton.style.left = "5em";
    closeButton.style.top = "5em";
}

// Scale all images based on their position relative to the top of the viewport.
function scaleImagesOnScroll() {
    const images = document.querySelectorAll('.holder img');
    images.forEach((img) => {
        applyScale(img);
    });
}

loadImages();

// Listen for scroll events to apply scaling dynamically
window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        loadImages();
    }
    scaleImagesOnScroll();
});
