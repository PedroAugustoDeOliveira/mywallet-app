import axios from "axios";

const URL = "https://mywallet-api-nrrz.onrender.com/users/me";

export async function getUser(token: string) {
  const res = await axios.get(URL, {
    headers: { authorization: "Bearer " + token },
  });
  return res.data;
}
