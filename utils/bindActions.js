export default const bindActions = actions => dispatch => {
  return {
      actions: Object.keys(actions).reduce((obj, action) => {
          obj[action] = (...args) => dispatch(actions[action](...args));
          return obj;
      }, {}),
  };
};
