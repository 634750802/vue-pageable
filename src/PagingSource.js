import Vue from 'vue'

export default class PagingSource {

  #requesting = 0
  #selfChanging = false
  page
  pageSize
  total = 0
  list = []

  constructor (page = 1, pageSize = 10) {
    this.page = page
    this.pageSize = pageSize
  }

  async getList ({ page, pageSize }) {
    return {
      page: this.page,
      pageSize: this.pageSize,
      list: [],
      total: 0
    }
  }

  async refresh () {
    if (this.#selfChanging) {
      return
    }
    const currentRequest = ++this.#requesting
    const res = await this.getList({
      page: this.page,
      pageSize: this.pageSize
    })
    if (currentRequest !== this.#requesting) {
      return
    }
    const { page, pageSize, total, list } = res
    this.#selfChanging = true
    Vue.set(this, 'list', list)
    Vue.set(this, 'total', total)
    Vue.set(this, 'page', page)
    Vue.set(this, 'pageSize', pageSize)
    await Vue.nextTick()
    this.#selfChanging = false
  }

  bind (vm) {
    if (!vm instanceof Vue) {
      return
    }

    const doWatch = () => vm.$watch(() => `${this.page},${this.pageSize}`,
      () => this.refresh(),
      { immediate: true })

    let unwatch = doWatch()

    vm.$on('hook:deactivated', () => {
        unwatch()
      })
      .$on('hook:activated', () => {
        unwatch = doWatch()
      })
      .$on('hook:beforeDestroy', () => {
        unwatch()
      })
  }
}
