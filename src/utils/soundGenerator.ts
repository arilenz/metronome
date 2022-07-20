export const generateMetronome = () => {
  const audioContext = new window.AudioContext();

  // create an oscillator
  const osc = audioContext.createOscillator();

  // Set the sound frequency
  osc.frequency.value = 800;

  // Connect the oscillator to the output destination
  osc.connect(audioContext.destination);

  // Start the oscilator in 1 second and stop after a short time
  osc.start(audioContext.currentTime + 1);
  osc.stop(audioContext.currentTime + 1.03);
};
