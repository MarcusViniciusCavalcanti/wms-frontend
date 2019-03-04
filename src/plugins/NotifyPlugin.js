import { SnotifyType } from 'vue-snotify'
import { RequestError } from '@/tools/RequestErrorHandler'

class Notify {
  constructor(store) {
    this.store = store;
  }

  success(message, title = 'Sucesso', config = {}) {
    this._commitNotifications(message, title, config, 'success');
  }

  info(message, title = 'Atenção', config = {}) {
    this._commitNotifications(message, title, config, 'info');
  }

  warn(message, title = 'Alerta', config = {}) {
    this._commitNotifications(message, title, config, 'warn');
  }

  error(error, config = {}) {
    console.warn(error)
    const { title, message, exception } = error
    if (message instanceof Array || typeof message === 'string') {
      this._commitNotifications(message, title, config, 'error')
      console.error('wms error:>', exception)
    // } else if (message instanceof RequestError) {
    //   this._handleRequestError(message, title, config);
    } else {
      console.error('[Notification error] ' + message);
    }
  }

  _commitNotifications(messages, title, config, type = 'simple') {
    if (!(messages instanceof Array)) {
      messages = [messages];
    }

    const notifications = messages.map((msg) => {
      return this._createToast(msg, title, config, type);
    });
    this.store.commit('app/SET_NOTIFICATIONS', notifications);
  }

  _handleRequestError(errorBag, title, config) {
    if (errorBag.hasFormErrors()) {
      this.error(errorBag.getFormErrorMessages(), title, config);
    } else {
      this.error(errorBag.message, title, config);
    }
  }

  _createToast(body, title, config = {}, type = 'simple') {
    return { title, body, type, config };
  }
}

export default {
  install: (Vue, options = {}) => {
    if (!options.store) {
      throw '[NotifyPlugin] Store is required.';
    }
    Vue.prototype.$notify = new Notify(options.store);
  }
};
