import { compose, keys, filter, either, propEq, map, unary } from 'ramda'

const getPressedNotesFromNoteTable = compose(
  map(unary(parseInt)),
  keys,
  filter(either(propEq('pressed', true), propEq('sustained', true)))
)

export { getPressedNotesFromNoteTable }
