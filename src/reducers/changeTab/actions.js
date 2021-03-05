import * as types from "../types"

export function selectMenu() {
  return {
    type: types.TAB_MENU_SELECTED,
  }
}

export function selectPostagens() {
  return {
    type: types.TAB_POSTAGENS_SELECTED,
  }
}

export function selectAlbuns() {
  return {
    type: types.TAB_ALBUNS_SELECTED,
  }
}

export function selectTodos() {
  return {
    type: types.TAB_TODOS_SELECTED,
  }
}

export function selectNone() {
  return {
    type: types.NO_TAB_SELECTED,
  }
}
