import React, { useEffect, useRef } from 'react';
import './MovieSlider.css';

const movies = [
  { 
    id: "tt0111161", 
    type: 'video', 
    url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', 
    title: 'Action Movie Preview' 
  },
  { 
    id: "tt1375666", 
    type: 'image', 
    url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000', 
    title: 'Inception' 
  },
  { 
    id: "tt0468569", 
    type: 'video', 
    url: 'https://www.w3schools.com/html/movie.mp4', 
    title: 'The Dark Knight' 
  },
  { 
    id: "tt0137523", 
    type: 'image', 
    url: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000', 
    title: 'Fight Club' 
  },
  { 
    id: "tt0120737", 
    type: 'video', 
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', 
    title: 'Lord of the Rings' 
  },
  {
    "id": "tt15327232",
    "title": "Oppenheimer",
    "url": "https://www.w3schools.com/html/mov_bbb.mp4",
    "poster": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt1160419",
    "title": "Dune: Part Two",
    "url": "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    "poster": "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt0468569",
    "title": "The Dark Knight",
    "url": "https://www.w3schools.com/html/movie.mp4",
    "poster": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt1375666",
    "title": "Inception",
    "url": "https://www.w3schools.com/html/mov_bbb.mp4",
    "poster": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt0133093",
    "title": "The Matrix",
    "url": "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    "poster": "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt0816692",
    "title": "Interstellar",
    "url": "https://www.w3schools.com/html/movie.mp4",
    "poster": "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt2012602",
    "title": "Spider-Verse",
    "url": "https://www.w3schools.com/html/mov_bbb.mp4",
    "poster": "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt9389998",
    "title": "Fast X",
    "url": "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
    "poster": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt6718170",
    "title": "The Super Mario Bros",
    "url": "https://www.w3schools.com/html/movie.mp4",
    "poster": "https://images.unsplash.com/photo-1566334108914-508544d6232d?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt2906272",
    "title": "John Wick 4",
    "url": "https://www.w3schools.com/html/mov_bbb.mp4",
    "poster": "https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=1000",
    "type": "video"
  }
  ,
  {
    "id": "tt1630029",
    "title": "Avatar: The Way of Water",
    "url": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "poster": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt1877830",
    "title": "The Batman",
    "url": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt22022452",
    "title": "Gladiator II",
    "url": "https://media.w3.org/2010/05/sintel/trailer.mp4",
    "poster": "https://images.unsplash.com/photo-1599739291060-4578e77dac5d?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt1517268",
    "title": "Barbie",
    "url": "https://www.w3schools.com/html/movie.mp4",
    "poster": "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt0087182",
    "title": "Dune (1984)",
    "url": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt11198168",
    "title": "Top Gun: Maverick",
    "url": "https://media.w3.org/2010/05/sintel/trailer.mp4",
    "poster": "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt14624348",
    "title": "The Creator",
    "url": "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "poster": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt0167260",
    "title": "Lord of the Rings: Return of the King",
    "url": "https://www.w3schools.com/html/mov_bbb.mp4",
    "poster": "https://images.unsplash.com/photo-1464802686167-b939a67a06f1?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt3581920",
    "title": "The Last of Us",
    "url": "https://media.w3.org/2010/05/sintel/trailer.mp4",
    "poster": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000",
    "type": "video"
  },
  {
    "id": "tt0068646",
    "title": "The Godfather",
    "url": "https://vjs.zencdn.net/v/oceans.mp4",
    "poster": "https://images.unsplash.com/photo-1485646327022-b27bf52d386e?q=80&w=1000",
    "type": "video"
  }

  
];

const MovieSlider = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    
    // Fonction pour le défilement automatique
    const autoScroll = setInterval(() => {
      if (scrollContainer) {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        
        if (scrollContainer.scrollLeft >= maxScroll - 10) {
          // Retour au début si on est à la fin
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Sinon, avance de la largeur d'un élément
          scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 4000); // Défilement toutes les 4 secondes

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="slider-container">
      <h2 className="slider-title">Nouveautés & Films d'Action</h2>
      <div className="scroll-wrapper" ref={scrollRef}>
        {movies.map((movie) => (
          <div key={movie.id} className="scroll-item">
            {movie.type === 'image' ? (
              <img src={movie.url} alt={movie.title} className="media-content" />
            ) : (
              <video 
                src={movie.url} 
                className="media-content" 
                autoPlay 
                muted 
                loop 
                playsInline
              />
            )}
            <div className="media-info">
              <span className="movie-id">ID: {movie.id}</span>
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;