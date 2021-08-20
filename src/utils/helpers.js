
const titleMe = (name) => {
    let copy = name.charAt(0).toUpperCase() + name.slice(1) 
    if (copy.length > 1) {
        if (copy.split('').includes('-')) {
            copy = copy.split('')
            let index = copy.indexOf('-')
            if (index === copy.length - 1) {
                return copy.join('')
            } else {
                copy[index + 1] = copy[index + 1].toUpperCase()
                return copy.join('')
            }
        }
    }
    return copy
}

const utils = {
    titleMe: titleMe
}

export default utils
