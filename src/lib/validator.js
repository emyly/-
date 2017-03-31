import _ from 'lodash'
import validator from 'validator'

/**
 * NOTE: 建议直接阅读validator的文档, 直接调用它的API
 *
 * https://github.com/chriso/validator.js/
 */

const Validator = {
  /* String */
  stringRequired: (message, errorString = '所需要饿内容字段没有输入') => ({
    result: _.isString(message) && !_.isNil(message) && !validator.isEmpty(message),
    message: errorString
  }),

  multiStringRequired: (...args) => ({
    result: args.every(str => _.isString(str) && !_.isNil(str) && !validator.isEmpty(str))
  }),

  stringLengthSmallerThan: (message, max) => ({
    result: _.isString(message) && !_.isNil(message) && validator.isLength(message, { max }),
    message: `输入字数不应该大于: ${max}`
  }),

  stringLengthLargerThan: (message, min) => ({
    result: _.isString(message) && !_.isNil(message) && validator.isLength(message, { min }),
    message: `输入字数不应该小于: ${min}`
  }),

  stringLengthRange: (message, min, max) => ({
    result: _.isString(message) && !_.isNil(message) && validator.isLength(message, { min, max }),
    message: `输入字数应该在${min}和${max}之间`
  }),

  /* Number */
  numberLargerThan: (num, min) => {
    const number = _.isNumber(num) ? JSON.stringify(num) : num
    return {
      result: !_.isNil(num) && validator.isInt(number, { min }),
      message: `输入数值应该大于${min}`
    }
  },

  numberSmallerThan: (num, max) => {
    const number = _.isNumber(num) ? JSON.stringify(num) : num
    return {
      result: !_.isNil(num) && validator.isInt(number, { max }),
      message: `输入数值应该小于${max}`
    }
  },

  numberRange: (num, min, max) => {
    const number = _.isNumber(num) ? JSON.stringify(num) : num
    return {
      result: !_.isNil(num) && validator.isInt(number, { min, max }),
      message: `输入数值应该在${min}和${max}之间`
    }
  },

  /* Date */
  dateBefore: (date, end) => ({
    result: !_.isNil(date) && validator.isBefore(date, end),
    message: `选择的日期应该在${end}之前`
  }),

  dateAfter: (date, start) => ({
    result: !_.isNil(date) && validator.isAfter(date, start),
    message: `选择的日期应该在${start}之后`
  }),

  /* Email */
  emailCheck: email => ({
    result: !_.isNil(email) && validator.isEmail(email),
    message: ''
  }),

  /* Cellphone */
  cellPhone: number => ({
    result: !_.isNil(number) && validator.isMobilePhone(number, 'zh-CN'),
    message: ''
  }),
}

export default Validator
