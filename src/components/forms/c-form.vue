<template>
  <loading-spinner v-if="loading" style="padding: 50px;"></loading-spinner>

  <b-form @submit.prevent="$emit('save', formData)" autocomplete="off" v-else>
    <div class="row">
      <div v-for="col in form" :class="col.col ? col.col : 'col'">
        <legend v-if="col.legend">
          {{ col.legend }}
        </legend>

        <div :class="col.jumbotron ? 'jumbotron' : 'no-jumbotron' ">
          <div class="row">
            <div v-for="field in col.fieldsPickings" :class="field.col ? field.col : 'col-12'">
              <label :for="field.id">
                {{ field.label }}
              </label>

              <div v-if="field.type === 'checkbox'">
                <b-form-checkbox-group
                  :id="field.id"
                  v-model="formData[field.id]"
                  v-bind:options="field.options"
                  :required="field.required ? field.required : false"
                  v-if="field.options.legth > 1">
                </b-form-checkbox-group>
                <b-form-checkbox
                  :id="field.id"
                  v-model="formData[field.id]"
                  unchecked-value="false"
                  v-else>
                  {{ field.options[0].text }}
                </b-form-checkbox>
              </div>

              <div v-else-if="field.type === 'textarea'">
                <b-form-textarea
                  :id="field.id"
                  v-model="formData[field.id]"
                  :placeholder="field.placeholder"
                  :rows="3"
                  :max-rows="6"
                  @keyup.native="field.keyup ? $emit('keyup', formData[field.id]) : false"
                  :required="field.required ? field.required : false">
                </b-form-textarea>
              </div>

              <div v-else-if="field.type === 'select'">
                <b-form-select
                  :id="field.id"
                  v-model="formData[field.id]"
                  v-bind:options="field.options"
                  :required="field.required ? field.required : false">
                </b-form-select>
              </div>

              <div v-else-if="field.type === 'radio'">
                <b-form-radio-group
                  :id="field.id"
                  v-model="formData[field.id]"
                  :options="field.options"
                  :required="field.required ? field.required : false">
                </b-form-radio-group>
              </div>

              <div v-else-if="field.type === 'file'">
                <b-form-file
                  :id="field.id"
                  v-model="formData[field.id]"
                  :required="field.required ? field.required : false"
                  choose-label="Selecionar">
                </b-form-file>
                <br> Arquivos selecionados : {{ formData[field.id] && formData[field.id].name }}
              </div>

              <div v-else>
                <b-form-input
                  :id="field.id"
                  v-model="formData[field.id]"
                  :placeholder="field.placeholder"
                  :required="field.required ? field.required : false"
                  :type="field.type ? field.type : 'text'"
                  @keyup.native="field.keyup ? $emit('keyup', formData[field.id]) : false"
                  v-if="!field.mask">
                </b-form-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <button-back></button-back>
        <b-button type="submit" variant="primary" class="btn-lg float-right">
          Salvar
        </b-button>
      </div>
    </div>
  </b-form>
</template>

<script>
  import { LoadingSpinner } from '@/components/loaders';
  import ButtonBack from './c-button-back';

  export default {
    name: 'c-form',
    props: ['form', 'formData', 'loading'],

    components: {
      ButtonBack,
      LoadingSpinner,
    },
  }
</script>

<style lang="scss" scoped>
  .no-jumbotron>div, .jumbotron>div {
    margin-bottom: 15px;
  }
</style>
