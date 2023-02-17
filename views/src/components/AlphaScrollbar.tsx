import React from 'react'
import styled from 'styled-components'
import { addActive } from './tools/Utils'

interface Props {
    mainDivRef: React.MutableRefObject<HTMLDivElement>
    childrenDivsRef: React.MutableRefObject<HTMLDivElement[]>
}

const AlphaScrollbar: React.FC<Props> = ({ mainDivRef, childrenDivsRef }) => {
    const steps = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#", "/"]
    const [index, setIndex] = React.useState(0)

    const handleScroll = (index: number) => {
        mainDivRef.current.scrollTop = childrenDivsRef.current[index].offsetTop;
    }

    React.useEffect(() => {
        const handler = () => {
            if (childrenDivsRef?.current) {
                childrenDivsRef?.current.forEach((el: HTMLElement, i: number) => {
                    const isVisible = el.offsetTop <= mainDivRef?.current.scrollTop && (el.offsetTop + el.offsetHeight) > mainDivRef?.current.scrollTop
                    if (isVisible) {
                        childrenDivsRef.current[i].classList.add('active')
                        setIndex(i)
                    } else childrenDivsRef.current[i].classList.remove('active')
                })
            }
        }

        const ref = mainDivRef?.current
        ref?.addEventListener('scroll', handler)
        return () => ref?.removeEventListener('scroll', handler)
    }, [mainDivRef, childrenDivsRef])

    return (
        <Scrollbar>
            {steps.map((step, i) => {
                return <div key={i} className={addActive(index === i)} onClick={() => handleScroll(i)}>{step}</div>
            })}
        </Scrollbar>
    )
}

export default AlphaScrollbar

const Scrollbar = styled.div`
    display          : flex;
    flex-direction   : column;
    align-items      : center;
    justify-content  : space-between;
    cursor           : pointer;
    background-color : var(--x-light);
    padding          : 6px 0;
    margin           : 5px 0;
    border-radius    : var(--rounded-full);
    
    div {
        font-size : 11px;
        padding   : 0 4px;
        
        &:hover,
        &.active {
            color : var(--primary);
        }
    }
`