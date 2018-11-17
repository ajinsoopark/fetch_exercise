document.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector('body');
    let movieMenu = document.querySelector('.ghibliSelect');
    let movieObj = {};
    
    function fillMovieObj (resolve) {
        resolve.forEach(movie => {
            movieObj[movie.title] = [movie.title, movie.director, movie.description, movie.release_date, movie.rt_score, movie.id];
        });
    };

    function fillSelectMenu () {
        for(let key in movieObj) {
            let newSelection = document.createElement('option')
            newSelection.value = key;
            newSelection.innerText = key;
            newSelection.setAttribute('id', `${key[5]}`)
            movieMenu.appendChild(newSelection);
            
        }
    };

    fetch('https://ghibliapi.herokuapp.com/films')
    .then(res => {
        return res.json();

    }).then(parsedRes => {
       fillMovieObj(parsedRes);
       fillSelectMenu();

       movieMenu.addEventListener('click', (target) => {
        
       })
    })
    
});