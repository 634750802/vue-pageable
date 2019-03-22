import Vue from 'vue'

export default abstract class PagingSource<T> {
  page: number
  pageSize: number
  readonly total: number
  readonly list: T[]

  constructor (page?: number, pageSize?: number)

  abstract getList (paging: { page: number, pageSize: number }): Promise<{ list: T[], total: number, page: number, pageSize: number }>

  refresh (): Promise<void>

  bind (vm: Vue)
}
