import axios from "axios";
import { getAuthority_api } from "../api/api";

export async function getCurrentAuthority() {
  const res_data = await axios
    .get(getAuthority_api, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
    .then((res) => {
      return res.data;
    });
  return res_data;
}

export function checking(authority) {
  const current = getCurrentAuthority();
  return current.some((item) => authority.includes(item));
}

export async function isLogin() {
  const current = await getCurrentAuthority();
  if (String(current.status) === "Unauthorized") {
    // console.log(current.status);
    return false;
  } else {
    // console.log(current);
    return true;
  }
}
