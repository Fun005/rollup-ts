import myLodash from './utils/lodash'
import mgtv from './utils/mgtv'
import types from './utils/types'
import formatter from './utils/formatter'
import common from './utils/common'
import dom from './utils/dom'

export default {
  ...myLodash,
  ...mgtv,
  ...types,
  ...formatter,
  ...common,
  ...dom
}