import React, { useEffect } from "react";
import { CgLoadbarSound } from "react-icons/cg";
import Card from "./Card";
import { iProps as iCardProps } from "./Card";
import { FaSpotify } from "react-icons/fa";

import noSong from "../img/no-song.png";
import { iSpotifySong, getSong } from "../util/getSpotifySong";

interface iProps
  extends Omit<iCardProps, "children" | "href" | "target" | "hover"> {}

function SpotifySong(props: iProps) {
  const [song, setSong] = React.useState<iSpotifySong | null>(null);
  const [songStatus, setSongStatus] = React.useState<
    "loading" | "idle" | "error"
  >("loading");

  useEffect(() => {
    updateSong();

    const interval = setInterval(updateSong, 60e3);

    return () => clearInterval(interval);
  }, []);

  async function updateSong() {
    console.log("Updating song - " + new Date().toLocaleTimeString());

    const [err, song] = await getSong();

    if (err) {
      setSongStatus("error");
      setSong(null);
      return;
    }

    setSong(song);
    setSongStatus("idle");
  }

  if (songStatus === "loading")
    return (
      <SongCard
        {...props}
        song={{
          artist: "Fetching activity from spotify",
          song: "Loading...",
          album: "",
          albumArt: noSong,
          link: "",
        }}
      ></SongCard>
    );

  if (songStatus === "error" || !song) {
    return (
      <SongCard
        {...props}
        song={{
          artist: "I'm not playing music right now",
          song: "Currently Offline",
          album: "",
          albumArt: noSong,
          link: "",
        }}
      ></SongCard>
    );
  }

  return (
    <SongCard
      href={song.link}
      target="_blank"
      hover
      song={song}
      {...props}
    ></SongCard>
  );
}

interface iSongCardProps extends Omit<iCardProps, "children"> {
  song: iSpotifySong;
}

const SongCard = ({ song, className, ...props }: iSongCardProps) => {
  return (
    <Card {...props} className={`w-[340px] max-w-[340px] ${className}`}>
      <div className="flex gap-4">
        <img
          src={song.albumArt}
          alt={"Album art for " + song.song}
          className="h-20 rounded-lg shadow-lg"
        />
        <div className="w-min mr-2 leading-none">
          <div className="text-sm font-medium flex items-center gap-2">
            <FaSpotify size={18} />
            My activity
          </div>
          <span className="w-[220px] text-xl block whitespace-nowrap overflow-hidden text-ellipsis">
            {song.song}
          </span>
          <span className="w-[220px] block text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {song.artist}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SpotifySong;
