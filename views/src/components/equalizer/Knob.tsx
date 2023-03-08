import React from 'react'
import styled from 'styled-components'

type KnobProps = {
    size?: number,
    numTicks?: number,
    degrees?: number,
    min?: number,
    max?: number,
    defaultValue?: number,
    onWheel?: (e: number) => void,
    firstActive?: boolean,
    color?: boolean,
    angled?: boolean
}

const Knob = (props: KnobProps) => {
    const {
        size = 100,
        numTicks = 25,
        degrees = 260,
        min = 1,
        max = 100,
        defaultValue = 1,
        onWheel = () => { },
        firstActive = false,
        color = true,
        angled = false
    } = props

    let fullAngle = degrees;
    let startAngle = (360 - degrees) / 2;
    let endAngle = startAngle + degrees;
    let margin = size * 0.12;

    const [currentDeg, setCurrentDeg] = React.useState<number>(startAngle)
    const [active, setActive] = React.useState(false)

    const renderTicks = () => {
        let ticks = [];
        const incr = fullAngle / numTicks;
        const tickSize = margin + size / 2;
        for (let deg = startAngle; deg <= endAngle; deg += incr) {
            const tick = {
                deg: deg,
                tickStyle: {
                    height: tickSize + 10,
                    minheight: tickSize + 10,
                    maxheight: tickSize + 10,
                    left: tickSize - 1,
                    top: angled ? tickSize + 2 : tickSize,
                    transform: `rotate(${deg}deg)`,
                    transformOrigin: "top",
                    boxShadow: firstActive && deg === startAngle ? 'inset 0 0 5px 2px #509eec, 0 0 0 1px #369' : 'unset'
                }
            };
            ticks.push(tick);
        }
        return ticks;
    };

    const getDeg = (props: any) => {
        const { cX, cY, pts } = props
        const x = cX - pts.x;
        const y = cY - pts.y;
        let deg = Math.atan(y / x) * 180 / Math.PI;
        if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
            deg += 90;
        } else {
            deg += 270;
        }
        let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
        return finalDeg;
    };

    const getValue = (currentDegree: number) => {
        let step = degrees / max
        let currentDegFromZero = currentDegree - startAngle
        const tickVal = currentDegFromZero / step
        if (tickVal < min) {
            return min
        } else {
            return Math.floor(tickVal)
        }
    }

    const startDrag = (e: any) => {
        e.preventDefault();
        if (!active) {
            setActive(true)
        }
        const knob = e.target.getBoundingClientRect();
        const pts = {
            x: knob.left + knob.width / 2,
            y: knob.top + knob.height / 2
        }

        const moveHandler = (e: any) => {
            const deg = getDeg({ cX: e.clientX, cY: e.clientY, pts })
            setCurrentDeg(getDeg({ cX: e.clientX, cY: e.clientY, pts }))
            if (currentDeg === startAngle) {
                setCurrentDeg(prev => prev - 1)
            }
            return onWheel(getValue(deg))
        }

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", moveHandler);
        });
    };

    const convertRange = (props: Record<string, number>) => {
        const { oldMin, oldMax, newMin, newMax, oldValue } = props
        return (oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
    }

    React.useEffect(() => {
        let startDegrees = Math.floor(convertRange({ oldMin: min, oldMax: max, newMin: startAngle, newMax: endAngle, oldValue: defaultValue }))
        setCurrentDeg(startDegrees)
    }, [defaultValue])

    const dcpy = (o: any) => { return JSON.parse(JSON.stringify(o)) }

    let kStyle = {
        width: size,
        height: size
    };
    let iStyle = dcpy(kStyle);
    let oStyle = dcpy(kStyle);
    oStyle.margin = margin;
    if (color) {
        oStyle.backgroundImage = "radial-gradient(100% 70%, hsl(210, " + currentDeg + "%, " + currentDeg / 5 + "%), hsl(" + Math.random() * 100 + ", 20%," + currentDeg / 36 + "%))";
    }
    iStyle.transform = `rotate(${currentDeg}deg)`;

    return (
        <DialKnob className={active ? "knob active" : 'knob'} onClick={() => () => setActive(true)} onMouseLeave={() => setActive(false)}>
            <div className="ticks">
                {numTicks &&
                    renderTicks().map((tick, i) => (
                        <div
                            key={i}
                            className={"tick" + (tick.deg <= currentDeg ? " active" : "")}
                            style={tick.tickStyle}
                        />
                    ))}
            </div>
            <div className="knob outer" style={oStyle} onMouseDown={startDrag}>
                <div className="knob inner" style={iStyle}>
                    <div className="grip" />
                </div>
            </div>
        </DialKnob>
    );
}

export default Knob

const DialKnob = styled.div`
    .knob,
    &.knob {
        display     : flex;
        flex-shrink : 0;
        position    : relative;
        cursor      : grab;

        &.active {
            cursor : grabbing;
            * {
                cursor : grabbing;
            }
        }

        .ticks {
            position : absolute;
        }

        .tick {
            flex-shrink : 0;
            position    : absolute;
            background  : black;
            box-shadow  : inset 0 0 0 0 black;
            width       : 3px;
            /* transition : box-shadow 0.5s; */
            &.active {
                box-shadow : inset 0 0 5px 2px #509eec, 0 0 0 1px #369 !important;
            }
        }

        &.outer {
            border-radius    : 50%;
            border           : 1px solid #222;
            border-bottom    : 1px solid #222;
            /* border-bottom    : 5px solid #222; */
            background-image : radial-gradient(100% 70%, #232323 6%, #141414 90%);
            /* background-image : radial-gradient(100% 70%, #666 6%, #333 90%); */
            box-shadow       : 0 5px 15px 2px black, 0 0 5px 3px black, 0 0 0 9px #1c1c1c;
            /* box-shadow       : 0 5px 15px 2px black, 0 0 5px 3px black, 0 0 0 12px #444; */
        }

        &.inner {
            border-radius : 50%;
        }

        .grip {
            position      : absolute;
            width         : 6%;
            height        : 6%;
            bottom        : 2%;
            left          : 50%;
            transform     : translateX(-50%);
            border-radius : 50%;
            background    : #509eec;
            box-shadow    : 0 0 3px 1px black;
        }
    }
`