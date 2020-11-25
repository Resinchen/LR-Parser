import Parser from './parser'
import actionConfig from './temp/actTableTemp'
import gotoConfig from './temp/gotoTableTemp'
import tokensConfig from './temp/tokens'
import Tokenizer from './tokenizer'

const tokenizer = new Tokenizer(tokensConfig)
const str: string = `# Required player character #
Character PlayerName {
playerName.sadly = "sprites/gg/sadly.png"
playerName.happy = "sprites/gg/happy.png"
}

# Another characters #
Character Mary {
Mary.concerned = "sprites/mary/concerned.png"
Mary.happy = "sprites/mary/happy.png"
}

# Another characters without sprites #
Character Sister

### End of defines ###`

const toks = tokenizer.tokenize(str)
console.log(toks)

const parser = new Parser(actionConfig, gotoConfig)

const res = parser.parse(toks)
console.log(res)
