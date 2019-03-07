<template>
  <b-card>
    <b-table
      :id="id"
      hover
      small
      striped
      responsive
      borderless
      :items="getPage"
      :fields="fields"
      :apiUrl="url"
      :current-page="currentPage"
      :per-page="perPage"
    >

      <div slot="table-busy" class="text-center text-danger my-2">
        <loading-animation />
      </div>

      <template slot="items" slot-scope="row">
        <b-button :id="row.item.uuid" variant="outline-success">{{ labelItem }}</b-button>

        <b-popover
          placement="right"
          :target="row.item.uuid"
          triggers="focus">

          <div v-for="item in row.item.items">
            <h5>{{ item.name }}</h5>
            <p>Reduzido: {{ item.reducer }} Separar: {{ item.amount }} Pendente: {{ item.amount - item.prepare }}</p>
          </div>

          <b-row class="justify-content-md-center" v-if="labelItem === 'Iniciar'">
            <b-button @click.prevent= "startPrepare(row.item)" variant="link">Iniciar</b-button>
          </b-row>
        </b-popover>
      </template>

      <template slot="process" slot-scope="row">
        <b-progress :value="complete(row.item.items)" :max="100" show-progress></b-progress>
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
  import { LoadingAnimation } from '@/components/loaders'
  import { order } from '@/service'
  import store from '@/store'

  export default {
    name: 'orders-prepare-table',

    components: { LoadingAnimation },
    props: {
      id: {
        type: String,
        require
      },
      labelItem: {
        type: String,
        require
      },
      fields: {
        type: [Array, Object],
        default: () => [],
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

        return order
        .getAllBy(`${context.apiUrl}?page=${context.currentPage - 1}&size=${context.perPage}${sortBy}`)
        .then(({ data }) => {
          this.totalRows = data.page.totalElements
          const items = data._embedded[this.resourceName]

          store.commit('order/SET_ORDERS', items)

          return (items)
        })
      },

      complete (items) {
        const prepare = items.reduce((acc, { prepare }) => {
          return acc + prepare
        }, 0)

        const amount = items.reduce((acc, { amount }) => {
          return acc + amount
        }, 0)

        return (prepare / amount) * 100
      },

      startPrepare (order) {
        store.commit('order/SET_ORDER', order)
        this.$router.push('/orders/prepare/start')
      }
    },
  }
</script>

<style scoped>

</style>
