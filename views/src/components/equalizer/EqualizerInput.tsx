import React from 'react'
import styled, { css } from 'styled-components'

interface Props {
    value: number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    style: React.CSSProperties,
    id?: string
}

const EqualizerInput = ({ value, onChange, style, id }: Props) => {
    return (
        <Input
            id={id}
            className='__equalizer'
            type='range'
            step='1'
            max='5'
            min='-5'
            value={value}
            onChange={onChange}
            style={style}
        />
    )
}

export default EqualizerInput

const Thumb = css`
    padding          : 0;
    height           : 40px;
    width            : 0.9em;
    margin           : 0.05em;
    border-radius    : 0.4em;
    box-sizing       : border-box;
    background-color : var(--primary);
    cursor           : grab;
    box-shadow       : 
    -10em 0 0 0 rgba(var(--primary-rgb), 0.1),
    -9em 0 0 0 rgba(var(--primary-rgb), 0.2),
    -8em 0 0 0 rgba(var(--primary-rgb), 0.3),
    -7em 0 0 0 rgba(var(--primary-rgb), 0.4),
    -6em 0 0 0 rgba(var(--primary-rgb), 0.5),
    -5em 0 0 0 rgba(var(--primary-rgb), 0.6),
    -4em 0 0 0 rgba(var(--primary-rgb), 0.7),
    -3em 0 0 0 rgba(var(--primary-rgb), 0.8),
    -2em 0 0 0 rgba(var(--primary-rgb), 0.9),
    -1em 0 0 0 rgba(var(--primary-rgb), 1),
    1em 0 0 0 #181818,
    2em 0 0 0 #181818,
    3em 0 0 0 #181818,
    4em 0 0 0 #181818,
    5em 0 0 0 #181818,
    6em 0 0 0 #181818,
    7em 0 0 0 #181818,
    8em 0 0 0 #181818,
    9em 0 0 0 #181818;
`

const Input = styled.input`
    -webkit-appearance : none;
    display            : block;
    margin             : 0;
    padding            : 0;
    font-size          : inherit;
    width              : 140px;
    height             : 40px;
    border-radius      : 0.25em;
    border             : 0.2em solid var(--content-light);
    background-color   : var(--content-light);
    background-size    : 100% 100%;
    background-repeat  : no-repeat;
    overflow           : hidden;
    cursor             : pointer;
    transition         : box-shadow 0.2s linear;
    box-shadow         : 0 0 0 0 transparent;
    display            : inline-block;

    &:hover  {
        box-shadow : 0 0 0 0.15em var(--primary);
    }

    &::-webkit-slider-runnable-track,
    &::-moz-range-track,
    &::-ms-track {
        border     : none;
        background : none;
        height     : 140px;
        width      : 100%;
    }

    &::-webkit-slider-thumb {
        ${Thumb}
    }
    &::-moz-range-thumb {
        ${Thumb}
    }
    &::-ms-thumb {
        ${Thumb}
    }
    &::-webkit-slider-runnable-track,
    &::-webkit-slider-thumb {
        -webkit-appearance : none;
    }
    &::-ms-track {
        color : transparent;
    }
    &::-ms-fill-lower,
    &::-ms-fill-upper,
    &::-ms-tooltip {
        display : none;
    }
`