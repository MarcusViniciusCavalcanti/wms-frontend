<template>

  

  <b-card>
    <b-table
      id="table-reallocation"
      hover
      small
      striped
      responsive
      borderless
      selectable
      select-mode="single"
      selectedVariant="info"
      :items="getPage"
      :fields="fields"
      :apiUrl="url"
      :current-page="currentPage"
      :per-page="perPage"
      @row-selected="rowSelected"
    >

      <div slot="table-busy" class="text-center text-danger my-2">
        <loading-animation />
      </div>

      <template slot="from" slot-scope="row">
        <span>{{row.item.from.name}}</span>
      </template>

      <template slot="to" slot-scope="row">
        <span>{{ row.item.to.name }} <strong> <i class="icon-location-pin"></i> {{ row.item.to.address }} </strong></span>
      </template>

      <template slot="item" slot-scope="row">
        <span>{{row.item.item.name}}</span>
      </template>

      <template slot="pendent" slot-scope="row">
        <span>{{ row.item.quantity - row.item.prepare }}</span>
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

    <b-modal
      size="sm"
      id="modalInfo"
      @hide="hideModal"
      ok-only
      ok-title="Fechar"
      title="Realocar Item"
      no-close-on-esc
      hide-header-close
    >
      <b-container>
        <b-row>
          <b-col>
            <b-form inline>
              <label class="sr-only" for="quantity">Quantidade</label>
              <b-input-group prepend="Adicionar: " class="mb-2 mr-sm-2 mb-sm-0">
                <b-input class="mb-2 mr-sm-2 mb-sm-0"  id="quantity" placeholder="Ex: 100"
                         v-model="quantity"/>
                <b-button variant="outline-primary" @click.prevent="addItem">
                  <i class="fa fa-plus"></i>
                </b-button>
              </b-input-group>
            </b-form>
          </b-col>
        </b-row>
      </b-container>

    </b-modal>
  </b-card>
</template>

<script>
  import { reallocation  as service } from '@/service'
  import store from '@/store'
  import { LoadingAnimation } from '@/components/loaders'

  export default {
    name: 'index',

    components: { LoadingAnimation },

    data () {
      return {
        resourceName: 'reallocationResourceList',
        url: '',
        modalInfo: {},
        quantity: 0,
        reallocated: 0,
        fields: [
          { key: 'from', label: 'Origem'},
          { key: 'to', label: 'Destino'},
          { key: 'item', label: 'Item'},
          { key: 'quantity', label: 'Quantidade'},
          { key: 'prepare', label: 'Realocados'},
          { key: 'pendent', label: 'Pendente'},
        ],
        currentPage: 1,
        perPage: 20,
        totalRows: 20,
      }
    },

    mounted : async function () {
      const { allReallocation } = store.getters['endpoints/reallocations']
      this.url = allReallocation.href
    },

    methods: {
      getPage (context) {
        const sortBy = context.sortBy ? `&sort=${context.sortBy},${context.sortDesc ? 'desc' : 'asc'}` : ''

        return service
          .getAllBy(`${context.apiUrl}?page=${context.currentPage - 1}&size=${context.perPage}${sortBy}`)
          .then(({ data }) => {
            this.totalRows = data.page.totalElements
            const items = data._embedded[this.resourceName]

            store.commit('reallocation/SET_REALLOCATIONS', items)

            return (items)
        })
      },

      rowSelected (items) {
        if (items.length > 0) {
          const selected = store.getters['reallocation/getAllocationByUUID'](items[0].uuid)
          store.commit('reallocation/SET_REALLOCATION', selected)
          this.$root.$emit('bv::show::modal', 'modalInfo')
        }
      },

      async hideModal() {
        const  reallocation = store.getters['reallocation/reallocation']
        await service.reallocationItem(reallocation, this.reallocated)

        const { prepare } = reallocation

        if (prepare === 0) {
         await service.completeTask(reallocation)
          this.$notify.success('Realocação concluída com sucesso!', 'Concluída!')
        }

        this.$root.$emit('bv::refresh::table', 'table-reallocation')
      },

      async addItem () {
        this.reallocated += +this.quantity
        this.quantity = ''
      }
    },
  }
</script>

<style scoped>

</style>
