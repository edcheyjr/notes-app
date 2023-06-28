interface AnyObject {
  [key: number]: string
}

/**
 * format date object to ui friendly string format
 * @param {Date} date  date value
 * @returns
 */
export function formatDate(date: string): string {
  // "2023-06-27T19:35:31.000000Z",
  try {
    if (date === undefined) {
      throw new Error(`Error while trying to format this ${date}`)
    }
    const datetimeArray = date.split('T')
    if (datetimeArray.length !== 2) {
      throw new Error(`Error while trying to format this ${date}`)
    }
    const dayMonthYearArray = datetimeArray[0]?.split('-')
    const day = dayMonthYearArray[2] // day
    const month = dayMonthYearArray[1] // month
    const year = dayMonthYearArray[0] // year
    const newDateString = `${_mapMonthNumberToString(
      parseInt(month)
    )} ${day} ${year}`

    return newDateString
  } catch (error) {
    console.error(error)
  }
  return date
}

function _mapMonthNumberToString(month: number): string {
  const months: AnyObject = {
    1: 'Jan',
    2: 'Feb',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }
  return months[month]
}
