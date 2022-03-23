const axios = require('axios');

const url = 'http://localhost:3000/api';
const slug = 'how-to-train-your-dragon-bd7fxg';

const run = async () => {
  const res1 = await axios.post(`${url}/users/login`, {
    user: {
      email: 'john@jacob.com',
      password: 'johnnyjacob',
    },
  });

  const res2 = await axios.get(`${url}/articles/${slug}/article-histories`, {
    headers: {
      authorization: `Token ${res1.data.user.token}`,
    },
  });

  console.log(JSON.stringify(res2.data, null, 2));
};

run();
