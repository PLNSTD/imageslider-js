import './style.css';
import imgFile1 from './images/image_1.jpg';
import imgFile2 from './images/image_2.jpg';
import imgFile3 from './images/image_3.jpg';
import imgFile4 from './images/image_4.jpg';

// const imagesFolder = '/images/';
const images = [];
let currentIdx = 0;
const imageShownDiv = document.getElementsByClassName('image-shown');

const changeImg = (nextIdx) => {
    imageShownDiv[0].innerHTML = '';

    if (currentIdx === 3 && nextIdx === 1) currentIdx = 0;
    else if (currentIdx === 0 && nextIdx === -1) currentIdx = 3;
    else currentIdx += nextIdx;

    imageShownDiv[0].appendChild(images[currentIdx]);
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

    imageShownDiv[0].appendChild(images[currentIdx]);
    
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
    })
}

window.addEventListener('load', imagesGetter);