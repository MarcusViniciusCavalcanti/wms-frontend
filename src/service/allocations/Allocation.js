import { HTTP } from '../http-commons'
import store from '@/store'

export default class Allocation {

  async getPageByUrl (url) {
   return await HTTP.get(url)
  }

  async getAllByName (name) {
    const { searchByName } = store.getters['endpoints/allocations']
    const  { data } = await HTTP.get(`${searchByName.href.replace('{name}', name)}`)
    return data
  }

  async save ({ uuid, name, address, quantityMax, quantityMin, reserves, _links }) {
    if (uuid) {
      const { data } = await this.update({ uuid, name, address, quantityMax, quantityMin, reserves, _links })
    }  else {
      const { data } = await this.create({ name, address, quantityMax, quantityMin, reserves })
    }
  }

  async create ({ name, address, quantityMax, quantityMin, reserve }) {
    const { entryPoint:create } = store.getters['endpoints/allocations']
    const { data } = await HTTP.post(create.href, {name, address, quantityMin, quantityMax, reserve })
    return data
  }

  async update ({ uuid, name, address, quantityMax, quantityMin, reserves, _links }) {
    const { data } = await HTTP.put(_links.self.href, {name, address, quantityMax, quantityMin, reserves })
    return data
  }

  async delete ({ _links }) {
    await HTTP.delete(`${_links.self.href}`)
  }

  async _extracted (url) {
    const { data } = await HTTP.get(url)
    const { page:contentPage, _embedded, _links } = data
    const { number:currentPage, size, totalElements, totalPages } = contentPage

    console.log('extracted',currentPage)

    return {
      page: {
        content: [
          {
            numberOfPage: currentPage,
            items: _embedded.allocationsResourceList,
          }],
        size,
        totalElements,
        totalPages,
        currentPage,
        _links,
      },
    }
  }
}
