const container = document.querySelector(".holder");
const fadeText = document.getElementById('fade-text');
const imageUrls = [
    'https://www.dropbox.com/scl/fi/xocdc6i1kqlzi7xbmjiyr/IMG_1661.PNG?rlkey=bjgkorfrovgpfdf91zv9thr1r&st=awkvcrd0&dl=0&raw=1',
    'https://www.dropbox.com/scl/fi/eckuucl4a8jms2t1err9m/Screenshot-2024-11-12-at-23.27.51.png?rlkey=wznbhuzr5s8jodv2k0vnx9f2m&st=uj7v65om&dl=0&raw=1',
    'https://www.dropbox.com/scl/fi/thg0yk8cxppg29knljxbb/Screenshot-2024-11-12-at-23.29.44.png?rlkey=uw8w9pizozcc3dpqg6ben7sfe&st=xkxvle4n&dl=0&raw=1',
    'https://www.dropbox.com/scl/fi/w4q7lffa6vreqb76jjs2h/IMG_1659.PNG?rlkey=8s32pf99zuzwnpjsdv23q9fny&st=h8b87hwv&dl=0&raw=1',
    'https://www.dropbox.com/scl/fi/t7z27v84zk8ckzlk0y81d/IMG_1658.PNG?rlkey=09eeyfp7d8ztumiduld66mquy&st=ov72xm0w&dl=0&raw=1',
    'https://www.dropbox.com/scl/fi/n68fask5ippzs9rd5lgg4/IMG_0082.PNG?rlkey=4rg5rlpya9jqlnyg3fpq1qlhx&st=j378z7xf&dl=0&raw=1',
    'https://www.dropbox.com/scl/fi/3ad0aibd2hhcygidiqz2r/IMG_0080.PNG?rlkey=qi5n4e525pm1gn0viz2dn8jyf&st=m2yt46f3&dl=0&raw=1'
];
// select random image from list
function getRandomImageUrl() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
}
// set random position
function getRandomXPosition() {
    return (Math.random() * 500 - 250);
}
// set random rotation
function getRandomRotation() {
    return (Math.random() * 50 - 25);
}
// set random spacing
function getRandomMarginBottom() {
    return Math.random() * 140 + 10;
}

let isLoading = false;
const holder = document.querySelector('.holder');
// hide text and add more images on scroll
holder.addEventListener('scroll', () => {
    if ((holder.scrollTop + holder.clientHeight) + 300 >= holder.scrollHeight && !isLoading) {
        isLoading = true;
        loadImages();
    }
    const scrollTop = holder.scrollTop;
    const containerHeight = holder.clientHeight;
    const scrollHeight = holder.scrollHeight;
    const scrollPercentage = (scrollTop / (scrollHeight - containerHeight)) * 5;
    fadeText.style.opacity = 1 - scrollPercentage;
});
// dynamic resizing
function getScaleFactor() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 480) {
        return 0.35;
    } else if (windowWidth <= 768) {
        return 0.55;
    } else if (windowWidth <= 1279) {
        return 0.65;
    } else {
        return 1;
    }
}
// scale images
function applyScale(images) {
    const scale = getScaleFactor();
    images.forEach(img => {
        const rotation = img.dataset.rotation || 0;
        img.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    });
}
// load 10 images
function loadImages() {
    const images = [];
    let imagesLoaded = 0;
    for (let i = 1; i <= 10; i++) {
        const avatarImg = document.createElement('img');
        avatarImg.src = getRandomImageUrl();
        avatarImg.addEventListener('load', () => {
            imagesLoaded++;
            container.appendChild(avatarImg);
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
        avatarImg.dataset.rotation = rotation;
        avatarImg.style.transform = `rotate(${rotation}deg) scale(${getScaleFactor()})`;
        images.push(avatarImg);
    }
}

loadImages();
// dynamic resizing
window.addEventListener("resize", () => {
    const images = Array.from(container.querySelectorAll("img"));
    applyScale(images);
});
// image popup screen
container.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        showDiv(event.target);
    }
});
// image popup screen
function showDiv(image) {
    const div = document.createElement('div');
    div.classList.add('info-div');
    div.innerHTML = "";
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
    clonedImage.style.position = "relative";
    clonedImage.style.transform = "none";
    clonedImage.style.margin = "0";
    clonedImage.style.boxShadow = "0 20px 40px 0 rgba(0, 0, 0, 0.4)";
    clonedImage.style.border = "solid 10px white";
    clonedImage.style.maxHeight = "90%";
    clonedImage.style.maxWidth = "80%";
    clonedImage.style.width = "auto";

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
    closeButton.style.position = "absolute";
    closeButton.style.left = "5em";
    closeButton.style.top = "5em";
}
