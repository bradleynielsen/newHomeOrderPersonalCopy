export default function reducer(state={
    count: 0,
    inputNum: 0
  }, action) {

    switch (action.type) {
      case 'INC_COUNT':
        return {...state, count: state.count + state.inputNum, inputNum: 0}
      case 'DEC_COUNT':
        return {...state, count: state.count - state.inputNum, inputNum: 0}
      case 'CHANGE_INPUT_NUM':
        return {...state, inputNum: action.payload}
      default:
        return state;
    }
}
