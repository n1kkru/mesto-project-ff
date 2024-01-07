const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '7c9bb9dc-c039-4df8-b6ff-b03b49162329',
    'Content-Type': 'application/json'
  }
}
const getUser = () => {
  return fetch(config.baseUrl+'/users/me', {
    method: 'GET',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

const getInitialCards = () => {
    return fetch(config.baseUrl+'/cards', {
      method: 'GET',
      headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

const updateProfile = (name, about) => {
  return fetch(config.baseUrl+'/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  });
}

const postCard = (name, link) => {
  return fetch(config.baseUrl+'/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  });
}

const updateLikeValue = (cardId, isLiked) => {
  if (isLiked) {
    return fetch(config.baseUrl+'/cards/likes/' + cardId, {
      method: 'DELETE',
      headers: config.headers
    });
  }
  else {
    return fetch(config.baseUrl+'/cards/likes/' + cardId, {
      method: 'PUT',
      headers: config.headers
    });

  }
}

const removeCard = (cardId) => {
  return fetch(config.baseUrl + '/cards/' + cardId, {
    method: 'DELETE',
    headers: config.headers,
  });
}

const updateAvatar = (avatar) => {
  return fetch(config.baseUrl+'/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  });

}

export {getUser, getInitialCards, updateProfile, postCard, updateLikeValue, removeCard, updateAvatar} 

