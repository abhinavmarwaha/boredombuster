(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.TheMovieDB = factory());
}(this, (function () { 'use strict';

  // ACCOUNT V3
  var AccountV3 = {
    /**
     * Get your account details.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getAccount(options) {
      return this.getV3("account", {
        ...this.metas(["api_key", "session_id"]),
        ...options
      });
    },

    /**
     * Get all of the lists created by an account. Will
     * invlude private lists if you are the owner.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getLists(account_id = (this.v3_account || {id:0}).id, options) {
      return this.getV3(`account/${account_id}/lists`, {
        ...this.metas(["api_key", "language", "session_id"]),
        ...options
      });
    },

    /**
     * Get the list of your favorite movies.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getFavoritesMovies(account_id = (this.v3_account || {id:0}).id, options) {
      return this.getV3(`account/${account_id}/favorite/movies`, {
        ...this.metas(["api_key", "language", "session_id"]),
        ...options
      });
    },

    /**
     * Get the list of your favorite TV shows.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getFavoritesTvShows(account_id = (this.v3_account || {id:0}).id, options) {
      return this.getV3(`account/${account_id}/favorite/tv`, {
        ...this.metas(["api_key", "language", "session_id"]),
        ...options
      });
    },

    /**
     * This method allows you to mark a movie or TV show as
     * a favorite item.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {Object} body
     * @param {('movie'|'tv')} body.media_type - Required
     * @param {number} body.media_id - Required
     * @param {boolean} body.favorite - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    markAsFavorite(account_id = (this.v3_account || {id:0}).id, options, body) {
      return this.postV3(
        `account/${account_id}/favorite`,
        {
          ...this.metas(["api_key", "session_id"]),
          ...options
        },
        body
      );
    },

    /**
     * Get a list of all the movies you have rated.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getRatedMovies(account_id = (this.v3_account || {id:0}).id, options) {
      return this.getV3(`account/${account_id}/rated/movies`, {
        ...this.metas(["api_key", "language", "session_id"]),
        ...options
      });
    },

    /**
     * Get a list of all the TV shows you have rated.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getRatedTvShows(account_id = (this.v3_account || {id:0}).id, options) {
      return this.getV3(`account/${account_id}/rated/tv`, {
        ...this.metas(["api_key", "language", "session_id"]),
        ...options
      });
    },

    /**
     * Get a list of all the TV episodes you have rated.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getRatedTvEpisodes(account_id = (this.v3_account || {id:0}).id, options) {
      return this.getV3(`account/${account_id}/rated/tv/episodes`, {
        ...this.metas(["api_key", "language", "session_id"]),
        ...options
      });
    },

    /**
     * Get a list of all the movies you have added to your
     * watchlist.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieWatchlist(account_id = (this.v3_account || {id:0}).id, options) {
      return this.getV3(`account/${account_id}/watchlist/movies`, {
        ...this.metas(["api_key", "language", "session_id"]),
        ...options
      });
    },

    /**
     * Get a list of all the TV shows you have added to your
     * watchlist.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowWatchlist(account_id = (this.v3_account || {id:0}).id, options) {
      return this.getV3(`account/${account_id}/watchlist/tv`, {
        ...this.metas(["api_key", "language", "session_id"]),
        ...options
      });
    },

    /**
     * Add a movie or TV show to your watchlist.
     * @param {number} account_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {Object} body
     * @param {('movie'|'tv')} body.media_type - Required
     * @param {number} body.media_id - Required
     * @param {boolean} body.watchlist - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    addToWatchlist(account_id = (this.v3_account || {id:0}).id, options, body) {
      return this.postV3(
        `account/${account_id}/watchlist`,
        {
          ...this.metas(["api_key", "session_id"]),
          ...options
        },
        body
      );
    }
  };

  // ACCOUNT V4
  var AccountV4 = {
    /**
     * Get all of the lists you've created.
     * @param {number} account_id
     * @param {Object} options
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4Lists(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/lists`, options);
    },

    /**
     * Get the list of movies you have marked as a favorite.
     * @param {number} account_id
     * @param {Object} options
     * @param {('created_at.asc'|'created_at.desc'|'release_date.asc'|'release_date.desc'|'title.asc'|'title.desc'|'vote_average.asc'|'vote_average.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4FavoritesMovies(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/movie/favorites`, options);
    },

    /**
     * Get the list of TV shows you have marked as a favorite.
     * @param {number} account_id
     * @param {Object} options
     * @param {('created_at.asc'|'created_at.desc'|'release_date.asc'|'release_date.desc'|'title.asc'|'title.desc'|'vote_average.asc'|'vote_average.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4FavoritesTvShows(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/tv/favorites`, options);
    },

    /**
     * Get a list of your personal movie recommendations.
     * @param {number} account_id
     * @param {Object} options
     * @param {('created_at.asc'|'created_at.desc'|'release_date.asc'|'release_date.desc'|'title.asc'|'title.desc'|'vote_average.asc'|'vote_average.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4MovieRecommendations(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/movie/recommendations`, options);
    },

    /**
     * Get a list of your personal TV show recommendations.
     * @param {number} account_id
     * @param {Object} options
     * @param {('created_at.asc'|'created_at.desc'|'release_date.asc'|'release_date.desc'|'title.asc'|'title.desc'|'vote_average.asc'|'vote_average.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4TvShowRecommendations(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/tv/recommendations`, options);
    },

    /**
     * Get the list of movies you have added to your watchlist.
     * @param {number} account_id
     * @param {Object} options
     * @param {('created_at.asc'|'created_at.desc'|'release_date.asc'|'release_date.desc'|'title.asc'|'title.desc'|'vote_average.asc'|'vote_average.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4MovieWatchlist(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/movie/watchlist`, options);
    },

    /**
     * Get the list of TV shows you have added to your watchlist.
     * @param {number} account_id
     * @param {Object} options
     * @param {('created_at.asc'|'created_at.desc'|'release_date.asc'|'release_date.desc'|'title.asc'|'title.desc'|'vote_average.asc'|'vote_average.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4TvShowWatchlist(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/tv/watchlist`, options);
    },

    /**
     * Get the list of movies you have rated.
     * @param {number} account_id
     * @param {Object} options
     * @param {('created_at.asc'|'created_at.desc'|'release_date.asc'|'release_date.desc'|'title.asc'|'title.desc'|'vote_average.asc'|'vote_average.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4RatedMovies(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/movie/rated`, options);
    },

    /**
     * Get the list of TV shows you have rated.
     * @param {number} account_id
     * @param {Object} options
     * @param {('created_at.asc'|'created_at.desc'|'release_date.asc'|'release_date.desc'|'title.asc'|'title.desc'|'vote_average.asc'|'vote_average.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4RatedTvShows(account_id = (this.v4_account || {id:0}).id, options) {
      return this.getV4(`account/${account_id}/tv/rated`, options);
    }
  };

  // AUTHENTICATION V4
  var AuthenticationV4 = {
    /**
     * This method generates a new request token that you can
     * ask a user to approve.
     * @param {Object} body
     * @param {string} body.redirect_to
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createAuthRequestToken(body) {
      return this.postV4("auth/request_token", body);
    },

    /**
     * This method will finish the user authentication flow and
     * issue an official user access token.
     * @param {Object} body
     * @param {string} body.request_token
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createAuthAccessToken(body) {
      return this.postV4("auth/access_token", body);
    },

    /**
     * This method gives your users the ability to log out of a
     * session.
     * @param {Object} body
     * @param {string} body.access_token
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    deleteAuthAccessToken(body) {
      return this.postV4("auth/access_token", body, "DELETE");
    }
  };

  // AUTHENTICATION V3
  var AuthenticationV3 = {
    /**
     * This method will let you create a new guest session.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createGuestSession(options) {
      return this.getV3("authentication/guest_session/new", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Create a temporary request token that can be used to
     * validate a TMDb user login.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createRequestToken(options) {
      return this.getV3("authentication/token/new", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * You can use this method to create a fully valid
     * session ID once a user has validated the request
     * token.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {Object} body
     * @param {string} body.request_token - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createSession(options, body) {
      return this.postV3(
        "authentication/session/new",
        {
          ...this.metas(["api_key"]),
          ...options
        },
        body
      );
    },

    /**
     * This method allows an application to validate a
     * request token by entering a username and password.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {Object} body
     * @param {string} body.username - Required
     * @param {string} body.password - Required
     * @param {string} body.request_token - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createSessionWithLogin(options, body) {
      return this.postV3(
        "authentication/token/validate_with_login",
        {
          ...this.metas(["api_key"]),
          ...options
        },
        body
      );
    },

    /**
     * Use this method to create a v3 session ID if you
     * already have a valid v4 access token.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {Object} body
     * @param {string} body.access_token - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createSessionFromV4AccessToken(options, body) {
      return this.postV3(
        "authentication/session/convert/4",
        {
          ...this.metas(["api_key"]),
          ...options
        },
        body
      );
    },

    /**
     * If you would like to delete (or "logout") from a
     * session, call this method with a valid session ID.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {Object} body
     * @param {string} body.session_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    deleteSession(options, body) {
      return this.postV3(
        "authentication/session",
        {
          ...this.metas(["api_key"]),
          ...options
        },
        body,
        "DELETE"
      );
    }
  };

  // CERTIFICATIONS V3
  var Certifications = {
    /**
     * Get an up to date list of the officially supported
     * movie certifications on TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieCertifications(options) {
      return this.getV3("certification/movie/list", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get an up to date list of the officially supported TV
     * show certifications on TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvCertifications(options) {
      return this.getV3("certification/tv/list", {
        ...this.metas(["api_key"]),
        ...options
      });
    }
  };

  // CHANGES V3
  var Changes = {
    /**
     * Get a list of all of the movie ids that have been
     * changed in the past 24 hours.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.end_date
     * @param {string} options.start_date
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieChangeList(options) {
      return this.getV3("movie/changes", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get a list of all of the TV show ids that have been
     * changed in the past 24 hours.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.end_date
     * @param {string} options.start_date
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvChangeList(options) {
      return this.getV3("tv/changes", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get a list of all of the person ids that have been
     * changed in the past 24 hours.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.end_date
     * @param {string} options.start_date
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonChangeList(options) {
      return this.getV3("person/changes", {
        ...this.metas(["api_key"]),
        ...options
      });
    }
  };

  // COLLECTIONS V3
  var Collections = {
    /**
     * Get collection details by id.
     * @param {string} collection_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getCollectionDetails(collection_id, options) {
      return this.getV3(`collection/${collection_id}`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the images for a collection by id.
     * @param {string} collection_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getCollectionImages(collection_id, options) {
      return this.getV3(`collection/${collection_id}/images`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the list translations for a collection by id.
     * @param {string} collection_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getCollectionTranslations(collection_id, options) {
      return this.getV3(`collection/${collection_id}/translations`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // COMPANIES V3
  var Companies = {
    /**
     * Get a companies details by id.
     * @param {string} company_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getCompanyDetails(company_id, options) {
      return this.getV3(`company/${company_id}`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the alternative names of a company.
     * @param {string} company_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getCompanyAlternativeNames(company_id, options) {
      return this.getV3(`company/${company_id}/alternative_names`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get a companies logos by id.
     * @param {string} company_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getCompanyImages(company_id, options) {
      return this.getV3(`company/${company_id}/images`, {
        ...this.metas(["api_key"]),
        ...options
      });
    }
  };

  // CONFIGURATION V3
  var Configurations = {
    /**
     * Get the system wide configuration information.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getConfiguration(options) {
      return this.getV3("configuration", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the list of countries (ISO 3166-1 tags) used
     * throughout TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getCountries(options) {
      return this.getV3("configuration/countries", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get a list of the jobs and departments we use on TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getJobs(options) {
      return this.getV3("configuration/jobs", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the list of languages (ISO 639-1 tags) used
     * throughout TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getLanguages(options) {
      return this.getV3("configuration/languages", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get a list of the officially supported translations
     * on TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPrimaryTranslations(options) {
      return this.getV3("configuration/primary_translations", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the list of timezones used throughout TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTimezones(options) {
      return this.getV3("configuration/timezones", {
        ...this.metas(["api_key"]),
        ...options
      });
    }
  };

  // CREDITS V3
  var Credits = {
    /**
     * Get a movie or TV credit details by id.
     * @param {string} credit_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getCreditDetails(credit_id, options) {
      return this.getV3(`credit/${credit_id}`, {
        ...this.metas(["api_key"]),
        ...options
      });
    }
  };

  // DISCOVER V3
  var Discover = {
    /**
     * Discover movies by different types of data like average
     * rating, number of votes, genres and certifications.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.region
     * @param {('popularity.asc'|'popularity.desc'|'release_date.asc'|'release_date.desc'|'revenue.asc'|'revenue.desc'|'primary_release_date.asc'|'primary_release_date.desc'|'original_title.asc'|'original_title.desc'|'vote_average.asc'|'vote_average.desc'|'vote_count.asc'|'vote_count.desc')} options.sort_by
     * @param {string} options.certification_country
     * @param {string} options.certification
     * @param {string} options.certification.gte
     * @param {string} options.certification.lte
     * @param {boolean} options.include_adult
     * @param {boolean} options.include_video
     * @param {number} options.page
     * @param {number} options.primary_release_year
     * @param {string} options.primary_release_date.gte
     * @param {string} options.primary_release_date.lte
     * @param {string} options.release_date.gte
     * @param {string} options.release_date.lte
     * @param {number} options.with_release_type
     * @param {number} options.year
     * @param {number} options.vote_average.gte
     * @param {number} options.vote_average.lte
     * @param {number} options.vote_count.gte
     * @param {number} options.vote_count.lte
     * @param {string} options.with_cast
     * @param {string} options.with_crew
     * @param {string} options.with_people
     * @param {string} options.with_companies
     * @param {string} options.with_genres
     * @param {string} options.without_genres
     * @param {string} options.with_keywords
     * @param {string} options.without_keywords
     * @param {number} options.with_runtime.gte
     * @param {number} options.with_runtime.lte
     * @param {string} options.with_original_language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieDiscover(options) {
      return this.getV3("discover/movie", {
        ...this.metas(["api_key", "language", "region"]),
        ...options
      });
    },

    /**
     * Discover TV shows by different types of data like
     * average rating, number of votes, genres, the network
     * they aired on and air dates.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {('vote_average.desc'|'vote_average.asc'|'first_air_date.desc'|'first_air_date.asc'|'popularity.desc'|'popularity.asc')} options.sort_by
     * @param {string} options.air_date.gte
     * @param {string} options.air_date.lte
     * @param {string} options.first_air_date.gte
     * @param {string} options.first_air_date.lte
     * @param {number} options.first_air_date_year
     * @param {number} options.page
     * @param {string} options.timezone
     * @param {number} options.vote_average.gte
     * @param {number} options.vote_count.gte
     * @param {string} options.with_genres
     * @param {string} options.with_networks
     * @param {string} options.without_genres
     * @param {number} options.with_runtime.gte
     * @param {number} options.with_runtime.lte
     * @param {boolean} options.include_null_first_air_dates
     * @param {string} options.with_original_language
     * @param {string} options.without_keywords
     * @param {boolean} options.screened_theatrically
     * @param {string} options.with_companies
     * @param {string} options.with_keywords
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvDiscover(options) {
      return this.getV3("discover/tv", {
        ...this.metas(["api_key", "language", "region", "timezone"]),
        ...options
      });
    }
  };

  // FIND V3
  var Find = {
    /**
     * The find method makes it easy to search for objects in
     * our database by an external id. For example, an IMDB ID.
     * @param {string} external_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {('imdb_id'|'freebase_mid'|'freebase_id'|'tvdb_id'|'tvrage_id'|'facebook_id'|'twitter_id'|'instagram_id')} options.external_source
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    findById(external_id, options) {
      return this.getV3(`find/${external_id}`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // GENRES V3
  var Genres = {
    /**
     * Get the list of official genres for movies.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieGenres(options) {
      return this.getV3("genre/movie/list", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the list of official genres for TV shows.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvGenres(options) {
      return this.getV3("genre/tv/list", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // GUEST SESSIONS V3
  var GuestSession = {
    /**
     * Get the rated movies for a guest session.
     * @param {string} guest_session_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getGuestRatedMovies(guest_session_id, options) {
      return this.getV3(`guest_session/${guest_session_id}/rated/movies`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the rated TV shows for a guest session.
     * @param {string} guest_session_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getGuestRatedTv(guest_session_id, options) {
      return this.getV3(`guest_session/${guest_session_id}/rated/tv`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the rated TV episodes for a guest session.
     * @param {string} guest_session_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getGuestRatedTvEpisodes(guest_session_id, options) {
      return this.getV3(`guest_session/${guest_session_id}/rated/tv/episodes`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // KEYWORDS V3
  var Keywords = {
    /**
     * Get Details
     * @param {string} keyword_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getKeyword(keyword_id, options) {
      return this.getV3(`keyword/${keyword_id}`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the movies that belong to a keyword.
     * @param {string} keyword_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {boolean} options.include_adult - Choose whether to inlcude adult (pornography) content in the results.
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getKeywordMovies(keyword_id, options) {
      return this.getV3(`keyword/${keyword_id}/movies`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // LISTS V3
  var ListsV3 = {
    /**
     * Get the details of a list.
     * @param {string|number} list_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getList(list_id, options) {
      return this.getV3(`list/${list_id}`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * You can use this method to check if a movie has already
     * been added to the list.
     * @param {string|number} list_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.movie_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    checkListItem(list_id, options) {
      return this.getV3(`list/${list_id}/item_status`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Create a list.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {Object} body
     * @param {string} body.name
     * @param {string} body.description
     * @param {string} body.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createList(options, body) {
      return this.postV3(
        "list",
        {
          ...this.metas(["api_key", "session_id"]),
          ...options
        },
        body
      );
    },

    /**
     * Add a movie to a list.
     * @param {string|number} list_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {Object} body
     * @param {number} body.media_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    addMovieToList(list_id, options, body) {
      return this.postV3(
        `list/${list_id}/add_item`,
        {
          ...this.metas(["api_key", "session_id"]),
          ...options
        },
        body
      );
    },

    /**
     * Remove a movie from a list.
     * @param {string} list_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {Object} body
     * @param {number} body.media_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    removeMovieFromList(list_id, options, body) {
      return this.postV3(
        `list/${list_id}/remove_item`,
        {
          ...this.metas(["api_key", "session_id"]),
          ...options
        },
        body
      );
    },

    /**
     * Clear all of the items from a list.
     * @param {string} list_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {boolean} options.confirm - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    clearList(list_id, options) {
      return this.postV3(`list/${list_id}/clear`, {
        ...this.metas(["api_key", "session_id"]),
        ...options
      });
    },

    /**
     * Delete a list.
     * @param {string} list_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    deleteList(list_id, options) {
      return this.postV3(
        `list/${list_id}`,
        {
          ...this.metas(["api_key", "session_id"]),
          ...options
        },
        {},
        "DELETE"
      );
    }
  };

  // LISTS V4
  var ListsV4 = {
    /**
     * This method will retrieve a list by id
     * @param {string} list_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id - Required
     * @param {('created_at.asc'|'created_at.desc')} options.sort_by
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4List(list_id, options) {
      return this.getV4(`list/${list_id}`, options);
    },

    /**
     * This method will create a new list.
     * @param {Object} body
     * @param {string} body.name - Required
     * @param {string} body.iso_639_1 - Required
     * @param {string} body.description
     * @param {boolean} body.public
     * @param {string} body.iso_3166_1
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    createV4List(body) {
      return this.postV4("list", body);
    },

    /**
     * This method will let you update the details of a list.
     * @param {string} list_id
     * @param {Object} body
     * @param {string} body.name - Required
     * @param {string} body.description
     * @param {boolean} body.public
     * @param {('original_order.asc'|'original_order.desc'|'vote_average.asc'|'vote_average.desc'|'primary_release_date.asc'|'primary_release_date.desc'|'title.asc'|'title.desc')} body.sort_by
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    updateV4List(list_id, body) {
      return this.postV4(`list/${list_id}`, body, "PUT");
    },

    /**
     * This method lets you clear all of the items from a list
     * in a single request. This action cannot be reversed so
     * use it with caution.
     * @param {string} list_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    clearV4List(list_id) {
      return this.getV4(`list/${list_id}/clear`);
    },

    /**
     * This method will delete a list by id. This action is
     * not reversible so take care when issuing it.
     * @param {string} list_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    removeV4List(list_id) {
      return this.postV4(`list/${list_id}`, {}, "DELETE");
    },

    /**
     * This method will let you add items to a list. We
     * support essentially an unlimited number of items to be
     * posted at a time. Both movie and TV series are support.
     * @param {string} list_id
     * @param {Object} body
     * @param {array[]} body.items - Required
     * @param {string} body.items[].media_type - Required
     * @param {number} body.items[].media_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    addItemsToV4List(list_id, body) {
      return this.postV4(`list/${list_id}/items`, body);
    },

    /**
     * This method will let you update an individual item on a
     * list. Currently, only adding a comment is suported.
     * @param {string} list_id
     * @param {Object} body
     * @param {array[]} body.items - Required
     * @param {string} body.items[].media_type - Required
     * @param {number} body.items[].media_id - Required
     * @param {string} body.items[].comment - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    updateV4ListItems(list_id, body) {
      return this.postV4(`list/${list_id}/items`, body, "PUT");
    },

    /**
     * This method will let you remove items from a list. You
     * can remove multiple items at a time.
     * @param {string} list_id
     * @param {Object} body
     * @param {array[]} body.items - Required
     * @param {string} body.items[].media_type - Required
     * @param {number} body.items[].media_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    removeV4ListItems(list_id, body) {
      return this.postV4(`list/${list_id}/items`, body, "DELETE");
    },

    /**
     * This method lets you quickly check if the item is
     * already added to the list.
     * @param {string} list_id
     * @param {Object} options
     * @param {string} options.media_type - Required
     * @param {number} options.media_id - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    checkV4ListItem(list_id, options) {
      return this.getV4(`list/${list_id}/item_status`, options);
    }
  };

  // MOVIES V3
  var Movies = {
    /**
     * Get the primary information about a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id
     * @param {string} options.guest_session_id
     * @param {string} options.append_to_response - Example: 'account_states,alternative_titles,changes,credits,external_ids,images,keywords,release_dates,videos,translations,recommendations,similar,reviews,lists'
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovie(movie_id, options) {
      return this.getV3(`movie/${movie_id}`, {
        ...this.metas(["api_key", "language", "session_id", "guest_session_id"]),
        ...options
      });
    },

    /**
     * Grab the following account states for a session
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {string} options.guest_session_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieAccountStates(movie_id, options) {
      return this.getV3(`movie/${movie_id}/account_states`, {
        ...this.metas(["api_key", "session_id", "guest_session_id"]),
        ...options
      });
    },

    /**
     * Get all of the alternative titles for a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.country
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieAlternativeTitles(movie_id, options) {
      return this.getV3(`movie/${movie_id}/alternative_titles`, {
        ...this.metas(["api_key", "country"]),
        ...options
      });
    },

    /**
     * Get the changes for a movie. By default only the last
     * 24 hours are returned.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.start_date
     * @param {string} options.end_date
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieChanges(movie_id, options) {
      return this.getV3(`movie/${movie_id}/changes`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the cast and crew for a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieCredits(movie_id, options) {
      return this.getV3(`movie/${movie_id}/credits`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the external ids for a movie. We currently support
     * the following external sources.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieExternalIds(movie_id, options) {
      return this.getV3(`movie/${movie_id}/external_ids`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the images that belong to a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieImages(movie_id, options) {
      return this.getV3(`movie/${movie_id}/images`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the keywords that have been added to a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieKeywords(movie_id, options) {
      return this.getV3(`movie/${movie_id}/keywords`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the release date along with the certification for
     * a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieReleaseDates(movie_id, options) {
      return this.getV3(`movie/${movie_id}/release_dates`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the videos that have been added to a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieVideos(movie_id, options) {
      return this.getV3(`movie/${movie_id}/videos`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of translations that have been created for
     * a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieTranslations(movie_id, options) {
      return this.getV3(`movie/${movie_id}/translations`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get a list of recommended movies for a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieRecommendations(movie_id, options) {
      return this.getV3(`movie/${movie_id}/recommendations`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of similar movies. This is not the same as
     * the "Recommendation" system you see on the website.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieSimilar(movie_id, options) {
      return this.getV3(`movie/${movie_id}/similar`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the user reviews for a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieReviews(movie_id, options) {
      return this.getV3(`movie/${movie_id}/reviews`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of lists that this movie belongs to.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getMovieLists(movie_id, options) {
      return this.getV3(`movie/${movie_id}/lists`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Rate a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {string} options.guest_session_id
     * @param {Object} body
     * @param {number} body.value - Required, min:0.5, max:10
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    rateMovie(movie_id, options, body) {
      return this.postV3(
        `movie/${movie_id}/rating`,
        {
          ...this.metas(["api_key", "session_id", "guest_session_id"]),
          ...options
        },
        body
      );
    },

    /**
     * Remove your rating for a movie.
     * @param {string} movie_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {string} options.guest_session_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    deleteMovieRating(movie_id, options) {
      return this.postV3(
        `movie/${movie_id}/rating`,
        {
          ...this.metas(["api_key", "session_id", "guest_session_id"]),
          ...options
        },
        {},
        "DELETE"
      );
    },

    /**
     * Get the most newly created movie. This is a live
     * response and will continuously change.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getLatestMovie(options) {
      return this.getV3("movie/latest", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of movies in theatres. This is a release
     * type query that looks for all movies that have a
     * release type of 2 or 3 within the specified date range.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.region
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getNowPlayingMovies(options) {
      return this.getV3("movie/now_playing", {
        ...this.metas(["api_key", "language", "region"]),
        ...options
      });
    },

    /**
     * Get a list of the current popular movies on TMDb. This
     * list updates daily.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.region
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPopularMovies(options) {
      return this.getV3("movie/popular", {
        ...this.metas(["api_key", "language", "region"]),
        ...options
      });
    },

    /**
     * Get the top rated movies on TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.region
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTopRatedMovies(options) {
      return this.getV3("movie/top_rated", {
        ...this.metas(["api_key", "language", "region"]),
        ...options
      });
    },

    /**
     * Get a list of upcoming movies in theatres. This is a
     * release type query that looks for all movies that have
     * a release type of 2 or 3 within the specified date
     * range.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.region
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getUpcomingMovies(options) {
      return this.getV3("movie/upcoming", {
        ...this.metas(["api_key", "language", "region"]),
        ...options
      });
    }
  };

  // NETWORKS V3
  var Networks = {
    /**
     * Get the details of a network.
     * @param {string} network_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getNetwork(network_id, options) {
      return this.getV3(`network/${network_id}`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the alternative names of a network.
     * @param {string} network_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getNetworkAlternativeNames(network_id, options) {
      return this.getV3(`network/${network_id}/alternative_names`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the TV network logos by id.
     * @param {string} network_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getNetworkImages(network_id, options) {
      return this.getV3(`network/${network_id}/images`, {
        ...this.metas(["api_key"]),
        ...options
      });
    }
  };

  // PEOPLE V3
  var People = {
    /**
     * Get the primary person details by id.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.append_to_response - Example: 'changes,movie_credits,tv_credits,combined_credits,external_ids,images,tagged_images,translations'
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPerson(person_id, options) {
      return this.getV3(`person/${person_id}`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the changes for a person. By default only the last
     * 24 hours are returned.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonChanges(person_id, options) {
      return this.getV3(`person/${person_id}/changes`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the movie credits for a person.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonMovieCredits(person_id, options) {
      return this.getV3(`person/${person_id}/movie_credits`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the TV show credits for a person.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonTvCredits(person_id, options) {
      return this.getV3(`person/${person_id}/tv_credits`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the movie and TV credits together in a single
     * response.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonCombinedCredits(person_id, options) {
      return this.getV3(`person/${person_id}/combined_credits`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the external ids for a person. We currently support
     * the following external sources.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonExternalIds(person_id, options) {
      return this.getV3(`person/${person_id}/external_ids`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the images for a person.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonImages(person_id, options) {
      return this.getV3(`person/${person_id}/images`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the images that this person has been tagged in.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonTaggedImages(person_id, options) {
      return this.getV3(`person/${person_id}/tagged_images`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of translations that have been created for
     * a person.
     * @param {number} person_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPersonTranslations(person_id, options) {
      return this.getV3(`person/${person_id}/translations`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the most newly created person. This is a live
     * response and will continuously change.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @memberof TheMovieDb
     */
    getLatestPerson(options) {
      return this.getV3("person/latest", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the list of popular people on TMDb. This list
     * updates daily.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPopularPersons(options) {
      return this.getV3("person/popular", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // REVIEWS V3
  var Reviews = {
    /**
     * Get Details
     * @param {number} review_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getReview(review_id, options) {
      return this.getV3(`review/${review_id}`, {
        ...this.metas(["api_key"]),
        ...options
      });
    }
  };

  // SEARCH V3
  var Search = {
    /**
     * Search for companies.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.query - Required
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    searchCompany(options) {
      return this.getV3("search/company", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Search for collections.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.query - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    searchCollection(options) {
      return this.getV3("search/collection", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Search for keywords.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.query - Required
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    searchKeyword(options) {
      return this.getV3("search/keyword", {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Search for movies.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.query - Required
     * @param {string} options.language
     * @param {number} options.page
     * @param {boolean} options.include_adult
     * @param {string} options.region
     * @param {number} options.year
     * @param {number} options.primary_release_year
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    searchMovie(options) {
      return this.getV3("search/movie", {
        ...this.metas(["api_key", "language", "region"]),
        ...options
      });
    },

    /**
     * Search multiple models in a single request. Multi
     * search currently supports searching for movies, tv
     * shows and people in a single request.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.query - Required
     * @param {string} options.language
     * @param {number} options.page
     * @param {boolean} options.include_adult
     * @param {string} options.region
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    searchMulti(options) {
      return this.getV3("search/multi", {
        ...this.metas(["api_key", "language", "region"]),
        ...options
      });
    },

    /**
     * Search for people.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.query - Required
     * @param {string} options.language
     * @param {number} options.page
     * @param {boolean} options.include_adult
     * @param {string} options.region
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    searchPerson(options) {
      return this.getV3("search/person", {
        ...this.metas(["api_key", "language", "region"]),
        ...options
      });
    },

    /**
     * Search for a TV show.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.query - Required
     * @param {string} options.language
     * @param {number} options.page
     * @param {number} options.first_air_date_year
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    searchTv(options) {
      return this.getV3("search/tv", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // TRENDING V3
  var Trending = {
    /**
     * Get the daily or weekly trending items. The daily
     * trending list tracks items over the period of a day
     * while items have a 24 hour half life. The weekly list
     * tracks items over a 7 day period, with a 7 day half
     * life.
     * @param {('all'|'movie'|'tv'|'person')} media_type
     * @param {('day'|'week')} time_window
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTrending(media_type, time_window, options) {
      return this.getV3(`trending/${media_type}/${time_window}`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // TV EPISODE GROUPS V3
  var TvEpisodeGroups = {
    /**
     * Get the details of a TV episode group. Groups support
     * 7 different types which are enumerated as the following
     * @param {string} id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisodeGroup(id, options) {
      return this.getV3(`tv/episode_group/${id}`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // TV EPISODES V3
  var TvEpisodes = {
    /**
     * Get the TV episode details by id.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id
     * @param {string} options.guest_session_id
     * @param {string} options.append_to_response - Example: 'changes,account_states,credits,external_ids,images,videos'
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisode(tv_id, season_number, episode_number, options) {
      return this.getV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}`,
        {
          ...this.metas(["api_key", "language", "session_id", "guest_session_id"]),
          ...options
        }
      );
    },

    /**
     * Get the changes for a TV episode. By default only the
     * last 24 hours are returned.
     * @param {string} episode_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisodeChanges(episode_id, options) {
      return this.getV3(`tv/episode/${episode_id}/changes`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get your rating for a episode.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {string} options.guest_session_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisodeAccountStates(tv_id, season_number, episode_number, options) {
      return this.getV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}/account_states`,
        {
          ...this.metas(["api_key", "session_id", "guest_session_id"]),
          ...options
        }
      );
    },

    /**
     * Get the credits (cast, crew and guest stars) for a TV
     * episode.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisodeCredits(tv_id, season_number, episode_number, options) {
      return this.getV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}/credits`,
        {
          ...this.metas(["api_key"]),
          ...options
        }
      );
    },

    /**
     * Get the external ids for a TV episode. We currently
     * support the following external sources.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisodeExternalIds(tv_id, season_number, episode_number, options) {
      return this.getV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}/external_ids`,
        {
          ...this.metas(["api_key"]),
          ...options
        }
      );
    },

    /**
     * Get the images that belong to a TV episode.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.include_image_language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisodeImages(tv_id, season_number, episode_number, options) {
      return this.getV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}/images`,
        {
          ...this.metas(["api_key", "language", "include_image_language"]),
          ...options
        }
      );
    },

    /**
     * Get the translation data for an episode.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisodeTranslations(tv_id, season_number, episode_number, options) {
      return this.getV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}/translations`,
        {
          ...this.metas(["api_key"]),
          ...options
        }
      );
    },

    /**
     * Rate a TV episode.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {string} options.guest_session_id
     * @param {Object} body
     * @param {number} body.value - Required, min:0.5, max:10
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    rateTvEpisode(tv_id, season_number, episode_number, options, body) {
      return this.postV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}/rating`,
        {
          ...this.metas(["api_key", "session_id", "guest_session_id"]),
          ...options
        },
        body
      );
    },

    /**
     * Remove your rating for a TV episode.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id
     * @param {string} options.guest_session_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    deleteTvEpisodeRating(tv_id, season_number, episode_number, options) {
      return this.postV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}/rating`,
        {
          ...this.metas(["api_key", "session_id", "guest_session_id"]),
          ...options
        },
        {},
        "DELETE"
      );
    },

    /**
     * Get the videos that have been added to a TV episode.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {number} episode_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvEpisodeVideos(tv_id, season_number, episode_number, options) {
      return this.getV3(
        `tv/${tv_id}/season/${season_number}/episode/${episode_number}/videos`,
        {
          ...this.metas(["api_key", "language"]),
          ...options
        }
      );
    }
  };

  // TV SEASONS V3
  var TvSeasons = {
    /**
     * Get the TV season details by id.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id
     * @param {string} options.guest_session_id
     * @param {string} options.append_to_response - Example: 'changes,account_states,credits,external_ids,images,videos'
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvSeason(tv_id, season_number, options) {
      return this.getV3(`tv/${tv_id}/season/${season_number}`, {
        ...this.metas(["api_key", "language", "session_id", "guest_session_id"]),
        ...options
      });
    },

    /**
     * Get the changes for a TV season. By default only the
     * last 24 hours are returned.
     * @param {number} season_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvSeasonChanges(season_id, options) {
      return this.getV3(`tv/season/${season_id}/changes`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Returns all of the user ratings for the season's
     * episodes.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id - Required
     * @param {string} options.guest_session_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvSeasonAccountStates(tv_id, season_number, options) {
      return this.getV3(`tv/${tv_id}/season/${season_number}/account_states`, {
        ...this.metas(["api_key", "language", "session_id", "guest_session_id"]),
        ...options
      });
    },

    /**
     * Get the credits for TV season.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvSeasonCredits(tv_id, season_number, options) {
      return this.getV3(`tv/${tv_id}/season/${season_number}/credits`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the external ids for a TV season. We currently
     * support the following external sources.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvSeasonExternalIds(tv_id, season_number, options) {
      return this.getV3(`tv/${tv_id}/season/${season_number}/external_ids`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the images that belong to a TV season.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.include_image_language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvSeasonImages(tv_id, season_number, options) {
      return this.getV3(`tv/${tv_id}/season/${season_number}/images`, {
        ...this.metas(["api_key", "language", "include_image_language"]),
        ...options
      });
    },

    /**
     * Get the videos that have been added to a TV season.
     * @param {number} tv_id
     * @param {number} season_number
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvSeasonVideos(tv_id, season_number, options) {
      return this.getV3(`tv/${tv_id}/season/${season_number}/videos`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  // TVS V3
  var TvShows = {
    /**
     * Get the primary TV show details by id.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id
     * @param {string} options.guest_session_id
     * @param {string} options.append_to_response - Example: 'account_states,alternative_titles,changes,content_ratings,credits,episode_groups,external_ids,images,keywords,recommendations,reviews,screened_theatrically,similar,translations,videos'
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShow(tv_id, options) {
      return this.getV3(`tv/${tv_id}`, {
        ...this.metas(["api_key", "language", "session_id", "guest_session_id"]),
        ...options
      });
    },

    /**
     * Grab the following account states for a session:
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.session_id
     * @param {string} options.guest_session_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowAccountStates(tv_id, options) {
      return this.getV3(`tv/${tv_id}/account_states`, {
        ...this.metas(["api_key", "language", "session_id", "guest_session_id"]),
        ...options
      });
    },

    /**
     * Returns all of the alternative titles for a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowAlternativeTitles(tv_id, options) {
      return this.getV3(`tv/${tv_id}/alternative_titles`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the changes for a TV show. By default only the last
     * 24 hours are returned.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowChanges(tv_id, options) {
      return this.getV3(`tv/${tv_id}/changes`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the list of content ratings (certifications) that
     * have been added to a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowContentRatings(tv_id, options) {
      return this.getV3(`tv/${tv_id}/content_ratings`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the credits (cast and crew) that have been added
     * to a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowCredits(tv_id, options) {
      return this.getV3(`tv/${tv_id}/credits`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get all of the episode groups that have been created
     * for a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowEpisodeGroups(tv_id, options) {
      return this.getV3(`tv/${tv_id}/episode_groups`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the external ids for a TV show. We currently
     * support the following external sources.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowExternalIds(tv_id, options) {
      return this.getV3(`tv/${tv_id}/external_ids`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the images that belong to a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {string} options.include_image_language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowImages(tv_id, options) {
      return this.getV3(`tv/${tv_id}/images`, {
        ...this.metas(["api_key", "language", "include_image_language"]),
        ...options
      });
    },

    /**
     * Get the keywords that have been added to a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowKeywords(tv_id, options) {
      return this.getV3(`tv/${tv_id}/keywords`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the list of TV show recommendations for this item.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowRecommendations(tv_id, options) {
      return this.getV3(`tv/${tv_id}/recommendations`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get the reviews for a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowReviews(tv_id, options) {
      return this.getV3(`tv/${tv_id}/reviews`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of seasons or episodes that have been
     * screened in a film festival or theatre.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowScreenedTheatrically(tv_id, options) {
      return this.getV3(`tv/${tv_id}/screened_theatrically`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get a list of similar TV shows. These items are
     * assembled by looking at keywords and genres.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowSimilar(tv_id, options) {
      return this.getV3(`tv/${tv_id}/similar`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of the translations that exist for a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowTranslations(tv_id, options) {
      return this.getV3(`tv/${tv_id}/translations`, {
        ...this.metas(["api_key"]),
        ...options
      });
    },

    /**
     * Get the videos that have been added to a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTvShowVideos(tv_id, options) {
      return this.getV3(`tv/${tv_id}/videos`, {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Rate a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id
     * @param {string} options.guest_session_id
     * @param {Object} body
     * @param {number} body.value - Required, min:0.5, max:10
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    rateTvShow(tv_id, options, body) {
      return this.postV3(
        `tv/${tv_id}/rating`,
        {
          ...this.metas(["api_key", "session_id", "guest_session_id"]),
          ...options
        },
        body
      );
    },

    /**
     * Remove your rating for a TV show.
     * @param {number} tv_id
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.session_id
     * @param {string} options.guest_session_id
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    deleteTvShowRating(tv_id, options) {
      return this.postV3(
        `tv/${tv_id}/rating`,
        {
          ...this.metas(["api_key", "session_id", "guest_session_id"]),
          ...options
        },
        {},
        "DELETE"
      );
    },

    /**
     * Get the most newly created TV show. This is a live
     * response and will continuously change.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getLatestTvShow(options) {
      return this.getV3("tv/latest", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of TV shows that are airing today. This
     * query is purely day based as we do not currently
     * support airing times.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getAiringTodayTvShows(options) {
      return this.getV3("tv/airing_today", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of shows that are currently on the air.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getOnTheAirTvShows(options) {
      return this.getV3("tv/on_the_air", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of the current popular TV shows on TMDb.
     * This list updates daily.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getPopularTvShows(options) {
      return this.getV3("tv/popular", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    },

    /**
     * Get a list of the top rated TV shows on TMDb.
     * @param {Object} options
     * @param {string} options.api_key - Required
     * @param {string} options.language
     * @param {number} options.page
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getTopRatedTvShows(options) {
      return this.getV3("tv/top_rated", {
        ...this.metas(["api_key", "language"]),
        ...options
      });
    }
  };

  /**
   * Check if the given value is an object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
   */
  function isObject(value) {
    return typeof value === "object" && value !== null;
  }

  /**
   * Extend the given object.
   * @param {*} obj - The object to be extended.
   * @param {*} args - The rest objects which will be merged to the first object.
   * @returns {Object} The extended object.
   */
  const assign =
    Object.assign ||
    function assign(obj, ...args) {
      if (isObject(obj) && args.length > 0) {
        args.forEach(arg => {
          if (isObject(arg)) {
            Object.keys(arg).forEach(key => {
              obj[key] = arg[key];
            });
          }
        });
      }

      return obj;
    };

  /**
   * Create oAuth modal window
   *
   * @param {string} url - Required
   * @param {string} [name="Authorization"]
   * @param {number} [width=500]
   * @param {number} [height=600]
   * @param {number} [left=0]
   * @param {number} [top=0]
   * @returns {Window}
   */
  const createOauthWindow = (
    url,
    name = "Authorization",
    width = 500,
    height = 600,
    left = 0,
    top = 0
  ) => {
    if (url == null) return null;
    const options = `width=${width},height=${height},left=${left},top=${top}`;
    return window.open(url, name, options);
  };

  class TheMovieDb {
    /**
     * Creates an instance of TheMovieDb.
     * @param {string} api_key
     * @param {string} api_token
     * @param {string} session_id
     * @param {string} access_token
     * @param {string} v3_account
     * @param {string} v4_account
     * @param {string} language
     * @param {string} country
     */
    constructor(
      api_key,
      api_token,
      session_id,
      access_token,
      v3_account,
      v4_account,
      language,
      country
    ) {
      this.api_key = api_key;
      this.api_token = api_token;
      this.base_uri = "https://api.themoviedb.org/";
      this.images_uri = "https://image.tmdb.org/t/p/";
      this.session_id = session_id;
      this.access_token = access_token;
      this.v3_account = v3_account;
      this.v4_account = v4_account;
      this.language = language || {
        iso_639_1: navigator.language || navigator.userLanguage || "uk",
        english_name: "",
        name: ""
      };
      this.country = country || { iso_3166_1: "UA", english_name: "", name: "" };
      this.cachePolicy = "default"; // default|no-store|reload|no-cache|force-cache|only-if-cached
    }

    /**
     * Make GET parameters
     * @param {string} startUrl
     * @param {Object} [options={}]
     * @returns {URL}
     * @memberof TheMovieDb
     */
    query(startUrl, options = {}) {
      let url = new URL(startUrl);
      if (options.cache !== undefined && options.cache !== null) {
        delete options.cache;
      }
      Object.keys(options).forEach(key => {
        if (options[key] !== null) {
          url.searchParams.append(key, options[key]);
        }
      });

      return url;
    }

    /**
     * Get default values
     * @param {Object} options
     * @returns {Object}
     * @memberof TheMovieDb
     */
    metas(options) {
      var parameters = {};
      options.map(opt => {
        switch (opt) {
          case "api_key":
            parameters.api_key = this.api_key;
            break;
          case "language":
            parameters.language = this.language.iso_639_1;
            break;
          case "region":
            parameters.region = this.country.iso_3166_1;
            break;
          case "country":
            parameters.country = this.country.iso_3166_1;
            break;
          case "session_id":
            parameters.session_id = this.session_id;
            break;
          case "guest_session_id":
            parameters.guest_session_id = this.guest_session_id;
            break;
          case "include_image_language":
            parameters.include_image_language = this.language.iso_639_1;
            break;
        }
        return 0;
      });
      return parameters;
    }

    /**
     * Get method
     * @param {string} url
     * @param {Object} [options={}] - GET parameters
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV3(url, options = {}) {
      const cache = options.cache || this.cachePolicy;

      return fetch(this.query(`${this.base_uri}3/${url}`, options), {
        cache: cache
      }).then(res =>
        res.json()
      );
    }

    /**
     * Post method
     * @param {string} url
     * @param {Object} [options={}] - GET parameters
     * @param {Object} [body={}] - POST parameters
     * @param {string} [method="POST"]
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    postV3(url, options = {}, body = {}, method = "POST") {
      return fetch(this.query(`${this.base_uri}3/${url}`, options), {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }).then(res => res.json());
    }

    /**
     * Get method
     * @param {string} url
     * @param {Object} [options={}] - GET parameters
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    getV4(url, options = {}) {
      const cache = options.cache || this.cachePolicy;
      return fetch(this.query(`${this.base_uri}4/${url}`, options), {
        cache: cache,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + (this.access_token || this.api_token)
        }
      }).then(res => res.json());
    }

    /**
     * Post method
     * @param {string} url
     * @param {Object} [body={}] - POST parameters
     * @param {string} [method="POST"] - Method name
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    postV4(url, body = {}, method = "POST") {
      return fetch(`${this.base_uri}4/${url}`, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + (this.access_token || this.api_token)
        },
        body: JSON.stringify(body)
      }).then(res => res.json());
    }

    // ADDITION METHODS FOR AUTHENTICATION

    /**
     * oAuth
     * @param {string} [windowTitle="OAuth V4 login"]
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    oAuthV4(windowTitle = "OAuth V4 login") {
      return this.createAuthRequestToken().then(data => {
        return new Promise((resolve, reject) => {
          let windowHandle = createOauthWindow(
            `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`,
            windowTitle
          );
          let intervalId = null;
          let loopCount = 100;
          let intervalLength = 1000;

          intervalId = window.setInterval(() => {
            if (loopCount-- < 0 || !windowHandle.opener) {
              window.clearInterval(intervalId);
              windowHandle.close();
              reject(data);
            } else {
              this.createAuthAccessToken({
                request_token: data.request_token
              }).then(data => {
                if (data.success === true) {
                  this.access_token = data.access_token;
                  this.v4_account = { id: data.account_id };

                  window.clearInterval(intervalId);
                  windowHandle.close();
                  return resolve(data);
                }
              });
            }
          }, intervalLength);
          windowHandle.onclose = () => window.clearInterval(intervalId);
        });
      });
    }

    /**
     * oAuth
     * @param {string} [windowTitle="OAuth V3 login"]
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    oAuth(windowTitle = "OAuth V3 login") {
      return this.createRequestToken().then(data => {
        return new Promise((resolve, reject) => {
          let windowHandle = createOauthWindow(
            `https://www.themoviedb.org/authenticate/${data.request_token}`,
            windowTitle
          );
          let intervalId = null;
          let loopCount = 100;
          let intervalLength = 1000;

          intervalId = window.setInterval(() => {
            if (loopCount-- < 0 || !windowHandle.opener) {
              window.clearInterval(intervalId);
              windowHandle.close();
              reject(data);
            } else {
              this.createSession(
                {},
                {
                  request_token: data.request_token
                }
              ).then(data => {
                if (data.success === true) {
                  this.session_id = data.session_id;

                  window.clearInterval(intervalId);
                  windowHandle.close();
                  return resolve(data);
                }
              });
            }
          }, intervalLength);
          windowHandle.onclose = () => window.clearInterval(intervalId);
        });
      });
    }

    /**
     * Logout
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    logoutV4() {
      return this.deleteAuthAccessToken({
        access_token: this.access_token
      }).then(data => {
        localStorage.removeItem("tmdb_access_token");
        this.access_token = null;
        return Promise.resolve(data);
      });
    }

    /**
     * Logout
     * @returns {Promise}
     * @memberof TheMovieDb
     */
    logout() {
      return this.deleteSession(
        {},
        {
          session_id: this.session_id
        }
      ).then(data => {
        localStorage.removeItem("tmdb_session_id");
        this.session_id = null;
        return Promise.resolve(data);
      });
    }
  }

  assign(
    TheMovieDb.prototype,
    AccountV3,
    AccountV4,
    AuthenticationV4,
    AuthenticationV3,
    Certifications,
    Changes,
    Collections,
    Companies,
    Configurations,
    Credits,
    Discover,
    Find,
    Genres,
    GuestSession,
    Keywords,
    ListsV3,
    ListsV4,
    Movies,
    Networks,
    People,
    Reviews,
    Search,
    Trending,
    TvEpisodeGroups,
    TvEpisodes,
    TvSeasons,
    TvShows
  );

  return TheMovieDb;

})));
//# sourceMappingURL=the-movie-db.umd.js.map
