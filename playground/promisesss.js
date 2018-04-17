let asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('not numbers');
      }
    }, 300);
  });
};


asyncAdd(2, '3').then((res) => {
  console.log('res --> ' + res);
  return asyncAdd(res, '33');
}).then((res) => {
  console.log('res2 --> ' + res);
}).catch((err) => {
  console.log('catch --> ' + err);
});