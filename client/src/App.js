import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const history = useHistory();
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);
  
  const removeMovie = id => {
    // console.log('from remove movie: ', id)
    setMovieList(
      movieList.filter(movie => {
        console.log('the id to remove: ', id)
        console.log('this movie\'s id :', movie.id)
        return movie.id !== id;
      })
    )
    console.log('at the end of remove: ', movieList)
    // history.push('/')
  }

  console.log(movieList)
  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} removeMovie={removeMovie}/>
      </Route>
      <Route path='/update-movie/:id'>
        <UpdateMovie setMovieList={setMovieList} movieList={movieList}/>
      </Route>
    </>
  );
};

export default App;
