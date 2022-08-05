import type { QueryWorksModel, WorkModel } from './model'
import type { QueryWorksParameters } from './model/works'

import { sendRequest } from '../utils/http/axios'

export const queryWorks = async ({
  title,
  author,
}: QueryWorksParameters): Promise<QueryWorksModel> => {
  const query = `
    query getWorks($title: String, $author: String) {
      works(title: $title, author: $author) {
        title
        author
      }
    }
 `

  const { works } = await sendRequest(query, { title, author })

  return works
}

export const addWork = async ({ title, author }: WorkModel): Promise<boolean> => {
  const mutation = `
    mutation addWork($title: String!, $author: String!) {
      addWork(title: $title, author: $author)
    }
  `

  const { addWork } = await sendRequest(mutation, { title, author })

  return addWork
}
