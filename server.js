const express = require("express");
const app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use("/", express.static("./public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function (req, res) {

    const ip = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAddress.split(',')[0];
    const lang = req.headers['accept-language'].split(',')[0];
    const os = req.headers["user-agent"];


    const output = {"ipaddress": ip,
                    "language": lang,
                    "software": os
                   }

    res.send(output);
});

app.listen(process.env.PORT || 8080);
