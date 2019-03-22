import Vue from 'vue'

import PagingSource from '@/PagingSource'
import Chance from 'chance'

const chance = new Chance()

describe('PagingSource.js', () => {
  class TestSource extends PagingSource {
    arr = []

    constructor () {
      super()
      for (let i = 0; i < 1000; i++) {
        this.arr[i] = i
      }
    }

    getList (paging) {
      let { page, pageSize } = paging
      return new Promise(resolve => {
        setTimeout(() => {
          const total = this.arr.length
          if (page < 1) {
            page = 1
          }
          if (page > total) {
            page = total
          }
          const list = this.arr.slice((page - 1) * pageSize, page * pageSize)
          resolve({ page, pageSize, total, list })
        }, chance.integer({ min: 0, max: 10 }))
      })
    }
  }

  it('should get list.', async () => {
    const testSource = new TestSource()
    expect(await testSource.getList({ page: 2, pageSize: 2 }))
      .toEqual({ list: [2, 3], page: 2, pageSize: 2, total: 1000 })

    expect(await testSource.getList({ page: -1, pageSize: 2 }))
      .toEqual({ list: [0, 1], page: 1, pageSize: 2, total: 1000 })
  })

  it('should not refresh when not bind to any vm.', async () => {
    const testSource = new TestSource()

    testSource.page = 3
    testSource.pageSize = 4

    expect(testSource.list).toEqual([])

    await testSource.refresh()

    expect(testSource.list).toEqual([8, 9, 10, 11])
  })

  it('should refresh on bind to vm.', async () => {
    const testSource = new TestSource()
    testSource.pageSize = 2
    const vue = new Vue({
      data () {
        return {
          pagingSource: testSource
        }
      },
      render (h) {return h('div') },
      mounted () {
        testSource.bind(this)
      }
    })
    vue.$mount()
    await asyncTimeout(20)
    expect(testSource.list).toEqual([0, 1])
    expect(testSource.total).toEqual(1000)

    testSource.page = 2
    await asyncTimeout(20)
    expect(testSource.list).toEqual([2, 3])
  })

  it('should not refresh on vm destroyed.', async () => {
    const testSource = new TestSource()
    testSource.pageSize = 2
    const vue = new Vue({
      data () {
        return {
          pagingSource: testSource
        }
      },
      render (h) {return h('div') },
      mounted () {
        testSource.bind(this)
      }
    })
    vue.$mount()
    await asyncTimeout(20)
    vue.$destroy()
    testSource.page = 2
    expect(testSource.list).toEqual([0, 1])
  })

  it('should not refresh on self update.', async () => {
    const testSource = new TestSource()
    const vue = new Vue({
      data () {
        return {
          pagingSource: testSource
        }
      },
      render (h) {return h('div') },
      mounted () {
        testSource.bind(this)
      }
    })
    vue.$mount()
    await asyncTimeout(20)
    const original = testSource.getList
    let count = 0
    testSource.getList = function () {
      count++
      return original.apply(testSource, arguments)
    }
    testSource.page = 0
    await asyncTimeout(40)
    expect(count).toEqual(1)
  })
})

async function asyncTimeout (timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}
