// import axios from "axios";

/**
 * Check if were at the root of the site
 */

export const isHome = window.location.pathname === '/'

/**
 * Redirect to the previous URL
 */

export const goBack = () => window.history.back()

/**
 * Redirect to the next URL
 */

export const goForward = () => window.history.forward()

/**
 * Add a body class
 * @param {*} className Class to add to body
 */

export const addBodyClass = (className) => {
    document.body.classList.add(className)
}

/**
 * Remove a body class
 * @param {*} className Class to remove from body
 */

export const removeBodyClass = (className) => {
    document.body.classList.remove(className)
}

/**
 * Replace first body class by the second
 * @param {*} classToAdd Class to add
 * @param {*} classToRemove Class to remove
 */

export const replaceBodyClass = (classToAdd, classToRemove) => {
    document.body.classList.add(classToAdd)
    document.body.classList.remove(classToRemove)
}

/**
 * If body class is active, removes it, else add it
 * @param {*} classToAdd Class to add or remove
 */

export const addAndRemoveBodyClass = (classToAdd) => {
    if (document.body.classList.contains(classToAdd)) {
        document.body.classList.remove(classToAdd)
    } else {
        document.body.classList.add(classToAdd)
    }
}

/**
 * Return the value of the required local storage key
 * @param {*} item Name of the storage item to get
 */

export const getStorage = (item) => {
    return localStorage.getItem(item)
}

/**
 * Sets the value of the pair identified by key to value
 * @param {*} item Name of the item
 * @param {*} value Value of the item
 */

export const setStorage = (item, value) => {
    return localStorage.setItem(item, value)
}

export const addLocalStorageArrayWithLimit = (item, newItems, limit) => {
    let isItem = JSON.parse(localStorage.getItem(item))

    if (!Array.isArray(isItem)) {
        localStorage.setItem(item, [])
    }

    if (isItem) {
        let store = JSON.parse(localStorage.getItem(item))
        if (store.length >= limit) {
            if (store.length > limit) {
                store.splice(0, limit - newItems.length)
                return localStorage.setItem(item, JSON.stringify([...store, ...newItems]))
            } else {
                let diff = newItems.length - store.length
                let newStore = store.splice(diff, store.length - 1)
                return localStorage.setItem(item, JSON.stringify([...newStore, ...newItems]))
            }
        } else {
            return localStorage.setItem(item, JSON.stringify([...store, ...newItems]))
        }
    } else {
        return localStorage.setItem(item, JSON.stringify(newItems))
    }
}

/**
 * Return a randam ID containing uppercases, lowercases, numbers and special chars.
 * @param {*} max Length of the required ID
 */

export const randomID = (max) => {
    const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
    const allUniqueChars = [..."~!@#$%^&*()_+-=[]\\{}|;:,./<>?"];
    const allNumbers = [..."0123456789"];

    const baseline = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha, ...allUniqueChars];

    const generator = (base, len) => {
        return [...Array(len)]
            .map(i => base[Math.random() * base.length | 0])
            .join('');
    }

    return generator(baseline, max)
}

/**
 * Return a randam ID containing lowercases, and numbers.
 * @param {*} max Length of the required ID
 */

export const randomNbLtID = (max) => {
    const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
    const allNumbers = [..."0123456789"];

    const baseline = [...allNumbers, ...allLowerAlpha];

    const generator = (base, len) => {
        return [...Array(len)]
            .map(i => base[Math.random() * base.length | 0])
            .join('');
    }

    return generator(baseline, max)
}

/**
 * Return a randam ID containing numbers.
 * @param {*} max Length of the required ID
 */

export const randomNbID = (max) => {
    const allNumbers = [..."0123456789"];
    const baseline = [...allNumbers];

    const generator = (base, len) => {
        return [...Array(len)]
            .map(i => base[Math.random() * base.length | 0])
            .join('');
    }

    return generator(baseline, max)
}

/**
 * remove all special chars from string
 * @param {*} string String to remove special chars from
 */

export const removeSpecialChars = (string) => {
    const noSpecialChars = string.replace(/[^\w ]/g, ' ');
    return noSpecialChars
}

/**
 * Check if string contains only letters, spaces and dashes (-)
 * @param {*} string String to check
 */

