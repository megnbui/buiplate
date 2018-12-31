function isPromise (value) {
  return value === Promise.resolve(value);
}

/* @function promiseMiddleware
* Intercepts actions where the payload is a promise
* Dispatches initial action with a "PENDING" status
* Then dispatches async action with a "FULFILLED" or "REJECTED" status
* The data or error are sent in place of the promise in the payload
*/
const promiseMiddleware = store => next => action => {
  if (!isPromise(action.payload)) return next(action);

  function makeAction (status, data) {
    const newAction = {
      ...action,
      type: `${ action.type }_${ status }`,
      ...data,
    };

    return newAction
  }

  next(makeAction('PENDING'))
  return action.payload
    .then(payload => next(makeAction('FULFILLED', { payload })))
    .catch(payload => {
      return next(makeAction('REJECTED', { payload }))
    })
};

export default promiseMiddleware;
