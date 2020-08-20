import './styles/style.scss';
// import TheMovieDB from '@andriymiz/themoviedb';
// const TheMovieDB = require('themoviedb');
import jikanjs from 'jikanjs';

const YoutubeBase = "https://www.youtube.com/embed/";

const tmdb = new TheMovieDB("acbbc2cf9a1c6ddd224bd278bee1b941");
const IMDBbase = "https://www.imdb.com/title/";
tmdb.v3_account = {id:1};

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const globalTop50 = '1KNl4AYfgZtOVm9KHkhPTF'
spotifyApi.setAccessToken('bbe36777ff7c4470acb561be66b91154');

const displayVideoBlock = document.getElementById("displayVideo");
let displayVideoString = "";

let items = [];
let movieListCount = 0;
let tvshowsListCount = 0;
let animeListCount = 0;
let mangaListCount = 0;

function randNo(maxLimit) {
    return Math.floor(Math.random() * maxLimit); // TODO random Function
}  


function displayCheck(check, form) {

    var checkBox = document.getElementById(check);
    var div = document.getElementById(form);
  
    if (checkBox.checked == true){
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
}


function addMovieList(){

    let div = document.getElementById("moviesList");
    ++movieListCount;
    div.innerHTML  += '<div id="movieListHead' + movieListCount + '"> <input type="text" name="moviesList' + movieListCount + '" id="moviesList' + movieListCount + '" placeholder="TMDB list url"> <button id="moviesListNeg' + movieListCount + '" name="moviesList' + movieListCount + '">-</button> </div>';
    document.getElementById('moviesListNeg' + movieListCount).onclick = () => removeMovieList(movieListCount);
}
  
function removeMovieList(id){
    document.getElementById("movieListHead" + id).remove();
    --movieListCount;
}

function addTvshowsList(){
    let div = document.getElementById("tvshowsList");
    ++tvshowsListCount;

    div.innerHTML += '<div id="tvshowsListHead'+tvshowsListCount+'"><input type="text" name="tvshowsList'+tvshowsListCount+'" id="tvshowsList'+tvshowsListCount+'" placeholder="TMDB list url"><button id="tvshowsListNeg'+tvshowsListCount+'" name="tvshowsList'+tvshowsListCount+'">-</button></div>'

    document.getElementById('tvshowsListNeg' + tvshowsListCount).onclick = () => removeTvshowsList(tvshowsListCount);
}

function removeTvshowsList(id){
    document.getElementById("tvshowsListHead" + id).remove();
    --tvshowsListCount;
}

function addAnimeList(){
    let div = document.getElementById("animeList");
    ++animeListCount;

    div.innerHTML += '<div id="animeListHead'+animeListCount+'"><input type="text" name="animeList'+animeListCount+'" id="animeList'+tvshowsListCount+'" placeholder="MAL Profile"><button id="animeListNeg'+animeListCount+'" name="animeList'+animeListCount+'">-</button></div>'

    document.getElementById('animeListNeg' + animeListCount).onclick = () => removeAnimeList(animeListCount);
}

function removeAnimeList(id){
    document.getElementById("animeListHead" + id).remove();
    --animeListCount;
}

function addMangaList(){
    let div = document.getElementById("mangaList");
    ++mangaListCount;

    div.innerHTML += '<div id="mangaListHead'+mangaListCount+'"><input type="text" name="mangaList'+mangaListCount+'" id="mangaList'+mangaListCount+'" placeholder="MAL Profile"><button id="mangaListNeg'+mangaListCount+'" name="mangaList'+mangaListCount+'">-</button></div>'

    document.getElementById('mangaListNeg' + mangaListCount).onclick = () => removeAnimeList(animeListCount);
}

function removeMangaList(id){
    document.getElementById("mangaListHead" + id).remove();
    --mangaListCount;
}

function recommend(){
    
    let paramsCount = 0;

    const movies = document.getElementById("moviesCheckbox").value;
    if(movies) paramsCount++;

    const tvshows = document.getElementById("tvshowsCheckbox").value;
    if(tvshows) paramsCount++;

    let rand = randNo(paramsCount);

    if(!movies&&tvshows) rand = 1;

    if(rand==0){
        recommendMovies();
    }
    else if(rand==1){
        recommendtvshows();
    }
    else if(rand==2){
        recommendAnime();
    }
    else if(rand==3){
        recommendManga();
    }
    else if(rand==4){
        recommendMusic();
    }

}

function recommendMovies(){
    console.log("recommending Movies.....")
    let top = document.getElementById("moviesTop").value;
    let pop = document.getElementById("moviesPopular").value;
    let childs = document.getElementById("moviesList").children; // TODO randomize selction
    let randLis = randNo(2 + childs.length);

    if(childs.length!=0)randLis=2;

    if(randLis==0){

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
                    
                        displayVideoString = "";
                        displayVideoString += '<img src="';
                        displayVideoString += configs.images.secure_base_url;
                        displayVideoString += configs.images.poster_sizes[4];
                        displayVideoString += items[selection].poster;
                        displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

                        displayVideoString += '<div class="info">';
                        displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
                        displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
                        displayVideoString += '<h2  class="summaryHead">Summary</h2>';
                        displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
                        displayVideoString += '<a href= '+IMDBbase + items[selection].imdb+'>IMDB</a>'
                        if(data.results[0].site=='YouTube'){
                            displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+YoutubeBase +  data.results[0].key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                        }
                        displayVideoString += '</div>';
                        items = [];
                        displayVideoBlock.innerHTML = displayVideoString;
                    
                    });
                    
                });
            });

    }

    else if (randLis==1){

        tmdb.getConfiguration()
        .then(configs => {
            tmdb.getPopularMovies()
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
                
                    displayVideoString = "";
                    displayVideoString += '<img src="';
                    displayVideoString += configs.images.secure_base_url;
                    displayVideoString += configs.images.poster_sizes[4];
                    displayVideoString += items[selection].poster;
                    displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

                    displayVideoString += '<div class="info">';
                    displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
                    displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
                    displayVideoString += '<h2  class="summaryHead">Summary</h2>';
                    displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
                    displayVideoString += '<a href= '+IMDBbase + items[selection].imdb+'>IMDB</a>'
                    if(data.results[0].site=='YouTube'){
                        displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+YoutubeBase +  data.results[0].key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    }
                    displayVideoString += '</div>';
                    items = [];
                    displayVideoBlock.innerHTML = displayVideoString;
                
                });
                
            });
        });

    }

    else if(randLis>1){

        randLis -= 2;
        let listSelect = childs[randLis].children[0].value;

        tmdb.getConfiguration()
        .then(configs => {
            tmdb.getList(listSelect.slice(listSelect.lastIndexOf('/')+1))
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
                
                    displayVideoString = "";
                    displayVideoString += '<img src="';
                    displayVideoString += configs.images.secure_base_url;
                    displayVideoString += configs.images.poster_sizes[4];
                    displayVideoString += items[selection].poster;
                    displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

                    displayVideoString += '<div class="info">';
                    displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
                    displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
                    displayVideoString += '<h2  class="summaryHead">Summary</h2>';
                    displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
                    displayVideoString += '<a href= '+IMDBbase + items[selection].imdb+'>IMDB</a>'
                    if(data.results[0].site=='YouTube'){
                        displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+YoutubeBase +  data.results[0].key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    }
                    displayVideoString += '</div>';
                    items = [];
                    displayVideoBlock.innerHTML = displayVideoString;
                
                });
                
            });
        });

    }
}

