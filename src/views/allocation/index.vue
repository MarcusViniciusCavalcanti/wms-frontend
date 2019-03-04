<template>
  <div class="animated fadeIn">
    <div>

      <b-tabs
        lazy
      >
        <b-tab active>
          <template slot="title">
            <p> Alocações </p>
          </template>

          <allocations-table
            id="pickings"
            resourceName="allocationsResourceList"
            :url="pickings"
            :fields='fieldsPickings'
            :editAction='update'
            :deleteAction='remove'>

            <template slot="itemAllocated" slot-scope="row">

            </template>

            </allocations-table>
        </b-tab>

        <b-tab>
          <template slot="title">
            <p> Reservas </p>
          </template>

          <reserves-table
            id="reservers"
            resourceName="allocationsResourceList"
            :url="reserves"
            :fields='fieldsReserve'
            :editAction='update'
            :deleteAction='remove' />
        </b-tab>
      </b-tabs>

    </div>

    <b-modal
      centered
      lazy
      title="Cuidado com esta Ação!"
      header-bg-variant="warning"
      footer-border-variant="warning"
      @ok.passive="executeRemote"
      v-model="modalShow">
      <div ref="message"></div>

      <p class="text-center">Clique em Ok para confirmar, ou <strong>Cancelar</strong>, para desistir da operação.</p>
    </b-modal>
  </div>
</template>

<script>
  import { LoadingSpinner } from '@/components/loaders'
  import { allocation as service } from '@/service'
  import store from '@/store'
  import AllocationsTable from '@/components/tables/pickings-table'
  import ReservesTable from '@/components/tables/reserves-table'

  export default {
    name: 'index',
    components: { ReservesTable, AllocationsTable, LoadingSpinner },

    data () {
      return {
        loading: true,
        modalShow: false,
        modalMessage: '',
        allocation: null,
        pickings: '',
        reserves: '',
        fieldsPickings: [
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'address', label: 'Endereçamento', sortable: true },
          { key: 'quantity', label: 'Quantidade' },
          { key: 'quantityMax', label: 'Capacidade' },
          { key: 'quantityMin', label: 'Minímo' },
          { key: 'reserve', label: 'Reserva', sortable: true  },
          { key: 'itemAllocated', label: 'Item ' },
          { key: 'actions', label: 'Ações' },
        ],
        fieldsReserve: [
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'address', label: 'Endereçamento', sortable: true },
          { key: 'quantity', label: 'Quantidade' },
          { key: 'quantityMax', label: 'Capacidade' },
          { key: 'quantityMin', label: 'Minímo' },
          { key: 'itemAllocated', label: 'Item ' },
          { key: 'actions', label: 'Ações' },
        ],
      }
    },

    mounted: async function () {
      const { allPickings, allReserve } = store.getters['endpoints/allocations']
      this.pickings  = allPickings.href
      this.reserves = allReserve.href
    },

    methods: {
      update: async function (allocation) {
        store.commit('allocation/SET_ALLOCATION', allocation)
        this.$router.push('/configurations/allocations/edit')
      },

      remove: async function (allocation, table) {
        const modalMessage =
          `<p class="text-center ">
                <span class="text-danger">
                Você está preste a deletar a Alocação: <strong>${allocation.name}</strong>
                tem certeza testa ação, pense bem, esta ação</span>
                <strong>não poderá ser revertida?</strong>
           </p>`

        this.modalShow = true
        const { message } = await this.$refs
        message.innerHTML = modalMessage
        this.allocation = allocation
        this.table = table
      },

      executeRemote: async function () {
        try {
          await service.delete(this.allocation)
          this.$notify.success("Removido com sucesso")
          this.$root.$emit('bv::refresh::table', this.table)
        } catch (error) {
          this.$notify.error(error)
        }
      },
    },
  }
</script>

<style scoped>
  table#pickings .flip-list-move {
    transition: transform 1s;
  }
</style>
