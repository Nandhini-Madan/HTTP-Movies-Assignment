import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import MovieList from "./MovieList";

const initialMovie = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateMovie = (props) => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setMovie(res.data);

            })
            .catch((err) => console.log(err));
    }, [id]);

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        //Put request for editting
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                console.log("resu",res.data)
                props.setMovie(res.data);
             //  props.setMovieList(res.data);
                push(`/movies/${id}`);

            })
            .catch((err) => {
                console.log(err);
            });

    };
    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="name"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={movie.stars}
                />
                <div className="baseline" />

               

                <button className="update-button">Update</button>
            </form>
        </div>
    )
}
export default UpdateMovie;