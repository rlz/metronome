export const calculateInterval = (tempo: number): number => (60 / tempo) * 1000

export const formatTempo = (tempo: number): string => Math.round(tempo).toString()

export const clampTempo = (tempo: number, min = 40, max = 240): number => {
    return Math.min(Math.max(tempo, min), max)
}

export const calculateNextTempo = (
    currentTempo: number,
    increment: number,
    min = 40,
    max = 240
): number => {
    return clampTempo(currentTempo + increment, min, max)
}
