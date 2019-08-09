import api from './api'
import views from './views'

export default (app) => {
  api(app)
  views(app)
}
