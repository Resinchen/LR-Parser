export default class Token {
  constructor(readonly name: string, readonly lexVal?: string) {}

  toString = () => {
    return `Token: ${this.name}`
  }
}
