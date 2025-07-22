import React from "react";
import { useWeatherPlaylist } from "../hooks/useWeatherPlaylist";

export const WeatherMusicPlayer = ({ weatherDescription }) => {
  console.log("Prop weatherDescription en Player:", weatherDescription);

  const playlistUrl = useWeatherPlaylist(weatherDescription);

  if (!playlistUrl) return null;

  return (
    <iframe
      title="Playlist relacionada al clima"
      src={playlistUrl}
      width="100%"
      height="80"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowTransparency="true"
      className="rounded-xl mt-2"
    />
  );
};
