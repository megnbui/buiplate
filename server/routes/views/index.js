const path = require('path')
import App from '../../../src/components/App'
import createStore, { initializeSession } from '../../../src/store'
import Helmet from 'react-helmet'
import React from 'react'
import routes from '../../../src/routes'
import { Provider as ReduxProvider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import htmlTemplate from '../../templates'

module.exports = (app) => {
  app.get('/*', (req, res) => {
    const context = { }
    const store = createStore()

    store.dispatch(initializeSession())

    const dataRequirements =
          routes
            .filter(route => matchPath(req.url, route)) // filter matching paths
            .map(route => route.component) // map to components
            .filter(comp => comp.serverFetch) // check if components have data requirement
            .map(comp => store.dispatch(comp.serverFetch())) // dispatch data requirement

    Promise.all(dataRequirements).then(() => {
      const jsx = (
              <ReduxProvider store={ store }>
                  <StaticRouter context={ context } location={ req.url }>
                      <App />
                  </StaticRouter>
              </ReduxProvider>
      )
      const reactDom = renderToString(jsx)
      const reduxState = store.getState()
      const helmetData = Helmet.renderStatic()

      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(htmlTemplate(reactDom, reduxState, helmetData))
    })
  })
}
