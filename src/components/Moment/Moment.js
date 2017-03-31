/**
* file name: moment.js
* author: wangming
* create date: 2016/12/22
*/
import ParentMoment from 'moment';

export default function moment(x) {
  const instanceParent = ParentMoment.apply(this, arguments);
  const instanceParent2 = ParentMoment.apply(this, arguments);
  console.debug('F function 1:', instanceParent);
  // return new MomentInterval(x);
  function F() {}
  F.prototype = instanceParent;
  F.prototype.format = function (y) {
    console.debug('F function 3:', instanceParent.format, instanceParent2.format);
    const retVal = instanceParent2.format(y);
    return retVal === 'Invalid date' ? '-' : retVal;
    // return "format";
  }

  console.debug('F function 2:', F);
  return new F();
}
