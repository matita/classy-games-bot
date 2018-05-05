const express = require('express')
const snek = require('snekfetch')

module.exports = (/** @type {Expressconfig} */ { discordClientId, port }) => {
    const app = express()
    
    app.use(express.static('public'))

    app.get('/invite', (req, res) => {
        const inviteUrl = `https://discordapp.com/oauth2/authorize?client_id=${discordClientId}&scope=bot&permissions=0`
        const inviteLink = `<a href="${inviteUrl}">Invite bot</a>`
        res.send(inviteLink)
    })

    app.listen(port, err => {
        if (err)
            return console.error(err)
        console.log(`App is listening on port ${port}`)
    })
}

/**
 * @typedef Expressconfig
 * @property {string} discordClientId
 * @property {number} port
 */