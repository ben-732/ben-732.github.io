import React, { useEffect } from "react";
import { CgLoadbarSound } from "react-icons/cg";
import Card from "./Card";
import { iProps as iCardProps } from "./Card";
import { FaSpotify } from "react-icons/fa";

import noSong from "../img/no-song.png";

interface iSpotifySong {
  artist: string;
  song: string;
  album: string;
  albumArt: string;
  link: string;
}

interface iProps
  extends Omit<iCardProps, "children" | "href" | "target" | "hover"> {}

function SpotifySong(props: iProps) {
  const [song, setSong] = React.useState<iSpotifySong | null>(null);
  const [songStatus, setSongStatus] = React.useState<
    "loading" | "idle" | "error"
  >("loading");

  useEffect(() => {
    // if (process.env.NODE_ENV === "development") {
    //   setTimeout(() => {
    //     setSongStatus("idle");
    //     setSong({
    //       artist: "Lorde",
    //       song: "Liability (Test Data)",
    //       album: "sumn",
    //       albumArt:
    //         "https://i.scdn.co/image/ab67616d00001e02f8553e18a11209d4becd0336",
    //       link: "https://open.spotify.com/track/6Kkt27YmFyIFrcX3QXFi2o?si=cb5a313e167b4b52&nd=1&dlsi=c9fc02b813cd427e",
    //     });
    //   }, 2000);

    //   return;
    // }
    updateSong();

    const interval = setInterval(updateSong, 60000);

    return () => clearInterval(interval);
  }, []);

  function updateSong() {
    console.log("Updating song...");

    fetch(
      "https://5nregwxmf2.execute-api.ap-southeast-2.amazonaws.com/default/get-current-song-spotify"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch song");

        if (res.status === 204) {
          setSongStatus("error");
          console.log("no song playing");
        }

        return res.json();
      })
      .then((data) => {
        setSong(data);
        setSongStatus("idle");
      })
      .catch((e) => {
        setSongStatus("error");
      });
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
