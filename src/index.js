import './style.css';
import imgFile1 from './images/image_1.jpg';
import imgFile2 from './images/image_2.jpg';
import imgFile3 from './images/image_3.jpg';
import imgFile4 from './images/image_4.jpg';

// const imagesFolder = '/images/';
const images = [];
let currentIdx = 0;
const imageShownDiv = document.getElementsByClassName('image-shown');

const changeImg = (switchIdx) => {
    let nextIdx = currentIdx + switchIdx;

    if (currentIdx === 3 && switchIdx === 1) nextIdx = 0;
    else if (currentIdx === 0 && switchIdx === -1) nextIdx = 3;

    const previousIdx = currentIdx;
    currentIdx = nextIdx;

    if (switchIdx === 1) {
        // Old Image Out
        images[previousIdx].classList.add('out-to-left');
        images[previousIdx].addEventListener('animationend', () => {
            images[previousIdx].classList.remove('out-to-left');
            // images[previousIdx].classList.add('non-visible-img');
            images[previousIdx].removeEventListener('animationend', null, false);
        })
        
        images[previousIdx].classList.remove('current-img');

        // New Image In
        // images[nextIdx].classList.remove('non-visible-img');
        images[nextIdx].classList.add('in-from-right');
        images[nextIdx].addEventListener('animationend', () => {
            images[nextIdx].classList.remove('in-from-right');
            images[nextIdx].removeEventListener('animationend', null, false);
        })

        images[nextIdx].classList.add('current-img');
    } else if (switchIdx === -1) {
        // Old Image Out
        images[previousIdx].classList.add('out-to-right');
        images[previousIdx].addEventListener('animationend', () => {
            images[previousIdx].classList.remove('out-to-right');
            // images[previousIdx].classList.add('non-visible-img');
            images[previousIdx].removeEventListener('animationend', null, false);
        })

        images[previousIdx].classList.remove('current-img');
        
        // New Image In
        // images[nextIdx].classList.remove('non-visible-img');
        images[nextIdx].classList.add('in-from-left');
        images[nextIdx].addEventListener('animationend', () => {
            images[nextIdx].classList.remove('in-from-left');
            images[nextIdx].removeEventListener('animationend', null, false);
        })

        images[nextIdx].classList.add('current-img');
    }
}

const eventsSetter = () => {
    document.addEventListener('keydown', (e) => {
        console.log(e.key);

        if (e.key === 'ArrowLeft') {
            changeImg(0);
        }
        switch (e.key) {
            case 'ArrowLeft':
                changeImg(-1);
                break;
            case "ArrowRight":
                changeImg(1);
                break;
            case "Enter":
                changeImg(1);
                break;
            case " ":
                changeImg(1);
                break;
            default:
                break;
        }
    });

    const previousBtn = document.getElementById('previous-button');
    const nextBtn = document.getElementById('next-button');

    previousBtn.addEventListener('click', () => {
        changeImg(-1);
    });

    nextBtn.addEventListener('click', () => {
        changeImg(1);
    });
}

const imagesGetter = () => {
    // HARD CODED because JavaScript does not have access to FileSystems.
    const imgCreator = (imgPath) => {
        const img = document.createElement('img');
        img.src = imgPath;
        img.addEventListener('click', () => changeImg(1));
        images.push(img);
    }

    imgCreator(imgFile1);
    imgCreator(imgFile2);
    imgCreator(imgFile3);
    imgCreator(imgFile4);

    imageShownDiv[0].appendChild(images[0]);
    imageShownDiv[0].appendChild(images[1]);
    imageShownDiv[0].appendChild(images[2]);
    imageShownDiv[0].appendChild(images[3]);
    eventsSetter();

    images[0].classList.toggle('current-img');
    // images[1].classList.toggle('non-visible-img');
    // images[2].classList.toggle('non-visible-img');
    // images[3].classList.toggle('non-visible-img');
}

window.addEventListener('load', imagesGetter);