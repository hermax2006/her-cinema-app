import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const heroMovies = [
  { id: "tt1856101", title: "Blade Runner 2049", url: "https://static.videezy.com/system/resources/previews/000/005/030/original/abstract_06.mp4", poster: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1920", type: "hero" },
  { id: "tt1392190", title: "Mad Max: Fury Road", url: "https://static.videezy.com/system/resources/previews/000/004/198/original/dusty_road_loop.mp4", poster: "https://images.unsplash.com/photo-1533106958148-daea7670250b?q=80&w=1920", type: "hero" },
  {
    "id": "tt1856101",
    "title": "Blade Runner 2049",
    "url": "https://static.videezy.com/system/resources/previews/000/005/030/original/abstract_06.mp4",
    "poster": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1920",
    "type": "hero"
  },
  {
    "id": "tt1392190",
    "title": "Mad Max: Fury Road",
    "url": "https://static.videezy.com/system/resources/previews/000/004/198/original/dusty_road_loop.mp4",
    "poster": "https://images.unsplash.com/photo-1533106958148-daea7670250b?q=80&w=1920",
    "type": "hero"
  },
  {
    "id": "tt0816692b",
    "title": "Tron: Legacy",
    "url": "https://static.videezy.com/system/resources/previews/000/008/364/original/free_blue_particles_background_loop.mp4",
    "poster": "https://images.unsplash.com/photo-1549360314-0926e02c9817?q=80&w=1920",
    "type": "hero"
  },
  {
    "id": "tt10872600",
    "title": "Dune: Part One",
    "url": "https://static.videezy.com/system/resources/previews/000/005/501/original/sand_storm.mp4",
    "poster": "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1920",
    "type": "hero"
  },
  {
    "id": "tt1234567",
    "title": "Cyberpunk Edgerunners",
    "url": "https://static.videezy.com/system/resources/previews/000/038/701/original/cyberpunk_city_night_rain.mp4",
    "poster": "https://images.unsplash.com/photo-1594383693160-c0e3959194a0?q=80&w=1920",
    "type": "hero"
  }

];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroMovies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container">
      {heroMovies.map((movie, index) => (
        <div 
          key={movie.id} 
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
        >
          <video 
            src={movie.url} 
            poster={movie.poster}
            className="hero-video" 
            autoPlay 
            muted 
            loop 
            playsInline
          />
          <div className="hero-overlay">
            <div className="hero-content">
               <h1 className="hero-title">{movie.title}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;