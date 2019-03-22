import Pageable, { PagingSource } from '@/index'
import RealPagingSource from '@/PagingSource'

describe('Pageable.vue', () => {
  it('should export component and PagingSource', () => {
    expect(Pageable.name).toBe('Pageable')
    expect(Pageable.functional).toBe(true)
    expect(PagingSource).toBe(RealPagingSource)
  })
})
