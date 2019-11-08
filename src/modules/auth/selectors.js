// import { createSelector } from 'reselect';

export const getIsLoggedIn = state => state.auth.isLoggedIn;
export const getError = state => state.auth.error;
export const getUserInfo = state => state.auth.userInfo;
// export const getAuthImages = createSelector(
//   state => state.auth.elements,
//   elements =>
//     elements.map(({ id, image: { original }, name }) => ({
//       id,
//       image: original,
//       name,
//     })),
// );