import { User } from "../models/user.model";

async function getAll() {
  const users = User.find()
  return users
}

async function get(userId: string) {
  const user = await User.find({ _id: userId })
  return user
}

async function create(dto: any) {
  const user = await User.create(dto)
  return user
}

async function update(userId: string, dto: any) {
  const user = await User.find({ _id: userId }).updateOne(dto)
  return user
}

async function remove(userId: string) {
  const user = await User.deleteOne({
    _id: userId
  })

  return true;
}

export { getAll, get, create, update, remove }