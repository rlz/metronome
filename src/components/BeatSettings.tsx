export const BeatSettings = ({
    beatsPerMeasure,
    subdivision,
    onBeatsChange,
    onSubdivisionChange
}: {
    beatsPerMeasure: number
    subdivision: number
    onBeatsChange: (beats: number) => void
    onSubdivisionChange: (subdivision: number) => void
}) => (
    <div className={'beat-settings'}>
        <div>
            <label>
                {'Beats per Measure:'}
                {beatsPerMeasure}
            </label>
            <select value={beatsPerMeasure} onChange={e => onBeatsChange(Number(e.target.value))}>
                {[2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>
        </div>
        <div>
            <label>
                {'Subdivision:'}
                {subdivision}
            </label>
            <select value={subdivision} onChange={e => onSubdivisionChange(Number(e.target.value))}>
                {[1, 2, 4].map(n => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>
        </div>
    </div>
)
