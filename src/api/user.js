import axios from "axios"
export const userApi = {
  login: async(username, password) => {
    const { data } = await axios.post('https://dummyjson.com/user/login', {
      username,
      password,
    })
    return data
  }
}
