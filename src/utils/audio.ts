const beatTypes = {
    accent: {
        volume: 1,
        frequency: 1100
    },
    normal: {
        volume: 0.6,
        frequency: 800
    },
    sub: {
        volume: 0.6,
        frequency: 500
    }
}

export type BeatTypes = keyof typeof beatTypes

const audioContext = new window.AudioContext()

function createOscillatorAndGain(type: BeatTypes): [OscillatorNode, GainNode] {
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    oscillator.frequency.value = beatTypes[type].frequency
    gain.gain.value = beatTypes[type].volume
    return [oscillator, gain]
}

export function playBeat(type: BeatTypes): void {
    const [o, g] = createOscillatorAndGain(type)

    o.start(audioContext.currentTime)
    g.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1
    )
    o.stop(audioContext.currentTime + 0.1)
}
