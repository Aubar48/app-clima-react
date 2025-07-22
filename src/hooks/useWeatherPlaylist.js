import { useMemo } from "react";

const playlists = {
    clouds: "https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3XMbVS", // Emanero y urbanos
    clear: "https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO1uWiAi",  // Abel Pintos
    snow: "https://open.spotify.com/embed/album/4RqB3B3iV6nz53RS0FcpU0",      // Álbum para clima frío
    rain: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdxcBWuJkbcy",   // Lo-fi Chill (para lluvia)
};

export function useWeatherPlaylist(description) {
    return useMemo(() => {
        console.log("Descripción recibida:", description);

        if (!description) return playlists.clear;

        const desc = description.toLowerCase();

        console.log("Descripción en minúsculas:", desc);

        if (desc.includes("rain")) {
          console.log("Playlist elegida: lluvia");
          return playlists.rain;
        }
        if (desc.includes("snow")) {
          console.log("Playlist elegida: nieve");
          return playlists.snow;
        }
        if (desc.includes("cloud")) {
          console.log("Playlist elegida: nublado");
          return playlists.clouds;
        }
        if (desc.includes("clear") || desc.includes("sun")) {
          console.log("Playlist elegida: despejado/sol");
          return playlists.clear;
        }

        console.log("Playlist elegida: por defecto");
        return playlists.clear;
    }, [description]);
}
