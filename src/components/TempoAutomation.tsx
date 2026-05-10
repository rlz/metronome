export const TempoAutomation = ({
    automation,
    onChange
}: {
    automation: {
        enabled: boolean
        startTempo: number
        endTempo: number
        increment: number
        interval: number
    }
    onChange: (automation: any) => void
}) => (
    <div className={'tempo-automation'}>
        <h3>{'Tempo Automation'}</h3>
        <label>
            <input
                type={'checkbox'}
                checked={automation.enabled}
                onChange={e => onChange({ ...automation, enabled: e.target.checked })}
            />
            {'Enable'}
        </label>
        {automation.enabled && (
            <>
                <div>
                    <label>
                        {'Start Tempo:'}
                        {automation.startTempo}
                    </label>
                    <input
                        type={'range'}
                        min={'40'}
                        max={'240'}
                        value={automation.startTempo}
                        onChange={e => onChange({ ...automation, startTempo: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label>
                        {'End Tempo:'}
                        {automation.endTempo}
                    </label>
                    <input
                        type={'range'}
                        min={'40'}
                        max={'240'}
                        value={automation.endTempo}
                        onChange={e => onChange({ ...automation, endTempo: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label>
                        {'Increment:'}
                        {automation.increment}
                    </label>
                    <input
                        type={'number'}
                        min={'1'}
                        max={'10'}
                        value={automation.increment}
                        onChange={e => onChange({ ...automation, increment: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label>
                        {'Interval (seconds):'}
                        {automation.interval}
                    </label>
                    <input
                        type={'number'}
                        min={'1'}
                        max={'60'}
                        value={automation.interval}
                        onChange={e => onChange({ ...automation, interval: Number(e.target.value) })}
                    />
                </div>
            </>
        )}
    </div>
)
