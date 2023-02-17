import React from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../hooks/useClickOutside';
import Icon from '../icons/Icon';
import { addActive } from '../Utils';
import { ThemeContext } from './ThemeContextWrapper';

const ThemeToggle = () => {
    const { theme, handleTheme } = React.useContext(ThemeContext)
    const themeRef = React.useRef()
    const [open, setOpen] = React.useState(false)
    useClickOutside(themeRef, () => setOpen(false))

    const changeTheme = (choice) => {
        handleTheme(choice)
        setOpen(false)
    }

    return (
        <ThemeMenu ref={themeRef}>
            <ThemeContainer>
                <Toggle onClick={() => setOpen(!open)} className={addActive(open)}>
                    {theme?.theme === 'dark' ? <Icon name="Moon" /> : <Icon name="Sun" />}
                </Toggle>
                {open &&
                    <div className='theme-menu'>
                        <div className={`theme-choice ${addActive(theme.preference === 'light')}`}
                            onClick={() => changeTheme('light')}>
                            <Icon name="Sun" /> Clair
                        </div>
                        <div className={`theme-choice ${addActive(theme.preference === 'dark')}`}
                            onClick={() => changeTheme('dark')}>
                            <Icon name="Moon" /> Sombre
                        </div>
                        <div className={`theme-choice ${addActive(theme.preference === 'prefers-color-scheme')}`}
                            onClick={() => changeTheme('prefers-color-scheme')}>
                            <Icon name="Computer" /> Système
                        </div>
                    </div>
                }
            </ThemeContainer>
        </ThemeMenu>
    )
}

export default ThemeToggle

const ThemeMenu = styled.div`
    position : absolute;
    right    : 20px;
    top      : 17px;
    z-index  : 1000;
`

const ThemeContainer = styled.div`
    position : relative;

    .theme-menu {
        position      : absolute;
        top           : 110%;
        right         : -50%;
        width         : 144px;
        padding       : 5px 0;
        background    : var(--content);
        border-radius : var(--rounded-sm);
        box-shadow    : var(--shadow-two), var(--shadow-relief);

        .theme-choice {
            display     : flex;
            align-items : center;
            padding     : 4px 8px;
            cursor      : pointer;
            font-weight : 500;

            svg {
                height       : 24px;
                width        : 24px;
                margin-right : 8px;
                color        : var(--svg-x-light);
            }

            &:hover, &.active {
                background : rgba( var(--primary-rgb), 0.12);
                svg {
                    color : var(--primary);
                }
            }
        }
    }
`

const Toggle = styled.button`
    background      : transparent;
    height          : 34px;
    width           : 34px;
    padding         : 4px;
    display         : flex;
    align-items     : center;
    justify-content : center;
    color           : var(--primary);
    cursor          : pointer;
    border-radius   : var(--rounded-md);
    z-index         : 1000;

    &:hover,
    &.active {
        background : rgba(var(--primary-rgb), 0.12);
    }
`