"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface YTPlayerEvent {
  target: YTPlayer;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        id: string | HTMLElement,
        config: {
          videoId: string;
          playerVars?: Record<string, number>;
          events?: {
            onReady?: (event: YTPlayerEvent) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
} 

const AudioPlayer = ({ videoId }: { videoId: string }) => {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("yt-audio-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (e: { data: number }) => {
            setIsPlaying(e.data === 1);
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  // Progress tracking
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (!playerRef.current) return;
      const current = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 w-full">
      {/* Hidden YouTube player */}
      <div
        id="yt-audio-player"
        className="w-px h-px overflow-hidden opacity-0 absolute"
      />

      <p className="text-lg text-primary-700 mb-8 text-center">
        Close your eyes and just listen
      </p>

      <div className="flex items-center gap-6 w-full max-w-md">
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          disabled={!isReady}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors disabled:opacity-40 shrink-0"
        >
          {isPlaying ? <FaPause /> : <FaPlay className="ml-0.5" />}
        </button>

        {/* Progress bar */}
        <div
          className="flex-1 h-1 bg-primary-200 rounded-full overflow-hidden cursor-pointer"
          onClick={(e) => {
            if (!playerRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = clickX / rect.width;
            const duration = playerRef.current.getDuration();
            playerRef.current.seekTo(duration * percent, true);
          }}
        >
          <div
            className="h-full bg-primary-500 rounded-full transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
