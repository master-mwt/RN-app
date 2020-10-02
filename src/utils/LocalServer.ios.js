import axios from 'axios';

const SERVER_URL = 'http://localhost:8080/collection';

function putData(user, data) {
  return axios.post(SERVER_URL, {email: user, collection: data});
}

function getData(user) {
  return axios
    .get(SERVER_URL + '?email=' + user)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export {putData, getData};
