/** 
 * @param {Array.<string>} texts 
 * @return {string}
 */
module.exports = (texts) => {
    if (!texts || !texts.length)
        return ''

    if (texts.length === 1)
        return texts[0]

    return [
        texts.slice(0, texts.length - 1).join(', '),
        texts[texts.length - 1]
    ].join(' and ')
}