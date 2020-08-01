import { createStore, applyMiddleware,combineReducers  } from "redux";
import thunk from "redux-thunk";
import theme from '../components/pageTop/dropdownMenu/theme/state/theme-reducer'
import user from '../state/user/user-reducer'
import departments from '../state/department/department-reducer'
import events from '../state/events/events-reducer'
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
    combineReducers({theme,user,departments,events}),
  composeWithDevTools(applyMiddleware(thunk))
);