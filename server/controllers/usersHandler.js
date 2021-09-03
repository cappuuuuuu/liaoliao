const users = []

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) return users.splice(index, 1)[0]
}

const addUser = ({ name, avatar, id }) => {
  const user = { name, avatar, id }
  users.push(user)
  return users
}

const checkUsers = (loginUser) => {
  let error = ''
  if (users.findIndex((user) => user.name === loginUser) !== -1) {
    error = 'repeat'
  } else if (loginUser.length > 8) {
    error = 'exceed'
  }
  return error
}

module.exports = { removeUser, addUser, checkUsers }
