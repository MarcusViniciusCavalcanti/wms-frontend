import { HTTP } from '../http-commons'
import store from '@/store'

export default class Orders {

  async getAllBy (url) {
     return await HTTP.get(url)
  }

  async startPrepare ({ orderUUID, time }) {
    const { start } = store.getters['endpoints/tasks']
    const url = start.href.replace('{orderUUID}', orderUUID)

    const { data:task } = await  HTTP.post(url,{ time })

    store.commit('order/START_PREPARE_ORDER', task)
    store.commit('task/SET_CURRENT_TASK', task)

    return task
  }

  async stopPrepare ({ stop }, { time }) {
    const { data:task } = await  HTTP.put(stop.href, { time })

    store.commit('order/STOP_PREPARE_ORDER', task)
    store.commit('task/SET_CURRENT_TASK', task)

    return task
  }

  async decrementOrderItem ({ uuid, amount, name }) {
    const { decrementOrderItems } = store.getters['endpoints/orders']
    const { data } = await HTTP.patch(decrementOrderItems.href, { uuid, amount , allocationName: name})

    store.commit('order/UPDATE_ORDER_ITEM', data)
    return data
  }

  async incrementOrderItem({ uuid, amount, name }) {
    const { incrementOrderItems } = store.getters['endpoints/orders']

    const { data } = await HTTP.patch(incrementOrderItems.href, { uuid, amount , allocationName: name})

    store.commit('order/UPDATE_ORDER_ITEM', data)
    return data
  }

  async completeOrder ({ complete }, { time }) {
    const { data:task } = await HTTP.put(complete.href, { time })

    store.commit('order/STOP_PREPARE_ORDER', task)
    store.commit('task/SET_CURRENT_TASK', {})
    store.commit('order/SET_ORDER', {})

    return task
  }
}
