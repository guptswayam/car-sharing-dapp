import * as actionTypes from "./../actions/actionTypes";

const initialState = {
  carInstance: null,
  isOwner: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CAR_CONTRACT:
      return {
        ...state,
        carInstance: action.data,
      };
    case actionTypes.SET_SIGNER:
      return {
        ...state,
        carInstance: action.data,
        isOwner: action.isOwner
      };
    case actionTypes.SET_IS_OWNER:
      return {
        ...state,
        isOwner: action.data
      };
    default:
      return state;
  }
};

export default reducer;
