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