/**
 * Created by wangming on 2017/1/5.
 */

import moment from 'components/Moment';
import React from 'react';

const FinancialType = {
  baddebts: '0',
  billing: '1',
  deposit: '2',
  discount: '3',
  gathering: '4',
  imprest: '5',
  logistics: '6',
  urgent: '7',
  verification: '8'
}

const BillingType = {
  Unbilling: '0',
  Already: '1',
}

const VerificationType = {
  UnverificationType: '0',
  Already: '1',
}


// 可登记坏账
const BaddebtsAbleOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

// 历史坏账
const NotBaddebtsOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '总金额',
    attr: 'JSZJE'
  },
  {
    label: '坏账金额',
    attr: 'HZJE'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];


const DiscountAbleOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const NotDiscountOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '折扣金额',
    attr: 'ZKJE'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const LogisticsAbleOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const NotLogisticsOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '物流金额',
    attr: 'WLFY'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const GatheringAbleOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '订单类型',
    attr: 'DDLX'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '未收款金额',
    attr: 'WSZJE'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const NotGatheringOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '订单类型',
    attr: 'DDLX'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '创建日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const BillingAbleOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '订单类型',
    attr: 'DDLX'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '未开票金额',
    attr: 'WKPJE'
  },
  {
    label: '下单日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const NotBillingOp = [
  {
    label: '发票号',
    attr: 'FPHM'
  },
  {
    label: '订单号',
    attr: 'DDID'
  },
  {
    label: '购货单位',
    attr: 'GHDW'
  },
  {
    label: '开票金额',
    attr: 'KPJE'
  },
  {
    label: '开票日期',
    attr: 'KPSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];


const UrgentAbleOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const NotUrgentOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '购货单位',
    attr: 'CJJXSMC'
  },
  {
    label: '订单金额',
    attr: 'JSZJE'
  },
  {
    label: '加急金额',
    attr: 'JJFY'
  },
  {
    label: '登记日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const VerAbleOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '订单类型',
    attr: 'DDLX'
  },
  {
    label: '购货单位',
    attr: 'JSJXSMC'
  },
  {
    label: '购货金额',
    attr: 'JSZJE'
  },
  {
    label: '已收账金额',
    attr: 'YSZJE'
  },
  {
    label: '坏账金额',
    attr: 'HZJE'
  },
  {
    label: '创建日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

const NotVerOp = [
  {
    label: '订单号',
    attr: 'GUID'
  },
  {
    label: '订单类型',
    attr: 'DDLX'
  },
  {
    label: '购货单位',
    attr: 'JSJXSMC'
  },
  {
    label: '购货金额',
    attr: 'JSZJE'
  },
  {
    label: '已收账金额',
    attr: 'YSZJE'
  },
  {
    label: '坏账金额',
    attr: 'HZJE'
  },
  {
    label: '创建日期',
    attr: 'CJSJ',
    formater: value => (
      moment(value).format('YYYY-MM-DD HH:mm')
    )
  }
];

export {
    FinancialType,
    BillingType,
    VerificationType,
    BaddebtsAbleOp,
    NotBaddebtsOp,
    DiscountAbleOp,
    NotDiscountOp,
    LogisticsAbleOp,
    NotLogisticsOp,
    GatheringAbleOp,
    NotGatheringOp,
    BillingAbleOp,
    NotBillingOp,
    UrgentAbleOp,
    NotUrgentOp,
    VerAbleOp,
    NotVerOp
}
