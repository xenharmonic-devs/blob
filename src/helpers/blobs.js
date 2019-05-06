import {
  map,
  compose,
  join,
  split,
  match,
  reject,
  isEmpty,
  prop,
  evolve,
  unary,
  tryCatch,
  always,
  zipObj,
  props
} from 'ramda'

/*
original data = [
  {"assignedMidiKeys": [60], "color": "yellow", "x": 30, "y": 186},
  {"assignedMidiKeys": [62, 64], "color": "green", "x": 146, "y": 61}
]
serialized data = "30,186,yellow,[60];146,61,green,[62,64]"
*/

const delimiter = ';'

const serializedBlobs = compose(
  join(delimiter),
  map(({ x, y, color, assignedMidiKeys }) => {
    return `${x},${y},${color},${JSON.stringify(assignedMidiKeys)}`
  })
)

const deserializeBlobs = compose(
  reject(
    compose(
      isEmpty,
      prop('assignedMidiKeys')
    )
  ),
  map(
    compose(
      evolve({
        assignedMidiKeys: tryCatch(JSON.parse, always([])),
        x: unary(parseInt),
        y: unary(parseInt)
      }),
      zipObj(['x', 'y', 'color', 'assignedMidiKeys']),
      props([1, 2, 3, 4]),
      match(/^(\d+),(\d+),([a-z]+),(.+)$/)
    )
  ),
  split(delimiter)
)

export { serializedBlobs, deserializeBlobs }
