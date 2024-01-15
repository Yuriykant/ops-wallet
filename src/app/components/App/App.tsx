import React, { FC } from 'react';
import { Header } from '../../../features/cards/components/Header/Header';
import { CardsList } from '../../../features/cards/components/CardsList/CardsList';
import { History } from '../../../features/operations/components/History/History';

import './App.css';

export const App: FC = () => {
  return (
    <section className="App">
      <div className="container">
        <Header />

        <div className="App__grid">
          <CardsList />
          <History />
        </div>
      </div>
    </section>
  );
};
