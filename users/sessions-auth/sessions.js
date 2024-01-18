const session = require("express-session");
const app = express()

app.use(session({
    secret: "little secret",
    cookie: {maxAge: 30000},
    saveUninitialized : false
}))