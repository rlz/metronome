import { useCallback, useEffect, useRef, useState } from 'react'

import type { MetronomeState, TempoAutomation } from '../types/metronome.ts'
import { playBeat as pb } from '../utils/audio.ts'
import { calculateInterval, calculateNextTempo } from '../utils/tempo.ts'

export const useMetronome = () => {
    const [state, setState] = useState<MetronomeState>({
        isPlaying: false,
        tempo: 120,
        beatsPerMeasure: 4,
        currentBeat: 0,
        subdivision: 1
    })

    const [automation, setAutomation] = useState<TempoAutomation>({
        enabled: false,
        startTempo: 120,
        endTempo: 180,
        duration: 60,
        increment: 1,
        interval: 10
    })

    const intervalRef = useRef<number | null>(null)
    const automationIntervalRef = useRef<number | null>(null)

    const playBeat = useCallback(() => {
        pb(state.currentBeat === 0)
        setState(prev => ({
            ...prev,
            currentBeat: (prev.currentBeat + 1) % prev.beatsPerMeasure
        }))
    }, [state.currentBeat, state.beatsPerMeasure])

    const startMetronome = useCallback(() => {
        playBeat()

        const interval = calculateInterval(state.tempo)
        intervalRef.current = window.setInterval(playBeat, interval)

        setState(prev => ({ ...prev, isPlaying: true }))
    }, [state.tempo, playBeat])

    const stopMetronome = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        if (automationIntervalRef.current) {
            clearInterval(automationIntervalRef.current)
            automationIntervalRef.current = null
        }
        setState(prev => ({
            ...prev,
            isPlaying: false,
            currentBeat: 0,
            tempo: automation.enabled ? automation.startTempo : prev.tempo
        }))
    }, [automation.enabled, automation.startTempo])

    useEffect(() => {
        if (state.isPlaying && automation.enabled && automation.interval > 0) {
            automationIntervalRef.current = window.setInterval(() => {
                setState((prev) => {
                    const newTempo = calculateNextTempo(prev.tempo, automation.increment)
                    if (newTempo >= automation.endTempo) {
                        stopMetronome()
                        return prev
                    }
                    return { ...prev, tempo: newTempo }
                })
            }, automation.interval * 1000)
        }

        return () => {
            if (automationIntervalRef.current) {
                clearInterval(automationIntervalRef.current)
            }
        }
    }, [state.isPlaying, automation, stopMetronome])

    useEffect(() => {
        if (state.isPlaying && intervalRef.current) {
            clearInterval(intervalRef.current)
            const interval = calculateInterval(state.tempo)
            intervalRef.current = window.setInterval(playBeat, interval)
        }
    }, [state.tempo, state.isPlaying, playBeat])

    const togglePlay = useCallback(() => {
        if (state.isPlaying) {
            stopMetronome()
        } else {
            startMetronome()
        }
    }, [state.isPlaying, startMetronome, stopMetronome])

    const setTempo = useCallback((tempo: number) => {
        setState(prev => ({ ...prev, tempo }))
    }, [])

    const setBeatsPerMeasure = useCallback((beats: number) => {
        setState(prev => ({ ...prev, beatsPerMeasure: beats, currentBeat: 0 }))
    }, [])

    const setSubdivision = useCallback((subdivision: number) => {
        setState(prev => ({ ...prev, subdivision }))
    }, [])

    return {
        state,
        automation,
        togglePlay,
        setTempo,
        setBeatsPerMeasure,
        setSubdivision,
        setAutomation
    }
}
