export interface MetronomeState {
    isPlaying: boolean
    tempo: number
    beatsPerMeasure: number
    currentBeat: number
    subdivision: number
}

export interface TempoAutomation {
    enabled: boolean
    startTempo: number
    endTempo: number
    duration: number
    increment: number
    interval: number
}

export interface AudioConfig {
    volume: number
    accentBeatVolume: number
    frequency: number
    accentFrequency: number
}
