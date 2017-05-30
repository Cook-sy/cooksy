export function selectMeal(meal) {
  //selectmeal is an action creator, an obj with a type property
  //action ALWAYS contains a type, sometimes a payload
  return {
    type: 'MEAL_SELECTED',
    payload: meal
  };
}
