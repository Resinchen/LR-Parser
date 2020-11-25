import State from '../utils/state'

export default class Action {
  fromState: State
  toState: State

  constructor(fromStateName: string, toStateName: string) {
    this.fromState = new State(fromStateName)
    this.toState = new State(toStateName)
  }
}
