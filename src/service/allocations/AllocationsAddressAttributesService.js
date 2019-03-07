import { HTTP } from '../http-commons'
import store from '@/store'

export default class AllocationsAddressAttributesService {

  async getAll () {
    const { all } = store.getters['endpoints/allocationsAddressAttributes']
    const { data } = await HTTP.get(all.href)
    store.commit(
      'allocationsAddressAttributes/SET_ALLOCATION_ADDRESS_ATTRIBUTES',
      data
    )
  }

  async create ({ description, name, uuid }) {
    const { create } = store.getters['endpoints/allocationsAddressAttributes']
    const { data } = await HTTP.post(create.href, { description, name, uuid })
    store.commit(
      'allocationsAddressAttributes/SET_NEW_ALLOCATION_ADDRESS_ATTRIBUTES',
      data
    )
  }

  async update ({_links, description, name, uuid }) {
    const response = await HTTP.put(_links.self.href, {description, name, uuid })
  }

  async remove (data) {
    const { _links } = data
    await HTTP.delete(_links.self.href)
    store.commit(
      'allocationsAddressAttributes/REMOVE_ALLOCATION_ATTRIBUTES',
      data
    )
  }
}
