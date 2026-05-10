const volume = 0.5
const accentVolume = 0.9
const frequency = 800
const accentFrequency = 1200

const audioContext = new window.AudioContext()

function createOscillatorAndGain(frequency: number, volume: number): [OscillatorNode, GainNode] {
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    gain.gain.value = volume
    return [oscillator, gain]
}

export function playBeat(isAccent: boolean): void {
    const [o, g] = isAccent
        ? createOscillatorAndGain(accentFrequency, accentVolume)
        : createOscillatorAndGain(frequency, volume)

    o.start(audioContext.currentTime)
    g.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1
    )
    o.stop(audioContext.currentTime + 0.1)
}
