import { HTTP } from '../http-commons'
import store from '@/store'

export default class Orders {

  async getAllBy (url) {
     return await HTTP.get(url)
  }

  async startPrepare () {
    console.log("iniciado")
  }

  async pausePrepare () {
    console.log("parado")
  }

  async updateOrderItem ({uuid, amount, name }) {
    const { updateOrderItems } = store.getters['endpoints/orders']
    const { data } = await HTTP.patch(updateOrderItems.href, { uuid, amount , allocationName: name})

    store.commit('order/UPDATE_ORDER_ITEM', data)
    return data
  }

  async completeOrder ({ uuid }) {
    const { completePrepare } = store.getters['endpoints/orders']
    await HTTP.patch(completePrepare.href, {uuid, date: new Date()})
  }
}
