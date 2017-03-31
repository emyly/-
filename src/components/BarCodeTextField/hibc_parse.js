 const _ = require('lodash');
 const moment = require('moment');
//  const debug = require('debug')('debug');

 const error = {
   BarcodeNotAString: 1, // 条码非string
   EmptyBarcode: 2, // 条码为空
   BarcodeNotHIBC: 3, // 非HIBC条码
   InvalidBarcode: 4, // 条码格式有误
   InvalidDate: 5, // 错误的日期格式
   EmptyCheckCharacter: 6,
   EmptyLinkCharacter: 7,
   InvalidQuantity: 8,
   InvalidLine1: 9 // 主码长度不符合要求
 };

 const type = {
   Concatenated: 1, // 主副码一起，以 '/'分隔
   Line1: 2, // 主码
   Line2: 3 // 副码
 };

    /**
     * 主码解析
     */
 function processLine1(decoded, t, barcode) {
   decoded.type = t; // 2
   if (barcode.length < 4) {
     decoded.error = error.InvalidLine1;
     return decoded;
   }

   decoded.labelerId = barcode.substring(0, 4); // 厂商信息
   barcode = barcode.substring(4);

   if (_.isEmpty(barcode)) {
     decoded.error = error.InvalidLine1;
     return decoded;
   }

        // if Concatenated the check char is in the second part of the barcode
   if (decoded.type !== type.Concatenated) {
     decoded.check = barcode.charAt(barcode.length - 1);// 最后一位校验码
     barcode = barcode.substring(0, barcode.length - 1);
     if (_.isEmpty(barcode)) {
       decoded.error = error.InvalidLine1;
       return decoded;
     }
   }

   decoded.uom = parseInt(barcode.charAt(barcode.length - 1), 10); // 倒数第二位校验码
   barcode = barcode.substring(0, barcode.length - 1);
   if (_.isEmpty(barcode)) {
     decoded.error = error.InvalidLine1;
     return decoded;
   }
   decoded.product = barcode;
   return decoded;
 }

     /**
     * '$$' 或'$$+'开头的第二副码解析时使用，取决于之后跟的第一个字符的值
     * 若为8或9，则进一步解析上一步得到的批号，从中解析出一个quality属性
     */
 function extractQuantityFromString(object, string, quantityProperty) {
   const i = parseInt(string.charAt(0), 10);
   if (!_.isNumber(i)) {
     return string;
   }

   let length;
   switch (i) {
     case 8:
       length = 2;
       break;
     case 9:
       length = 5;
       break;
     default:
                // no qty
       return string;
   }

   string = string.substring(1);
   const quantity = parseInt(string.substring(0, length), 10);
   string = string.substring(length);

   if (!_.isNumber(quantity)) {
     object.error = error.InvalidQuantity;
     return string;
   }

   object[quantityProperty] = quantity;

   return string;
 }

     /**
     * 解析副码的验证码和批号信息
     * 若为第二副码，当前方法解析所得的批号（包含日期和批号），需要进一步解析
     */
 function decodeLotSerialCheckLink(string, barcodeType, propertyName, hasQty) {
   if (_.isEmpty(string)) {
     return {
       error: error.EmptyCheckCharacter
     };
   }
   const decoded = {};

   decoded.lot = string;  // only in 1 place, do not think this is used again
   if (hasQty) {
     string = extractQuantityFromString(decoded, string, 'quantity');
   }

        // Check character
   decoded.check = string.substring(string.length - 1);
   string = string.substring(0, string.length - 1);

        // LotOrSerial and LinkCharacter
   if (barcodeType === type.Line2) {
     if (_.isEmpty(string)) {
       return {
         error: error.EmptyLinkCharacter
       };
     }
     decoded.link = string.substring(string.length - 1);
     decoded[propertyName] = string.substring(0, string.length - 1);
   } else {
     decoded[propertyName] = string;
   }

   return decoded;
 }

     /**
     * 解析第二副码的日期和批号信息
     */
 function extractMomentFromString(object, stringProperty, momentProperty) {
   let string = object[stringProperty];
   if (!_.isString(string) || _.isEmpty(string)) {
     return;
   }

   const hibcDateFormat = parseInt(string.substring(0, 1), 10);
   if (!_.isNumber(hibcDateFormat)) {
     object.error = error.InvalidDate;
     return;
   }

   let dateFormat;
   switch (hibcDateFormat) {
     case 0:
     case 1:
       dateFormat = 'MMYY';
       break;
     case 2:
       dateFormat = 'MMDDYY';
       break;
     case 3:
       dateFormat = 'YYMMDD';
       break;
     case 4:
       dateFormat = 'YYMMDDHH';
       break;
     case 5:
       dateFormat = 'YYDDD';
       break;
     case 6:
       dateFormat = 'YYDDDHH';
       break;
     case 7:
                // no date following the 7

       object[stringProperty] = string.substring(1);
       return;
     default:
                // no date char
       return;
   }

   if (hibcDateFormat > 1) {
     string = string.substring(1);
   }

   if (string.length < dateFormat.length) {
     object.error = error.InvalidDate;
     return;
   }

   object[momentProperty] = moment(string.substring(0, dateFormat.length), dateFormat);
   object[stringProperty] = string.substring(dateFormat.length);
 }


    /**
     * 副码解析
     */
 function processLine2(decoded, type, barcode) {
   decoded.type = type; // 3
   if (barcode.length > 0 && !isNaN(barcode.charAt(0))) {
     if (barcode.length < 5) {
       decoded.error = error.InvalidDate; // '+'号打头，长度需大于5位
       return decoded;
     }
     decoded.date = moment(barcode.substring(0, 5), 'YYDDD');
     _.assign(decoded, decodeLotSerialCheckLink(barcode.substring(5), type, 'lot', false));
   } else if (barcode.length > 2 && barcode.charAt(0) === '$' && !isNaN(barcode.charAt(1))) {
     _.assign(decoded, decodeLotSerialCheckLink(barcode.substring(1), type, 'lot', false));
   } else if (barcode.length > 3 && barcode.substring(0, 2) === '$+' && !isNaN(barcode.charAt(2))) {
     _.assign(decoded, decodeLotSerialCheckLink(barcode.substring(2), type, 'serial', false));
   } else if (barcode.length > 3 && barcode.substring(0, 2) === '$$' && !isNaN(barcode.charAt(2))) {
     _.assign(decoded, decodeLotSerialCheckLink(barcode.substring(2), type, 'lot', true));
     if (!decoded.error) {
       extractMomentFromString(decoded, 'lot', 'date');
     }
   } else if (barcode.length > 3 && barcode.substring(0, 3) === '$$+') {
     _.assign(decoded, decodeLotSerialCheckLink(barcode.substring(3), type, 'serial', true));
     extractMomentFromString(decoded, 'serial', 'date');
   } else {
     decoded.error = error.InvalidBarcode;
   }

   return decoded;
 }


 function isMatch(line1, line2) {
   if (!_.isObject(line1) || line1.type !== type.Line1 || !_.isObject(line2) || line2.type !== type.Line2) {
     return false;
   }

   return line1.check === line2.link;
 }

 function matchesLetters(character) {
   const letters = /^[a-zA-Z]+$/;
   return character.match(letters);
 }

 function matchesNumbers(character) {
   const numbers = /^[0-9]+$/;
   return character.match(numbers);
 }

    /**
     * 条码解析的起始方法
     */
 const parseHIBC = (barcode) => {
   let decoded = {
     barcode: _.clone(barcode)
   };

   if (!_.isString(barcode)) {
     decoded.error = error.BarcodeNotAString;
     return decoded;
   }

        // remove leading *
   if (barcode.charAt(0) === '*') {
     barcode = barcode.substring(1);
     if (_.isEmpty(barcode)) {
       decoded.error = error.EmptyBarcode;
       return decoded;
     }
   }

        // remove trailing *
   if (barcode.charAt(barcode.length - 1) === '*') {
     barcode = barcode.substring(0, barcode.length - 1);
     if (_.isEmpty(barcode)) {
       decoded.error = error.EmptyBarcode;
       return decoded;
     }
   }

        // Check for + character
   if (barcode.charAt(0) !== '+') {
     decoded.error = error.BarcodeNotHIBC;
     return decoded;
   } else {
     barcode = barcode.substring(1);
   }

        // minimum barcode length
   if (barcode.length < 4) {
     decoded.error = error.InvalidBarcode;
     return decoded;
   }

        // Check and Link characters can contain a "/" so remove them to not affect the split
   const potentialCheckAndLinkCharacters = barcode.substring(barcode.length - 2);
   barcode = barcode.substring(0, barcode.length - 2); // 去掉末两位的标志位

   const array = barcode.split('/');
   if (array.length === 1) {
     if (matchesLetters(array[0].charAt(0))) {
       decoded = processLine1(decoded, type.Line1, array[0] + potentialCheckAndLinkCharacters);
     } else {
       decoded = processLine2(decoded, type.Line2, array[0] + potentialCheckAndLinkCharacters);
     }
     return decoded;
   } else if (array.length === 2) {
     decoded = processLine1(decoded, type.Concatenated, array[0]);
     _.assign(decoded, processLine2({}, type.Concatenated, array[1] + potentialCheckAndLinkCharacters));
     return decoded;
   } else {
     decoded.error = error.InvalidBarcode;
     return decoded;
   }
 }


 export default (arrOfCode) => {
//   const obj = {};
//   arrOfCode.forEach(val => {
//     const res = parseHIBC(val);
//     // console.log(res);
//     if(!_.isUndefined(res.error)) {
//       throw new Error(123);
//     }
//     if(res.type === 1 || res.type === 2) {
//       obj.HIBC = res.labelerId.concat(res.product);
//       obj.SPBH = res.product;
//     }
//     if(res.type === 3) {
//       obj.SPPH = res.lot;
//       obj.YXQZ = Date.parse(res.date);
//     }
//   });
//   console.log(obj);
//   return obj;
   const obj = {};
   arrOfCode.forEach((val) => {
     const retVal = Object.assign(obj, parseHIBC(val));
     console.debug('hibcParse:', parseHIBC(val), retVal);
   });

   return obj;
 };

