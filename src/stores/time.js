import { readable } from 'svelte/store';
import { pad } from '../helpers';

export default readable(parseTime(new Date()), (set) => {
  const interval = setInterval(() => {
    set(parseTime(new Date()));
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});

function parseTime(date) {
  const hour = pad(date.getHours() % 12);
  const minute = pad(date.getMinutes());
  return `${hour}:${minute}`;
}
