//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

class HttpException extends Error {
  constructor(res, url) {
    super(`Error while loading ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}

function checkResult(res, url) {
  if (!res.ok) {
    throw new HttpException(res, url);
  }
}

export async function fetchJson(url) {
  const res = await fetch(url);
  checkResult(res, url);
  return await res.json();
}

export async function postJson(url, json) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });
  checkResult(res, url);
}
