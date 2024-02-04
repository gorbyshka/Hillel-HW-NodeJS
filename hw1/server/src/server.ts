import UrlLoader from "./urlLoader";
import AuthenticateUser from "./authenticateUser";
import { urls } from "./assets/url";
import { users } from "./assets/users";

const express = require('express');

const app = express();
const port = 3000;

app.listen(port, async () => {

  console.log(`PORT: ${port}`);

  const loader = new UrlLoader(urls);

  try {

    await loader.loadingOneByOne();
    const results = loader.getResults();
    console.log(results);


    for (const user of users) {

      const userAuth = new AuthenticateUser(user.username, user.password);

      try {

        const authenticatedUser = await userAuth.auth();
        console.log('User authenticated:', authenticatedUser);

      } catch (error) {

        console.error(error);

      }

    }

  } catch (error) {

    console.error(error);

  }

});