function recommendtvshows(){
    
    console.log("recommending Tv shows.....")
    let top = document.getElementById("tvshowsTop").value;
    let pop = document.getElementById("tvshowsPopular").value;
    let childs = document.getElementById("tvshowsList").children;
    let randLis = randNo(2 + childs.length);

    if(randLis==0){

        tmdb.getConfiguration()
            .then(configs => {
                tmdb.getTopRatedTvShows()
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
                    tmdb.getTvShowVideos(items[selection].id).then((data)=>{
                    
                        displayVideoString = "";
                        displayVideoString += '<img src="';
                        displayVideoString += configs.images.secure_base_url;
                        displayVideoString += configs.images.poster_sizes[4];
                        displayVideoString += items[selection].poster;
                        displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

                        displayVideoString += '<div class="info">';
                        displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
                        displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
                        displayVideoString += '<h2  class="summaryHead">Summary</h2>';
                        displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
                        displayVideoString += '<a href= '+IMDBbase + items[selection].imdb+'>IMDB</a>'
                        if(data.results[0].site=='YouTube'){
                            displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+YoutubeBase +  data.results[0].key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                        }
                        displayVideoString += '</div>';
                        items = [];
                        displayVideoBlock.innerHTML = displayVideoString;
                    
                    });
                    
                });
            });

    }

    else if (randLis==1){

        tmdb.getConfiguration()
        .then(configs => {
            tmdb.getPopularTvShows()
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
                tmdb.getTvShowVideos(items[selection].id).then((data)=>{

                    displayVideoString = "";
                    displayVideoString += '<img src="';
                    displayVideoString += configs.images.secure_base_url;
                    displayVideoString += configs.images.poster_sizes[4];
                    displayVideoString += items[selection].poster;
                    displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

                    displayVideoString += '<div class="info">';
                    displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
                    displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
                    displayVideoString += '<h2  class="summaryHead">Summary</h2>';
                    displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
                    displayVideoString += '<a href= '+IMDBbase + items[selection].imdb+'>IMDB</a>'
                    // if(data.results[0].site=='YouTube'){
                    //     displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+YoutubeBase +  data.results[0].key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    // }
                    displayVideoString += '</div>';
                    items = [];
                    displayVideoBlock.innerHTML = displayVideoString;
                
                });
                
            });
        });

    }

    else if(randLis>1){

        randLis -= 2;
        let listSelect = childs[randLis].children[0].value;

        tmdb.getConfiguration()
        .then(configs => {
            tmdb.getList(listLink.slice(listSelect.lastIndexOf('/')))
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
                
                    displayVideoString = "";
                    displayVideoString += '<img src="';
                    displayVideoString += configs.images.secure_base_url;
                    displayVideoString += configs.images.poster_sizes[4];
                    displayVideoString += items[selection].poster;
                    displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

                    displayVideoString += '<div class="info">';
                    displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
                    displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
                    displayVideoString += '<h2  class="summaryHead">Summary</h2>';
                    displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
                    displayVideoString += '<a href= '+IMDBbase + items[selection].imdb+'>IMDB</a>'
                    if(data.results[0].site=='YouTube'){
                        displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+YoutubeBase +  data.results[0].key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    }
                    displayVideoString += '</div>';
                    items = [];
                    displayVideoBlock.innerHTML = displayVideoString;
                
                });
                
            });
        });

    }
}

