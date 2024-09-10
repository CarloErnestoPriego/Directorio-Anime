import React from 'react';
import PropTypes from 'prop-types';

const AnimeList = ({ animes, onShowEpisodes, selectedAnimeId }) => {
  return (
    <div>
      <h2>Lista de Animes</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {animes.map((anime) => (
          <li key={anime.id} style={{ display: 'flex', marginBottom: '60px', alignItems: 'center' }}>
            <img 
              src={anime.attributes?.coverImage?.original} 
              alt={anime.attributes?.canonicalTitle || 'No title'}
              className="anime-list-image"
              style={{ width: '150px', height: 'auto', marginRight: '20px' }}
            />
            <div>
              <p>{anime.attributes?.canonicalTitle || 'No title'}</p>
              <button onClick={() => onShowEpisodes(anime.id)}>
                {selectedAnimeId === anime.id ? 'Hide Episodes' : 'Show Episodes'}
              </button>
              {selectedAnimeId === anime.id && (
                <div style={{ marginTop: '10px' }}>
                  <h3>Capitulos</h3>
                  {/* You need to provide the episode rendering logic here */}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

AnimeList.propTypes = {
  animes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      attributes: PropTypes.shape({
        coverImage: PropTypes.shape({
          original: PropTypes.string
        }),
        canonicalTitle: PropTypes.string
      }).isRequired
    })
  ).isRequired,
  onShowEpisodes: PropTypes.func.isRequired,
  selectedAnimeId: PropTypes.string
};

export default AnimeList;