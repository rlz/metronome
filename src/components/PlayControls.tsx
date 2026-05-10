export const PlayControls = ({
    isPlaying,
    onTogglePlay
}: {
    isPlaying: boolean
    onTogglePlay: () => void
}) => (
    <div className={'play-controls'}>
        <button onClick={onTogglePlay}>
            {isPlaying ? 'Stop' : 'Play'}
        </button>
    </div>
)
