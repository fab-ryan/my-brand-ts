"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const config_1 = require("./config");
index_1.app.listen(config_1.envConfig.port, () => {
    console.log(`Server is running at http://localhost:${config_1.envConfig.port}`);
});
