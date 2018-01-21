export default (state = {}, action) => {
  // const offlineMode = {
  //   googleToken: 'ya29.Gl0MBayZ6savgSrd56D2zKv0BciUX_8fZJlpUeULdZCZrLOYQvSxzwElV5Cx6tg7xWsFXnU4inyQKwqDoHq0JXkilHtRivEB1fh_MFj59ewnGYImUO52gK8rAYpfNp0',
  //   googleId: '113634659040436021710',
  //   firstName: 'Phil',
  //   email: 'skept99@gmail.com',
  //   userId: 21,
  //   userToken: '19baff7f-e931-b513-f2fb-fac3f7cbb2e7'
  // }
  switch (action.type) {
    case 'COMPLETE_SIGN_IN':
      return {
        ...state,
        googleToken: action.googleToken,
        googleId: action.googleId,
        firstName: action.firstName,
        email: action.email,
        userId: action.userId,
        userToken: action.userToken
      }
    default:
      return state
  }
}