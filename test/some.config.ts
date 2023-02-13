import { getMeSomeExtraInfo } from './fixture/someOtherFile'

const { getMeSomeExtraInfo: getMeSomeExtraInfo2 } = await import('./fixture/someOtherFile')

const extraInfo = getMeSomeExtraInfo()

export default {
  foo: 123,
  ...extraInfo,
  ...getMeSomeExtraInfo2(),
}
