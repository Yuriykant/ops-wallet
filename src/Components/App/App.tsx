import React, { FC } from 'react';
import { Header } from '@components/Header/Header';
import { CardsList } from '@components/CardsList/CardsList';
import { History } from '@components/History/History';
import { Context } from '../../store/context';
import { useAppStore } from '../../store/actions';

import "./App.css";


export const App: FC = () => {
  const store = useAppStore();

  return (
    <Context.Provider value={store}>
      <section className='App'>
        <div className="container">
          <Header />

          <div className="App__grid">
            <CardsList />
            <History />
          </div>
        </div>
      </section>
    </Context.Provider>

  );
};
