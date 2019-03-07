<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col v-if="isComplete">
        <b-col>
          <h1>Separaçaão finalizada!!</h1>
          <p>Você sera redirecionado em alguns segundos... </p>
        </b-col>
      </b-col>

        <b-col v-else
          @click.prevent="onShow(item)"
          ref='box'
          sm="6"
          md="6"
          lg="2"
          v-for="item in order.items"
          :key="item.uuid"
          :id="item.uuid"
        >
          <b-card class="pointer" :ref="item.uuid" :class="item.prepare === item.amount ? 'text-white  bg-success' :
          ''">

            <div class="h1 text-muted text-right mb-4">
              <i v-if="item.prepare === item.amount" class="cui-check"></i>
            </div>
            <div class="h5 mb-0">{{item.name}}</div>
            <small v-if="item.prepare !== item.amount" class="text-muted text-uppercase font-weight-bold">
              Pendentes: {{item.amount - item.prepare}}
            </small>
            <b-progress
              v-if="item.prepare !== item.amount"
              height={}
              class="progress-xs mt-3 mb-0"
              variant="info"
              :value="(item.prepare / item.amount) * 100"/>
          </b-card>
        </b-col>

        <b-modal
          size="lg"
          centered
          lazy
          :title="modalTitle"
          header-bg-variant="info"
          footer-border-variant="info"
          @hidden="onHidden"
          v-model="modalShow"
          ok-only
          ok-title="Fechar"
        >
          <b-container>
            <b-row>
              <b-col md="6">
                <model-list-select
                  :list="this.selectItem.locals"
                  option-value="address"
                  option-text="name"
                  v-model="selectedLocal"
                  placeholder="Selecione Alocação"
                  @searchchange="searchAllocation" />
              </b-col>
              <b-col v-if="localsIsSelected" md="6" class="animated fadeIn">

                <b-form inline>
                  <label class="margin-right">Quantidade: {{selectedLocal.quantity}}</label>
                  <label class="sr-only" for="quantity">Name</label>
                  <b-input v-model="quantity" id="quantity" pllaceholder="10000" class="margin-right"></b-input>
                  <b-button variant="outline-primary" @click.prevent="addItem">
                    <i class="fa fa-plus"></i>
                  </b-button>
                </b-form>
              </b-col>
            </b-row>
          </b-container>
        </b-modal>
    </b-row>
  </div>
</template>

<script>
  import { order as service } from '@/service'
  import store from '@/store'
  import { TimelineMax  } from 'greensock'
  import { ModelListSelect } from 'vue-search-select'

  export default {
    name: 'prepare-start',
    components: { ModelListSelect },

    data () {
      return {
        tl: new TimelineMax(),
        modalShow: false,
        selectedLocal: {},
        select: false,
        selectItem: {},
        order: {},
        quantity: null,
        isComplete: false,
        fields: [
          { key: 'name', label:'Item'},
        ]
      }
    },

    mounted: async function () {
      this.order = store.getters['order/order']
      await service.startPrepare()

      const { box } = await this.$refs
      this.animate(box)
    },

    beforeRouteEnter (to, from , next) {
      // TODO descomentar
      // const { path } = from
      // if (path === '/orders/prepare/all') {
      //   next(true)
      // } else {
      //   next(false)
      // }
      //
      next()
    },

    async beforeRouteLeave (to, from, next) {
      const options = {
        title: 'Você está preste a pausar a separação!',
        size: 'sm',
        okLabel: 'Sim',
        cancelLabel: 'Não',
      }

      if (!this.isComplete) {
        this.$dialogs.confirm(
          'Sair desta página automaticamente pausa a separação, os dados coletados serão computados e os registro dos items que você separou.',
          options
        ).then(res => {
          console.log(res)
          if (res.ok) {
            this.pausePrepare()
          }
          next(res.ok)
        })
      }

      next(true)
    },

    computed: {
      modalTitle: function() {
        return `Item: ${this.selectItem.name}  -- Pendente:  ${ this.selectItem.amount - this.selectItem.prepare}`
      },

      localsIsSelected: function () {
        const { quantity } = this.selectedLocal
        return quantity !== undefined
      }
    },

    methods: {
      async pausePrepare () {
        await service.pausePrepare()
        this.$notify.success('Separação pausada com sucesso!', 'Pausada!')
      },

      animate: function (box) {
        this.tl.staggerFrom(box, 0.3, {
          scale: 0,
          opacity: 0
        }, .1)
      },

     async onShow (item) {
       this.selectItem = item
       this.modalShow = true
      },

      async searchAllocation (searchText) {

      },

      async addItem () {
        try {
          const { uuid } = this.selectItem
          const amount = this.quantity
          const { name } = this.selectedLocal

          await service.updateOrderItem({ uuid, amount, name })

          this.selectedLocal = {}
          this.$notify.success('Items Adicionado', 'Sucesso!')
        } catch (error) {
          console.log(error)
        }
      },

      async onHidden (event) {
        event.preventDefault()
        const result = this.order.items.filter(item => item.amount !== item.prepare)
        console.log(result)
        if (result.length === 0) {
          this.isComplete = true
          await service.completeOrder(this.order)
          setTimeout(this.redirect, 3000)
        }
      },

      redirect () {
        this.$router.push('/orders/prepare/all')
      }
    },
  }
</script>

<style>
  .v-dialog:target .v-dialog-overlay,
  .v-dialog.active .v-dialog-overlay {
    background: rgba(51, 58, 64, 0.75) !important;
  }

  .margin-right {
    margin-right: .8rem;
  }

  .pointer {
    cursor: pointer;
  }
</style>
