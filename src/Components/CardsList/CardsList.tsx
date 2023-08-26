import React, { FC, useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { apiGetCards } from "../../api";
import { CardItem } from "@components/CardItem/CardItem";

import "./CardsList.css";
import { Context } from '../../store/context';

export const CardsList: FC = () => {
  const [isLoading, setLoader] = useState(false);
  const { cards, setCards } = useContext(Context)

  useEffect(() => {
    setLoader(true);
    apiGetCards()
      .then(setCards)
      .finally(() => setLoader(false));
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
      {cards.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          balance={item.balance}
          cardNumber={item.number}
          color={item.color}
        />
      ))}
    </section>
  );
};
