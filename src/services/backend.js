
export function getUser(userId){
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.json())
    .then((res) => {
      return res
    });
}

export function saveUser(userDetails){
  // return fetch(`https://jsonplaceholder.typicode.com/users/${userDetails.id}`, 
  //   {
  //     method: 'post', 
  //     body: userDetails
  //   }
  // )
  //   .then((res) => res.json())
  //   .then((res) => {
  //     return res
  //   });
  return Promise.reject('Cannot save user details at this time!')
}

