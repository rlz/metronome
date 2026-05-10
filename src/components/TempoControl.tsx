export const TempoControl = ({ tempo, onChange }: { tempo: number, onChange: (tempo: number) => void }) => (
    <div className={'tempo-control'}>
        <h2>
            {'Tempo:'}
            {tempo}
            {' '}
            {'BPM'}
        </h2>
        <input
            type={'range'}
            min={'40'}
            max={'240'}
            value={tempo}
            onChange={e => onChange(Number(e.target.value))}
        />
        <button onClick={() => onChange(Math.min(240, tempo + 1))}>{'+'}</button>
        <button onClick={() => onChange(Math.max(40, tempo - 1))}>{'-'}</button>
    </div>
)
