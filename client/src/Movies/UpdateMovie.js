import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const initialState = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars:[]
}

const UpdateMovie = (props) => {
  const [formValues, setFormValues] = useState(initialState)
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log('movie info for update: ', res)
        setFormValues(res.data)
      })
      .catch(err =>
        console.log(err))
  },[])

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then(res => {
        props.setMovieList(props.movieList.map(movie => {
          if (movie.id === res.data.id) {
            return res.data;
          } else {
            return movie;
          }
        }))
        history.push('/')
        // console.log('put success: ', res)
      })
      .catch(err => {
        console.log('put error', err)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='title'>Title 
        <input 
          type='text'
          name='title'
          id='title'
          placeholder='Title'
          value={formValues.title}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor='director'>Director 
        <input 
          type='text'
          name='director'
          id='director'
          placeholder='Director'
          value={formValues.director}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor='metascore'>MetaScore 
        <input 
          type='number'
          name='metascore'
          id='metascore'
          placeholder='MetaScore'
          value={formValues.metascore}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor='stars'>Stars 
        <input 
          type='text'
          name='stars'
          id='stars'
          placeholder='Stars'
          value={JSON.stringify(formValues.stars)}
          onChange={handleChange}
          spellCheck='false'
          disabled={true}
        />
      </label>
      <br />
      <button>Update this movie!</button>
    </form>
  )
}

export default UpdateMovie