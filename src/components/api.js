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
  .then(res => res.json())

}

const getInitialCards = () => {
    return fetch(config.baseUrl+'/cards', {
      method: 'GET',
      headers: config.headers
    })
    .then(res => res.json())
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


export {getUser, getInitialCards, updateProfile, postCard} 

