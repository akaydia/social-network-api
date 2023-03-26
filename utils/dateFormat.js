const dayJS = require('dayjs');

module.exports = {
    dateFormat (date) {
        return dayJS(date).format('MMM D, YYYY hh:mm a');
    }
}