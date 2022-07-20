import React, { useEffect, useState } from "react";

const audioContext = new window.AudioContext();

const generateMetronomeSound = () => {
  const osc = audioContext.createOscillator();

  osc.frequency.value = 800;

  osc.connect(audioContext.destination);

  osc.start(audioContext.currentTime + 1);
  osc.stop(audioContext.currentTime + 1.03);
};

export const App: React.FC = () => {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined;
    if (isPlaying && bpm > 0) {
      interval = setInterval(generateMetronomeSound, (60 / bpm) * 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, bpm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBpm(Number(event.target.value));

  const handleDecreaseButtonClick = () => {
    setBpm((b) => {
      if (b - 10 < 0) return 0;
      else return b - 10;
    });
  };

  const handleIncreaseButtonClick = () => {
    setBpm((b) => b + 10);
  };

  const handlePlayButtonClick = () => {
    setIsPlaying((v) => !v);
  };

  return (
    <div>
      <input type="text" value={bpm} onChange={handleInputChange} />
      <button onClick={handleDecreaseButtonClick}>-10</button>
      <button onClick={handleIncreaseButtonClick}>+10</button>
      <button onClick={handlePlayButtonClick}>
        {isPlaying ? "Stop" : "Play"}
      </button>
    </div>
  );
};
