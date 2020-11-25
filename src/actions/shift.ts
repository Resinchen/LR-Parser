import Action from './action'

export default class Shift extends Action {
  constructor(fromState: string, toState: string) {
    super(fromState, toState)
  }
}
