const router = require('express').Router();
const mongoose = require('mongoose');
const ArticleHistory = mongoose.model('ArticleHistory');
const User = mongoose.model('User');
const auth = require('../auth');

// ArticleHistory 조회 API
router.get('/', auth.required, function(req, res, next) {
  // 요청한 유저 정보로 조회하기 위한 쿼리 생성
  const author = req.payload.id;
  const query = { author };

  // limit, offset 설정
  const limit = req.query?.limit || 20;
  const offset = req.query?.offset || 0;
  const sort = req.query?.sort || { createdAt: -1 };

  // 요청한 유저 정보 조회
  User.findById(author).then(function(user) {
    // 유저 정보가 유효하지 않다면 401 에러
    if (!user) {
      return res.sendStatus(401);
    }

    // ArticleHistory 목록 및 개수 조회
    Promise.all([
      ArticleHistory.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .populate('author')
        .exec(),
      ArticleHistory.count(query)
    ]).then(function(results) {
      return res.json({
        articleHistories: results[0].map(function(articleHistory) {
          return articleHistory.toJSONFor(user);
        }),
        articleHistoriesCount: results[1],
      });
    }).catch(next);
  });
});

module.exports = router;
