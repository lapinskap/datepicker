import en from '../locale/translations/en'

const utils = {
  useUtc: false,
  getFullYear (date) {
    return this.useUtc ? date.getUTCFullYear() : date.getFullYear()
  },

  getMonth (date) {
    return this.useUtc ? date.getUTCMonth() : date.getMonth()
  },

  getDate (date) {
    return this.useUtc ? date.getUTCDate() : date.getDate()
  },

  getDay (date) {
    return this.useUtc ? date.getUTCDay() : date.getDay()
  },

  getHours (date) {
    return this.useUtc ? date.getUTCHours() : date.getHours()
  },

  getMinutes (date) {
    return this.useUtc ? date.getUTCMinutes() : date.getMinutes()
  },

  setFullYear (date, value) {
    return this.useUtc ? date.setUTCFullYear(value) : date.setFullYear(value)
  },

  setMonth (date, value) {
    return this.useUtc ? date.setUTCMonth(value) : date.setMonth(value)
  },

  setDate (date, value) {
    return this.useUtc ? date.setUTCDate(value) : date.setDate(value)
  },

  /**
   https://stackoverflow.com/a/6202196/4455925
   */

  compareDates (date1, date2) {
    const d1 = new Date(date1.getTime())
    const d2 = new Date(date2.getTime())

    if (this.useUtc) {
      d1.setUTCHours(0, 0, 0, 0)
      d2.setUTCHours(0, 0, 0, 0)
    } else {
      d1.setHours(0, 0, 0, 0)
      d2.setHours(0, 0, 0, 0)
    }
    return d1.getTime() === d2.getTime()
  },

  isValidDate (date) {
    if (Object.prototype.toString.call(date) !== '[object Date]') {
      return false
    }
    return !isNaN(date.getTime())
  },

  /**
   * Return abbreviated week day name
   */

  getDayNameAbbr (date, days) {
    if (typeof date !== 'object') {
      throw TypeError('Invalid Type')
    }
    return days[this.getDay(date)]
  },

  getMonthName (month, months) {
    if (!months) {
      throw Error('missing 2nd parameter Months array')
    }
    if (typeof month === 'object') {
      return months[this.getMonth(month)]
    }
    if (typeof month === 'number') {
      return months[month]
    }
    throw TypeError('Invalid type')
  },

  /**
   * Return an abbreviated version of the month
   */

  getMonthNameAbbr (month, monthsAbbr) {
    if (!monthsAbbr) {
      throw Error('missing 2nd paramter Months array')
    }
    if (typeof month === 'object') {
      return monthsAbbr[this.getMonth(month)]
    }
    if (typeof month === 'number') {
      return monthsAbbr[month]
    }
    throw TypeError('Invalid type')
  },

  daysInMonth (year, month) {
    return /8|3|5|10/.test(month) ? 30 : month === 1 ? (!(year % 4) && year % 100) || !(year % 400) ? 29 : 28 : 31
  },

  getNthSuffix (day) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st'
      case 2:
      case 22:
        return 'nd'
      case 3:
      case 23:
        return 'rd'
      default:
        return 'th'
    }
  },

  formatDate (date, format, translation) {
    translation = (!translation) ? en : translation
    let year = this.getFullYear(date)
    let month = this.getMonth(date) + 1
    let day = this.getDate(date)
    let str = format
      .replace(/dd/, ('0' + day).slice(-2))
      .replace(/d/, day)
      .replace(/yyyy/, year)
      .replace(/yy/, String(year).slice(2))
      .replace(/MMMM/, this.getMonthName(this.getMonth(date), translation.months))
      .replace(/MMM/, this.getMonthNameAbbr(this.getMonth(date), translation.monthsAbbr))
      .replace(/MM/, ('0' + month).slice(-2))
      .replace(/M(?!a|ä|e)/, month)
      .replace(/su/, this.getNthSuffix(this.getDate(date)))
      .replace(/D(?!e|é|i)/, this.getDayNameAbbr(date, translation.days))
    return str
  },

  /**
   * Creates an array of dates for each day in between two dates.
   */

  createDateArray (start, end) {
    let dates = []
    while (start <= end) {
      dates.push(new Date(start))
      start = this.setDate(new Date(start), this.getDate(new Date(start)) + 1)
    }
    return dates
  },

  /**
   * method used as a prop validator for input values
   */

  validateDateInput (val) {
    return val === null || val instanceof Date || typeof val === 'string' || typeof val === 'number'
  }
}

export const makeDateUtils = useUtc => ({...utils, useUtc})

export default {
  ...utils
}
// eslint-disable-next-line
;
