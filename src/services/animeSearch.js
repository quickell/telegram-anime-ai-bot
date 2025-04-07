const axios = require('axios');

async function getFromAniList(title) {
  const query = `
    query ($search: String) {
      Media(search: $search, type: ANIME) {
        title { english romaji }
        coverImage { large }
      }
    }
  `;
  try {
    const res = await axios.post('https://graphql.anilist.co', {
      query,
      variables: { search: title },
    });
    const anime = res.data.data.Media;
    return {
      title: anime.title.english || anime.title.romaji,
      imageUrl: anime.coverImage.large,
    };
  } catch {
    return null;
  }
}

async function getFromJikan(title) {
  try {
    const res = await axios.get('https://api.jikan.moe/v4/anime', {
      params: { q: title, limit: 1 }
    });
    const anime = res.data.data[0];
    return {
      title: anime.title,
      imageUrl: anime.images.jpg.large_image_url,
    };
  } catch {
    return null;
  }
}

async function getFromKitsu(title) {
  try {
    const res = await axios.get('https://kitsu.io/api/edge/anime', {
      params: { 'filter[text]': title },
    });
    const anime = res.data.data[0];
    return {
      title: anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.slug,
      imageUrl: anime.attributes.posterImage?.original,
    };
  } catch {
    return null;
  }
}

module.exports = { getFromAniList, getFromJikan, getFromKitsu };
