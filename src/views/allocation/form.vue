<template>
  <div class="animated fadeIn">
    <b-card>
      <div slot="header">
        {{ titleCardForm }}
      </div>

      <b-card-body>
        <b-form
          @submit.prevent="save"
          novalidate
          :validated="isValid"
          autocomplete="off"
        >
          <b-row>
            <b-form-group
              class="col-md-6 col-sm-12"
              id="name"
              label="Nome"
              label-for="name"
              description="Código de identificação da alocação"
              :invalid-feedback="nameInvalidFeedback"
              :valid-feedback="nameValidateFeedback"
              :state="name"
            >
              <b-form-input
                required
                id="name-input"
                type="text"
                v-model="formData.name"
                :state="name"
                placeholder="Ex: b-17-20-50"/>
            </b-form-group>

          </b-row>

          <b-row>
            <b-form-group
              class="col-md-6 col-sm-12"
              id="quantityMax"
              label="Capacidade"
              label-for="input-quantityMax"
              description="Quantidade máxima alocada, esta informação é útil para o sistema."
              :invalid-feedback="capacityInvalidFeedback"
              :valid-feedback="capacityValidateFeedback"
              :state="capacity"
            >
              <b-form-input
                id="input-quantityMax"
                v-model="formData.quantityMax"
                required
                :state="capacity"
                placeholder="Ex: 1000"/>
            </b-form-group>

            <b-form-group
              class="col-md-6 col-sm-12"
              id="quantityMin"
              label="Minímo"
              label-for="input-quantityMin"
              description="Quantidade miníma, esta informação é útil para o sistema identificar quando o estoque está baixo e enviar uma alerta."
              :invalid-feedback="minimalInvalidFeedback"
              :valid-feedback="minimalValidateFeedback"
              :state="minimal"
            >
              <b-form-input
                id="input-quantityMin"
                v-model="formData.quantityMin"
                required
                :state="minimal"
                placeholder="Ex: 10"/>
            </b-form-group>

            <b-col md="12" sm="12">
              <b-card bg-variant="light" class="col-md-6 col-sm-12">
                <b-form-group
                  label-cols-lg="4"
                  label="Endereçamento"
                  label-size="lg"
                  label-class="font-weight-bold pt-0"
                  class="mb-0"
                >
                  <b-form-group v-for="input in inputs"
                                label-cols-sm="3"
                                :label="input.name"
                                label-align-sm="right"
                                :label-for="input.name"
                                :key="input.uuid"
                  >
                    <b-form-input :id="input.name" v-model="formData[input.name]" required/>
                  </b-form-group>
                </b-form-group>
              </b-card>

              <b-card bg-variant="light" class="col-md-6 col-sm-12">

                <b-row>
                  <b-col md="12" sm="12" class="margin-bottom">
                    <h5>Alocações Reservas</h5>
                    <b-badge
                      class="margin-left"
                      variant="info"
                      v-for="reserve in this.formData.reserves"
                      :key="reserve.uuid">
                      {{ reserve.name }}
                    </b-badge>
                  </b-col>

                  <b-col md="10" sm="12">
                    <model-list-select
                      :list="allocations"
                      option-value="uuid"
                      option-text="name"
                      v-model="selectedReserve"
                      placehilder="Selecione Alocação Reserva"
                      @searchchange="searchAllocation"
                    />
                  </b-col>

                  <b-col md="2" sm="12">
                    <div v-if="searchInProcess"><animation /></div>
                    <div v-else>
                      <b-button variant="outline-primary" @click.prevent="addReserve">
                        <i class="fa fa-plus"></i>
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>

          <div class="row">
            <div class="col">
              <button-back></button-back>
              <b-button type="submit" variant="primary" class="btn-lg float-right">
                Salvar
              </b-button>
            </div>
          </div>
        </b-form>
      </b-card-body>

    </b-card>
  </div>
</template>

