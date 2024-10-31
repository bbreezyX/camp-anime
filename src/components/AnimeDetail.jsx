import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}`)
      .then(response => {
        setAnime(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching anime detail:", error);
      });
  }, [id]);

  if (!anime) return <p>Loading...</p>;

  return (
    <div className="container mt-5 anime-detail">
      <h2>{anime.title}</h2>
      {anime.images?.jpg?.image_url && (
        <img src={anime.images.jpg.image_url} alt={anime.title} className="img-fluid mb-4" />
      )}
      <p><strong>Score:</strong> {anime.score || "N/A"}</p>
      <p><strong>Type:</strong> {anime.type}</p>
      <p><strong>Episodes:</strong> {anime.episodes}</p>
      <p><strong>Status:</strong> {anime.status}</p>
      <p><strong>Aired Date:</strong> {anime.aired?.string}</p>
      <p><strong>Genres:</strong> {anime.genres?.map(genre => genre.name).join(', ')}</p>
      <p><strong>Studio:</strong> {anime.studios?.map(studio => studio.name).join(', ')}</p>
      <p><strong>Synopsis:</strong> {anime.synopsis}</p>
      <Link to="/" className="btn btn-secondary">Back to List</Link>
    </div>
  );
};

export default AnimeDetail;
