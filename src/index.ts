import Parser from './parser'
import Tokenizer from './tokenizer'
import { ActionTableDesc, GotoTableDesc, Pattern } from './utils/utils'

export default class LRParser {
  private tokenizer: Tokenizer
  private parser: Parser
  constructor(
    patterns: Pattern[],
    actionConfig: ActionTableDesc,
    gotoConfig: GotoTableDesc
  ) {
    this.tokenizer = new Tokenizer(patterns)
    this.parser = new Parser(actionConfig, gotoConfig)
  }

  public parse(text: string): any {
    const tokens = this.tokenizer.tokenize(text)
    const res = this.parser.parse(tokens)
    return res
  }
}
