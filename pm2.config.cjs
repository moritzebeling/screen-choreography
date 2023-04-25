require("dotenv").config();

module.exports = {
    apps: [
        {
            name: "screens",
            script: "./server/server.js",
            env: {
                NODE_ENV: "production",
                PORT: process.env.PORT || 3000,
            },
        },
    ],
};
