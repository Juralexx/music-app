import React from 'react'
import styled from 'styled-components';
import { usePopper } from "react-popper";
import { useClickOutside } from './hooks/useClickOutside';
import useMediaQuery from './hooks/useMediaQuery';
import { useLongPress } from './hooks/useLongPress';
import Icon from './icons/Icon';
import { addClass } from './Utils';

const ToolsMenu = (props) => {
    const { className, btnClassName, disabled, onClick, placement, mobile, mobileFull } = props
    const [open, setOpen] = React.useState(false)
    const ref = React.useRef()
    useClickOutside(ref, () => setOpen(false))
    const xs = useMediaQuery('(max-width: 576px)')

    const popperElRef = React.useRef(null);
    const [targetElement, setTargetElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(popperElRef.current);

    const { styles, attributes } = usePopper(targetElement, popperElement, {
        placement: placement || "left-start",
    })

    React.useEffect(() => {
        if (!mobileFull) {
            if (open)
                setPopperElement(popperElRef.current)
        } else {
            if (!xs)
                if (open)
                    setPopperElement(popperElRef.current)
        }
    }, [open, mobileFull, xs])

    const longPressProps = useLongPress({
        onClick: () => !xs ? setOpen(!open) : {},
        onLongPress: () => xs ? setOpen(true) : {},
    })

    return (
        !mobile ? (
            <Menu ref={ref} className={className} onClick={onClick}>
                <div
                    className={`tools__menu ${addClass(open, 'active')}`}
                    onClick={() => setOpen(false)}
                    ref={popperElRef}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    {props.children}
                </div>
                {props.target ? (
                    <div ref={setTargetElement} onClick={() => setOpen(!open)}>
                        {props.target}
                    </div>
                ) : (
                    <button
                        className={`${btnClassName ? "tools__btn " + btnClassName : "tools__btn"} ${addClass(open, 'active')}`}
                        ref={setTargetElement}
                        disabled={disabled}
                        onClick={() => setOpen(!open)}
                    >
                        <Icon name="ThreeDots" />
                    </button>
                )}
            </Menu>
        ) : (
            !xs ? (
                <Menu ref={ref} className={className} onClick={onClick}>
                    <div
                        className={`tools__menu ${addClass(open, 'active')}`}
                        onClick={() => setOpen(false)}
                        ref={popperElRef}
                        style={styles.popper}
                        {...attributes.popper}
                    >
                        {props.children}
                    </div>
                    {props.target ? (
                        <div ref={setTargetElement} onClick={() => setOpen(!open)}>
                            {props.target}
                        </div>
                    ) : (
                        <button
                            className={`${btnClassName ? "tools__btn " + btnClassName : "tools__btn"} ${addClass(open, 'active')}`}
                            ref={setTargetElement}
                            disabled={disabled}
                            onClick={() => setOpen(!open)}
                        >
                            <Icon name="ThreeDots" />
                        </button>
                    )}
                </Menu>
            ) : (
                <Menu
                    ref={ref}
                    className={`${className ? (mobileFull ? "mobile__full " + className : className) : (mobileFull && "mobile__full")}`}
                    onClick={onClick}
                >
                    <div className={`mobile-menu ${addClass(open, 'active')}`}>
                        <div className="mobile-menu-tools" onClick={() => setOpen(false)}>
                            {props.children}
                        </div>
                    </div>
                    {props.target ? (
                        <div onClick={() => setOpen(!open)}>
                            {props.target}
                        </div>
                    ) : (
                        !mobileFull ? (
                            <button
                                className={`${btnClassName ? "tools__btn " + btnClassName : "tools__btn"} ${addClass(open, 'active')}`}
                                disabled={disabled}
                                onClick={() => setOpen(!open)}
                            >
                                <Icon name="ThreeDots" />
                            </button>
                        ) : (
                            <button
                                className={`${btnClassName ? "tools__btn " + btnClassName : "tools__btn"}`}
                                disabled={disabled}
                                {...longPressProps}>
                            </button>
                        )
                    )}
                </Menu>
            )
        )
    )
}

export default ToolsMenu

const Menu = styled.div`
    .tools__btn {
        display          : flex;
        align-items      : center;
        justify-content  : center;
        height           : 28px;
        width            : 28px;
        background-color : transparent;
        border-radius    : var(--rounded-full);
        cursor           : pointer;

        &:hover,
        &.active {
            background-color : var(--content-light);
        }

        svg {
            height : 18px;
            width  : 18px;
        }

        &:disabled {
            opacity : 0.5;
        }
    }

    .tools__menu {
        position      : fixed;
        right         : 30px;
        padding       : 5px 0;
        background    : var(--content);
        border-radius : var(--rounded-md);
        box-shadow    : var(--shadow-smooth), var(--shadow-relief);
        visibility    : hidden;
        opacity       : 0;
        transition    : visibility .2s, opacity .5s;
        z-index       : 700;

        &.active {
            visibility : visible;
            opacity    : 1;
            transition : visibility .4s, opacity .4s;
        }

        > div,
        > a {
            display     : flex;
            align-items : center;
            min-width   : 220px;
            text-align  : left;
            padding     : 6px 14px;
            color       : var(--text);
            cursor      : pointer;

            svg {
                height       : 16px;
                width        : 16px;
                margin-right : 9px;
                color        : var(--svg-x-light);
            }

            a {
                display     : flex;
                align-items : center;
                width       : 100%;
                height      : 100%;
            }

            &:hover {
                background-color : var(--content-light);
                svg {
                    color : var(--primary);
                }
            }

            &.red {
                color : var(--red);
                svg {
                    color : var(--red);
                }
            }
        }

        &.mobile__full {
            position : absolute;
            display  : flex;
            width    : 100%;
            top      : 0;
            bottom   : 0;
            left     : 0;
            right    : 0;

            .tools__btn {
                width            : 100%;
                height           : 100%;
                border-radius    : 0;
                background-color : transparent;
                svg {
                    display : none;
                }
                &:hover {
                    background : none;
                }
            }
        }
        
        .menu-arrow {
            position   : relative;
            width      : 15px;
            height     : 15px;
            background : transparent;
            
            &::before {
                content    : '';
                position   : absolute;
                width      : 15px;
                height     : 15px;
                background : var(--menu);
                transform  : rotate(45deg);
            }
        }

        &[data-popper-placement^='top'] > .menu-arrow {
            bottom : -8px;

            &:before {
                border-top   : 1px solid var(--light-border);
                border-right : 1px solid var(--light-border);
            }
        }
        
        &[data-popper-placement^='bottom'] > .menu-arrow {
            top : -8px;

            &:before {
                border-top  : 1px solid var(--light-border);
                border-left : 1px solid var(--light-border);
            }
        }
        
        &[data-popper-placement^='left'] > .menu-arrow {
            right : -8px;

            &:before {
                border-top   : 1px solid var(--light-border);
                border-right : 1px solid var(--light-border);
            }
        }
        
        &[data-popper-placement^='right'] > .menu-arrow {
            left : -8px;
            
            &:before {
                border-top  : 1px solid var(--light-border);
                border-left : 1px solid var(--light-border);
            }
        }
    }

    .mobile-menu {
        display          : none;
        position         : fixed;
        min-width        : 100%;
        top              : unset;
        transform        : none;
        bottom           : -100px;
        left             : 0;
        right            : 0 !important;
        background-color : var(--content-light);
        z-index          : 1000;
        border-radius    : var(--rounded-lg) var(--rounded-lg) 0 0;
        box-shadow       : var(--shadow-top);
        visibility       : hidden;
        opacity          : 0;
        transition       : visibility .4s, opacity .4s, bottom .4s;

        &.active {
            visibility : visible;
            opacity    : 1;
            bottom     : 0;
            transition : visibility .4s, opacity .4s, bottom .4s;
        }

        .mobile-menu-tools {
            position         : relative;
            min-width        : 100%;
            top              : unset;
            transform        : none;
            bottom           : 0;
            left             : 0;
            right            : 0 !important;
            padding          : 10px 0;
            border           : none;
            border-radius    : 8px 8px 0 0;
            background-color : var(--content-light);

            div,
            a {
                display       : flex;
                align-items   : center;
                min-width     : 220px;
                text-align    : left;
                padding       : 8px 20px;
                color         : var(--text);
                cursor        : pointer;

                a {
                    display     : flex;
                    align-items : center;
                    width       : 100%;
                    height      : 100%;
                }

                svg {
                    height       : 16px;
                    width        : 16px;
                    margin-right : 9px;
                    color        : var(--svg-x-light);
                }

                &:hover {
                    background-color : var(--light);
                    svg {
                        color : var(--primary);
                    }
                }
            }
        }
    }

    @media(max-width: 576px) {
        .mobile-menu {
            display : block;
        }
    }
`