import { useRef } from 'react';
import { Dimensions } from 'react-native';

interface IUseNumColumns {
  itemHeight?: number;
  column?: number;
}


/**
 *  useGridCount
 *  화면 높이에 따라 아이템 그리드의 갯수를 계산하는 훅
 *  */
const useGridItemCount = (props:IUseNumColumns) => {
  const { itemHeight = 120, column = 3 } = props;
  const count = useRef(column);

  const calculate = () => {
    const windowHeight = Dimensions.get('window').height;
    const row = Math.floor(windowHeight / itemHeight);
    count.current = row * column;
  };

  return {
    count,
    calculate,
  }
};

export default useGridItemCount;