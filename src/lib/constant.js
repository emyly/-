module.exports = Object.freeze({

  /**
   * NOTE: Structure Hierarchy
   *
   * FIRST LEVEL: API project
   * SECOND LEVEL: document page title character
   * THIRD LEVEL: single attribute
   *
   **/
  SAAS: {

    /* 出入库 */
    CRK: {

      /* 出库：0， 入库：1 */
      LEAVE_STOCK: '0',
      ENTER_STOCK: '1',

      /* 出库状态： 出库：0 部分出库：1 */
      WAIT_LEAVE_STOCK: '0',
      PARTIAL_LEAVE_STOCK: '1',

      /* 出入库审核状态：待复核：0， 通过：1 */
      WAIT_RECHECK: '0',
      APPROVE: '1',

      /* 商品类型： 商品：0， 工具：1  */
      GOOD: '0',
      TOOL: '1',

      /* 回收状态： 待回收：0， 部分回收：1 */
      WAIT_RECEIVE: '0',
      PARTIAL_RECEIVE: '1',

      /* 订单审核状态 0：未审核，1：通过，2：退回，3：转续 */
      ORDER_NOT_CHECK: '0',
      ORDER_APPROVE: '1',
      ORDER_REJECT: '2',
      ORDER_TRANSFER: '3',

      /* 出入库状态：0：未出库，1：已出库，2：:已入库，3：已销售，4：未入库 */
      LOGISTICS_NOT_LEAVE: '0',
      LOGISTICS_LEAVE: '1',
      LOGISTICS_ENTER: '2',
      LOGISTICS_SELL: '3',
      LOGISTICS_NOT_ENTER: '4',

      /* 订单类型：
      * 0：铺货订单，
      * 1：备货订单，
      * 2：手术订单，
      * 3：借货订单，
      * 4：调货订单，
      * 5：寄售订单,
      * 6: 铺货补货订单,
      * 7：调拨申请，
      * 8：调拨指令,
      */
      DISTRIBUTION_ORDER: '0',
      STOCK_ORDER: '1',
      SURGICAL_ORDER: '2',
      BORROWING_ORDER: '3',
      TRANSFER_ORDER: '4',
      DISTRIBUTION_SALE_ORDER: '5',
      DISTRIBUTION_REPLENISH_ORDER: '6',
      TRANSFER_APPLICATION: '7',
      ALLOCATION_INSTRUCTION: '8',
    },

    /* 财务*/
    financial: {
      /* 财务类型*/
      BADDEBTS: '0',
      BILLING: '1',
      DEPOSIT: '2',
      DISCOUNT: '3',
      GATHERING: '4',
      IMPREST: '5',
      LOGISTICS: '6',
      URGENT: '7',
      VERIFICATION: '8',

      /*财务订单状态*/
      BADDEBTSABLE : '0',      //可登记坏账订单
      NOTBADDEBTS : '1',      //不可登记坏账订单
      BILLINGABLE : '0',      //可登记开票订单
      NOTBILLING : '1',      //不可登记开票订单
      GATHERINGABLE : '0',      //可登记收款订单
      NOTGATHERING : '1',      //不可登记收款订单
      LOGISTICSABLE : '0',      //可登记物流订单
      NOTLOGISTICS : '1',      //不可登记物流订单
      DISCOUNTABLE : '0',      //可登记折扣订单
      NOTDISCOUNT : '1',      //不可登记折扣订单
      VERIFICATIONABLE : '0', //可登记核销订单
      NOTVERIFICATION : '1', //不可登记核销订单
      URGENTABLE : '0',      //可登记加急订单
      NOTURGENT : '1',       //不可登记加急订单

    },
  }
})
