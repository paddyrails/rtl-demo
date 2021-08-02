
export function getUser(userId){
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      return res
    });
}