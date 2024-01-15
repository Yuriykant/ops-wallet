import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { CardItem } from '../CardItem/CardItem';
import { Dispatch } from '../../../../app/store';
import { fetchCards } from '../../actions';
import { getCards } from '../../selectors';
import { CardsAPI } from '../../types';

import './CardsList.css';

export const CardsList: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const cards = useSelector(getCards);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchCards()).finally(() => setLoader(false));
  }, []);

  if (isLoading) {
    return (
      <Spin>
        <section className="CardsListLoader" />
      </Spin>
    );
  }

  return (
    <section className="CardsList">
      {cards.map((item: CardsAPI) => (
        <CardItem key={item.id} id={item.id} balance={item.balance} cardNumber={item.number} color={item.color} />
      ))}
    </section>
  );
};
