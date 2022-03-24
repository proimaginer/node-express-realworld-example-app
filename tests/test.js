const axios = require('axios');

const url = 'http://localhost:3000/api';

const run = async () => {
  const res1 = await axios.post(`${url}/users/login`, {
    user: {
      email: 'john@jacob.com',
      password: 'johnnyjacob',
    },
  });

  // 내가 생성/수정/삭제한 ArticleHistory 목록 조회
  const res2 = await axios.get(`${url}/article-histories`, {
    headers: {
      authorization: `Token ${res1.data.user.token}`,
    },
  });

  console.log(JSON.stringify(res2.data, null, 2));
};

run();
