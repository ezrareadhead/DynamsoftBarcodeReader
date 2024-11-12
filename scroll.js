const container = document.querySelector(".holder");

function getRandNum() {
    return Math.floor(Math.random() * 100);
}

function getRandomXPosition() {
    return (Math.random() * 500 - 250); // Random value between -250px and 250px
}

function getRandomRotation() {
    return (Math.random() * 50 - 25); // Random rotation between 65 and 115 degrees
}

function getRandomMarginBottom() {
    return Math.random() * 140 + 10;  // Value between 10px and 500px
}

let isLoading = false;

// scroll.js

const holder = document.querySelector('.holder');

holder.addEventListener('scroll', () => {
    // Check if scrolled to the bottom of the holder
    if ((holder.scrollTop + holder.clientHeight) +300 >= holder.scrollHeight && !isLoading) {
        isLoading = true;
        loadImages();
    }
});

// Function to calculate the scale based on window width
function getScaleFactor() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 480) {
        return 0.35; // For max-width 480px
    } else if (windowWidth <= 768) {
        return 0.55; // For widths between 481px and 768px
    } else if (windowWidth <= 1279) {
        return 0.75; // For widths between 769px and 1279px
    } else {
        return 1; // For larger screens
    }
}

function applyScale(images) {
    const scale = getScaleFactor();
    images.forEach(img => {
        const rotation = img.dataset.rotation || 0;
        img.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    });
}

function loadImages() {
    const images = [];
    let imagesLoaded = 0;

    for (let i = 1; i <= 10; i++) {
        const avatarImg = document.createElement('img');
        avatarImg.src = `https://picsum.photos/1024/512?random=${getRandNum()}`;

        avatarImg.addEventListener('load', () => {
            imagesLoaded++;

            // Append each image to the container immediately after it loads
            container.appendChild(avatarImg);

            // Apply scale to each image individually
            applyScale([avatarImg]);

            if (imagesLoaded === 10) {
                isLoading = false;
            }
        });

        const x = getRandomXPosition();
        const marginBottom = getRandomMarginBottom();
        const hasRotation = Math.random() > 0.5;
        const rotation = hasRotation ? getRandomRotation() : 0;

        avatarImg.style.marginRight = `${x}px`;
        avatarImg.style.marginBottom = `${marginBottom}px`;
        avatarImg.dataset.rotation = rotation; // Store rotation for resizing
        avatarImg.style.transform = `rotate(${rotation}deg) scale(${getScaleFactor()})`;

        images.push(avatarImg);
    }
}

loadImages();

// Adjust scale on window resize
window.addEventListener("resize", () => {
    const images = Array.from(container.querySelectorAll("img"));
    applyScale(images);
});

// Event delegation for showing div on image click
container.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        showDiv(event.target);
    }
});

// Function to show the div when an image is clicked
function showDiv(image) {
    const div = document.createElement('div');
    div.classList.add('info-div');
    
    div.innerHTML = ""; 

    // const hiddenButton = document.createElement('button');
    // hiddenButton.style.opacity = "0";
    // hiddenButton.style.cursor = "revert";
    // div.appendChild(hiddenButton);

    const clonedImage = image.cloneNode();
    div.appendChild(clonedImage);
    
    div.style.position = 'fixed';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = '#0036FA';
    div.style.color = 'white';
    div.style.zIndex = '9999';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.gap = '2em';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';

    clonedImage.style.width = "60%";
    clonedImage.style.minWidth = "480px";
    clonedImage.style.position = "relative";
    clonedImage.style.transform = "none";
    clonedImage.style.margin = "0";
    clonedImage.style.boxShadow = "0 20px 40px 0 rgba(0, 0, 0, 0.4)";
    clonedImage.style.border = "solid 10px white";

    document.body.appendChild(div);

    const closeButton = document.createElement('button');
    closeButton.id = 'scan-button'; 
    closeButton.style.backgroundImage = "url('./assets/stop.png')";
    closeButton.style.width = "20px";
    closeButton.style.height = "20px";

    closeButton.addEventListener('click', () => {
        div.remove();
    });
    div.appendChild(closeButton);

    // const likeButton = document.createElement('button');
    // likeButton.innerText = "Like";
    // likeButton.id = "like-button";
    // likeButton.style.backgroundColor = "transparent";
    // likeButton.style.color = "red";
    // likeButton.style.border = "solid red 1px";
    // likeButton.style.padding = "10px 20px";
    // likeButton.style.borderRadius = "5px";

    // likeButton.addEventListener('click', () => {
    //     likeButton.style.backgroundColor = "red";
    // });
    // div.appendChild(likeButton);

    closeButton.style.position = "absolute";
    closeButton.style.left = "5em";
    closeButton.style.top = "5em";
}
