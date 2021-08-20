
const titleMe = (name) => {
    //replace globally the first letter of a word with a capital letter
    return name.replace(/\b\w/g, c => c.toUpperCase())
}

const utils = {
    titleMe: titleMe
}

export default utils
