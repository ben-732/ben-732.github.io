import querystring from "querystring";
/* global fetch */

export const handler = async () => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.BASIC_AUTH_STRING}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: process.env.REFRESH_TOKEN,
      }),
    });

    const access_token = (await response.json()).access_token;

    const playingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const nowPlaying = await playingResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        artist: nowPlaying.item.artists.map(({ name }) => name).join(", "),
        song: nowPlaying.item.name,
        album: nowPlaying.item.album.name,
        albumArt: nowPlaying.item.album.images[0].url,
        link: nowPlaying.item.external_urls.spotify,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error getting current song",
      }),
    };
  }
};
