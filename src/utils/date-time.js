import moment from 'moment';

export function getDate(unixTimestamp, format = 'ddd, MMM Do YYYY') {
    const diff = moment().startOf('day').diff(moment(unixTimestamp).startOf('day'), 'days');

    switch(diff) {
        case 0: {
            date = 'Today';
            break;
        }
        case 1: {
            date = 'Yesterday';
            break;
        }
        case -1: {
            date = 'Tomorrow';
            break;
        }
        default: {
            date = moment(unixTimestamp).format(format);
            break;
        }
    }

    return date;
}

export function getMonthYear(date, inputFormat = 'x') {
    // `X` => unixTimestamp (in seconds)
    return moment(date, inputFormat).format('MMM, YYYY');
}

// start and end expected in dd/mm/yyy
// offset - [24, 'months']
export function dateRange(start, end, target, offset, inputFormat = 'DD/MM/YYYY') {
    let range = [];
    let startMoment = moment(start, inputFormat).startOf('month').subtract(...offset);
    let endMoment = moment(end, inputFormat).startOf('month').add(...offset);
    let targetMoment = moment(target, inputFormat);
    let targetLabel = targetMoment.format('MMM, YYYY');
    let index = -1;
    while (endMoment >= startMoment) {
        let tabLabel = startMoment.format('MMM, YYYY');
        range.push(tabLabel);
        if (tabLabel === targetLabel) {
            index = range.length - 1;
        }

        startMoment.add(1, 'month');
    }
    return { index, range };
}

export function currentDate(format = 'DD/MM/YYYY') {
    return moment().format(format);
}

export function sortDates(dates, inputFormat) {
    return dates.sort((a, b) => moment(a, inputFormat) > moment(b, inputFormat) ? 1 : -1)
}