function recommendAnime(){
    let top = document.getElementById("animetop").value
    let childs = document.getElementById("animeList").children;
    let randLis = randNo(1 + childs.length);

    if(randLis==0){
        jikanjs.loadTop('anime').then(
            (response)=>{
              response.top.forEach((element)=>{
                let item = {};
                item.id = element.mal_id;
                item.poster = element.image_url;
                item.title = element.title;
                item.rating = element.score;
                // item.summary = element.overview;
                item.mal_url = element.url;
                items.push(item);
              });
            }
          )
          .then(()=>{
            let selection = randNo(items.length);
            jikanjs.loadAnime(items[selection].id, 'videos').then((data)=>{
                
                displayVideoString = "";
                displayVideoString += '<img src="';
                displayVideoString += items[selection].poster;
                displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

                displayVideoString += '<div class="info">';
                displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
                displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
                // displayVideoString += '<h2  class="summaryHead">Summary</h2>';
                // displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
                displayVideoString += '<a href= '+IMDBbase + items[selection].mal_url+'>MAL</a>'
                if(data.results[0].site=='YouTube'){
                    displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+data.promo.video_url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                }
                displayVideoString += '</div>';
                items = [];
                document.getElementById("display").innerHTML = displayVideoString;
            })
            
          })
          .catch((err)=>{
            console.error(err);
          });
    }

    else if(randLis==1){
        randLis -= 1;
        let listSelect = childs[randNo(randLis)].children[0].value;
        jikanjs.loadUser(listSelect.slice(listSelect.lastIndexOf('/')), 'animelist').then((data)=>{
            data.anime.forEach((element)=>{
            let item = {};
                item.id = element.mal_id;
                item.poster = element.image_url;
                item.title = element.title;
                item.rating = element.score;
                // item.summary = element.overview;
                item.mal_url = element.url;
                item.video_url = element.video_url;
                items.push(item);
            });
        })
        .then(()=>{
            let selection = randNo(items.length);
            displayVideoString = "";
            displayVideoString += '<img src="';
            displayVideoString += items[selection].poster;
            displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

            displayVideoString += '<div class="info">';
            displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
            displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
            // displayVideoString += '<h2  class="summaryHead">Summary</h2>';
            // displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
            displayVideoString += '<a href= '+IMDBbase + items[selection].mal_url+'>MAL</a>'
            if(data.results[0].site=='YouTube'){
                displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+data.promo.video_url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            }
            displayVideoString += '</div>';
            items = [];
            displayVideoBlock.innerHTML = displayVideoString;
        });

    
    }
}


