<template>
  <div id="app">
    <Pageable :paging-source="pagingSource">
      <template v-slot:list="{ list }">
        <div v-for="item in list" class="github-repository" :key="item.id">
          <a :href="item.html_url">{{item.full_name}}</a>
          <p>{{item.description}}</p>
        </div>
      </template>
      <hr />
      <template v-slot:pager="{ page, pageSize, totalPages, hasNext, hasPrev, total }">
        <p>
          <b>Page</b>: {{page}}<br>
          <b>Page Size</b>: {{pageSize}}<br>
          <b>Total Pages</b>: {{totalPages}}<br>
          <b>Has next</b>: {{hasNext}}<br>
          <b>Has prev</b>: {{hasPrev}}<br>
          <b>Total</b>: {{total}}<br>
          <button @click="() => onPrev()" v-if="hasPrev">Prev</button>
          <button @click="() => onNext()" v-if="hasNext">Next</button>
        </p>
      </template>
    </Pageable>
  </div>
</template>

<script>
  import Pageable from './Pageable'
  import axios from 'axios'
  import PagingSource from './PagingSource'

  class GitHubSearchingRepositoryPagingSource extends PagingSource {
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

  export default {
    name: 'app',
    components: {
      Pageable
    },
    data () {
      return {
        pagingSource: new GitHubSearchingRepositoryPagingSource()
      }
    },
    created () {
      this.pagingSource.bind(this)
    },
    methods: {
      onNext () {
        this.pagingSource.page += 1
      },
      onPrev () {
        this.pagingSource.page -= 1
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
