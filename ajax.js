import { generateRandomInt } from './utils';
import photoStore from './photos';

const fakeAjax = (count) => {
  const randomDelay = generateRandomInt();

  var shufflePhotos = () =>
    Array(count)
      .fill(1)
      .map(() => photoStore[generateRandomInt() % photoStore.length]);

  return new Promise((res) => {
    setTimeout(() => {
      res(shufflePhotos());
    }, randomDelay);
  });
};

export default fakeAjax;
