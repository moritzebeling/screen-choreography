require("dotenv").config();

module.exports = {
    apps: [
        {
            name: "screens",
            script: "./build/index.js",
            env: {
                NODE_ENV: "production",
                PORT: process.env.PORT || 3000,
            },
        },
    ],
};
