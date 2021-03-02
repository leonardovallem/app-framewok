import * as types from "../types"

const initialState = {
  selectedTab: 0,
}

export default function reducer(state = initialState, action) {
  const newState = { ...state }
  switch (action.type) {
    case types.TAB_MENU_SELECTED:
      newState.selectedTab = 0
      break
    case types.TAB_POSTAGENS_SELECTED:
      newState.selectedTab = 1
      break
    case types.TAB_ALBUNS_SELECTED:
      newState.selectedTab = 2
      break
    case types.TAB_TODOS_SELECTED:
      newState.selectedTab = 3
      break
    default:
  }
  return newState
}
