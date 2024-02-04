import { users } from "./assets/users";
import { User } from "./types/UserType";

class AuthenticateUser {

    public async auth(username: string, password: string): Promise<User> {

        const foundUser = users.find(user => user.username === username && user.password === password);

        if (foundUser) return foundUser;
        else throw new Error('Incorrect password or username');

    }

}

export default AuthenticateUser;
