import { endOfDay, formatISO, startOfDay } from "date-fns";

export function getTomorrowsDate () {
    const today = new Date()
    const tomorrow = new Date(today);
    const tomorrowDate = tomorrow.setDate(today.getDate() + 1)
    return (formatISO(endOfDay(tomorrowDate)))
}

export function getTotalWeek() {
    const today = new Date();

    // Start from today
    const start = new Date(today);
    start.setHours(0, 0, 0, 0); // start of today

    // Find this week's Saturday
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + (6 - today.getDay()));
    saturday.setHours(23, 59, 59, 999); // end of Saturday

    // console.log("From today:", start);
    // console.log("To Saturday:", saturday);

    return {
        startWeek: formatISO(startOfDay(start)),
        endWeek: formatISO(endOfDay(saturday))
    }
}