document.addEventListener('DOMContentLoaded', () => {
    // let xhr = new XMLHttpRequest();
    let button = document.querySelector('.button');
    let body = document.querySelector('body');
    let count = 0;

    function getRandomImg (response) {
       let randomImgUrl = response.message;
       let img = document.createElement('img');
       img.src = randomImgUrl;
       body.appendChild(img);
    };

    function replaceImg (response) {
        let randomImgUrl = response.message;
        let newImg = document.createElement('img')
        newImg.src = randomImgUrl;
        let currentImg = document.querySelector('img');
        body.replaceChild(newImg, currentImg);
    }

    button.addEventListener('click', () => {
        fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => {
            return res.json();
        }).then(parsedRes => {
            if (count === 0) {
                getRandomImg(parsedRes);
                count++;
            } else if (count > 0) {
                replaceImg(parsedRes);
            } 
        });
    })      
});