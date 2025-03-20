import { jwtDecode } from "jwt-decode"

const DecodeToken = async (token)=>{
  const tokenInfo =  jwtDecode(token)
  return tokenInfo
}

export default DecodeToken