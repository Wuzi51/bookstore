import axios from "axios"

export const bookApi = {
  getBooks: async() => {
    const { data } = await axios.get("/mock/books")
    return data
  }
}