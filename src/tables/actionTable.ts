import Finish from '../actions/finish'
import Reduce from '../actions/reduce'
import Shift from '../actions/shift'
import State from '../utils/state'
import Token from '../utils/token'
import { ActionItem, ActionType, ReduceType } from '../utils/utils'
import Table from './table'

type Action = Reduce | Shift | Finish

export default class ActionTable extends Table<State, Token, Action> {
  public set = (desc: ActionItem): void => {
    const { stateName, items: actions } = desc
    const row = new State(stateName)
    actions.forEach(item => {
      const { type, fromState } = item
      const col = new Token(fromState)
      const action: Action = this.getActionByType(type, item)

      this._set(row, col, action)
    })
  }

  private getActionByType = (type: string, dryAction: ActionType): Action => {
    const { fromState, toState } = dryAction

    switch (type) {
      case 'reduce':
        const { countArgs, func } = dryAction as ReduceType
        return new Reduce(fromState, toState, countArgs, func)

      case 'shift':
        return new Shift(fromState, toState)

      case 'finish':
        return new Finish(fromState, toState)

      default:
        throw new Error(`Undefined type action: ${type}`)
    }
  }
}
