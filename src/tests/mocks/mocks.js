export const LOCAL_MOCK = { 
  "cocktails":{},
  "meals":{
    "53060":[
      "Filo Pastry",
      "Minced Beef",
      "Salt",
      "Onion",
      "Oil",
      "Pepper",
    ]
  }
}

export const DONE_MOCK = [
  {
    "alcoholicOrNot": "",
    "category": "Side",
    "doneDate": new Date().toDateString(),
    "id": "53060",
    "image": "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
    "name": "Burek",
    "nationality":
    "Croatian",
    "tags": ["Streetfood", "Onthego"], "type": "food"
  }
];

export const FAVORITE_MOCK = [
  {
    "id":"52978",
    "nationality":"Turkish",
    "name":"Kumpir",
    "category":"Side",
    "doneDate":new Date().toDateString(),
    "image":"https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
    "alcoholicOrNot":"",
    "type":"food",
    "tags":["SideDish"]
  },
  {
    "id":"52978",
    "nationality":"Turkish",
    "name":"VODKA",
    "category":"Side",
    "doneDate":new Date().toDateString(),
    "image":"https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
    "alcoholicOrNot":"",
    "type":"drink",
    "tags":["SideDish"]
  }
]

export const MOCK_MEAL_DETAILS =  {
  idMeal: '1213',
  strArea: 'Turkish',
  strCategory: 'Italy',
  alcoholicOrNot: '',
  strMeal: 'Cuba',
  strMealThumb: 'https://www.google.com',
}

export const MOCK_DRINK_DETAILS = {
  idDrink: '1123',
  strCategory: 'Category',
  strAlcoholic: 'Alcoholic',
  strDrink: 'A1',
  strDrinkThumb: 'https://www.google.com',
};
