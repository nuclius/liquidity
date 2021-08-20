const express = require('express')
const cors = require("cors")
const helmet = require("helmet")
const router = require("./router.js")


const server = express()
server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(router)

server.listen(3000)