import State from './state'

export type Attr =
  | number
  | string
  | boolean
  | number[]
  | string[]
  | boolean[]
  | any

export interface IItem {
  stateName: string
  items: ActionType[] | GotoBlock[]
}

// tokenizer
export type Pattern = { regex: RegExp; tag: string; hasLexVal: boolean }

// GOTO Table types
type GotoBlock = { newState: string; nameState: string }

export interface GotoItem extends IItem {
  items: GotoBlock[]
}

export type GotoTableDesc = GotoItem[]

// ACTION Table types
export type ReduceType = {
  type: 'reduce'
  fromState: string
  countArgs: number
  toState: string
  func: (...states: State[]) => Map<string, Attr>
}

export type ShiftType = { type: 'shift'; fromState: string; toState: string }

export type FinishType = { type: 'finish'; fromState: string; toState: string }

export type ActionType = ReduceType | ShiftType | FinishType

export interface ActionItem extends IItem {
  items: ActionType[]
}

export type ActionTableDesc = ActionItem[]
