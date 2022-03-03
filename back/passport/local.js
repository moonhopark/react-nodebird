const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            // 이메일 검사
            return done(null, false, { reason: '존재하지 않는 이메일입니다!' });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            // 비밀번호 검사
            // 로그인 성공
            // user로 사용자 정보 넘겨주기
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
