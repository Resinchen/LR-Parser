import Finish from './actions/finish'
import Reduce from './actions/reduce'
import Shift from './actions/shift'
import ActionTable from './tables/actionTable'
import GotoTable from './tables/gotoTable'
import State from './utils/state'
import Token from './utils/token'
import { ActionTableDesc, Attr, GotoTableDesc } from './utils/utils'

export default class Parser {
  private stack: State[]
  private actionTable: ActionTable
  private gotoTable: GotoTable

  constructor(actionDesc: ActionTableDesc, gotoDesc: GotoTableDesc) {
    this.stack = [new State('DOWN')]
    this.actionTable = this.transformActionTable(actionDesc)
    this.gotoTable = this.transformGotoTable(gotoDesc)
  }

  public parse(tokens: Token[]): Attr {
    while (tokens.length) {
      let lookahead = tokens[0]
      let currentState = this.stack.pop()!
      let cell = this.actionTable.get(currentState, lookahead)
      if (cell instanceof Shift) {
        const newState = cell.toState
        if (lookahead.lexVal) {
          newState.attr.set('val', lookahead.lexVal)
        }
        this.stack.push(currentState)
        this.stack.push(newState)
        tokens.shift()
      } else if (cell instanceof Reduce) {
        const reduceStackArguments = [...Array(cell.countArgs - 1)].map(
          _ => this.stack.pop()!
        )
        const reduceArguments = [
          currentState,
          ...reduceStackArguments,
        ].reverse()
        const reducedState = cell.make_reduce(reduceArguments)
        const topState = this.stack.pop()!
        const newStateName = this.gotoTable.get(topState, reducedState)

        const newState = new State(newStateName, reducedState.attr)

        this.stack.push(topState)
        this.stack.push(newState)
      } else if (cell instanceof Finish) {
        return currentState.attr.get('res')
      } else {
        throw new Error('wrong cell action table')
      }
    }
  }

  private transformActionTable(description: ActionTableDesc): ActionTable {
    const actionTable: ActionTable = new ActionTable()
    description.forEach(actionTable.set)
    return actionTable
  }

  private transformGotoTable(description: GotoTableDesc): GotoTable {
    const gotoTable: GotoTable = new GotoTable()
    description.forEach(gotoTable.set)
    return gotoTable
  }
}