export const onlyLettersSpacesAndDashes = (string) => {
    // eslint-disable-next-line
    const regexp = new RegExp(/^[A-Za-z\s\-]+$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains only letters, numbers and dashes (-)
 * @param {*} string String to check
 */

export const onlyLettersNumbersAndDashes = (string) => {
    const regexp = new RegExp(/^(\w|-)+$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains letter.
 * @param {*} string String to check
 */

export const containsAnyLetters = (string) => {
    const regexp = new RegExp(/[a-zA-Z]/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains only letter.
 * @param {*} string String to check
 */

export const onlyLetters = (string) => {
    const regexp = new RegExp(/^[a-zA-Z]*$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains numbers.
 * @param {*} string String to check
 */

export const containsAnyNumbers = (string) => {
    const regexp = new RegExp(/[0-9]/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Check if string contains only numbers.
 * @param {*} string String to check
 */

export const onlyNumbers = (string) => {
    const regexp = new RegExp(/^[0-9]*$/)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Remove choosen characters from string
 * @param {*} str String to remove from
 * @param {*} char Character to remove
 */

export const replaceStr = (str, char) => {
    const string = str.replace(char, '')
    return string
}

/**
 * Replace choosen characters to another in string
 * @param {*} str String to remove from
 * @param {*} char Character to replace
 * @param {*} newChar Character that replace
 */

export const replaceChar = (str, char, newChar) => {
    const string = str.replace(char, newChar)
    return string
}

/**
 * Check if a string includes one of the mentioned elements
 * @param {*} string String to check
 * @param {*} elements Elements to find
 */

export const doesStringIncludes = (string, elements) => {
    let isElement = false
    for (var i = 0; i < elements.length; i++) {
        if (string.indexOf(elements[i]) !== -1) {
            isElement = true;
            break;
        }
    }
    return isElement
}

/**
 * Check if a string includes one of the mentioned elements, return the first element matching
 * @param {*} string String to check
 * @param {*} elements Elements to find
 */

export const findFirstWordContained = (string, elements) => {
    let isElement
    for (var i = 0; i < elements.length; i++) {
        if (string.indexOf(elements[i]) !== -1) {
            isElement = elements[i]
            break;
        }
    }
    return isElement
}

/**
 * Check email validity.
 * @param {*} email Email to check
 */

export const isEmailValid = (email) => {
    // eslint-disable-next-line
    const regexp = new RegExp(/^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i)
    if (regexp.test(email))
        return true
    else return false
}

/**
 * Check french phone validity.
 * @param {*} phone Phone number to check
 */

export const isPhoneValid = (phone) => {
    const regexp = new RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/)
    if (regexp.test(phone))
        return true
    else return false
}

/**
 * Check theme and return choosen values.
 * @param {*} light Light class to return
 * @param {*} dark Dark class to return
 */

export const checkTheme = (light, dark) => {
    const theme = localStorage.getItem("theme")
    if (theme !== null && theme === "light")
        return light
    else return dark
}

/**
 * Return date formated : dd mon. YYYY (ex: 12 janv. 2020)
 * @param {*} num Date to convert
 */

export const dateParser = (num) => {
    let options = { year: "numeric", month: "short", day: "2-digit" }
    let timestamp = Date.parse(num)
    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)
    return date.toString()
}

/**
 * Return date formated : dd mon. YYYY (ex: 12 janv.) without year.
 * @param {*} num Date to convert
 */

export const dateParserWithoutYear = (num) => {
    let options = { month: "short", day: "2-digit" }
    let timestamp = Date.parse(num)
    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)
    return date.toString()
}

/**
 * Return date formated : dd mon. YYYY (ex: 12 janv. 2020)
 * @param {*} num Date to convert
 */

export const numericDateParser = (num) => {
    let options = { year: "2-digit", month: "2-digit", day: "2-digit" }
    let timestamp = Date.parse(num)
    let date = new Date(timestamp).toLocaleDateString('fr-FR', options)
    return date.toString()
}

/**
 * Convert ISO date to navigator date input format.
 * @param {*} date Date to convert
 */

export const ISOtoNavigatorFormat = (date) => {
    return date.substring(0, 10)
}

/**
 * Return the difference between two dates in days, the number is always positive.
 * @param {*} first 
 * @param {*} second 
 */

export const diffBetweenDates = (first, second) => {
    let date1 = new Date(first);
    let date2 = new Date(second);
    let diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays
}

/**
 * Return the difference between two dates in days, if second dates is before the first date, return a negative number.
 * Ex: first: 23janv, second: 15janv = -8
 * @param {*} first 
 * @param {*} second 
 */

export const diffBetweenDatesNegativeIfLess = (first, second) => {
    return Math.round((new Date(second) - new Date(first)) / (1000 * 60 * 60 * 24));
}

/**
 * Converted duration to format hh:mm:ss
 * @param {*} number Duration number
 */

export function timeFormat(number) {
    const str = (~~(number / 60) + "").padStart(2, '0') + ":" + (~~((number / 60) % 1 * 60) + "").padStart(2, '0');
    return str;
}

/**
 * Return hours only : hh:mm.
 * @param {*} date Date to convert
 */

export const getHourOnly = (date) => {
    const hours = date.getUTCHours();
    const minutes = date.getMinutes();
    return (1 + ((hours - 1))) + "h" + minutes.toString().padStart(2, "0");
}

/**
 * Return the difference between to hours
 * @param {*} prev Passed hour
 * @param {*} current Current hour
 */

export const getHoursDiff = (prev, current) => {
    let hourDiff = new Date(current.createdAt) - new Date(prev.createdAt)
    let prevTimeDiff = (hourDiff % 86400000) / 3600000
    return prevTimeDiff
}

/**
 * Add one day to a date
 * @param {*} date Date to incremente
 */

export function addOneDay(date) {
    let newDate = new Date(date)
    return new Date(newDate.setDate(newDate.getDate() + 1))
}

/**
 * Map an array and return an array containing new dates only and index of it.
 * @param {*} arrayToMap Array to map
 */

export const keepNewDateOnly = (arrayToMap) => {
    let array = []
    arrayToMap.map((element, key) => {
        return (
            array = [...array, {
                index: key,
                date: element.date.substring(0, 10)
            }]
        )
    })
    let filteredArray = []
    array.filter(item => {
        let i = filteredArray.findIndex(element => (element.date === item.date));
        if (i <= -1) {
            filteredArray.push(item)
        }
        return null;
    });
    return filteredArray
}

/**
 * Converte date to locale date
 * @param {*} date Date to convert
 */

export const convertToLocalDate = (date) => {
    let localDate = date.toLocaleDateString('fr-FR').split('/').reverse().join('-');
    return localDate
}

/**
 * Return all elements in array matching the selected date
 * @param {*} array Array to check in
 * @param {*} date Date to find
 */

export const bySelectedDate = (array, date) => {
    let localDate = date.toLocaleDateString('fr-FR').split('/').reverse().join('-');

    return array.filter(element => element.date.substring(0, 10) === localDate)
}

/**
 * Return array elements if element.date is less than 24 hours ago.
 * @param {*} array Array to check in
 */

export const thisDay = (array) => {
    return array.filter(element => element.date.substring(0, 10) === new Date().toISOString().substring(0, 10))
}

/**
 * Return array elements if element.date is between 24 and 48 hours ago.
 * @param {*} array Array to check in
 */

export const lastDay = (array) => {
    return array.filter(element => element.date.substring(0, 10) === new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().substring(0, 10))
}

/**
 * Return array elements between today and choosen date.
 * @param {*} array Array to check in
 * @param {*} date Max date
 */

export const timeBetween = (array, days) => {
    let currentDate = new Date();
    let currentDateTime = currentDate.getTime();
    let last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - days));
    let last30DaysDateTime = last30DaysDate.getTime();

    return array.filter(element => {
        const elementDateTime = new Date(element.date).getTime();
        if (elementDateTime <= currentDateTime && elementDateTime > last30DaysDateTime) {
            return true;
        }
        return false
    }).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
}

/**
 * Convert an object into array
 * @param {*} object Object to convert
 */

export const convertObjToArr = (object) => {
    let array = Object.entries(object).map(([key, value]) => ({ key, ...value }))
    return array
}

/**
 * Add an item to an array
 * @param {*} array Array to add item in
 * @param {*} item Item to add
 */

export const addItemInArray = (array, item) => {
    return [...array, item]
}

/**
 * Add an item to an array
 * @param {*} array Array to add item in or remove item from
 * @param {*} item Item to add or remove
 * @param {*} key Item key
 */

export const addOrRemoveItem = (array, item, key) => {
    if (array.includes(item)) {
        let arr = [...array]
        arr.splice(key, 1)
        return arr
    } else {
        return [...array, item]
    }
}

/**
 * Remove choosen item from specified array
 * @param {*} array Array to remove from
 * @param {*} key Key of the element to remove
 */

export const deleteItemFromArray = (array, key) => {
    let arr = [...array]
    arr.splice(key, 1)
    return arr
}

/**
 * Check if an array includes one of the mentioned elements
 * @param {*} array Array to check
 * @param {*} elements Elements to find
 */

export const doesArrayIncludes = (array, elements) => {
    array.filter(el => elements.some(e => e === el))
}

/**
 * Check if all arrays in an array or an object contain at least one value
 * @param {*} element Element of typeof object or array that contain the arrays
 */

export const doesAllArraysInElementContainValues = (element) => {
    let state = false
    if (typeof element === 'object') {
        for (let i = 0; i < Object.keys(element).length; i++) {
            if (Object.values(element)[i].length === 0) {
                state = false
                break;
            } else if (i === Object.keys(element).length - 1) {
                state = true
                break;
            }
        }
    } else if (Array.isArray(element)) {
        for (let i = 0; i < element.length; i++) {
            if (element[i].length === 0) {
                state = false
                break;
            } else if (i === element.length - 1) {
                state = true
                break;
            }
        }
    }
    return state
}

/**
 * Check if at least one array in an array or an object of arrays contain a value
 * @param {*} element Element of typeof object or array that contain the arrays
 */

export const doesAtLeastOneArrayInElementContainValues = (element) => {
    let state = false
    if (typeof element === 'object') {
        for (let i = 0; i < Object.keys(element).length; i++) {
            if (Object.values(element)[i].length > 0) {
                state = true
                break;
            } else if (i === Object.keys(element).length - 1) {
                state = false
                break;
            }
        }
    } else if (Array.isArray(element)) {
        for (let i = 0; i < element.length; i++) {
            if (element[i].length > 0) {
                state = true
                break;
            } else if (i === element.length - 1) {
                state = false
                break;
            }
        }
    }
    return state
}

/**
 * Keep only unique objects in array based on a property value.
 * Ex: [{ a: '1' }, { b: '1' }] => [{ a: '1' }]
 * @param {*} array Array to filter
 * @param {*} props Object property to filter
 */

export const keepUniqueObjectsOnlyBasedOnValue = (array, props) => {
    return [...new Map(array.map(item => [item[props], item])).values()]
}

/**
 * Sort array by alphabetical order
 * @param {*} array Array to sort
 * @param {*} property Property to sort from
 */

export const sortByAlphabetical = (array, property) => {
    array.sort((a, b) => {
        if (a[property].toLowerCase() < b[property].toLowerCase()) { return -1; }
        if (a[property].toLowerCase() > b[property].toLowerCase()) { return 1; }
        return 0;
    })
    return array
}

/**
 * Return a random item from array
 * @param {*} array Array to choose in
 */

export const randomItem = (array) => {
    let arr = array.slice(0)
    let item = arr[Math.floor(Math.random() * arr.length)]
    return item
}

/**
 * Return random item from an array with no repetitions
 * @param {*} array Array to choose in
 */

export const randomizedArrayNoRepeats = (array) => {
    let copy = array.slice(0)
    return function () {
        if (copy.length < 1) {
            copy = array.slice(0)
        }
        let index = Math.floor(Math.random() * copy.length)
        let item = copy[index]
        copy.splice(index, 1)
        return item
    }
}

/**
 * Return a random color class
 */

export const randomColor = randomizedArrayNoRepeats(['blue', 'light-blue', 'turquoise', 'green', 'purple-light', 'red-light', 'yellow', 'orange'])

/**
 * Return a random background-color class
 */

export const randomBgColor = randomizedArrayNoRepeats(['xbg-blue', 'xbg-light-blue', 'xbg-turquoise', 'xbg-green', 'xbg-purple-light', 'xbg-red-light', 'xbg-orange'])

/**
 * Return a random color class
 */

export const randomBgAndColor = randomizedArrayNoRepeats(['blue xbg-blue', 'light-blue xbg-light-blue', 'turquoise xbg-turquoise', 'green xbg-green', 'purple-light xbg-purple-light', 'red-light xbg-red-light', 'orange xbg-orange'])

/**
 * Reverse array order.
 * @param {*} array Array to reverse
 */

export const reverseArray = (array) => {
    return array.map(array.pop, [...array])
}

/**
 * Divide an array into multiple others
 * @param {*} array Array to divide
 * @param {*} parts Number of news arrays (divided parts numbers)
 */

export function divideArrayIntoParts(array, parts) {
    let copy = [...array]
    let result = [];
    for (let i = parts; i > 0; i--) {
        result.push(copy.splice(0, Math.ceil(copy.length / i)));
    }
    return result;
}

/**
 * Divide an array into multiple others width a certain number of elements in each array
 * @param {*} array Array to divide
 * @param {*} size Size of each new arrays
 */

export function divideArrayIntoSizedParts(array, size) {
    let copy = [...array]
    let result = [];
    for (let i = 0; i < copy.length; i += size) {
        result.push(copy.slice(i, i + size));
    }
    return result;
}

/**
 * Multiply the selected array. Ex: ([1, 2, 3], 3) = [1, 2, 3, 1, 2, 3, 1, 2, 3]
 * @param {*} array Array to multiply
 * @param {*} num Number of time to multiply
 */

export function multiplyArray(array, num) {
    var newArr = [];
    for (var i = 0; i < num; [i++].push.apply(newArr, array));
    return newArr;
}

/**
 * rRturn the array randomized
 * @param {*} array Array to suffle
 */

export const shuffleArray = (array) => {
    let copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy
}

/**
 * Group array values by parameter value. Return an array with nested arrays.
 * @param {*} array Original array
 * @param {*} parameter Parameter to group by
 */

export const groupBy = (array, parameter) => {
    let group = array.reduce((r, a) => {
        r[a[parameter]] = [...r[a.id] || [], a]
        return r
    }, {})

    return Object.values(group)
}

/**
 * Check if a string is an HTML element (<> ... </>)
 * @param {*} string String to check
 */

export const checkIfIsHTML = (string) => {
    let regexp = new RegExp(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i)
    if (regexp.test(string)) return true
    else return false
}

/**
 * Remove HTML markers (</>)
 * @param {*} html HTML to remove markers from
 */

export const removeHTMLMarkers = (html) => {
    let regex = /(<([^>]+)>)/ig
    return html.replace(regex, '')
}

/**
 * Converts a string to its html characters completely.
 */

export const stringToCharSet = (str) => {
    let buf = [];
    for (let i = str.length - 1; i >= 0; i--) {
        buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('')
}

/**
 * Converts an html characterSet into its original character.
 * @param {*} str 
 */

export const charSetToChar = (str) => {
    let txt = document.createElement("textarea")
    txt.innerHTML = str
    return txt.value
}

/**
 * Check if array, object or string is empty.
 * @param {*} value Array, object or string to check
 */

export const isEmpty = (value) => {
    return (
        value === undefined
        || value === null
        || (typeof value === "object" && Object.keys(value).length === 0)
        || (typeof value === "string" && value.trim().length === 0)
        || (typeof value === "number")
        || (value instanceof Array && value.length === 0)
    )
}

/**
 * Add full size background image
 * @param {*} img Image to add
 */

export const fullImage = (img) => {
    return ({
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
    })
}

/**
 * Check file extension
 * @param {*} file File to check
 */

export const isImage = (file) => {
    const types = ['image/jpg', 'image/jpeg', 'image/bmp', 'image/gif', 'image/png', 'image/svg+xml'];
    return types.some(el => file.type === el);
}

/**
 * Check if file is a video
 * @param {*} file File to check
 */

export const isVideo = (file) => {
    const types = ['video/mp4', 'video/webm', 'video/x-m4v', 'video/quicktime'];
    return types.some(el => file.type === el);
}

/**
 * Check file validity
 * @param {*} file File to check
 */

export const isFile = (file) => {
    const types = [
        '.7z', '.ade', '.mde', '.adp', '.apk', '.appx', '.appxbundle', '.aspx', '.bat',
        '.com', '.dll', '.exe', '.msi', '.cab', '.cmd', '.cpl', '.dmg', '.gz', '.hta',
        '.ins', '.ipa', '.iso', '.isp', '.jar', '.js', '.jse', '.jsp', '.lib', '.lnk',
        '.msc', '.msix', '.msixbundle', '.msp', '.mst', '.nsh', '.pif', '.ps1', '.scr',
        '.sct', '.wsc', '.shb', '.sys', '.vb', '.vbe', '.vbs', '.vxd', '.wsf', '.wsh', '.tar'
    ]
    return !types.some(el => file.name.endsWith(el))
}

/**
 * Check if file is an audio file
 * @param {*} file File to check
 */

export const isAudioFile = (file) => {
    const types = ['.wav', '.ogg', '.mp3', '.flac', '.aiff', '.wma', '.m4a']
    return types.some(el => file.name.endsWith(el))
}

/**
 * Check if string is an URL
 * @param {*} str String to check
 */

export const isURL = (str) => {
    // eslint-disable-next-line
    const regexp = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
    if (regexp.test(str)) {
        return true
    } else return false
}

/**
 * Check if string contains an URL
 * @param {*} text String to check in
 */

export const isURLInText = (text) => {
    const regexp = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+")
    if (regexp.test(text)) {
        return true
    } else return false
}

/**
 * Return all URLs present in given text
 * @param {*} text Text to check in
 */

export const returnURLsInText = (text) => {
    const regexp = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+")
    let txt = text
    let arr = []
    while (regexp.test(txt)) {
        let matched = regexp.exec(txt)[0]
        console.log(matched)
        arr.push(matched)
        txt = txt.replace(matched, '')
    }
    return arr
}

/**
 * Check if selected file is embeddable
 * @param {*} file File to check
 */

export const isEmbeddable = (file) => {
    const types = ['text/html']
    return !types.some(el => file.type === el)
}

/**
 * Add choosen class if condition matches
 * @param {*} state Condition required
 * @param {*} classe Class to add
 */

export const addClass = (state, classe) => {
    if (state) return classe
    else return 'un' + classe
}

/**
 * Add 'active' class if condition matches
 * @param {*} state Condition required
 */

export const addActive = (state) => {
    if (state) return 'active'
    else return 'unactive'
}

/**
 * Reduce string between 0 and choosen length.
 * @param {*} string String to reduce
 * @param {*} maxLength Max length
 */

export const reduceString = (string, maxLength) => {
    if (string.length >= maxLength) {
        if (string.substring((maxLength - 1), maxLength) === " ") {
            let cleanSpaces = string.replace(string.substring((maxLength - 1), maxLength), "")
            string = cleanSpaces.substring(0, maxLength) + "..."
        }
        return string.substring(0, maxLength) + "..."
    } else return string
}

/**
 * Get diff??rence between two number and add "+" before
 * @param {*} one First number
 * @param {*} two Second number
 */

export const getDifference = (one, two) => {
    return "+" + (two - one)
}

/**
 * Convert string in URL (remove accents, spaces and special chars)
 * @param {*} str String to convert
 */

export const convertStringToURL = (str) => {
    let URL = str.toLowerCase();
    URL = URL.charAt(0).toUpperCase() + URL.slice(1);
    URL = URL.replace(/[&#,+()$~%^.'":*?!;<>{}/\\\\]/g, " ")
    URL = URL.replace(/ +/g, " ")
    URL = URL.trim()
    URL = removeAccents(URL)
    URL = URL.replace(/ /g, "-")
    return URL
}

/**
 * Detect Enter key press.
 * @param {*} event 
 * @param {*} func Function to execute on ENTER key press
 */

export const handleEnterKey = (event, handler) => {
    if (event.key === 'Enter') {
        return handler()
    } else return
}

/**
 * Basique GeoJSON structure for leaflet.
 */

export const geoJSONStructure = (props) => {
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": props
                }
            }
        ]
    }
}

/**
 * Return the geojson object bounds (extremity points)
 * @param {*} gj geojson object
 */

export function getGeoJSONBounds(gj) {
    var coords, bbox;
    if (!gj.hasOwnProperty('type')) return;
    coords = getCoordinatesDump(gj);
    bbox = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY,];
    return coords.reduce(function (prev, coord) {
        return [
            Math.min(coord[0], prev[0]),
            Math.min(coord[1], prev[1]),
            Math.max(coord[0], prev[2]),
            Math.max(coord[1], prev[3])
        ];
    }, bbox);
}

/**
 * Return geojson object coordinates only
 * @param {*} gj geojson object
 */

export function getCoordinatesDump(gj) {
    var coords;
    if (gj.type === 'Point') {
        coords = [gj.coordinates];
    } else if (gj.type === 'LineString' || gj.type === 'MultiPoint') {
        coords = gj.coordinates;
    } else if (gj.type === 'Polygon' || gj.type === 'MultiLineString') {
        coords = gj.coordinates.reduce(function (dump, part) {
            return dump.concat(part);
        }, []);
    } else if (gj.type === 'MultiPolygon') {
        coords = gj.coordinates.reduce(function (dump, poly) {
            return dump.concat(poly.reduce(function (points, part) {
                return points.concat(part);
            }, []));
        }, []);
    } else if (gj.type === 'Feature') {
        coords = getCoordinatesDump(gj.geometry);
    } else if (gj.type === 'GeometryCollection') {
        coords = gj.geometries.reduce(function (dump, g) {
            return dump.concat(getCoordinatesDump(g));
        }, []);
    } else if (gj.type === 'FeatureCollection') {
        coords = gj.features.reduce(function (dump, f) {
            return dump.concat(getCoordinatesDump(f));
        }, []);
    }
    return coords;
}

/**
 * Split full geolocation ('43.2516, 5.23652') in latitude and longitude ['43.2516', '5.23652']
 * @param {*} string Geolocation to split
 */

export const geolocToFloat = (string) => {
    let lat = string.substr(0, string.indexOf(','))
    let lon = string.substr(string.indexOf(',') + 1, string.length)
    lat = parseFloat(lat)
    lon = parseFloat(lon)
    return [lat, lon]
}

/**
 * Download file function
 * @param {*} file File to download
 */

// export const download = async (file) => {
//     await axios({
//         url: file.url,
//         method: 'GET',
//         responseType: 'blob'
//     })
//         .then(res => {
//             const link = document.createElement('a')
//             link.href = URL.createObjectURL(new Blob([res.data]))
//             link.setAttribute('download', file.name)
//             document.body.appendChild(link)
//             link.click()
//             document.body.removeChild(link)
//         })
// }

let characterMap = {
    "??": "A",
    "??": "A",
    "??": "A",
    "??": "A",
    "??": "A",
    "??": "A",
    "???": "A",
    "???": "A",
    "???": "A",
    "???": "A",
    "???": "A",
    "??": "AE",
    "???": "A",
    "???": "A",
    "??": "A",
    "??": "C",
    "???": "C",
    "??": "E",
    "??": "E",
    "??": "E",
    "??": "E",
    "???": "E",
    "???": "E",
    "???": "E",
    "???": "E",
    "???": "E",
    "??": "E",
    "??": "I",
    "??": "I",
    "??": "I",
    "??": "I",
    "???": "I",
    "??": "I",
    "??": "D",
    "??": "N",
    "??": "O",
    "??": "O",
    "??": "O",
    "??": "O",
    "??": "O",
    "??": "O",
    "???": "O",
    "???": "O",
    "???": "O",
    "??": "O",
    "??": "U",
    "??": "U",
    "??": "U",
    "??": "U",
    "??": "Y",
    "??": "a",
    "??": "a",
    "??": "a",
    "??": "a",
    "??": "a",
    "??": "a",
    "???": "a",
    "???": "a",
    "???": "a",
    "???": "a",
    "???": "a",
    "??": "ae",
    "???": "a",
    "???": "a",
    "??": "a",
    "??": "c",
    "???": "c",
    "??": "e",
    "??": "e",
    "??": "e",
    "??": "e",
    "???": "e",
    "???": "e",
    "???": "e",
    "???": "e",
    "???": "e",
    "??": "e",
    "??": "i",
    "??": "i",
    "??": "i",
    "??": "i",
    "???": "i",
    "??": "i",
    "??": "d",
    "??": "n",
    "??": "o",
    "??": "o",
    "??": "o",
    "??": "o",
    "??": "o",
    "??": "o",
    "???": "o",
    "???": "o",
    "???": "o",
    "??": "o",
    "??": "u",
    "??": "u",
    "??": "u",
    "??": "u",
    "??": "y",
    "??": "y",
    "??": "A",
    "??": "a",
    "??": "A",
    "??": "a",
    "??": "A",
    "??": "a",
    "??": "C",
    "??": "c",
    "??": "C",
    "??": "c",
    "??": "C",
    "??": "c",
    "??": "C",
    "??": "c",
    "C??": "C",
    "c??": "c",
    "??": "D",
    "??": "d",
    "??": "D",
    "??": "d",
    "??": "E",
    "??": "e",
    "??": "E",
    "??": "e",
    "??": "E",
    "??": "e",
    "??": "E",
    "??": "e",
    "??": "E",
    "??": "e",
    "??": "G",
    "??": "G",
    "??": "g",
    "??": "g",
    "??": "G",
    "??": "g",
    "??": "G",
    "??": "g",
    "??": "G",
    "??": "g",
    "??": "H",
    "??": "h",
    "??": "H",
    "??": "h",
    "???": "H",
    "???": "h",
    "??": "I",
    "??": "i",
    "??": "I",
    "??": "i",
    "??": "I",
    "??": "i",
    "??": "I",
    "??": "i",
    "??": "I",
    "??": "i",
    "??": "IJ",
    "??": "ij",
    "??": "J",
    "??": "j",
    "??": "K",
    "??": "k",
    "???": "K",
    "???": "k",
    "K??": "K",
    "k??": "k",
    "??": "L",
    "??": "l",
    "??": "L",
    "??": "l",
    "??": "L",
    "??": "l",
    "??": "L",
    "??": "l",
    "??": "l",
    "??": "l",
    "???": "M",
    "???": "m",
    "M??": "M",
    "m??": "m",
    "??": "N",
    "??": "n",
    "??": "N",
    "??": "n",
    "??": "N",
    "??": "n",
    "??": "n",
    "N??": "N",
    "n??": "n",
    "??": "O",
    "??": "o",
    "??": "O",
    "??": "o",
    "??": "O",
    "??": "o",
    "??": "OE",
    "??": "oe",
    "P??": "P",
    "p??": "p",
    "??": "R",
    "??": "r",
    "??": "R",
    "??": "r",
    "??": "R",
    "??": "r",
    "R??": "R",
    "r??": "r",
    "??": "R",
    "??": "r",
    "??": "S",
    "??": "s",
    "??": "S",
    "??": "s",
    "??": "S",
    "??": "S",
    "??": "s",
    "??": "s",
    "??": "S",
    "??": "s",
    "??": "T",
    "??": "t",
    "??": "t",
    "??": "T",
    "??": "T",
    "??": "t",
    "??": "T",
    "??": "t",
    "T??": "T",
    "t??": "t",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "V??": "V",
    "v??": "v",
    "??": "W",
    "??": "w",
    "???": "W",
    "???": "w",
    "X??": "X",
    "x??": "x",
    "??": "Y",
    "??": "y",
    "??": "Y",
    "Y??": "Y",
    "y??": "y",
    "??": "Z",
    "??": "z",
    "??": "Z",
    "??": "z",
    "??": "Z",
    "??": "z",
    "??": "s",
    "??": "f",
    "??": "O",
    "??": "o",
    "??": "U",
    "??": "u",
    "??": "A",
    "??": "a",
    "??": "I",
    "??": "i",
    "??": "O",
    "??": "o",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "??": "U",
    "??": "u",
    "???": "U",
    "???": "u",
    "???": "U",
    "???": "u",
    "??": "A",
    "??": "a",
    "??": "AE",
    "??": "ae",
    "??": "O",
    "??": "o",
    "??": "TH",
    "??": "th",
    "???": "P",
    "???": "p",
    "???": "S",
    "???": "s",
    "X??": "X",
    "x??": "x",
    "??": "??",
    "??": "??",
    "??": "??",
    "??": "??",
    "A??": "A",
    "a??": "a",
    "E??": "E",
    "e??": "e",
    "I??": "I",
    "i??": "i",
    "??": "N",
    "??": "n",
    "???": "O",
    "???": "o",
    "???": "O",
    "???": "o",
    "???": "U",
    "???": "u",
    "???": "W",
    "???": "w",
    "???": "Y",
    "???": "y",
    "??": "A",
    "??": "a",
    "??": "E",
    "??": "e",
    "??": "I",
    "??": "i",
    "??": "O",
    "??": "o",
    "??": "R",
    "??": "r",
    "??": "U",
    "??": "u",
    "B??": "B",
    "b??": "b",
    "????": "C",
    "????": "c",
    "????": "E",
    "????": "e",
    "F??": "F",
    "f??": "f",
    "??": "G",
    "??": "g",
    "??": "H",
    "??": "h",
    "J??": "J",
    "??": "j",
    "??": "K",
    "??": "k",
    "M??": "M",
    "m??": "m",
    "P??": "P",
    "p??": "p",
    "Q??": "Q",
    "q??": "q",
    "????": "R",
    "????": "r",
    "???": "S",
    "???": "s",
    "V??": "V",
    "v??": "v",
    "W??": "W",
    "w??": "w",
    "X??": "X",
    "x??": "x",
    "Y??": "Y",
    "y??": "y",
    "A??": "A",
    "a??": "a",
    "B??": "B",
    "b??": "b",
    "???": "D",
    "???": "d",
    "??": "E",
    "??": "e",
    "????": "E",
    "????": "e",
    "???": "H",
    "???": "h",
    "I??": "I",
    "i??": "i",
    "????": "I",
    "????": "i",
    "M??": "M",
    "m??": "m",
    "O??": "O",
    "o??": "o",
    "Q??": "Q",
    "q??": "q",
    "U??": "U",
    "u??": "u",
    "X??": "X",
    "x??": "x",
    "Z??": "Z",
    "z??": "z",
};

let chars = Object.keys(characterMap).join('|')
let allAccents = new RegExp(chars, 'g')

/**
 * Remove all accents from string
 * @param {*} string String to remove accents from
 */

export const removeAccents = (string) => {
    return string.replace(allAccents, (match) => {
        return characterMap[match];
    })
}