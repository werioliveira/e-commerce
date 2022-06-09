import { publicRequest } from '../requestMethods'
import {loginFailure, loginStart,loginSuccess} from './userRedux'
export const login = async(dispatch,user) =>{
    dispatch(loginStart())
    try{
        const response = await publicRequest.post('/user/login',user)
        dispatch(loginSuccess(response.data))
    }catch{
        dispatch(loginFailure())
    }
}