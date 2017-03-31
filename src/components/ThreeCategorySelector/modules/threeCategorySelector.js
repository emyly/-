
export const FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION = 'FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION'
export const FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_SUCCESS = 'FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_SUCCESS'
export const FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_FAIL = 'FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_FAIL'
export const FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION = 'FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION'
export const FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_SUCCESS = 'FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_SUCCESS'
export const FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_FAIL = 'FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_FAIL'
export const FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION = 'FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION'
export const FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_SUCCESS = 'FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_SUCCESS'
export const FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_FAIL = 'FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_FAIL'
export const FETCH_THREE_CATEGORY_SELECTOR_INIT_DATA = 'FETCH_THREE_CATEGORY_SELECTOR_INIT_DATA'


export function fetchFirstClassSelection({ contractType, businessLineId, brandId, authorizeOrgId, authorizedOrgId }) {
  return {
    type: FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION,
    payload: {
      contractType,
      businessLineId,
      brandId,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function fetchFirstClassSelectionSuccess(selectorList) {
  return {
    type: FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_SUCCESS,
    selectorList
  }
}

export function fetchFirstClassSelectionFail() {
  return {
    type: FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_FAIL
  }
}

export function fetchSecondClassSelection({
  contractType, businessLineId, brandId, firstClassId, authorizeOrgId, authorizedOrgId
}) {
  return {
    type: FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION,
    payload: {
      contractType,
      businessLineId,
      brandId,
      firstClassId,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function fetchSecondClassSelectionSuccess(selectorList) {
  return {
    type: FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_SUCCESS,
    selectorList
  }
}

export function fetchSecondClassSelectionFail() {
  return {
    type: FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_FAIL
  }
}

export function fetchThirdClassSelection({
  contractType, businessLineId, brandId, firstClassId, secondClassId, authorizeOrgId, authorizedOrgId
}) {
  return {
    type: FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION,
    payload: {
      contractType,
      businessLineId,
      brandId,
      firstClassId,
      secondClassId,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function fetchThirdClassSelectionSuccess(selectorList) {
  return {
    type: FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_SUCCESS,
    selectorList
  }
}

export function fetchThirdClassSelectionFail() {
  return {
    type: FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_FAIL
  }
}

export function fetchThreeCategorySelectorInitData() {
  return {
    type: FETCH_THREE_CATEGORY_SELECTOR_INIT_DATA
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_THREE_CATEGORY_SELECTOR_INIT_DATA]: (state, action) => ({
    ...state,
    isFirstFetching: false,
    isSecondFetching: false,
    isThirdFetching: false,
    firstSelectorList: [],
    secondSelectorList: [],
    thirdSelectorList: []
  }),
  [FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION]: (state, action) => ({
    ...state,
    isFirstFetching: true
  }),
  [FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_SUCCESS]: (state, action) => ({
    ...state,
    isFirstFetching: false,
    firstSelectorList: action.selectorList
  }),

  [FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_FAIL]: (state, action) => ({
    ...state,
    isFirstFetching: false
  }),
  [FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION]: (state, action) => ({
    ...state,
    isSecondFetching: true
  }),

  [FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_SUCCESS]: (state, action) => ({
    ...state,
    isSecondFetching: false,
    secondSelectorList: action.selectorList
  }),

  [FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_FAIL]: (state, action) => ({
    ...state,
    isSecondFetching: false
  }),
  [FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION]: (state, action) => ({
    ...state,
    isThirdFetching: true
  }),

  [FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_SUCCESS]: (state, action) => ({
    ...state,
    isThirdFetching: false,
    thirdSelectorList: action.selectorList
  }),

  [FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_FAIL]: (state, action) => ({
    ...state,
    isThirdFetching: false
  })
}

const initialState = {
  isFirstFetching: false,
  isSecondFetching: false,
  isThirdFetching: false,
  firstSelectorList: [],
  secondSelectorList: [],
  thirdSelectorList: []
}

export default function threeCategorySelectionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
