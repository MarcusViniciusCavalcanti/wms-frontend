import Axios from 'axios';
import { RequestError } from '@/tools/RequestErrorHandler';

const getNewClientToBaseUrl = () => {
  return Axios.create({
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    },
  })
}

const handleDefaultErrors = (error) => {
  if (error.response === undefined) {
    throw new RequestError('Falha na comunicação com o servidor')
  }

  if (error.response.data.statusCode === 422 ) {
    throw new RequestError(error.response.data)
  }

  if (error.response.data.message !== undefined) {
    throw new RequestError(error.response.data.message)
  }

  throw error
}

const defineDefaultInterceptors = (client) => {
  client.interceptors.response.use((error) => error, handleDefaultErrors)
  client.interceptors.request.use((config) => config)
}

let HTTP = getNewClientToBaseUrl()

defineDefaultInterceptors(HTTP)

export {
  HTTP,
}
