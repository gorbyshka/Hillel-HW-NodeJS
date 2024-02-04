"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const urlLoader_1 = __importDefault(require("./urlLoader"));
const authenticateUser_1 = __importDefault(require("./authenticateUser"));
const url_1 = require("./assets/url");
const users_1 = require("./assets/users");
const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`PORT: ${port}`);
    const loader = new urlLoader_1.default(url_1.urls);
    try {
        yield loader.loadingOneByOne();
        const results = loader.getResults();
        console.log(results);
        for (const user of users_1.users) {
            const userAuth = new authenticateUser_1.default(user.username, user.password);
            try {
                const authenticatedUser = yield userAuth.auth();
                console.log('User authenticated:', authenticatedUser);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}));
