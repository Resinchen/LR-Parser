import Token from './utils/token'

export default class Tokenizer {
  constructor(
    private patterns: { regex: RegExp; tag: string; hasLexVal: boolean }[]
  ) {}

  private _tokenize(str: string): Token[] {
    let pos: number = 0
    let tokens: Token[] = []

    while (pos < str.length) {
      for (const pattern of this.patterns) {
        const { regex, tag, hasLexVal } = pattern
        const match = regex.exec(str.substring(pos))
        if (match) {
          const text = match[0]
          pos += text.length
          const newToken = hasLexVal ? new Token(tag, text) : new Token(tag)
          tokens.push(newToken)
          break
        }
      }
    }

    return tokens
  }

  public tokenize(str: string): Token[] {
    const tokens = this._tokenize(str).filter(token => token.name !== 'None')
    tokens.push(new Token('eof'))
    return tokens
  }
}
