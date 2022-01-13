
import axios from "axios";
import {IP_HOST} from "@env"
export const GET_DATA_USER = "GET_DATA_USER";

export const DATA_HARD = "DATA_HARD"
export const LOG = "LOG";
export const LOGOUT = "LOGOUT";
export const TOKENS_HARD = "TOKENS_HARD";
export const ADD_FOUNDS = "ADD_FOUNDS";
export const DEPOSIT_TRANSACTION = "DEPOSIT_TRANSACTION"


export function Log () {
    return {
        type: LOG,
        payload: null,
    }
}

export function Logout () {
    return {
        type:LOGOUT,
        payload: null,
    }
}

export const getDataUser = ()=> async dispatch =>{
    try{
    
        // let dataUser = await axios(`http://${IP_HOST}:3001/user/getData`)
        const response = await axios({
              method: "get",
              withCredentials: true,
              url: `http://${IP_HOST}:3001/user/getData`,
            })
        
        const dataUser =  response.data;
        dataUser.balance= "1000"
        dispatch({type:GET_DATA_USER, payload: dataUser})
    }catch(e){
        console.log("Error al consultar")
    }

}



export const dataHard= (data)=>{
    return {type:DATA_HARD, payload:data}
}
export const getTokernsHard = ()=> async dispatch =>{
    try{
    
        // let dataUser = await axios(`http://${IP_HOST}:3001/user/getData`)
        const response = await axios({
              method: "get",
              withCredentials: true,
              url: `http://${IP_HOST}:3001/api/apiBinance`,
            })
         
        const dataUser =  response.data;
        
        dispatch({type:TOKENS_HARD, payload: dataUser})
    }catch(e){
        console.log("Error al consultar")
    }

}

export const addFounds = (founds)=>{
    return({type:ADD_FOUNDS, payload:founds})
}

export const depositTransaction = (transaction)=>{
    return({type:DEPOSIT_TRANSACTION, payload:transaction})
}