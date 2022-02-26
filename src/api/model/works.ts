// 作品信息
export interface WorkModel {
  title: string
  author: string
}

// 获取作品参数
export interface QueryWorksParameters {
  title?: string
  author?: string
}

// 获取作品列表返回值
export type QueryWorksModel = WorkModel[]
