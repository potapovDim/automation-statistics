import dayjs from 'moment'

function fromNumberToMDY(dateNumber) {
  return dayjs(dateNumber).format('MMM Do YY')
}

function fromNumberToDateObject(dateNumber) {
  return dayjs(dateNumber).toDate()
}

function fromMDYToDateObj(dateDMY) {
  return dayjs(dateDMY, 'MMM Do YY').toDate()
}

export default {
  fromMDYToDateObj,
  fromNumberToMDY,
  fromNumberToDateObject
}
