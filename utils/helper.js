import moment from 'moment';

const formatDate = (dateString ,format = 'DD MMM YYYY') => {
  return moment(dateString).format(format);
};

export { formatDate };  