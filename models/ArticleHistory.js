const mongoose = require('mongoose');

const ArticleHistorySchema = new mongoose.Schema({
  articleData: Object,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  method: String,
}, {timestamps: true});

ArticleHistorySchema.methods.toJSONFor = function(user){
  return {
    articleData: this.articleData,
    author: this.author.toProfileJSONFor(user),
    method: this.method,
    createdAt: this.createdAt,
  };
};

mongoose.model('ArticleHistory', ArticleHistorySchema);
