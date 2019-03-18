<template>
  <div class="animated fadeIn">
    <div>

      <b-tabs
        lazy
      >
        <b-tab active>
          <template slot="title">
            <p>Entrada  Liberadas</p>
          </template>

          <OrderTable
            id="released"
            urlStart="/orders/items-in/start"
            storeAction="order/SET_ORDER"
            resourceName="orderResourceList"
            :url="this.urlAllPrepare"
            :fields='fieldsPrepare'
            labelItem="Iniciar"
          >

          </OrderTable>
        </b-tab>
        <b-tab>
          <template slot="title">
            <p>Executados</p>
          </template>
          <OrderTable
            id="complete"
            resourceName="orderResourceList"
            :url="this.urlAllComplete"
            :fields='fieldsComplete'
            labelItem="Items"
          />

        </b-tab>
      </b-tabs>

    </div>
  </div>
</template>

<script>
  import { OrderTable}  from '@/components/tables'
  import store from '@/store'

  export default {
    name: 'items-in-all',

    components: { OrderTable },

    data () {
      return {
        urlAllPrepare: '',
        urlAllComplete: '',
        fieldsPrepare: [
          { key: 'document', label: 'Documento', sortable: true },
          { key: 'operation', label: 'Tipo de operação', sortable: true },
          { key: 'destination', label: 'Origem', sortable: true },
          { key: 'items', label: '' },
          { key: 'process', label: '% Concluida'},
          { key: 'tasks', label: 'Execuções'},
        ],
        fieldsComplete: [
          { key: 'document', label: 'Documento', sortable: true },
          { key: 'destination', label: 'Origem', sortable: true },
          { key: 'items', label: '' },
          { key: 'completeIn', label: 'Concluida em'},
          { key: 'tasks', label: 'Execuções'},
        ],
      }
    },

    mounted : async function () {
      const { allReleasedIn, allInComplete } = store.getters['endpoints/orders']
      this.urlAllPrepare = allReleasedIn.href
      this.urlAllComplete = allInComplete.href
    },
  }
</script>

<style scoped>

</style>
