import themeActionTypes from "./theme-action-types";
const changeTheme = (theme)=>({
    type:themeActionTypes.CHANGE_THEME,
    data:theme
})
export default changeTheme;