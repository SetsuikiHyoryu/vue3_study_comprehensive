import type { AxiosResponse } from 'axios'

import { localHTTP } from '@/utils/http/axios'

export async function queryCharacters(): Promise<CharacterModel[]> {
  const response: AxiosResponse<CharacterModel[], any> = await localHTTP({
    url: '/characters.json',
    method: 'GET',
  })

  return response.data
}
