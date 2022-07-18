import type { AxiosInstance } from 'axios'

import axios from 'axios'

const axiosInstance: AxiosInstance = axios.create({
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

export const localHTTP: AxiosInstance = axios.create({
  baseURL: '/data',
  timeout: 1000,
})

export const dotnetHTTP: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/dotnet-api',
  timeout: 1000,
})
