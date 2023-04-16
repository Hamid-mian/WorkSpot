import axios from "axios";

export const getUser = (data)=>{
    return axios.post("http://localhost:3100/api/users/login", data,{
        headers:{
          'Access-Control-Allow-Origin':'http://localhost:3000',
          // 'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          // 'Origin':'http://localhost:3000'
        }
      })
}

export const signupData = (data)=>{
    return axios.post('http://localhost:3100/api/users/post',data,{
        headers:{
          'Access-Control-Allow-Origin':'http://localhost:3000',
          // 'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          // 'Origin':'http://localhost:3000'
        }
      })
}

export const verify = (data)=>{
    return axios.get('http://localhost:3100/api/users/verifyCode',data,{
        headers:{
          'Access-Control-Allow-Origin':'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
        }
      })
}