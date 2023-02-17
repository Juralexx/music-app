import React from 'react'
import styled from 'styled-components'

const Logo = () => {
    return (
        <AppLogo>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="2400px" height="2400px" viewBox="0 0 2400 2400" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <rect x="0" y="0" width="2400" height="2400" />
                    <rect fill="currentColor" opacity="1" x="200" y="900" width="2000" height="1300" rx="200" />
                    <rect fill="currentColor" opacity="1" x="500" y="500" width="1400" height="200" rx="50" />
                    <rect fill="currentColor" opacity="1" x="700" y="100" width="1000" height="200" rx="50" />
                    <path width="2000" height="1300" d="M10.8333333,20 C9.82081129,20 9,19.3159906 9,18.4722222 C9,17.6284539 9.82081129,16.9444444 10.8333333,16.9444444 C11.0476105,16.9444444 11.2533018,16.9750785 11.4444444,17.0313779 L11.4444444,12.7916011 C11.4444444,12.4782408 11.6398662,12.2012404 11.9268804,12.1077729 L15.4407693,11.0331119 C15.8834716,10.8889438 16.3333333,11.2336005 16.3333333,11.7169402 L16.3333333,12.7916011 C16.3333333,13.1498215 15.9979332,13.3786009 15.7222222,13.4444444 C15.3255297,13.53918 14.3070112,13.7428837 12.6666667,14.0555556 L12.6666667,18.5035214 C12.6666667,18.5583862 12.6622174,18.6091837 12.6535404,18.6559869 C12.5446237,19.4131089 11.771224,20 10.8333333,20 Z" fill="currentColorr" />
                </g>
            </svg>
        </AppLogo>
    )
}

export default Logo

const AppLogo = styled.div`
    position : relative;
    height   : 60px;
    width    : 60px;
    color    : var(--primary);

    svg {
        height : 60px;
        width  : 60px;
    }
`