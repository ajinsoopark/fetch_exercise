document.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector('body');
    let movieMenu = document.querySelector('.ghibliSelect');
    let movieObj = {};
    let infoDiv = document.getElementById('movieInfo')
    let selectCount = 0;
    
    function fillMovieObj (resolve) {
        resolve.forEach(movie => {
            movieObj[movie.title] = [movie.title, 
                                    movie.director, 
                                    movie.description, 
                                    movie.release_date, 
                                    movie.rt_score];
        });
    };

    function fillSelectMenu () {
        for(let key in movieObj) {
            let newTitle = document.createElement('option')
            newTitle.value = key;
            newTitle.innerText = key;
            movieMenu.appendChild(newTitle);
        }
    };

    function displayMovieInfo () {
        let movieKey = movieMenu.value;
        let movieDiv = document.createElement('div');
        let movieTitle = document.createElement('p');
        let movieDirector = document.createElement('p');
        let description = document.createElement('p');
        let releaseDate = document.createElement('p');
        let rtScore = document.createElement('p');

        movieDiv.setAttribute('id', 'movieDiv');
        body.appendChild(movieDiv);
        movieTitle.innerText = `Title: ${movieObj[movieKey][0]}`;
        movieDiv.appendChild(movieTitle);
        movieDirector.innerText = `Director: ${movieObj[movieKey][1]}`;
        movieDiv.appendChild(movieDirector);
        description.innerText = `Description: ${movieObj[movieKey][2]}`;
        movieDiv.appendChild(description);
        releaseDate.innerText = `Release Date: ${movieObj[movieKey][3]}`;
        movieDiv.appendChild(releaseDate);
        rtScore.innerText = `Rotten Tomatoes Score: ${movieObj[movieKey][4]}`;
        movieDiv.appendChild(rtScore);
    };

    function removeCurrentInfo () {
        let movieDiv = document.getElementById('movieDiv');
        body.removeChild(movieDiv);
    };

    fetch('https://ghibliapi.herokuapp.com/films')
    .then(res => {
        return res.json();

    }).then(parsedRes => {
       fillMovieObj(parsedRes);
       fillSelectMenu();

       movieMenu.addEventListener('change', () => {
           if (selectCount === 0) {
               displayMovieInfo();
               selectCount++;
           } else if (selectCount > 0) {
            removeCurrentInfo();
            displayMovieInfo();
           }
       });
    })
    
});