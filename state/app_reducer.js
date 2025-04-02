

const INITIAL_STATE = {
  resources: [],
  user: {}
};

export default function (state = INITIAL_STATE, action) {
  console.log('ACTION', action);
  console.log('CURRENT STATE', state);

  switch (action.type) {
   
    default:
      return log(state);
  }
}

const log = (state) => {
  console.log('NEW STATE', state);
  return state;
};