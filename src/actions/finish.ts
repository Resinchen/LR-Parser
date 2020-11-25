import Action from './action'

export default class Finish extends Action {
  constructor(fromState: string, toState: string) {
    super(fromState, toState)
  }
}
