import { HTTP } from '../http-commons'
import store from '@/store'

export default class Reallocation {

  async getAllBy (url) {
    return await HTTP.get(url)
  }

  async reallocationItem ({ _links }, quantity) {
    const { addItem } = _links
    const { data:reallocation } = await HTTP.patch(addItem.href, { prepare: quantity})
    store.commit('reallocation/SET_REALLOCATION', reallocation)

    return reallocation
  }

  async completeTask ({ _links }) {
    const { completeReallocation } = _links
    const { data:reallocation } = await HTTP.patch(completeReallocation.href)
    return reallocation
  }
}
