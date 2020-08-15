import './styles/style.css';
import './styles/style.scss';
import './styles/style.sass';


const tmdb = new TheMovieDB("acbbc2cf9a1c6ddd224bd278bee1b941");
const IMDBbase = "https://www.imdb.com/title/";
const YoutubeBase = "https://www.youtube.com/embed/";

tmdb.v3_account = {id:1};
var moviesBlock = document.getElementById("movies");
var moviesString = "";
var listsString = "";
let items = [];

tmdb.getConfiguration()
    .then(configs => {
      tmdb.getTopRatedMovies()
        .then(data => data.results.forEach(element => {
          let item = {};
          item.id = element.id;
          item.poster = element.poster_path;
          item.title = element.title;
          item.rating = element.popularity;
          item.summary = element.overview;
          item.imdb = element.imdb_id;
          item.video = element.video;
          items.push(item);
        }))
        .then(() => {
          let selection = randNo(items.length);
          tmdb.getMovieVideos(items[selection].id).then((data)=>{
            moviesString += '<div class="col mb-4">';
            moviesString += '<div class="card h-100">';
            moviesString += '<h1>'+items[selection].title+'</h1>'
            moviesString += '<img src="';
            moviesString += configs.images.secure_base_url;
            moviesString += configs.images.poster_sizes[4];
            moviesString += items[selection].poster;
            moviesString += '" class="card-img-top" alt="">';
            moviesString += '<h4> Rating:'+items[selection].rating+'</h4>';
            moviesString += '<h2>Summary</h2>';
            moviesString += '<p>'+items[selection].summary+'</p>';
            moviesString += '<a href= '+IMDBbase + items[selection].imdb+'>IMDB</a>'
            if(data.results[0].site=='YouTube'){
              moviesString += '<iframe width="560" height="315" src="'+YoutubeBase +  data.results[0].key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            }
            moviesString += '</div>';
            moviesString += '</div>';
            items = [];
            document.getElementById("movies").innerHTML = moviesString;
            
          });
          
        });
    });


function randNo(maxLimit = 100) {
    return Math.floor(Math.random() * maxLimit);
}   


// which lists?
// Parameters top, etc
// which items music, movies, tv series
//  .getPopularmovies
// Movies: 