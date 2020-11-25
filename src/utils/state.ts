import { Attr } from './utils'

export default class State {
  constructor(
    readonly name: string,
    readonly attr: Map<string, Attr> = new Map()
  ) {}

  toString = () => {
    return `State: ${this.name}`
  }
}
