<script>
  import PagingSource from './PagingSource'

  export default {
    name: 'Pageable',
    functional: true,
    props: {
      pagingSource: {
        type: PagingSource,
        required: true
      }
    },
    render (h, { props, scopedSlots }) {
      const { list, page, pageSize, total } = props.pagingSource
      const totalPages = pageSize <= 0 ? 0 : Math.ceil(total / pageSize)
      const hasNext = page < totalPages
      const hasPrev = page > 1
      return h('div', [
        scopedSlots.list ? scopedSlots.list({ list: list }) : '',
        scopedSlots.default ? scopedSlots.default() : '',
        scopedSlots.pager ? scopedSlots.pager({ page, pageSize, total, totalPages, hasNext, hasPrev }) : ''
      ])
    }
  }
</script>
