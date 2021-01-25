import express from "express"
import bodyParser from "body-parser"
import path from "path"
import nodeAuthentication from "@frappy/node-authentication"
import nodeDataSets from "@frappy/node-datasets"
import nodeContent from "@frappy/node-content"
import { UserStore, UserTokenStore } from "@frappy/js-mongo-user-store"
import { ContentStore } from "@frappy/js-mongo-content-store"
import { DataSetStore } from "@frappy/js-mongo-dataset-store"
import mongodb from "mongodb"

// Loading the environment port with default fallbacks
const HTTP_PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017"
const MONGO_DB = process.env.MONGO_DB || "playbook"

/*
 * API endpoints
 */
const app = express()
// mount static frontend to express
app.use(express.static(path.join(__dirname, "..", "static")))

// mount parser for application/json content
app.use(bodyParser.json({ limit: "100mb" }))

app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "..", "static", "index.html"))
})

// connect to database
mongodb.MongoClient.connect(MONGO_URL, { useNewUrlParser: true }).then(client => {
    // init playbook stores
    const stores = {
        dataSet: new DataSetStore(client, MONGO_DB, "dataSets"),
        users: new UserStore(client, MONGO_DB, "users"),
        userTokens: new UserTokenStore(client, MONGO_DB, "userTokens"),
        content: new ContentStore(client, MONGO_DB, "content"),
    }

    const tokenCache = {} // cache for auth tokens
    // register playbook modules
    nodeAuthentication.registerEndpoints(app, stores.users, stores.userTokens, tokenCache)
    nodeDataSets.registerGetEndpoints(app, stores.dataSet, nodeAuthentication.authMiddleware(null, tokenCache))
    nodeDataSets.registerAdminEndpoints(app, stores.dataSet, nodeAuthentication.authMiddleware("data", tokenCache))
    nodeContent.registerGetEndpoints(app, stores.content, nodeAuthentication.authMiddleware(null, tokenCache))
    nodeContent.registerAdminEndpoints(app, stores.content, nodeAuthentication.authMiddleware("content", tokenCache))
})

// Start the app
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`)
})
