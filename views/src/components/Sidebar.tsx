import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Icon from './tools/icons/Icon'
import { Logo } from './tools/Logo'
import Equalizer from './equalizer/Equalizer'

const Sidebar: React.FC = () => {
    return (
        <SideBar>
            <SideBarHeader>
                <Logo className='main__logo' />
                <p>Musics</p>
                <Equalizer />
            </SideBarHeader>
            <SideBarBody>
                <div className='side__title'>Menu</div>
                <NavLink to="/" className='side__item'>
                    <Icon name="LayoutRightPanelTwo" /> <span>Home</span>
                </NavLink>
                <NavLink to="/songs" className='side__item'>
                    <Icon name="MusicFile" /> <span>Songs</span>
                </NavLink>
                <NavLink to="/artists" className='side__item'>
                    <Icon name="Playlist2" /> <span>Artists</span>
                </NavLink>
                <NavLink to="/albums" className='side__item'>
                    <Icon name="CD" /> <span>Albums</span>
                </NavLink>
                <NavLink to="/playlists" className='side__item'>
                    <Icon name="Playlist" /> <span>Playlists</span>
                </NavLink>
            </SideBarBody>
        </SideBar>
    )
}

export default Sidebar

const SideBar = styled.div`
    position         : relative;
    width            : 20%;
    min-width        : 20%;
    max-width        : 400px;
    height           : 100vh;
    background-color : var(--bar);
    box-shadow       : var(--shadow-dark);

    @media (max-width: 992px) {
        width     : 100%;
        max-width : 100%;
        min-width : unset;
        height    : auto;
        p {
            display : none;
        }
    }
`

const SideBarHeader = styled.div`
    display     : flex;
    align-items : center;
    padding     : 20px;

    @media(max-width: 992px) {
        padding : 20px 15px;
        .main__logo {
            margin-left : 8px;
        }
    }

    .main__logo {
        width        : 28px;
        height       : 28px;
        margin-right : 10px;
        color        : var(--primary);
    }

    p {
        margin-top  : 2px;
        font-size   : 18px;
        font-weight : 600;
    }
`

const SideBarBody = styled.div`
    @media(max-width: 992px) {
        display       : flex;
    }

    .side__title {
        font-size     : 18px;
        font-weight   : 600;
        padding       : 20px;

        @media (max-width: 992px) {
            display : none;
        }
    }

    .side__item {
        display     : flex;
        align-items : center;
        padding     : 17px 20px;
        color       : var(--text);

        span {
            padding-top : 4px;
        }

        svg {
            width        : 20px;
            height       : 20px;
            margin-right : 18px;
            color        : var(--svg);
        }

        &:hover, &.active {
            color      : var(--text);
            background : var(--light);
            svg {
                color : var(--primary);
            }
        }

        @media(max-width: 992px) {
            height          : 40px;
            width           : 100%;
            justify-content : center;
            border-bottom   : 1px solid var(--light-border);

            &:hover, &.active {
                color         : var(--primary);
                background    : transparent;
                border-bottom : 1px solid var(--primary);
            }
        }

        @media(max-width: 768px) {
            svg {
                display : none;
            }
        }

        @media (max-width: 576px) {
            padding : 0 7px;
        }
    }
`