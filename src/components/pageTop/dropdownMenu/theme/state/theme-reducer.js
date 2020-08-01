import themeActionTypes from "./theme-action-types";
const inititalState = {
    current_theme:'dark'
}
  
const theme= (state = inititalState, action) => {
    
    switch (action.type) {
        case themeActionTypes.CHANGE_THEME:
        return {
          ...state,
          current_theme: action.data
        }
      default:
        return state;
    }
}
  
export default theme;