function recommendManga(){

    let top = document.getElementById("mangatop").value
    let childs = document.getElementById("mangaList").children;
    let randLis = randNo(1 + childs.length);

    if(randLis==0){
        jikanjs.loadTop('manga').then(
            (response)=>{
              response.top.forEach((element)=>{
                let item = {};
                item.id = element.mal_id;
                item.poster = element.image_url;
                item.title = element.title;
                item.rating = element.score;
                // item.summary = element.overview;
                item.mal_url = element.url;
                items.push(item);
              });
            }
          )
          .then(()=>{
            let selection = randNo(items.length);
            displayVideoString = "";
            displayVideoString += '<img src="';
            displayVideoString += items[selection].poster;
            displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

            displayVideoString += '<div class="info">';
            displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
            displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
            // displayVideoString += '<h2  class="summaryHead">Summary</h2>';
            // displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
            displayVideoString += '<a href= '+items[selection].mal_url+'>MAL</a>'
            if(data.results[0].site=='YouTube'){
                displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+data.promo.video_url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            }
            displayVideoString += '</div>';
            items = [];
            displayVideoBlock.innerHTML = displayVideoString;
            
          })
          .catch((err)=>{
            console.error(err);
          });
    }
    else if(randLis==1){
        randLis -= 1;
        let listLink = childs[randNo(randLis)].children[0].value;
        jikanjs.loadUser(listLink, 'mangalist').then((data)=>{
          data.manga.forEach((element)=>{
            let item = {};
              item.id = element.mal_id;
              item.poster = element.image_url;
              item.title = element.title;
              item.rating = element.score;
              // item.summary = element.overview;
              item.mal_url = element.url;
              // item.video_url = element.video_url;
              items.push(item);
          });
        })
        .then(()=>{
            let selection = randNo(items.length);
            displayVideoString = "";
            displayVideoString += '<img src="';
            displayVideoString += items[selection].poster;
            displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

            displayVideoString += '<div class="info">';
            displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
            displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
            // displayVideoString += '<h2  class="summaryHead">Summary</h2>';
            // displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
            displayVideoString += '<a href= '+items[selection].mal_url+'>MAL</a>'
            if(data.results[0].site=='YouTube'){
                displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+data.promo.video_url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            }
            displayVideoString += '</div>';
            items = [];
            displayVideoBlock.innerHTML = displayVideoString;
        });
    }
}


