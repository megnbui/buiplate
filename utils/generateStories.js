import React from 'react'
import { storiesOf } from '@storybook/react'

/** Connect to store */
import initialState from 'store/__mocks__'
import { configureStore } from 'store/utils'
import { Provider } from 'react-redux'
import rootReducer from 'store'

export function storeWrapper (children) {
  return (
    <Provider store={ configureStore(rootReducer, initialState) }>
      { children }
    </Provider>
  )
}

export default function generateStories (component, mock = {}, { wrapper = null } = {}) {
  function wrapComponent (props) {
    const child = React.cloneElement(component, props)
    return wrapper
      ? React.cloneElement(wrapper(), {}, child)
      : child
  }

  function makeStory (story, variations) {
    return Object.keys(variations)
      .forEach(name => {
        story.add(name, () => wrapComponent(variations[name]))
      })
  }

  return Object.keys(mock)
    .reduce((stories, title) => stories.concat([
      makeStory(storiesOf(`${ component.type.name }/${ title }`, module), mock[title]),
    ]), [])
}
