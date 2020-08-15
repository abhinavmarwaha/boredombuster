const tmdb = new TheMovieDB("acbbc2cf9a1c6ddd224bd278bee1b941");

tmdb.v3_account = {id:1};
var moviesBlock = document.getElementById("movies");
var moviesString = "";
var listsString = "";

tmdb.getConfiguration()
          .then(configs => {
            tmdb.getPopularMovies()
              .then(data => data.results.forEach(element => {
                moviesString += '<div class="col mb-4">';
                moviesString += '<div class="card h-100">';moviesString += '<img src="';
                moviesString += configs.images.secure_base_url;
                moviesString += configs.images.poster_sizes[4];
                moviesString += element.poster_path;
                moviesString += '" class="card-img-top" alt="">';
                moviesString += '</div>';
                moviesString += '</div>';
              })).then(() => {
                document.getElementById("movies").innerHTML = moviesString;
              });

            tmdb.getLists()
              .then(data => data.results.forEach(element => {
                listsString += '<li class="list-group-item">';
                listsString += element.name;
                listsString += '</li>';
              })).then(() => {
                document.getElementById("lists").innerHTML = listsString;
              });
          });
          