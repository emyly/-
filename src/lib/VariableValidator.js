import Validator from 'lib/validator'
import _ from 'lodash'

/* NOTE: function start with _ are not mean to be used by caller */
export default class VariableValidator {
  constructor(obj) {
    this.counter = 0 /* used for id */
    this.trackingVars = []
    this.obj = obj
  }

  /**
   * _bindObject
   *   bind the external object to the current object's obj to check the
   *   varibales registered in this validator
   *
   * @param  {object} object external component's this.state object
   * @return {null}
   */
  _bindObject(obj) {
    this.obj = obj
  }

  _increaseCounter() {
    this.counter += 1
  }

  /**
   * register - register a variable to be check
   *
   * @return {int} id identifier of the check variable
   */
  _register(varName, checkFunc) {
    const index = this.counter
    this._increaseCounter()

    this.trackingVars.push({
      id: index,
      varName,
      checkFunc
    })

    return index
  }

  /**
   * All kinds of varaible checker register functions
   */

  registerRequired(varName) {
    return this._register(varName, () => Validator.stringRequired(this.obj[varName]).result)
  }

  registerNumNoLess(varName, min) {
    return this._register(varName, () => Validator.numberLargerThan(this.obj[varName], min).result)
  }

  registerNumNoMore(varName, max) {
    return this._register(varName, () => Validator.numberSmallerThan(this.obj[varName], max).result)
  }

  registerNumRange(varName, min, max) {
    return this._register(varName, () => Validator.numberRange(this.obj[varName], min, max).result)
  }

  registerStrNoLess(varName, min) {
    return this._register(varName, () => Validator.stringLengthLargerThan(this.obj[varName], min).result)
  }

  registerStrNoMore(varName, max) {
    return this._register(varName, () => Validator.stringLengthSmallerThan(this.obj[varName], max).result)
  }

  registerStrRange(varName, min, max) {
    return this._register(varName, () => Validator.stringLengthRange(this.obj[varName], min, max).result)
  }

  /**
   * unregister - untracking the variable previously registerd
   *
   * @return {boolean} result indicate the operation result success or fail
   */
  unregister(id) {
    const removedItems = _.remove(this.trackingVars, item => item.id === id)
    return removedItems.length > 0
  }

  /**
   *
   * CHECK FUNCTIONS
   *
   **/

  /**
   * checkState - check single variable's condition
   *
   * @param  {int} id the id of the variable you want check
   * @return {bool}  whether this variable meet the requirement
   */
  checkState(id, stateObj) {
    this._bindObject(stateObj)

    const item = this.trackingVars[id]
    if (item) {
      return item.checkFunc()
    }
    return false
  }

  /**
   * checkState - This method return boolean to indicate whether all
   * registered variables meet required constrains
   *
   * @return {object} result {result: boolean, failedVars array}
   **/
  checkAllState(stateObj) {
    this._bindObject(stateObj)

    let result = true
    const failedVars = []
    this.trackingVars.forEach((element) => {
      if (element.checkFunc() === false) {
        failedVars.push({
          id: element.id,
          name: element.varName
        })
        result = false
      }
    })

    return { result, failedVars }
  }
}
