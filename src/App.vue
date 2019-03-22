<template>
  <div id="app">
    <Pageable :paging-source="pagingSource" v-slot="{ list, page, pageSize, totalPages, hasNext, hasPrev, total }">
      <div v-for="item in list" class="github-repository" :key="item.id">
        <a :href="item.html_url">{{item.full_name}}</a>
        <p>{{item.description}}</p>
      </div>
      <hr />
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
    </Pageable>
  </div>
</template>

<script>
  import Pageable from './Pageable'
  import GitHubSearchingRepositoryPagingSource from '@/demo/GitHubSearchingRepositoryPagingSource'

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
