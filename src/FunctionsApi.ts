import type { IFilm } from "./types";

export async function getFilmsCount() {
  try {
    const response = await fetch(`http://localhost:3000/films`);
    if (!response.ok) {
      throw new Error(`HTTP ошибка! Код: ${response.status}`);
    }
    const data = await response.json();
    return data.length as number;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

export async function getFilmsPage(page: number, perPage: number) {
  try {
    const response = await fetch(`http://localhost:3000/films?_page=${page}&_per_page=${perPage}`);
    if (!response.ok) {
      throw new Error(`HTTP ошибка! Код: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

export async function postFilm(film: IFilm) {
  try {
    const response = await fetch("http://localhost:3000/films", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(film),
    });
    if (!response.ok) {
      throw new Error(`HTTP ошибка! Код: ${response.status}`);
    }
    const result = await response.json;
    console.log(`Ответ сервера: ${result}`);
  } catch (error) {
    console.error("Ошибка при регистрации пользователя:", error);
  }
}
