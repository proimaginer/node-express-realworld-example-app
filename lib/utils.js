const mongoose = require('mongoose');
const ArticleHistory = mongoose.model('ArticleHistory');

/**
 * ArticleHistory 저장
 * @param articleData 
 * @param author 
 */
exports.saveArticleHistory = (articleData, author, method) => {
  const articleHistory = new ArticleHistory({
    articleData,
    author,
    method,
  });
  articleHistory.save();
};
