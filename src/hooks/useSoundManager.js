import { useEffect, useRef, useState } from "react";

// Audio File Paths (Zaroorat ke hisaab se paths/names adjust kar lein)
import COUNTDOWN_AUDIO_URL from "../assets/music/Countdown.mp3";
import BIRTHDAY_AUDIO_URL from "../assets/music/Birthday.mp3";
import LETTER_AUDIO_URL from "../assets/music/Favorite.mp3"; // Letter song
import ALBUM1_AUDIO_URL from "../assets/music/Album1.mp3";   // Album 1 song
import ALBUM2_AUDIO_URL from "../assets/music/Album2.mp3";   // Album 2 song

export function useSoundManager({ stage, isLetterOpened, selectedAlbum }) {
  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(isMuted);
  const stageRef = useRef(stage);

  const countdownAudioRef = useRef(null);
  const birthdayAudioRef = useRef(null);
  const letterAudioRef = useRef(null);
  const album1AudioRef = useRef(null);
  const album2AudioRef = useRef(null);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Track initializer helper
  const createAudio = (url, volume = 0.6) => {
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    return audio;
  };

  useEffect(() => {
    countdownAudioRef.current = createAudio(COUNTDOWN_AUDIO_URL, 0.6);
    birthdayAudioRef.current = createAudio(BIRTHDAY_AUDIO_URL, 0.55);
    letterAudioRef.current = createAudio(LETTER_AUDIO_URL, 0.65);
    album1AudioRef.current = createAudio(ALBUM1_AUDIO_URL, 0.6);
    album2AudioRef.current = createAudio(ALBUM2_AUDIO_URL, 0.6);

    const allAudios = [
      countdownAudioRef,
      birthdayAudioRef,
      letterAudioRef,
      album1AudioRef,
      album2AudioRef,
    ];

    // Mobile gesture unlock (Screen touch/click par audio unlock and play)
    const unlockAudio = () => {
      allAudios.forEach((ref) => {
        if (ref.current) ref.current.load();
      });

      // Agar user countdown screen par hai to first tap par hi tick audio play ho jaye
      if (stageRef.current === "countdown" && countdownAudioRef.current && !isMutedRef.current) {
        countdownAudioRef.current.play().catch(() => {});
      }

      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      allAudios.forEach((ref) => {
        if (ref.current) {
          ref.current.pause();
          ref.current = null;
        }
      });
    };
  }, []);

  // Continuous Countdown Tick Play Trigger
  const playCountdownTick = () => {
    const tick = countdownAudioRef.current;
    if (tick && !isMutedRef.current && tick.paused) {
      tick.play().catch(() => {});
    }
  };

  // Stage ke mutabiq song switch transition handler
  useEffect(() => {
    const tick = countdownAudioRef.current;
    const bday = birthdayAudioRef.current;
    const letter = letterAudioRef.current;
    const alb1 = album1AudioRef.current;
    const alb2 = album2AudioRef.current;

    const all = [tick, bday, letter, alb1, alb2];

    const playOnly = (activeAudio) => {
      all.forEach((track) => {
        if (track && track !== activeAudio) {
          track.pause();
        }
      });

      if (activeAudio && !isMuted && activeAudio.paused) {
        activeAudio.play().catch(() => {});
      }
    };

    if (stage === "countdown") {
      // Countdown stage me ticking audio humesha on rahega
      playOnly(tick);
    } else if (stage === "birthday") {
      const timer = setTimeout(() => {
        playOnly(bday);
      }, 500);
      return () => clearTimeout(timer);
    } else if (stage === "message") {
      if (isLetterOpened) {
        playOnly(letter);
      } else {
        playOnly(bday);
      }
    } else if (stage === "memories") {
      if (selectedAlbum === 1) {
        playOnly(alb1);
      } else if (selectedAlbum === 2) {
        playOnly(alb2);
      } else {
        playOnly(letter);
      }
    }
  }, [stage, isLetterOpened, selectedAlbum, isMuted]);

  // Global Mute Sync
  useEffect(() => {
    [
      countdownAudioRef,
      birthdayAudioRef,
      letterAudioRef,
      album1AudioRef,
      album2AudioRef,
    ].forEach((ref) => {
      if (ref.current) ref.current.muted = isMuted;
    });
  }, [isMuted]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return { isMuted, toggleMute, playCountdownTick };
}