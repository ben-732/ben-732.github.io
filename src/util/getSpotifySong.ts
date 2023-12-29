export interface iSpotifySong {
  artist: string;
  song: string;
  album: string;
  albumArt: string;
  link: string;
}

/**
 * [error, song?]
 */
type tSongResponse = [true] | [false, iSpotifySong];

/**
 * Get the currently listening song from the Spotify API
 *
 * @returns [Error: boolean, song: iSpotifySong?]
 */
export async function getSong(): Promise<tSongResponse> {
  // In development mode return test data to avoid spamming the API
  if (process.env.NODE_ENV === "development") {
    console.log("Using test data");
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve([
          false,
          {
            artist: "Lorde",
            song: "Liability (Test Data)",
            album: "sumn",
            albumArt:
              "https://i.scdn.co/image/ab67616d00001e02f8553e18a11209d4becd0336",
            link: "https://open.spotify.com/track/6Kkt27YmFyIFrcX3QXFi2o?si=cb5a313e167b4b52&nd=1&dlsi=c9fc02b813cd427e",
          },
        ]);
      }, 2000)
    );
  }

  try {
    const res = await fetch(
      "https://5nregwxmf2.execute-api.ap-southeast-2.amazonaws.com/default/get-current-song-spotify"
    );

    if (res.status === 204) {
      return [true];
    }

    const data = await res.json();

    return [false, data];
  } catch (error) {
    return [true];
  }
}
