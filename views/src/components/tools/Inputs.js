import React from 'react'
// import { useClickOutside } from '../hooks/useClickOutside';
import Icon from './icons/Icon';
import styled from 'styled-components';

const inputProps = (props) => {
    return ({
        className: props.inputClassName,
        type: props.type,
        id: props.id,
        name: props.name,
        placeholder: props.placeholder,
        defaultValue: props.defaultValue,
        value: props.value,
        onChange: props.onChange,
        onInput: props.onInput,
        onClick: props.onClick,
        onBlur: props.onBlur,
        onFocus: props.onFocus,
        onKeyUp: props.onKeyUp,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        readOnly: props.readOnly,
        disabled: props.disabled,
        min: props.min,
        max: props.max
    })
}

export const IconInput = (props) => {
    const { useRef, value, className, icon, endIcon, cross, onClean, endIconClick } = props
    return (
        <InputIcon className={`${className ? "icon-input " + className : "icon-input"}`}>
            <input
                ref={useRef}
                {...inputProps(props)}
            />
            {icon &&
                <div className="start_icon">
                    {icon}
                </div>
            }
            {cross ? (
                (value && value.length > 0) ? (
                    <div onClick={onClean} className="svg_container">
                        <Icon name="Cross" className="cross" />
                    </div>
                ) : (
                    endIcon && (
                        <div className="end_icon" onClick={endIconClick}>
                            {endIcon}
                        </div>
                    )
                )
            ) : (
                endIcon && (
                    <div className="end_icon" onClick={endIconClick}>
                        {endIcon}
                    </div>
                )
            )}
        </InputIcon>
    )
}

const InputIcon = styled.div`
    position      : relative;
    width         : 350px;
    height        : 40px;
    color         : var(--input-text);
    background    : var(--input);
    border-radius : var(--rounded-full);

    input {
        display       : block;
        width         : 100%;
        height        : 100%;
        padding       : 9px 12px 6px 20px;
        border-radius : var(--rounded-full);
        outline       : none;
        background    : transparent;
        z-index       : 1;
        border        : none;
        color         : var(--input-text);
        border        : 1px solid var(--light-border);

        &:focus {
            + label {
                transform  : scale(0.75);
                top        : 4px;
                transition : 0.2s ease;
                padding    : 0 0 0 64px;
            }
        }

        &::placeholder {
            color : var(--placeholder);
        }
    }

    label {
        position         : absolute;
        top              : 15px;
        color            : var(--placeholder);
        padding          : 0 0 0 50px;
        transform        : scale(1);
        transform-origin : 0;
        transition       : 0.2s ease;
        z-index          : 0;
    }

    &.is_start_icon {
        input {
            padding : 6px 12px 6px 46px;
        }
    }
    &.is_end_icon {
        input {
            padding : 9px 46px 6px 20px;
        }
    }

    .start_icon {
        height           : 100%;
        position         : absolute;
        bottom           : 0;
        display          : flex;
        align-items      : center;
        padding          : 0 0 0 13px;
        transform        : scale(1);
        transform-origin : 0;

        svg {
            height : 20px;
            width  : 20px;
            color  : var(--placeholder);
        }
    }

    .end_icon {
        position  : absolute;
        right     : 15px;
        top       : 50%;
        transform : translateY(-50%);
        z-index   : 2;
        cursor    : pointer;

        svg {
            height : 20px;
            width  : 20px;
        }
    }

    .svg_container {
        position      : absolute;
        bottom        : 7px;
        right         : 10px;
        padding       : 5px;
        border-radius : 20px;
        cursor        : pointer;
        z-index       : 700;

        svg {
            height   : 16px;
            width    : 16px;
        }

        &:hover {
            background : var(--content-light);
        }
    }
`