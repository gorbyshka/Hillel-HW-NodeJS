import { users } from "./assets/users";
import { User } from "./types/UserType";

class AuthenticateUser {

    private username: string;
    private password: string;

    constructor(username: string, password: string) {

        this.username = username;
        this.password = password;

    }

   public auth(): Promise<User> {

        return new Promise((res, req) => {

            setTimeout(() => {
                
                 const foundUsers = [...users].filter(user => user.username === this.username && user.password === this.password)

                 if (foundUsers.length > 0) res(foundUsers[0]);
                 else req(new Error('Incorrect password or name'));

            }, 1000)

        })

    }

}

export default AuthenticateUser;