<script>
  import store from '@/store'
  import { allocation, allocationAddressAttributes } from '@/service'
  import CForm from '@/components/forms/c-form'
  import ButtonBack from '@/components/forms/c-button-back'
  import { ModelListSelect } from 'vue-search-select'
  import { ValidateText, ValidationNumber } from '@/tools/validations'
  import Animation from '@/components/loaders/animation'

  function getAttributes () {
    return store.getters['allocationsAddressAttributes/allocationAddressAttributes']._embedded.allocationsAttributesResourcesList
  }

  function getFormData () {
    let allocation = store.getters[
      'allocation/allocation'
      ]

    const attributes = getAttributes()
    const address = allocation.address.split(/\s*,\s*/)

    attributes.forEach(({ name: inputName }) => {
      allocation[inputName] = address.find(name => name.includes(inputName)).replace(inputName, '')
    })

    return Object.assign(
      {},
      allocation,
    )
  }

  export default {
    name: 'new-allocation',
    components: { Animation, CForm, ModelListSelect, ButtonBack },

    data () {
      return {
        inProcess: false,
        searchInProcess: false,
        submitting: false,
        isValid: false,
        formData: getFormData(),
        selectedLocal: {},
        allocations: [],
        titleCardForm: 'Alocação',
      }
    },

    mounted: async function () {
      await allocationAddressAttributes.getAll()
    },

    computed: {
      inputs () {
        return getAttributes()
      },

      name () {
        return ValidateText({
          text: this.formData.name,
          length: 3,
        })
      },

      nameValidateFeedback () {
        return this.formData.name.length >= 3 ? 'Agora prace bom!' : ''
      },

      nameInvalidFeedback () {
        if (this.name === null || this.name) {
          return ''
        } else if (this.formData.name.length < 3) {
          return 'Digite um nome com mais de 3 caracteres'
        }
      },

      capacity () {
        const { quantityMax } = this.formData
        return ValidationNumber({
          number: quantityMax,
          test: {
            value: 0,
            validation: '>',
          },
        })
      },

      capacityValidateFeedback () {
        return this.capacity !== null && this.capacity ? 'Agora prace bom!' : ''
      },

      capacityInvalidFeedback () {
        if (this.capacity === null || this.capacity) {
          return ''
        } else {
          return 'Digite numeral válido, maior que zero'
        }
      },

      minimal () {
        const { quantityMin } = this.formData
        return ValidationNumber({
          number: quantityMin,
          test: {
            value: 0,
            validation: '>',
          },
        })
      },

      minimalValidateFeedback () {
        return this.minimal !== null && this.minimal ? 'Agora prace bom!' : ''
      },

      minimalInvalidFeedback () {
        if (this.minimal === null || this.minimal) {
          return ''
        } else {
          return 'Digite numeral válido, maior que zero'
        }
      },

      isValidForm () {
        return this.name && this.capacity && this.minimal
      },
    },

    methods: {
      addReserve () {
        const { reserves } = this.formData

        if (reserves === undefined && this.selectedLocal.uuid !== null) {
          this.formData.reserves = [this.selectedLocal]
        }  else {
          const found = reserves.some(({uuid}) => uuid === this.selectedLocal.uuid)

          if (!found && this.selectedLocal.uuid !== null) {
            this.formData.reserves.push(this.selectedLocal)
            this.selectedReserve = {}
          }
        }
      },

      async searchAllocation (searchText) {
        if (!this.inProcess && searchText.length > 3) {
          this.searchInProcess = true
          this.allocations = await allocation.getAllByName(searchText)
          this.searchInProcess = false
        }
      },

      async save (event) {
        event.preventDefault()
        event.stopPropagation()

        this.formData.address = this.inputs.reduce((acc, { name }) => {
          const value = this.formData[name]
          acc.push(`${name} ${value}`)
          return acc
        }, []).join(', ')

        if (this.isValidForm) {
          try {
            const reserves = this.formData.reserves.flatMap(({uuid}) => uuid)
            const  { uuid, name, address, quantityMax, quantityMin, _links } = this.formData
            await allocation.save({ uuid, name, address, quantityMax, quantityMin, _links, reserves })

            if (this.formData.uuid !== '') {
              this.$notify.success(`Alocação ${this.formData.name} com sucesso`, 'Atualizado!')
            } else {
              this.$notify.success(`Alocação ${this.formData.name} com sucesso`, 'Adicionado!')
              this.resetForm()
            }
          } catch (error) {
            this.$notify.error(error)
          }
        } else {
          this.isValid = true
        }
      },

      resetForm () {
        this.formData = getFormData()
      },
    },
  }
</script>

<style scoped>
  .margin-bottom {
    margin-bottom: 0.2rem;
  }

  .margin-left {
    margin-left: 0.2rem;
  }
</style>
