/** 
 * Check if all the properties are specified in process.env
 * @param {Array.<string>} props 
 */
module.exports = props => {
    const missingProperties = props.filter(p => !process.env.hasOwnProperty(p))
    if (!missingProperties.length)
        return

    console.log(`You need these properties in process.env:\n${missingProperties.join('\n')}\n\nYou can add them in the .env file`)
    process.exit(0)
}