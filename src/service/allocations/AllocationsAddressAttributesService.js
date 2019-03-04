import { HTTP } from '../http-commons'
import store from '@/store'

export default class AllocationsAddressAttributesService {

  constructor () {
    this.url = store.getters['endpoints/allocationsAddressAttributes'].href
  }

  async getAll () {
    const { data } = await HTTP.get(this.url)
    store.commit(
      'allocationsAddressAttributes/SET_ALLOCATION_ADDRESS_ATTRIBUTES',
      data
    )
  }

  async create ({ description, name, uuid }) {
    const { data } = await HTTP.post(this.url, { description, name, uuid })
    store.commit(
      'allocationsAddressAttributes/SET_NEW_ALLOCATION_ADDRESS_ATTRIBUTES',
      data
    )
  }

  async update ({_links, description, name, uuid }) {
    const response = await HTTP.put(_links.self.href, {description, name, uuid })
  }
}
