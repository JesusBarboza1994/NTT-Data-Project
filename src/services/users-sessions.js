import apiFetch from "./api-fetch";

export async function getUsers(){
  const users = await apiFetch("api/?results=15");
  return users;
}