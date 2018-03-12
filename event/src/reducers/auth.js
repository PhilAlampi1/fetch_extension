export default (state = {}, action) => {

  switch (action.type) {
    case 'COMPLETE_SIGN_IN':
      return {
        ...state,
        googleToken: action.googleToken,
        googleId: action.googleId,
        firstName: action.firstName,
        email: action.email,
        userId: action.userId,
        userToken: action.userToken,
        userRole: action.userRole
      }
    default:
      return state
  }
  
}