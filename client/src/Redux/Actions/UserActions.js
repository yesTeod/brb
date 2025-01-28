import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../Constants/UserConstants";
import axios from "axios";


//LOGIN
export const login = (name, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(`/api/users/login`, { name, password }, config);

        if (data.isAdmin === false) {
            dispatch({ type: USER_LOGIN_FAIL });
        } else {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        }
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message ? error.response.data.message : error.message,

        });
    }
};

//LOGOUT
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    document.location.href = "/";
}