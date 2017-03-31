export default store => ({
  path: 'ValidationDemo',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const validationDemo = require('./components/FormValidationDemo').default
      cb(null, validationDemo)
    }, 'validationDemo')
  }
})
