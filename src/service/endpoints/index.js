import { HTTP } from '../http-commons'
import store from '@/store'

export default class IndexApi {

  async getAllEndPoints () {
    const { data } = await HTTP.get('http://localhost:8181/wms-api/v1/')
    store.commit('endpoints/SET_ENDPOINT', data)
  }
}
