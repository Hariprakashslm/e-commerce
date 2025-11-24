const express = require('express')

const {ROUTES} = require("./utils/routes");

const {setupLogging} = require("./utils/logging");
const {setupRateLimit} = require("./utils/ratelimit");
const {setupProxies} = require("./utils/proxy");
const {setupAuth} = require("./utils/auth");

const app = express()
const port = 3000;


setupLogging(app);
// setupRateLimit(app, ROUTES);
// setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})