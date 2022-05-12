import React, { Component } from "react";
import MovieList from "./components/MovieList";
import SearchBox from "./components/SearchBox";
import FilterBox from './components/FilterBox'

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      favourites: [],
      searchValue: "",
      filterValue: ""
    };
  }

  // called once on mount
  componentDidMount() {
    this.fetchMovies();

    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      this.setState({ favourites: movieFavourites });
    }
  }

  // called on each state or props change
  componentDidUpdate(prevProps, prevState) {
    if ((prevState.searchValue !== this.state.searchValue) || (prevState.filterValue !== this.state.filterValue)) {
      this.fetchMovies();
    }
  }

  fetchMovies = () => {
    const url = `https://www.omdbapi.com?s=${this.state.searchValue}&type=${this.state.filterValue}&apikey=bf3b1333`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) this.setState({ movies: data.Search });
      });
  };

  setSearchValue = (value) => {
    this.setState({ searchValue: value });
  };

  addFavouriteMovie = (movie) => {
    const newFavouriteList = [...this.state.favourites, movie];
    this.setState({ favourites: newFavouriteList });

    // this.setState((prevState) => {
    //   return {
    //     favourites: [...prevState.favourites, movie]
    //   }
    // })

    this.saveToLocalStorage(newFavouriteList);
  };

  saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  removeFavouriteMovie = (movie) => {
    const newFavouriteList = this.state.favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    this.setState({ favourites: newFavouriteList });
    this.saveToLocalStorage(newFavouriteList);
  };

  setFilterValue = (value) => {
    this.setState({filterValue: value})
  } 

  render() {
    return (
      <div className="container">
        <h3>Movies App</h3>

        <div className="row">
          <SearchBox setSearchValue={this.setSearchValue} />
        </div>
        <FilterBox 
          setFilterValue={this.setFilterValue}
        />

        <div className="row">
          <MovieList
            movies={this.state.movies}
            btnText="Add to favorites"
            btnClass="btn-success"
            handleFavouritesClick={this.addFavouriteMovie}
          />
        </div>

        <h3>My Favourites</h3>

        <div className="row">
          <MovieList
            movies={this.state.favourites}
            btnText="Remove from favourites"
            btnClass="btn-danger"
            handleFavouritesClick={this.removeFavouriteMovie}
          />
        </div>
      </div>
    );
  }
}

export default App;
