import { is, forEachObjIndexed, isNil } from 'ramda'

export default function initClass<T>(that: any, props: Record<string, unknown>): T {
  if (!is(Object, props)) {
    return
  }

  forEachObjIndexed((prop: any, key) => {
    if (isNil(prop) || is(Function, prop)) {
      return
    }

    if (key.indexOf('Date') > 0 || key.indexOf('date') >= 0 || key === 'timeLocal') {
      that[key] = new Date(prop)
      return
    }

    that[key] = prop
  }, props)
}
