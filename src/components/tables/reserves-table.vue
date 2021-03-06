<template>
  <b-card>
    <b-table
      :id="id"
      hover
      small
      striped
      responsive
      :items="getPage"
      :fields="fields"
      :apiUrl="url"
      :current-page="currentPage"
      :per-page="perPage"
    >

      <div slot="table-busy" class="text-center text-danger my-2">
        <animation />
      </div>

      <template slot="itemAllocated" slot-scope="row">
        <div class="items" v-if="row.item.itemAllocated">
          <span :id="row.item.uuid">{{ row.item.itemAllocated.name }}</span>
          <b-popover
            placement="top"
            :target="row.item.uuid"
            triggers="hover focus">
            <div class="h4 m-0">{{ row.item.itemAllocated.name }}</div>
            <div>Resumo do item</div>
            <small class="text-muted">Alguma informação necessária que deve ser adquirida de forma rápida.</small>
          </b-popover>
        </div>
      </template>

      <template slot="actions" slot-scope="row">
        <b-button v-show="editAction" size="sm" @click.passive="editAction(row.item)" class="mr-1">
          <i class="fa fa-edit"></i> Editar
        </b-button>

        <b-button v-show="deleteAction" variant="danger" size="sm" @click.passive="deleteAction(row.item, id)" class="mr-1">
          <i class="fa fa-trash"></i> Excluir
        </b-button>
      </template>
    </b-table>

    <nav>
      <b-pagination
        align="center"
        :limit="10"
        :total-rows="totalRows"
        :per-page="perPage"
        prev-text="Anterior"
        next-text="Próximo"
        number-of-page="numberOfPages"
        v-model="currentPage"/>
    </nav>
  </b-card>
</template>

<script>
  import { allocation } from '@/service'
  import Animation from '@/components/loaders/animation'

  export default {
    name: 'reserves-table',
    components: { Animation },
    props: {
      id: {
        type: String,
        require
      },
      fields: {
        type: [Array, Object],
        default: () => [],
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

        return allocation
        .getPageByUrl(`${context.apiUrl}?page=${context.currentPage - 1}&size=${context.perPage}${sortBy}`)
        .then(({ data }) => {
          this.totalRows = data.page.totalElements
          const items = data._embedded[this.resourceName]
          return (items)
        })
      },
    },
  }
</script>

<style scoped>
  .items {
    cursor: pointer;
  }
</style>
