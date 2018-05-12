/**
 * 
 * @param {string} text 
 * @param {Object} obj 
 */
module.exports = (text, obj) => text.replace(/\{([^\}]+)\}/g, (match, keyword) => {
    const parts = keyword.split('.')
    let res = obj
    for (let i = 0; i < parts.length; i++) {
        word = parts[i]
        res = res[word]
        if (res == null)
            return match
    }

    return res
})