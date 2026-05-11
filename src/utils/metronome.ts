import { persist } from 'valtio-persist'
import { computed, effect } from 'valtio-reactive'

import { BeatTypes, playBeat } from './audio.ts'

export const { store: metronomeState } = await persist({
    isPlaying: false,
    currentTempo: 90,
    newTempo: 90,
    currentBeatsPerMeasure: 4,
    newBeatsPerMeasure: 4,
    currentSubdivision: 1,
    newSubdivision: 1,
    nextSubbeat: -1
}, 'metronomeState')

export const metronomeDerivedState = computed({
    prevSubbeat: () => (
        metronomeState.nextSubbeat > 0
            ? metronomeState.nextSubbeat
            : metronomeState.currentBeatsPerMeasure * metronomeState.currentSubdivision
    ) - 1,
    prevBeat: () => Math.floor(
        (
            (
                metronomeState.nextSubbeat > 0
                    ? metronomeState.nextSubbeat
                    : metronomeState.currentBeatsPerMeasure * metronomeState.currentSubdivision
            ) - 1
        ) / metronomeState.currentSubdivision
    ),
    nextBeatType: (): BeatTypes => metronomeState.nextSubbeat === 0
        ? 'accent'
        : (
                metronomeState.nextSubbeat % metronomeState.currentSubdivision === 0
                    ? 'normal'
                    : 'sub'
            ),
    currentTimeout: () => 60000 / (metronomeState.currentTempo * metronomeState.currentSubdivision),
    newTimeout: () => 60000 / (metronomeState.newTempo * metronomeState.newSubdivision)
})

let interval: number | null = null

const intervalCallback = () => {
    playBeat(metronomeDerivedState.nextBeatType)

    const subbeatsCount = metronomeState.currentBeatsPerMeasure * metronomeState.currentSubdivision
    metronomeState.nextSubbeat = (metronomeState.nextSubbeat + 1) % subbeatsCount

    // console.log('!', metronomeDerivedState.prevSubbeat)

    if (
        metronomeState.nextSubbeat === 1 && (
            metronomeState.newTempo !== metronomeState.currentTempo
            || metronomeState.newBeatsPerMeasure !== metronomeState.currentBeatsPerMeasure
            || metronomeState.newSubdivision !== metronomeState.currentSubdivision
        )
    ) {
        clearInterval(interval!)
        interval = setInterval(intervalCallback, metronomeDerivedState.newTimeout)
        metronomeState.currentTempo = metronomeState.newTempo
        metronomeState.currentBeatsPerMeasure = metronomeState.newBeatsPerMeasure
        metronomeState.currentSubdivision = metronomeState.newSubdivision
    }
}

effect(() => {
    if (metronomeState.isPlaying) {
        if (interval !== null) return

        interval = setInterval(intervalCallback, metronomeDerivedState.newTimeout)
        metronomeState.currentTempo = metronomeState.newTempo
        metronomeState.currentBeatsPerMeasure = metronomeState.newBeatsPerMeasure
        metronomeState.currentSubdivision = metronomeState.newSubdivision
        metronomeState.nextSubbeat = 0
        intervalCallback()
    } else if (interval !== null) {
        clearInterval(interval)
        interval = null
        metronomeState.nextSubbeat = -1
    }
})
