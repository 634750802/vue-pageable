# Vue pageable

## Demo

::: tip
This demo is to show GitHub repo list, by searching `vue` and order by stars.  
:::

Define a data source.

<<< @/src/demo/GitHubSearchingRepositoryPagingSource.js

Observe the data source and bind to a vue instance.

<<< @/src/App.vue

::: warning
GitHub API has rate restrictions, result may not display well.
:::

<ClientOnly>
    <Demo />
</ClientOnly>
