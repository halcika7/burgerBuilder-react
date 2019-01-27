import * as actionTypes from './actionTypes';
import axios from 'axios';

export const logout = () => {
    localStorage.removeItem('auth');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => async dispatch => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 1000);
}

export const auth = (email, password, isSignup) => async dispatch => {
    try{
        dispatch({type: actionTypes.AUTH_START});

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAGoajwtEP9L-qSqE-IqDK9UPGcnYUwLbo';

        if(!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAGoajwtEP9L-qSqE-IqDK9UPGcnYUwLbo';
        }

        const response = await axios.post(url, authData);

        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        const userId = response.data.localId;

        const obj = {
            token: response.data.idToken,
            expirationDate,
            userId
        }

        localStorage.setItem('auth', JSON.stringify(obj));

        dispatch({
            type: actionTypes.AUTH_SUCCESS,
            idToken: response.data.idToken,
            userId: response.data.localId
        });

        dispatch(checkAuthTimeout(response.data.expiresIn));

    }catch (error) {
        dispatch({type: actionTypes.AUTH_FAIL, error: error.response.data.error});

    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const authObject = JSON.parse(localStorage.getItem('auth'));
        if(!authObject) return;
        const token = authObject.token;
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(authObject.expirationDate);
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else {
                const userId = authObject.userId;
                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    idToken: token,
                    userId: userId
                });

                const time = (expirationDate.getTime() - new Date().getTime()) / 1000;

                dispatch(checkAuthTimeout(time));
            }
        }
    };
};