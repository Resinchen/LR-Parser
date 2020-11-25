import State from '../utils/state'
import { Attr } from '../utils/utils'
import Action from './action'

export default class Reduce extends Action {
  constructor(
    fromState: string,
    toState: string,
    readonly countArgs: number,
    readonly func: (...states: State[]) => Map<string, Attr>
  ) {
    super(fromState, toState)
  }

  make_reduce(args: State[]): State {
    const newState: State = this.toState
    const funcResult = this.func(...args)

    funcResult.forEach((v, k) => newState.attr.set(k, v))

    return newState
  }
}
