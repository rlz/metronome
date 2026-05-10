import { useMetronome } from '../hooks/useMetronome.ts'
import { BeatSettings } from './BeatSettings.tsx'
import { PlayControls } from './PlayControls.tsx'
import { TempoAutomation } from './TempoAutomation.tsx'
import { TempoControl } from './TempoControl.tsx'

export const Metronome = () => {
    const { state, automation, togglePlay, setTempo, setBeatsPerMeasure, setSubdivision, setAutomation } = useMetronome()

    return (
        <div className={'metronome'}>
            <h1>{'Metronome'}</h1>
            <TempoControl tempo={state.tempo} onChange={setTempo} />
            <BeatSettings
                beatsPerMeasure={state.beatsPerMeasure}
                subdivision={state.subdivision}
                onBeatsChange={setBeatsPerMeasure}
                onSubdivisionChange={setSubdivision}
            />
            <PlayControls isPlaying={state.isPlaying} onTogglePlay={togglePlay} />
            <TempoAutomation automation={automation} onChange={setAutomation} />
            <div className={'beat-indicator'}>
                {Array.from({ length: state.beatsPerMeasure }).map((_, i) => (
                    <div
                        key={i}
                        className={`beat-dot ${state.currentBeat === i ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    )
}
