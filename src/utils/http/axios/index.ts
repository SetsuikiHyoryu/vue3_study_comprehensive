import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
})

export const sendRequest = async (
  query: string,
  variables?: { [property: string]: any }
): Promise<{ [property: string]: any }> => {
  const { data } = await axiosInstance({
    method: 'POST',
    url: '',
    data: { query, variables },
  })

  return data.data
}
