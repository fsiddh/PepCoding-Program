import { combineReducers } from "redux";
import BallReducer from "./balls/ballReducer";
import BatReducer from "./bats/batReducer";
import userReducer from "./users/userReducer";
const rootReducer = combineReducers({
    ball:BallReducer,
    bat:BatReducer,
    user:userReducer
})
export default rootReducer;