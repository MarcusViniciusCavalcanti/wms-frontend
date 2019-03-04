<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" md="12">

        <transition name="fade">
          <b-card class="bg-secondary" no-body v-if="show">
            <div slot="header">
              {{ titleCardForm }}
              <div class="card-header-actions">

                <b-link class="card-header-action btn-minimize"
                        @click="showForm = !showForm"
                        aria-controls='showForm'
                        :aria-expanded='showForm' >
                  <i class="icon-arrow-up"></i>
                </b-link>

              </div>
            </div>
            <b-collapse id="showForm" v-model='showForm'>
              <b-card-body>
                <c-form
                  :form='form'
                  :formData='formData'
                  :loading='loading'
                  @save='create'>
                </c-form>
              </b-card-body>
            </b-collapse>
          </b-card>
        </transition>
      </b-col>
    </b-row>

    <b-row>
      <b-col ref='box' sm='6' md='4' v-for='attribute in this.allocationAddressAttributes' :key='attribute.uuid'>
        <b-card class="card-accent-primary">
          <b-card-title>
            {{ attribute.name }}
            <div class="card-header-actions">

              <b-link class='card-header-action btn-minimize'>
                <i class='icon-pencil' @click.self='update(attribute)'></i>
              </b-link>

              <b-link class='card-header-action btn-minimize'>
                <i class='icon-trash' @click.self='remove(attribute)'></i>
              </b-link>

            </div>
          </b-card-title>
          {{ attribute.description }}
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import store from '@/store'
  import { allocationAddressAttributes } from '@/service'
  import { TimelineMax  } from 'greensock'
  import CForm from '@/components/forms/c-form'

  function getFormData () {
    return Object.assign(
      {},
      store.getters[
        'allocationsAddressAttributes/allocationAddressAttribute'
        ],
    )
  }

  export default {
    name: 'attributes',
    components: { CForm },
    data () {
      return {
        titleCardForm: 'Adicionar novo Atributo',
        show: true,
        showForm: false,
        loading: true,
        tl: new TimelineMax(),
        allocationAddressAttributes: [],
        formData: getFormData(),
      }
    },

    mounted: async function() {
      await allocationAddressAttributes.getAll()

      this.loading = false

      this.allocationAddressAttributes =
        store.getters['allocationsAddressAttributes/allocationAddressAttributes']
          ._embedded.allocationsAttributesResourcesList.reverse()

      const { box } = await this.$refs
      this.animate(box)

    },

    computed: {
      form: () => {
        return [
          {
            jumbotron: false,
            col:'col-sm-12 col-md-12',
            fieldsPickings: [
              {
                label: 'Nome',
                id: 'name',
                placeholder: 'Nome do atributo, Exemplo Setor',
                required: true,
              },
              {
                label: 'Descrição',
                id: 'description',
                type: 'textarea',
                placeholder: 'Descrição do atributo, Exemplo Setor',
                required: true,
              },
            ]
          }
        ]
      },
    },

    methods: {
      animate: function (box) {
        this.tl.staggerFrom(box, 1, {
          scale: 0,
          opacity: 0
        }, .1)
      },

      update: function ({ uuid }) {
        if (!this.showForm) {
          this.$root.$emit('bv::toggle::collapse', 'showForm')
        }
        this.formData = store.getters['allocationsAddressAttributes/getBrandByUUID'](uuid)
      },

      create: async function (data) {

        if (data.uuid === null) {
          await allocationAddressAttributes.create(data)
        } else {
          console.log(data)
         await allocationAddressAttributes.update(data)
        }

        this.formData = getFormData()
        this.$root.$emit('bv::toggle::collapse', 'showForm')
      },

      remove: function (data) {

      }
    }
  }
</script>

<style lang="scss" scoped>

  .card {
    box-shadow: 10px 11px 35px -8px rgba(0,0,0,0.22);
  }

  .fade-enter-active {
    transition: all .3s ease;
  }

  .fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fade-enter, .fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

</style>
