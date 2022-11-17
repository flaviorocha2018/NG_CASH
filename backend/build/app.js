"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    start(port) {
        this.app.listen(port, () => console.log(`rodando na porta: ${port}`));
    }
    config() {
        this.app.use(express_1.default.json());
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map