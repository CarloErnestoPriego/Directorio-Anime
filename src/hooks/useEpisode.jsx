import { useState } from 'react';

const useEpisodes = (animeId) => {
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  const fetchEpisodes = async (animeId) => {
    setLoadingEpisodes(true);
    try {
      const response = await fetch(`https://kitsu.io/api/edge/anime/${animeId}/episodes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEpisodes(data.data || []);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  return { episodes, loadingEpisodes, fetchEpisodes };
};

export default useEpisodes;