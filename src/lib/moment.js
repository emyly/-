import moment from 'moment';

const languale = navigator.language.split('-')[0] || 'en';

const timeMap = {
  h: 'HH:',
  m: 'mm',
  Y: 'YYYY-',
  M: 'MM-',
  D: 'DD '
}

moment.locale(languale)

class Moment extends moment {
  constructor(args) {
    super(...args)
    this._format = (arg) => {
      if (this.valueOf() <= 0 || isNaN(this.valueOf())) {
        return '-'
      }
      const retVal = this.format(arg);
      return retVal === 'Invalid date' ? '-' : retVal;
    }

    /**
     * 标准时间格式化
     * @param  {}args
     */
    this.formatStandard = (...args) => {
      let formatString = '';
      args.forEach((o) => {
        if (timeMap[o]) {
          formatString += timeMap[o]
        }
      });
      return this._format(formatString)
    }

    /**
     * 自定义时间格式化
     * @param  {string} args
     */
    this.safeFormat = formatString => this._format(formatString)
  }
}

export default (...args) => new Moment(args);
