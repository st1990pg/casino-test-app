export const registrationUser = async (data) => {
  return new Promise(
    (fulfill, reject) => {
      //success
      setTimeout(function () {
        fulfill({
          info: {
            success: true,
          },
        });
      }, 1000);
    },
    (error) => {
      // error
      setTimeout(function () {
        reject({
          info: {
            success: false,
          },
        });
      }, 1000);
    }
  );
};
