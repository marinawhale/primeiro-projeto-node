//import { createServer } from 'node:http'

//const server = createServer((req, res) => {
//    res.write('oi')

//    return res.end()
//})

//server.listen(3333)

//AGORA COM O FRAMEWORK FASTIFY

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()
const database = new DatabasePostgres()

//GET, POST, PUT, DELETE, PATCH

//postar video
server.post('/videos', async (req, res) => {
    const { title, description, duration } = req.body

    await database.create({
        title: title,
        description: description,
        duration: duration,
        //^^ dava pra escrever só "duration," tbm, short sintax o nome
    })

    return res.status(201).send()
})

server.get('/videos', async (req, res) => {
    const search = req.query.search

    const videos = await database.list(search)

    return videos
    
})

//atualizar video
server.put('/videos/:id', async (req, res) => {
    const videoId = req.params.id
    const { title, description, duration } = req.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return res.status(204).send()
})

//deletar video
server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id

    await database.delete(videoId)

    return res.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})