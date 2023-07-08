const getApi = (url: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      }, 500);
    });
  };
  
  export { getApi };