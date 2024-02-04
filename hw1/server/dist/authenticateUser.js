"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./assets/users");
class AuthenticateUser {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    auth() {
        return new Promise((res, req) => {
            setTimeout(() => {
                const foundUsers = [...users_1.users].filter(user => user.username === this.username && user.password === this.password);
                if (foundUsers.length > 0)
                    res(foundUsers[0]);
                else
                    req(new Error('Incorrect password or name'));
            }, 1000);
        });
    }
}
exports.default = AuthenticateUser;
