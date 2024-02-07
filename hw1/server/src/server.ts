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

  const userAuth = new AuthenticateUser();

  const authenticatedUser = await userAuth.auth(users[0].username, users[0].password);

  console.log('User authenticated:', authenticatedUser);

  try {

    await loader.loadingOneByOne();

    const results = loader.getResults();
    console.log(results);

  } catch (error) { console.error(error); }

});
