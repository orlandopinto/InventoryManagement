export function FormatDate(date: Date) {
     // first convert date object to string
     let date_as_string = date.toString();
     // split the string and get the date part
     let datePart = date_as_string.split("T")[0];
     // return the date string
     return datePart;
}

export function CompareMajorDate(initDate: Date, endDate: Date) {
     const initDateString = initDate.toString().length > 10 ? initDate.toString().slice(0, 10) : initDate;
     const endDateString = endDate.toString().length > 10 ? endDate.toString().slice(0, 10) : endDate;
     const StartDate = Date.UTC(new Date(new Date(initDateString).toISOString().slice(0, 10)).getFullYear(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCMonth(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCDate(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCHours(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCMinutes(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCSeconds())
     const FinishDate = Date.UTC(new Date(new Date(endDateString).toISOString().slice(0, 10)).getFullYear(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCMonth(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCDate(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCHours(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCMinutes(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCSeconds())
     return StartDate > FinishDate;
}

export function CompareMajorEqualDate(initDate: Date, endDate: Date) {
     const initDateString = initDate.toString().length > 10 ? initDate.toString().slice(0, 10) : initDate;
     const endDateString = endDate.toString().length > 10 ? endDate.toString().slice(0, 10) : endDate;
     const StartDate = Date.UTC(new Date(new Date(initDateString).toISOString().slice(0, 10)).getFullYear(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCMonth(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCDate(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCHours(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCMinutes(), new Date(new Date(initDateString).toISOString().slice(0, 10)).getUTCSeconds())
     const FinishDate = Date.UTC(new Date(new Date(endDateString).toISOString().slice(0, 10)).getFullYear(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCMonth(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCDate(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCHours(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCMinutes(), new Date(new Date(endDateString).toISOString().slice(0, 10)).getUTCSeconds())
     return StartDate >= FinishDate;
}

export default FormatDate