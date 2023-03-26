const addZero = value => value < 10 ? '0' + value : value;

module.exports = timestamp => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate());
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());
  const second = addZero(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};