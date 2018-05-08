/**
 * 
 * @param {string} text 
 * @param {Object} obj 
 */
module.exports = (text, obj) => text.replace(/\{([^\}]+)\}/g, (match, word) => obj[word] || match)