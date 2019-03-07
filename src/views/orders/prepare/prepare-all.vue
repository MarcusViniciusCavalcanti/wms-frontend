<template>
  <div class="animated fadeIn">
    <div>

      <b-tabs
        lazy
      >
        <b-tab active>
          <template slot="title">
            <p>Pedidos Liberados</p>
          </template>

          <OrderTable
            id="released"
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
    name: 'orders-prepare-all',
    components: { OrderTable },

    data () {
      return {
        urlAllPrepare: '',
        urlAllComplete: '',
        fieldsPrepare: [
          { key: 'document', label: 'Documento', sortable: true },
          { key: 'costumer', label: 'Cliente', sortable: true },
          { key: 'items', label: '' },
          { key: 'process', label: '% Concluida'}
        ],
        fieldsComplete: [
          { key: 'document', label: 'Documento', sortable: true },
          { key: 'costumer', label: 'Cliente', sortable: true },
          { key: 'items', label: '' },
          { key: 'completeId', label: 'Concluida em'}
        ],
      }
  },

    mounted : async function () {
      const { allReleasedPrepare, allComplete } = store.getters['endpoints/orders']
      this.urlAllPrepare = allReleasedPrepare.href
      this.urlAllComplete = allComplete.href
    },

    methods: {
      startPrepare () {

      }
    }
  }
</script>

<style scoped>

</style>
