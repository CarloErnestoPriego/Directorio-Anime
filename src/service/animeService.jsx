const base_url = 'https://kitsu.io/api/edge';

// Función para buscar animes
export const reqAnime = async (query) => {
    try {
        const response = await fetch(`${base_url}/anime?filter[text]=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.map(anime => ({
            id: anime.id,
            title: anime.attributes.canonicalTitle,
            imageUrl: anime.attributes.posterImage.small, 
            description: anime.attributes.synopsis 
        }));
    } catch (err) {
        console.error("Error in reqAnime:", err);
        return [];
    }
};


export const reqEpisodes = async (animeId) => {
    try {
        const response = await fetch(`${base_url}/anime/${animeId}/episodes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.map(episode => ({
            id: episode.id,
            title: episode.attributes.canonicalTitle,
            airDate: episode.attributes.airdate 
        }));
    } catch (err) {
        console.error("Error in reqEpisodes:", err);
        return [];
    }
};