function recommendMusic(){
    
    let top = document.getElementById("musictop").value
    let childs = document.getElementById("musicList").children;
    let randLis = randNo(1 + childs.length);

    if(randLis==0){
      SpotifyWebApi.getPlaylistTracks(globalTop50, function (err, data){
        if(err) console.error(err);
        data.items.forEach((element)=>{

          let item = {};
            item.id = element.id;
            item.poster = element.album.images[0].url;
            item.title = element.name;
            item.rating = element.popularity;
            item.artists = element.artists;
            item.url = element.uri;
            items.push(item);
          // element.preview_url
          // element.images[0].url
        });

        let selection = randNo(items.length);
            displayVideoString = "";
            displayVideoString += '<img src="';
            displayVideoString += items[selection].poster;
            displayVideoString += '" class="poster" alt="'+items[selection].title+'">';

            displayVideoString += '<div class="info">';
            displayVideoString += '<h1 class="heading">'+items[selection].title+'</h1>';
            displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
            displayVideoString += '<div id="artists">'
            items.artists.forEach((artist)=>{
            displayVideoString += artist.name + ",";
            });
            displayVideoString += '</div>'
            // displayVideoString += '<h2  class="summaryHead">Summary</h2>';
            // displayVideoString += '<p class="summary-data">'+items[selection].summary+'</p>';
            displayVideoString += '<a href= '+items[selection].url+'>Spotify</a>'
            if(data.results[0].site=='YouTube'){
                displayVideoString += '<iframe class="youtube" width="560" height="315" src="'+data.promo.video_url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            }
            displayVideoString += '</div>';
            items = [];
            displayVideoBlock.innerHTML = displayVideoString;


      });

    }

    else if(randLis==1){
      randLis -= 1;
      let listLink = childs[randNo(randLis)].children[0].value;
      const id = listLink.slice(listLink.lastIndexOf('/'));
      SpotifyWebApi.getPlaylistTracks(id, function (err, data){
        if(err) console.error(err);
        data.items.forEach((element)=>{

          let item = {};
            item.id = element.id;
            item.poster = element.album.images[0].url;
            item.title = element.name;
            item.rating = element.popularity;
            item.artists = element.artists;
            item.url = element.uri;
            items.push(item);
          // element.preview_url
          // element.images[0].url
        });

        let selection = randNo(items.length);
        displayVideoString += '<div class="col mb-4">';
        displayVideoString += '<div class="card h-100">';
        displayVideoString += '<h1>'+items[selection].title+'</h1>'
        displayVideoString += '<img src="';
        displayVideoString += items[selection].poster;
        displayVideoString += '" class="card-img-top" alt="">';
        displayVideoString += '<h4> Rating:'+items[selection].rating+'</h4>';
        // displayVideoString += '<h2>Summary</h2>';
        // displayVideoString += '<p>'+items[selection].summary+'</p>';
        displayVideoString += '<a href= '+items[selection].url+'>Spotify</a>';
        displayVideoString += '<div id="artists">'
        items.artists.forEach((artist)=>{
          displayVideoString += artist.name + ",";
        });
        displayVideoString += '</div>'
          // displayVideoString += '<iframe width="560" height="315" src="'+items[selection].video_url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        
        displayVideoString += '</div>';
        displayVideoString += '</div>';
        items = [];
        document.getElementById("display").innerHTML = displayVideoString;


      });
    }
}


document.getElementById("recommendCheckbox").onclick = recommend;

document.getElementById("moviesCheckbox").onclick = () => displayCheck("moviesCheckbox","moviesForm");
document.getElementById("tvshowsCheckbox").onclick = () => displayCheck("tvshowsCheckbox","tvshowsForm");;
document.getElementById("animeCheckbox").onclick = () =>  displayCheck("animeCheckbox","animeForm");
document.getElementById("mangaCheckbox").onclick = () =>  displayCheck("mangaCheckbox","mangaForm");


document.getElementById("moviesListAdd").onclick = addMovieList;
document.getElementById("tvshowsListAdd").onclick = addTvshowsList;
document.getElementById("animeListAdd").onclick = addAnimeList;
document.getElementById("mangaListAdd").onclick = addMa;





  