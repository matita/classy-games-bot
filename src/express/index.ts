const express = require('express')
const snek = require('snekfetch')

type ServerConfig = {
    discordClientId: string
    port: string
    projectDomain?: string
}

export const server = ({ discordClientId, port, projectDomain = process.env.PROJECT_DOMAIN } : ServerConfig) => {
    const app = express()
    
    app.use(express.static('public'))

    app.get('/invite', (req: any, res: any) => {
        const inviteUrl = `https://discordapp.com/oauth2/authorize?client_id=${discordClientId}&scope=bot&permissions=0`
        const inviteLink = `<a href="${inviteUrl}">Invite bot</a>`
        res.send(inviteLink)
    })

    app.listen(port, (err: Error) => {
        if (err)
            return console.error(err)
        console.log(`App is listening on port ${port}`)

        if (projectDomain)
            setInterval(() => snek.get(`https://${projectDomain}.glitch.me`), 4*60*1000)
    })
}