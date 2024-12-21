import axios from "axios"

export const API_BASE_URL="https://peaceful-motivation-production.up.railway.app"

const jwtToken=localStorage.getItem("token")

export const api=axios.create({baseURL:API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwtToken}`,
        "Content-Type":"application/json"    
}})