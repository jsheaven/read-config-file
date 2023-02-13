import { getMeSomeExtraInfo } from './fixture/someOtherFile'

const extraInfo = getMeSomeExtraInfo()

export default {
  foo: 123,
  ...extraInfo,
}
