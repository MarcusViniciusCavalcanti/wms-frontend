<template>
  <b-card :header='caption'>
    <b-table
      id="c-table"
      :dark='dark'
      :hover='hover'
      :striped='striped'
      :bordered='bordered'
      :small='small'
      :fixed='fixed'
      responsive='sm'
      :items='getPage'
      :fields='fields'
      :apiUrl="url"
      :current-page='currentPage'
      :per-page='perPage'>

      <template slot='actions' slot-scope='row'>
        <b-button v-show='editAction' size='sm' @click.prevent='editAction(row.item)' class='mr-1'>
          <i class='fa fa-edit'></i> Editar
        </b-button>

        <b-button v-show='deleteAction' variant='danger' size='sm' @click.prevent='deleteAction(row.item)' class='mr-1'>
          <i class='fa fa-trash'></i> Excluir
        </b-button>
      </template>
    </b-table>
    <nav>
      <b-pagination
        align="center"
        :limit="10"
        :total-rows='totalRows'
        :per-page='perPage'
        prev-text="Anterior"
        next-text="Próximo"
        number-of-page="numberOfPages"
        v-model='currentPage'/>
    </nav>
  </b-card>
</template>

<script>
  import { HTTP } from '@/service/http-commons'

  export default {
    name: 'c-table',
    inheritAttrs: false,
    props: {
      caption: {
        type: String,
        default: '',
      },
      hover: {
        type: Boolean,
        default: false,
      },
      striped: {
        type: Boolean,
        default: false,
      },
      bordered: {
        type: Boolean,
        default: false,
      },
      small: {
        type: Boolean,
        default: false,
      },
      fixed: {
        type: Boolean,
        default: false,
      },
      fieldsPickings: {
        type: [Array, Object],
        default: () => [],
      },
      dark: {
        type: Boolean,
        default: false,
      },
      editAction: {
        type: Function,
      },
      deleteAction: {
        type: Function,
      },
      url: {
        type: String,
      },
      resourceName: {
        type: String,
      },
    },
    data: () => {
      return {
        currentPage: 1,
        perPage: 20,
        totalRows: 20,
      }
    },

    methods: {
      getPage (context) {
        const sortBy = context.sortBy ? `&sort=${context.sortBy},${context.sortDesc ? 'desc' : 'asc'}` : ''
        return HTTP.get(`${context.apiUrl}?page=${context.currentPage - 1}&size=${context.perPage}${sortBy}`).
          then(({ data }) => {
            this.totalRows = data.page.totalElements
            const items = data._embedded[this.resourceName]
            return (items)
          })
      },
    },
  }
</script>
