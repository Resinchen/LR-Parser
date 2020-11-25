import State from '../utils/state'
import { GotoItem } from '../utils/utils'
import Table from './table'

export default class GotoTable extends Table<State, State, string> {
  public set = (desc: GotoItem) => {
    const { stateName, items } = desc

    const row = new State(stateName)
    items.forEach(item => {
      const { newState, nameState } = item
      const col = new State(newState)

      this._set(row, col, nameState)
    })
  }
}
