import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  incrementAsync,
  // selectCount
} from './counterSlice';

export default function Counter() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();

  // const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
    </div>
  );
}
