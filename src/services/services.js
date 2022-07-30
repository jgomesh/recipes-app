async function fetchRecipes(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
}

export default fetchRecipes;
