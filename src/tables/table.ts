import { IItem } from '../utils/utils'

function getBySimular<K, V>(
  map: Map<K, V>,
  simularKey: K,
  field: string
): V | undefined {
  const newKey = [...map.keys()]
    .filter((someKey: K) => (<any>someKey)[field] === (<any>simularKey)[field])
    .pop()

  return newKey ? map.get(newKey) : undefined
}

export default abstract class Table<R, C, T> {
  protected table: Map<R, Map<C, T>>

  constructor() {
    this.table = new Map<R, Map<C, T>>()
  }

  public look() {
    return this.table
  }

  public get = (row: R, col: C): T => {
    const newRow = getBySimular<R, Map<C, T>>(this.table, row, 'name')
    if (newRow) {
      const newCol = getBySimular<C, T>(newRow, col, 'name')
      if (newCol) {
        return newCol
      } else {
        throw new Error(`Undefined col: ${col}`)
      }
    } else {
      throw new Error(`Undefined row: ${row}`)
    }
  }

  protected _set = (row: R, col: C, value: T): void => {
    this.table.get(row)?.set(col, value) ??
      this.table.set(row, new Map([[col, value]]))
  }

  public abstract set(desc: IItem): void
}
