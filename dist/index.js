"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const PORT = 3000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', routes_1.router);
exports.server = app.listen(PORT, (err) => {
    /* istanbul ignore if */
    if (err) {
        /* eslint-disable-next-line no-console */
        return console.error(err);
    }
    /* eslint-disable-next-line no-console */
    return console.log(`server is listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map