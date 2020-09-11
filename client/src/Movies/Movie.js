import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  const deleteMovie =(e)=>{
    e.preventDefault();
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then((res)=>{
      //setting result data to movie
      setMovie(res.data);
      push(`/movies`)
    })
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="flex">
      <div className="update-button" onClick={() => push(`/update-movie/${movie.id}`)}>Update</div> 
    
      <div className="update-button" onClick={deleteMovie}> DElete</div>
      </div>
     
     
    </div>
  );
}

export default Movie;
