import {combineReducers} from "redux";
import userReducer from "./user.reducer";
import usersReducers from "./users.reducers";
import postReducer  from "./post.reducers"

export default combineReducers({
    userReducer,
    usersReducers,
    postReducer,
});