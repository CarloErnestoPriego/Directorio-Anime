import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import AnimeList from './AnimeList';
import useAnime from '../hooks/useAnime';
import useEpisodes from '../hooks/useEpisode';
import '../style/index.css';

export const AnimeApp = () => {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { animes, error } = useAnime(query);
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const { episodes, loadingEpisodes, fetchEpisodes } = useEpisodes(selectedAnimeId);

  useEffect(() => {
    if (query === '') {
      setCurrentPage(1);
    }
  }, [query]);

  const animesPerPage = 10;
  const totalAnimes = animes.length;
  const totalPages = Math.ceil(totalAnimes / animesPerPage);
  
  const startIndex = (currentPage - 1) * animesPerPage;
  const paginatedAnimes = animes.slice(startIndex, startIndex + animesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  };

  const handleGetEpisodes = (animeId) => {
    if (selectedAnimeId === animeId) {
      setSelectedAnimeId(null);
    } else {
      setSelectedAnimeId(animeId);
      fetchEpisodes(animeId);
    }
  };

  return (
    <div>
      <h1>Anime List</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p>Error: {error}</p>}
      <AnimeList 
        animes={paginatedAnimes} 
        onShowEpisodes={handleGetEpisodes} 
        selectedAnimeId={selectedAnimeId} 
      />
      {selectedAnimeId && (
        <div>
          <h2>Episodios</h2>
          {loadingEpisodes ? (
            <p>Cargando Episodios</p>
          ) : episodes.length > 0 ? (
            <ul>
              {episodes.map((episode) => (
                <li key={episode.id}>
                  {episode.attributes?.coverImage?.original && (
                    <img 
                      src={episode.attributes.coverImage.original} 
                      alt={episode.attributes.canonicalTitle || 'no hay episodios'}
                      className="episode-image"
                    />
                  )}
                  <p>{episode.attributes?.canonicalTitle || 'no hay episodios'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Episodios no disponibles</p>
          )}
        </div>
      )}
      <div>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span> Page {currentPage} </span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AnimeApp;