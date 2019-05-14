const CONFIG = [
    {
        context: ["/api"],
        "target": "http://localhost:" + (process.env.PORT || '3000'),
        "secure": false
    }
]

module.exports = CONFIG;