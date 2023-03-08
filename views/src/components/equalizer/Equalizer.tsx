import React from 'react'
import styled from 'styled-components'
import { PlayerContext } from '../../AppContext'
import Icon from '../tools/icons/Icon'
import Modal from '../tools/Modal'
import EqualizerInput from './EqualizerInput'
import usePlayer from '../functions/usePlayer'
import { addActive, addClass } from '../tools/Utils'

const Equalizer = () => {
    const { player, audioContext, source } = React.useContext(PlayerContext)
    const { volume } = usePlayer(player)

    const [open, setOpen] = React.useState<boolean>(false)
    const [equalizer, setEqualizer] = React.useState<Record<string, number>>({ treble: 0, trebleMid: 0, middle: 0, midBass: 0, bass: 0 })
    const [frequencies, setFrequencies] = React.useState<Record<string, Record<string, any>>>({ treble: {}, trebleMid: {}, middle: {}, midBass: {}, bass: {} })

    const [powered, setPowered] = React.useState<boolean>(true)
    const [EQConnected, setEQConnected] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (!EQConnected) {
            if (audioContext && source) {
                let treble = audioContext.createBiquadFilter();
                let trebleMid = audioContext.createBiquadFilter();
                let middle = audioContext.createBiquadFilter();
                let midBass = audioContext.createBiquadFilter();
                let bass = audioContext.createBiquadFilter();

                source.connect(treble);
                treble.connect(trebleMid);
                trebleMid.connect(middle);
                middle.connect(midBass);
                midBass.connect(bass);
                bass.connect(audioContext.destination);

                treble.type = "highshelf";
                treble.frequency.value = 14000;
                treble.gain.value = equalizer.treble;

                trebleMid.type = "peaking";
                trebleMid.frequency.value = 3600;
                trebleMid.gain.value = equalizer.trebleMid;

                middle.type = "peaking";
                middle.frequency.value = 910;
                middle.gain.value = equalizer.middle;

                midBass.type = "peaking";
                midBass.frequency.value = 230;
                midBass.gain.value = equalizer.midBass;

                bass.type = "lowshelf";
                bass.frequency.value = 60;
                bass.gain.value = equalizer.bass;

                const freqs = { treble, trebleMid, middle, midBass, bass }
                setFrequencies(freqs)

                Object.entries(freqs)
                    .forEach(([key, value]: any) => {
                        const input = document.getElementById(key)
                        input?.addEventListener('change', (e) => {
                            return value.gain.value = (e.target as HTMLInputElement).value
                        })
                    })

                setEQConnected(true)
            }
        }
    }, [audioContext, source])

    /**
     * 
     */

    const resetEqualizer = () => {
        setEqualizer({ treble: 0, trebleMid: 0, middle: 0, midBass: 0, bass: 0 })
        Object.entries(frequencies).forEach(([_, value]: any) => {
            return value.gain.value = 0
        })
    }

    const powerEqualizer = () => {
        if (powered) {
            setPowered(false)
            Object.entries(frequencies).forEach(([_, value]: any) => {
                return value.gain.value = 0
            })
        } else {
            setPowered(true)
            Object.entries(frequencies).forEach(([key, value]: any) => {
                return value.gain.value = equalizer[key]
            })
        }
    }

    return (
        <EqualizerContainer>
            <Toggle onClick={() => setOpen(!open)} className={addActive(open)}>
                <Icon name="Equalizer" />
            </Toggle>
            <Modal open={open} setOpen={setOpen}>
                <h3>Equalizer</h3>
                <div className='__equalizer-top'>
                    <RealisticButton className={addActive(powered)} onClick={() => powerEqualizer()}>
                        <Icon name="Power" />
                    </RealisticButton>
                    <div className='volume__range'>
                        {!volume.muted ? (
                            <Icon name="VolumeFull" onClick={() => player!.volume = 0} />
                        ) : (
                            <Icon name="Mute" onClick={() => player!.volume = 1} />
                        )}
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume.rate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => player!.volume = Number(e.target.value)}
                            style={{ backgroundSize: `${(volume.rate * 100) / 1}% 100%` }}
                        />
                    </div>
                    <RealisticButton onClick={() => resetEqualizer()}>
                        <Icon name="ArrowCircular" />
                    </RealisticButton>
                </div>
                <EqualizerBoard className={addClass(!powered, 'grayscaled')}>
                    <div className='__range-hz'>
                        <div>60Hz</div>
                        <div>230Hz</div>
                        <div>910Hz</div>
                        <div>3.6kHz</div>
                        <div>14kHz</div>
                    </div>
                    <div className='__buffer'>
                        {Object.entries(equalizer).map(([key, value]: any, i: number) => {
                            return (
                                <div className='__range' key={i}>
                                    <EqualizerInput
                                        id={key}
                                        value={value}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setEqualizer(prev => ({ ...prev, [key]: Number(e.target.value) }))
                                        }}
                                        style={{ backgroundSize: `${(value * 4.166)}% 100%` }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className='__range-db'>
                        {Object.values(equalizer).map((value: number, i: number) => {
                            return <div key={i}>{value}db</div>
                        })}
                    </div>
                </EqualizerBoard>
            </Modal>
        </EqualizerContainer>
    )
}

export default Equalizer

const EqualizerBoard = styled.div`
    position : relative;
    width    : 100%;

    &.grayscaled {
        filter : grayscale(1);
    }

    .__range-hz {
        margin-top : 20px;
    }

    .__range-hz,
    .__range-db {
        display     : flex;
        user-select : none;
        div {
            width            : 45px;
            padding          : 5px 5px;
            margin           : 0 auto;
            text-align       : center;
            font-size        : 12px;
            line-height      : 12px;
            background-color : #131313;
            border-radius    : var(--rounded-full);
            box-shadow       : 0px 1px 0px 0px rgba(250, 250, 250, 0.1), inset 0px 1px 2px rgba(0, 0, 0, 0.5);
            font-family: var(--font-fam-list);
        }
    }

    .__buffer {
        display : flex;
        margin  : 10px 0;
    }

    .__range {
        position : relative;
        width    : 50px;
        height   : 140px;
        margin   : 0 auto;
    }

    .__equalizer {
        position  : absolute;
        left      : 50%;
        bottom    : 36%;
        transform : translateX(-50%) rotate(270deg);
    }
`

const Toggle = styled.button`
    position        : absolute;
    right           : 20px;
    top             : 17px;
    height          : 32px;
    width           : 32px;
    padding         : 7px;
    display         : flex;
    align-items     : center;
    justify-content : center;
    background      : transparent;
    color           : var(--primary);
    border-radius   : var(--rounded-md);
    cursor          : pointer;
    z-index         : 1000;

    &:hover,
    &.active {
        background : rgba(var(--primary-rgb), 0.12);
    }
`

const EqualizerContainer = styled.div`
    .modal_container  {
        width      : 330px;
        height     : auto;
        max-height : unset;
        min-height : 340px;
        background : radial-gradient(70% 70%, #232323 6%, #141414 90%);

        @media (max-width: 576px) {
            padding: 15px;
        }
    }
    
    .__equalizer-top {
        display         : flex;
        align-items     : center;
        justify-content : space-between;
        margin-top      : 15px;
    }

    .volume__range {
        display          : flex;
        align-items      : center;
        height           : 100%;
        width            : 150px;
        cursor           : pointer;
        svg {
            margin-right : 10px;
        }
    }
`

const RealisticButton = styled.button`
    position         : relative;
    color            : rgb(37,37,37);
    display          : flex;
    align-items      : center;
    justify-content  : center;
    background-color : rgb(83, 87, 93);
    width            : 30px;
    height           : 30px;
    border           : 0;
    border-radius    : 30px;
    text-align       : center;
    transition       : color 350ms, text-shadow 350ms;
    box-shadow       : 0px 1px 0px 0px rgb(34, 34, 34), 0px 4px 10px 0px rgb(17, 17, 17), inset 0px 0px 2px 0px rgba(250, 250, 250, .2), inset 0px -12px 35px 0px rgba(0, 0, 0, .5);
    cursor           : pointer;

    &:before {
        content          : "";
        width            : 36px;
        height           : 36px;
        display          : block;
        z-index          : -2;
        position         : absolute;
        background-color : rgb(26, 27, 29);
        left             : -3px;
        top              : -3px;
        border-radius    : 40px;
        box-shadow       : 0px 1px 0px 0px rgba(250, 250, 250, 0.1), inset 0px 1px 2px rgba(0, 0, 0, 0.5);
    }

    svg {
        height : 18px;
        width  : 18px;
        color  : var(--text-secondary);
    }

    &.active {
        box-shadow       : 0px 0px 0px 0px rgb(34, 34, 34), 0px 4px 5px 0px rgb(17, 17, 17), inset 0px 1px 1px 0px rgba(250, 250, 250, .2), inset 0px -10px 35px 5px rgba(0, 0, 0, .5);
        background-color : rgb(83,87,93);

        svg {
            color : var(--primary);
        }
    }
`