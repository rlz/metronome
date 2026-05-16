import { persist } from 'valtio-persist'
import { computed, effect } from 'valtio-reactive'

import { BeatTypes, playBeat } from './audio.ts'

const initialMetronomeState = {
    isPlaying: false,
    currentTempo: 90,
    newTempo: 90,
    currentBeatsPerMeasure: 4,
    newBeatsPerMeasure: 4,
    currentSubdivision: 1,
    newSubdivision: 1,
    nextSubbeat: -1,

    autoTempo: false,
    startTempo: 90,
    step: 5,
    stepAfter: 2,
    progress: 0,
    stepsCount: 10
}

type MetronomeStateType = typeof initialMetronomeState

let metronomeState: MetronomeStateType | null = null
let metronomeDerivedState: {
    prevSubbeat: number
    prevBeat: number
    nextBeatType: BeatTypes
    currentTimeout: number
    newTimeout: number
} | null = null

export function getMetronomeState() {
    if (metronomeState === null) throw Error('init metronome')
    return metronomeState
}

export function getMetronomeDerivedState() {
    if (metronomeDerivedState === null) throw Error('init metronome')
    return metronomeDerivedState
}

export async function initMetronome() {
    const { store: m } = await persist(initialMetronomeState, 'metronomeState')
    metronomeState = m

    const md = computed({
        prevSubbeat: () => (
            m.nextSubbeat > 0
                ? m.nextSubbeat
                : m.currentBeatsPerMeasure * m.currentSubdivision
        ) - 1,
        prevBeat: () => Math.floor(
            (
                (
                    m.nextSubbeat > 0
                        ? m.nextSubbeat
                        : m.currentBeatsPerMeasure * m.currentSubdivision
                ) - 1
            ) / m.currentSubdivision
        ),
        nextBeatType: (): BeatTypes => m.nextSubbeat === 0
            ? 'accent'
            : (
                    m.nextSubbeat % m.currentSubdivision === 0
                        ? 'normal'
                        : 'sub'
                ),
        currentTimeout: () => 60000 / (m.currentTempo * m.currentSubdivision),
        newTimeout: () => 60000 / (m.newTempo * m.newSubdivision)
    })
    metronomeDerivedState = md

    let interval: number | null = null

    const intervalCallback = () => {
        playBeat(md.nextBeatType)

        const subbeatsCount = m.currentBeatsPerMeasure * m.currentSubdivision
        m.nextSubbeat = (m.nextSubbeat + 1) % subbeatsCount

        // console.log('!', metronomeDerivedState.prevSubbeat)

        if (m.nextSubbeat === 0 && m.autoTempo && m.progress < m.stepsCount * m.stepAfter) {
            m.progress++
            if (m.progress % m.stepAfter === 0) {
                m.newTempo += m.step
            }
        }

        if (
            m.nextSubbeat === 1 && (
                m.newTempo !== m.currentTempo
                || m.newBeatsPerMeasure !== m.currentBeatsPerMeasure
                || m.newSubdivision !== m.currentSubdivision
            )
        ) {
            clearInterval(interval!)
            interval = setInterval(intervalCallback, md.newTimeout)
            m.currentTempo = m.newTempo
            m.currentBeatsPerMeasure = m.newBeatsPerMeasure
            m.currentSubdivision = m.newSubdivision
        }
    }

    effect(() => {
        if (m.isPlaying) {
            if (interval !== null) return

            interval = setInterval(intervalCallback, md.newTimeout)
            m.currentTempo = m.newTempo
            m.currentBeatsPerMeasure = m.newBeatsPerMeasure
            m.currentSubdivision = m.newSubdivision
            m.nextSubbeat = 0
            intervalCallback()
        } else if (interval !== null) {
            clearInterval(interval)
            interval = null
            m.nextSubbeat = -1
        }
    })
}
