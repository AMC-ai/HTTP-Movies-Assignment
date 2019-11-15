
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie =
{
    title: '',
    director: '',
    metascore: '',
    stars: ['']
}

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialMovie)

    const getMovies = id => {
        axios
            .get('http://localhost:5000/api/movies/${id}')
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getMovies(props.match.params.id)
    }, [props.match.params.id]);

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put('http://localhost:5000/api/movies/${movie.id}', movie)
            .then(res => {
                props.history.push('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>


                <input type='text'
                    name='title'
                    placeholder='Title'
                    value={movie.title}
                    onChange={handleChange} />

                <input type='text'
                    name='director'
                    placeholder='Director'
                    value={movie.director}
                    onChange={handleChange} />

                <input type='number'
                    name='metascore'
                    placeholder='Metascore'
                    value={movie.metascore}
                    onChange={handleChange} />

                <input type='text'
                    name='star'
                    placeholder='Star(s)'
                    value={movie.stars}
                    onChange={handleChange} />

                <button type="submit">Update</button>


            </form>
        </>
    )

}

export default UpdateMovieForm;