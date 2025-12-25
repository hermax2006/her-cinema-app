import React, { useState, useEffect, useCallback } from 'react';
import MoviePop from './MoviePop';
import HeroSlider from './BackTtrail';
const API_KEY = "6751d1ecca423bae7189d8e95378ba2e"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; 
const VIDEO_BACKGROUND_URL = "https://assets.mixkit.co/videos/preview/mixkit-dramatic-slow-motion-of-a-fire-rising-6258-large.mp4"; 


const FilmIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" style={{ color: 'var(--color-highlight)' }}/>
    <path d="M7 3v18" />
    <path d="M3 7.5h4" />
    <path d="M3 12h18" />
    <path d="M3 16.5h4" />
    <path d="M17 7.5h4" />
    <path d="M17 16.5h4" />
  </svg>
);

const StarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: 'var(--color-accent)' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const SearchIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const SunIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

// Icône de Fermeture (utilisée dans la Modale)
const CloseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);


// ------------------------------------
// 2. Composant MovieCard
// ------------------------------------

const MovieCard = ({ movie, index, onCardClick }) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : `https://placehold.co/500x750/334155/E2E8F0?text=Poster+Absent`; 

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '0.0';

  return (
    <div 
        className="movie-card"
        style={{ animationDelay: `${index * 50}ms` }} 
        onClick={() => onCardClick(movie.id)}
    >
      <div className="poster-container">
        <img 
          src={posterUrl}
          alt={movie.title} 
          className="movie-poster" 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = `https://placehold.co/500x750/334155/E2E8F0?text=Image+Erreur`;
          }}
        />
      </div>

      <div className="movie-info-content">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>
        
        <div className="movie-details-bottom">
          <p className="movie-year-badge">
            {releaseYear}
          </p>

          <div className="movie-rating">
            <StarIcon style={{ width: '16px', height: '16px' }} />
            <span className={parseFloat(rating) >= 7 ? 'rating-high' : 'rating-normal'}>
              {rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------
// 3. Composant MovieDetailsModal
// ------------------------------------
const MovieDetailsModal = ({ movieId, onClose }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            
            const API_LINK = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`;

            try {
                const response = await fetch(API_LINK);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setDetails(data);
            } catch (err) {
                console.error("Erreur de Fetch des détails:", err);
                setError("Impossible de charger les détails du film.");
            } finally {
                setLoading(false);
            }
        };

        if (movieId) {
            fetchDetails();
        }
    }, [movieId]);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    if (loading) {
        return (
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content loading-details">
                    <p>Chargement des informations...</p>
                    <button onClick={onClose} className="close-button" aria-label="Fermer la fenêtre de détails">
                        <CloseIcon />
                    </button>
                </div>
            </div>
        );
    }

    if (error || !details) {
        return (
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-content error-details">
                    <p>{error || "Désolé, les informations de ce film n'ont pas pu être trouvées."}</p>
                    <button onClick={onClose} className="close-button" aria-label="Fermer la fenêtre de détails">Fermer</button>
                </div>
            </div>
        );
    }
    
    const posterPath = details.poster_path
        ? `${IMAGE_BASE_URL}${details.poster_path}`
        : `https://placehold.co/500x750/334155/E2E8F0?text=Poster+Absent`;
    
    const rating = details.vote_average ? details.vote_average.toFixed(1) : '0.0';

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button onClick={onClose} className="close-button" aria-label="Fermer la fenêtre de détails">
                    <CloseIcon />
                </button>
                
                <div className="details-grid">
                    <div className="details-poster-area">
                        <img 
                            src={posterPath} 
                            alt={details.title} 
                            className="details-poster" 
                        />
                        <div className="details-stats">
                            <div className="stat-item">
                                <StarIcon style={{ width: '18px', height: '18px' }} />
                                <span>{rating} / 10</span>
                            </div>
                            <div className="stat-item">
                                <FilmIcon style={{ width: '18px', height: '18px' }} />
                                <span>{details.runtime || 'N/A'} min</span>
                            </div>
                        </div>
                        <div className="details-genres">
                            {details.genres.map(genre => (
                                <span key={genre.id} className="genre-tag">{genre.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="details-info-area">
                        <h1 className="details-title">{details.title}</h1>
                        <p className="details-tagline">{details.tagline}</p>
                        
                        <h2 className="details-section-title">Synopsis</h2>
                        <p className="details-overview">
                            {details.overview || "Résumé non disponible en Français."}
                        </p>

                        <div className="details-meta-data">
                            <p><strong>Date de sortie:</strong> {details.release_date ? new Date(details.release_date).toLocaleDateString('fr-FR') : 'N/A'}</p>

                            <p><strong>Statut:</strong> {details.status || 'N/A'}</p>
                            <p><strong>Budget:</strong> {details.budget > 0 ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(details.budget) : 'N/A'}</p>
                            <p><strong>Revenu:</strong> {details.revenue > 0 ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(details.revenue) : 'N/A'}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};


// ------------------------------------
// 4. Composant Principal App 
// ------------------------------------

export const App = () => {
  const [theme, setTheme] = useState('light'); 
  const [movieData, setMovieData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentQuery, setCurrentQuery] = useState('Films Populaires');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null); 

  // Gestion de la modale
  const handleCardClick = (movieId) => {
    setSelectedMovieId(movieId);
  };
  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const fetchMovies = useCallback(async (query) => {
    
    setLoading(true);
    setError(null);
    setMovieData([]); 
    
    let API_LINK;
    const effectiveQuery = query.trim();

    if (!effectiveQuery) {
        API_LINK = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`;
        setCurrentQuery('Films Populaires');
    } else {
        const encodedQuery = encodeURIComponent(effectiveQuery);
        API_LINK = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodedQuery}&language=fr-FR`;
        setCurrentQuery(effectiveQuery);
    }

    try {
      const response = await fetch(API_LINK);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.results) {
        setMovieData(data.results.filter(movie => movie.poster_path !== null)); 
      } else {
        setMovieData([]);
      }

    } catch (err) {
      console.error("Erreur de Fetch:", err);
      setError("Impossible de charger les films. Veuillez vérifier votre connexion ou réessayer.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [fetchMovies, searchTerm]); 

  // Gestion de la soumission de la recherche
  const handleSearch = (e) => {
    if (e) e.preventDefault(); 
    // Ferme la modale si elle est ouverte avant de lancer une nouvelle recherche
    handleCloseModal(); 
    fetchMovies(searchTerm);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className={`app-container theme-${theme}`}>
      {/* Styles CSS Natifs */}
   
      <style>{`
        /* ------------------------------------ */
        /* VARIABLES DE THÈME */
        /* ------------------------------------ */
        :root {
            /* Couleurs Claires */
            --bg-body-light: #f3f4f6;
            --bg-card-light: #ffffff;
            --bg-header-light: #ffffff;
            --color-text-light: #1f2937;
            --color-subtext-light: #4b5563;
            --border-color-light: #e5e7eb;
            --shadow-header-light: 0 4px 12px rgba(0, 0, 0, 0.1);
            --shadow-card-light: 0 2px 8px rgba(0, 0, 0, 0.1);

            /* Couleurs Sombres */
            --bg-body-dark: #111827;
            --bg-card-dark: #1f2937;
            --bg-header-dark: #1f2937;
            --color-text-dark: #f9fafb;
            --color-subtext-dark: #9ca3af;
            --border-color-dark: #374151;
            --shadow-header-dark: 0 4px 12px rgba(0, 0, 0, 0.5);
            --shadow-card-dark: 0 4px 10px rgba(0, 0, 0, 0.3);

            /* Couleurs Générales / Fonctionnelles */
            --color-primary: #3b82f6; 
            --color-highlight: #1d4ed8; 
            --color-accent: #facc15; 
            --color-high-rating: #10b981; 
        }

        /* Variables Actuelles basées sur le Thème */
        .theme-light {
            --bg-body: var(--bg-body-light);
            --bg-card: var(--bg-card-light);
            --bg-header: var(--bg-header-light);
            --color-text: var(--color-text-light);
            --color-subtext: var(--color-subtext-light);
            --border-color: var(--border-color-light);
            --shadow-header: var(--shadow-header-light);
            --shadow-card: var(--shadow-card-light);
            --bg-input: #f9fafb;
            --bg-card-rgb-r: 255;
            --bg-card-rgb-g: 255;
            --bg-card-rgb-b: 255;
        }

        .theme-dark {
            --bg-body: var(--bg-body-dark);
            --bg-card: var(--bg-card-dark);
            --bg-header: var(--bg-header-dark);
            --color-text: var(--color-text-dark);
            --color-subtext: var(--color-subtext-dark);
            --border-color: var(--border-color-dark);
            --shadow-header: var(--shadow-header-dark);
            --shadow-card: var(--shadow-card-dark);
            --bg-input: #374151;
            --bg-card-rgb-r: 31;
            --bg-card-rgb-g: 41;
            --bg-card-rgb-b: 55;
        }

        /* ------------------------------------ */
        /* GLOBAL RESET & BASE */
        /* ------------------------------------ */
        *, *::before, *::after {
            box-sizing: border-box; 
        }
        
        html, body, #root {
            width: 100%;
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }

        body {
            font-family: 'Inter', sans-serif;
            overflow-x: hidden; 
        }
        
        .app-container {
            background-color: var(--bg-body);
            color: var(--color-text);
            transition: background-color 0.5s ease, color 0.5s ease;
            max-width: none; 
            width: 100%; 
            margin: 0; 
            min-height: 100vh;
            padding-top: 80px; /* Padding pour la NavBar fixe */
        }
        
        .container {
            padding: 0 20px;
        }
        @media (max-width: 640px) {
            .container {
                padding: 0 10px; 
            }
        }


        /* ------------------------------------ */
        /* 1. NAVIGATION BAR (FIXE) */
        /* ------------------------------------ */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 50; 
            background-color: rgba(var(--bg-card-rgb-r), var(--bg-card-rgb-g), var(--bg-card-rgb-b), 0.9);
            backdrop-filter: blur(10px);
            box-shadow: var(--shadow-header);
            padding: 10px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background-color 0.5s ease, box-shadow 0.5s ease;
        }

        @media (max-width: 768px) {
            .navbar {
                flex-direction: column;
                gap: 10px;
                padding: 10px 15px;
            }
            .app-container {
                padding-top: 130px; /* Augmenter l'espace pour la navbar mobile */
            }
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 20px;
            font-weight: 800;
            color: var(--color-highlight);
        }

        .search-form {
            display: flex;
            max-width: 450px;
            border-radius: 12px;
            overflow: hidden;
            flex-grow: 1;
        }
        
        .search-controls-wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        @media (max-width: 768px) {
            .search-controls-wrapper {
                width: 100%;
                justify-content: space-between;
            }
        }

        .search-input {
            flex-grow: 1;
            padding: 10px 10px 10px 40px; 
            border: 2px solid var(--border-color);
            border-right: none;
            outline: none;
            transition: border-color 0.2s;
            font-size: 16px;
            background-color: var(--bg-input);
            color: var(--color-text);
            border-radius: 12px 0 0 12px;
        }
        
        .search-input-wrapper {
            position: relative;
            flex-grow: 1;
        }
        .search-icon-pos {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            color: var(--color-subtext);
            z-index: 2;
        }
        
        .search-button {
            padding: 10px 20px;
            background-color: var(--color-primary);
            color: white;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.2s, transform 0.1s;
            border-radius: 0 12px 12px 0;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        /* ------------------------------------ */
        /* 2. HERO SECTION (FOND VIDÉO) */
        /* ------------------------------------ */
        .hero-section {
            position: relative;
            width: 100%;
            height: 50vh; /* Moitié de l'écran pour le Hero */
            min-height: 300px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .video-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }

        .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6); /* Assure la lisibilité du texte */
            z-index: 2;
        }

        .hero-content {
            z-index: 3;
            color: white;
            padding: 20px;
        }

        .hero-content h1 {
            font-size: 4rem;
            font-weight: 900;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
            margin-bottom: 10px;
        }
        .hero-content p {
            font-size: 1.5rem;
            font-weight: 400;
        }
        
        @media (max-width: 768px) {
            .hero-section {
                height: 40vh;
            }
            .hero-content h1 {
                font-size: 2.5rem;
            }
            .hero-content p {
                font-size: 1rem;
            }
        }

        /* ------------------------------------ */
        /* 3. MAIN CONTENT & GRID */
        /* ------------------------------------ */
        .movies-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 25px;
        }
        
        /* Animation d'apparition */
        @keyframes fadeInSlideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .movie-card {
            background-color: var(--bg-card);
            border-radius: 12px;
            box-shadow: var(--shadow-card);
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-direction: column;
            opacity: 0;
            animation: fadeInSlideUp 0.4s ease-out forwards; 
            /* Transition pour le survol */
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s, background-color 0.5s;
            cursor: pointer;
        }
        
        /* NOUVEL EFFET DE SURVOL */
        .movie-card:hover {
            transform: scale(1.07); /* Agrandissement de 7% survol */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); /* Ombre plus prononcée */
            z-index: 10; /* Assure que la carte survolée passe au-dessus des autres */
        }
        /* FIN NOUVEL EFFET DE SURVOL */

        .poster-container {
            position: relative;
            width: 100%;
            padding-top: 150%; 
            overflow: hidden;
        }

        .movie-poster {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .movie-info-content {
            padding: 10px;
            display: flex;
            flex-direction: column;
            flex-grow: 1; 
            min-height: 70px; 
        }
        
        .movie-title {
            font-size: 16px;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 8px; 
            line-height: 1.2;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            min-height: calc(1.2em * 2); 
        }

        .movie-details-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
        }

        .movie-year-badge {
            font-size: 12px;
            font-weight: 500;
            color: var(--color-subtext);
            background-color: var(--border-color);
            padding: 4px 8px;
            border-radius: 10px;
            transition: background-color 0.5s, color 0.5s;
        }

        /* ------------------------------------ */
        /* 4. FOOTER (NOUVEAU) */
        /* ------------------------------------ */
        footer {
            margin-top: 50px;
            padding: 30px 20px;
            background-color: var(--bg-header);
            border-top: 1px solid var(--border-color);
            text-align: center;
            color: var(--color-subtext);
            border-radius: 12px 12px 0 0;
        }
        footer p {
            margin: 0;
            font-size: 14px;
        }
        /* Styles de la Modale (inchangés) */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85); 
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(8px);
            padding: 10px;
        }

        .modal-content {
            position: relative;
            background-color: var(--bg-card);
            color: var(--color-text);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
            width: 95%;
            max-width: 1100px;
            max-height: 95vh;
            overflow-y: auto;
            padding: 30px;
            animation: zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            background-repeat: no-repeat;
            background-size: cover;
            scrollbar-width: thin;
            scrollbar-color: var(--color-primary) var(--bg-card);
        }
        
        .close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.2);
            color: var(--color-text);
            border: none;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            font-size: 18px;
            cursor: pointer;
            transition: background 0.2s, transform 0.3s;
            z-index: 1010;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
        }
        .close-button:hover {
            background: var(--color-highlight);
            color: white;
            transform: rotate(90deg);
        }

        .details-grid {
            display: flex;
            gap: 40px;
        }

        .details-poster-area {
            min-width: 250px;
            max-width: 300px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .details-poster {
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .details-info-area {
            flex-grow: 1;
        }

        .details-title {
            font-size: 38px;
            font-weight: 800;
            margin-top: 0;
            margin-bottom: 5px;
            color: var(--color-highlight);
        }

        .details-tagline {
            font-style: italic;
            color: var(--color-subtext);
            margin-bottom: 20px;
            font-size: 18px;
        }

        .details-section-title {
            font-size: 22px;
            font-weight: 700;
            color: var(--color-text);
            border-bottom: 2px solid var(--border-color);
            padding-bottom: 5px;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                padding: 20px;
            }
            .details-grid {
                flex-direction: column;
                gap: 20px;
            }
            .details-poster-area {
                max-width: 100%;
                align-items: center;
                text-align: center;
            }
            .details-poster {
                max-width: 200px;
            }
            .details-title {
                text-align: center;
                font-size: 26px;
            }
            .details-tagline {
                text-align: center;
                font-size: 16px;
            }
            .details-stats {
                justify-content: center;
            }
            .details-genres {
                justify-content: center;
            }
        }

      `}</style>

      {/* Barre de navigation flottante */}
      <nav className="navbar">
          <div className="logo">
              <FilmIcon style={{ width: '32px', height: '32px' }} />
             
          </div>
          
          <div className="search-controls-wrapper">
              
              <form onSubmit={handleSearch} className="search-form">
                  <div className="search-input-wrapper">
                      <SearchIcon className="search-icon-pos" />
                      <input
                          type="text"
                          placeholder="Rechercher un film..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="search-input"
                          aria-label="Champ de recherche de films"
                      />
                  </div>
                  <button 
                    type="submit" 
                    onClick={handleSearch}
                    className="search-button"
                  >
                    <SearchIcon style={{ width: '20px', height: '20px' }} />
                    <span>OK</span>
                  </button>
              </form>

              <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
                  title={theme === 'light' ? 'Passer au mode sombre' : 'Passer au mode clair'}
              >
                  {theme === 'light' ? <SunIcon /> : <MoonIcon />}
              </button>
          </div>
      </nav>

      {/* Section Hero (Fond Vidéo) */}
      <section className="hero-section">
        {/*
          
        */}
        <video 
            autoPlay 
            loop 
            muted 
            className="video-background"
            poster="https://placehold.co/1280x720/1f2937/FFFFFF?text=Trailer+Fallback" // Affiche une image en cas de non-chargement
        >
            <source src={VIDEO_BACKGROUND_URL} type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
        </video>
        <div className="video-overlay"></div>
        <div className="hero-content">
          
            <p>Découvrez les films les plus populaires et les dernières sorties.</p>
        </div>
      </section>

      {/* Contenu principal et grille de films */}
      <div className="container">
        <main>
          <h2 className="preview-title">
            Résultats pour: <span className="highlight">"{currentQuery}"</span>
          </h2>
          
          {loading && (
            <div className="status-message loading-box">
              <div className="spinner"></div>
              <p>Chargement des films...</p>
            </div>
          )}

          {error && (
            <div className="status-message error-box">
              <strong>Erreur:</strong> 
              <p>{error}</p>
            </div>
          )}

          {!loading && movieData.length === 0 && !error && (
            <div className="status-message empty-box">
              <p>
                Aucun film trouvé pour "<span style={{ fontWeight: 600 }}>{currentQuery}</span>".
              </p>
              <p style={{ fontSize: '16px', color: '#854d0e', marginTop: '5px' }}>
                Veuillez essayer un autre terme de recherche.
              </p>
            </div>
          )}
      

          {!loading && movieData.length > 0 && (
            <div className="movies-grid">
              {movieData.map((movie, index) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  index={index} 
                  onCardClick={handleCardClick} 
                />
              ))}
            </div>
          )}
        </main>
      </div>





<MoviePop/>








      {/* Pied de page */}
      <footer>
          <p>&copy; {new Date().getFullYear()} CineFinder TMDB App. Données fournies par The Movie Database (TMDB).</p>
      </footer>

      {/* Rendu conditionnel de la modale de détails */}
      {selectedMovieId && (
        <MovieDetailsModal 
            movieId={selectedMovieId} 
            onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default App;