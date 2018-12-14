export default async (context, method, err, condFunc, ...args) => {
  return new Promise((resolve, reject) => {
    context[method](...args, (error, res) => {
      if (err && error) {
        reject(error);
      }
      if (!err && error) {
        resolve(error);
      }
      if (res && condFunc(res)) {
        resolve(res);
      }
    });
  });
};
