module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4', // 이모티콘 저장
      collate: 'utf8mb4_general_ci', // 한글 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHasgtag' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
  };
  return Post;
};
