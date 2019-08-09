import React from 'react'
import renderer from 'react-test-renderer'
import ReactShallowRender from 'react-test-renderer/shallow'

/** Connect to store */
import initialState from 'store/__mocks__'
import { configureStore } from 'store/utils'
import { Provider } from 'react-redux'
import rootReducer from 'store'

function deepRender (Component) {
  return renderer.create(Component).toJSON()
}

function shallowRender (Component) {
  let shallowRenderer = new ReactShallowRender()
  shallowRenderer.render(Component)
  return shallowRenderer.getRenderOutput()
}

export function storeWrapper (children) {
  return (
    <Provider store={ configureStore(rootReducer, initialState) }>
      { children }
    </Provider>
  )
}

/* @function generateSnapshots
* @param Component <React Element>
* @param mock <Object>
* {
*   ...,
*   [describe statement]: {
*     ...,
*     [it statement]: {
*       ...props,
*     },
*   }
* }
* Keys generate into "describe" statements
* The next layer of keys generate into "it" statements
* The object of values is passed as props to a rendering of the Component.
* @param options.wrapper <React Element> e.g. Form or Provider
* @param options.shallow <Boolean> Determines whether Component is shallow- or deep-rendered
* @return <Snapshot> Each "it" statement with associated props is taken as a snapshot.
*/
export default function generateSnapshots (Component, mock = {}, { wrapper = null, shallow = false } = {}) {
  function render (Component) {
    return shallow
      ? shallowRender(Component)
      : deepRender(Component)
  }

  function wrap (Component) {
    return wrapper
      ? wrapper(Component)
      : Component
  }

  function snap (props = {}) {
    return [wrap, render].reduce((c, fn) => fn(c), React.cloneElement(Component, props))
  }

  let _mock = mock ? Object.keys(mock) : []

  return _mock.length
    ? _mock.forEach(description => {
      let tests = mock[description]
      describe(description, function () {
        Object.keys(tests).forEach(assertion => {
          it(assertion, () => {
            expect(snap(tests[assertion])).toMatchSnapshot()
          })
        })
      })
    })
    : it('renders', () => {
      expect(snap()).toMatchSnapshot()
    })
}
