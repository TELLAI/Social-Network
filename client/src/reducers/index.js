import {combineReducers} from "redux";
import userReducer from "./user.reducer";
import usersReducers from "./users.reducers";
import postReducer  from "./post.reducers"
import errorReducer from "./errors.reducer";
import allPostsReducer from "./allPosts.reducer"
import trendingReducer from "./trending.reducer";

export default combineReducers({
  userReducer,
  usersReducers,
  postReducer,
  errorReducer,
  allPostsReducer,
  trendingReducer
});