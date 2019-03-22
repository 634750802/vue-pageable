import PagingSource from '@/PagingSource'
import axios from 'axios'

export default class GitHubSearchingRepositoryPagingSource extends PagingSource {
  async getList ({ page, pageSize }) {
    const {data} = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: 'vue language:javascript',
        sort: 'stars',
        order: 'desc',
        page,
        per_page: pageSize
      }
    })
    const {items, total_count} = data
    return {
      list: items,
      page,
      pageSize,
      total: total_count
    }
  }
}
