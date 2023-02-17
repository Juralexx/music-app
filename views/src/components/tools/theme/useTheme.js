import React from 'react'

const useTheme = () => {
    const [darkMode, setDarkMode] = React.useState(false)
    const themeStorage = JSON.parse(localStorage.getItem("theme"))

    React.useEffect(() => {
        if (themeStorage && themeStorage.theme === 'dark') {
            setDarkMode(true)
        } else setDarkMode(false)

        window.addEventListener('themeChange', () => {
            if (themeStorage && themeStorage.theme === 'dark') {
                setDarkMode(true)
            } else setDarkMode(false)
        })
    }, [themeStorage])

    return { darkMode }
}

export default useTheme