export default function(state = null, action) {
  switch (action.type) {
    case 'MEAL_SELECTED':
      return action.payload;
  }
  return state;
}
