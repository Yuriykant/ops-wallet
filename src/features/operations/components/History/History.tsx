import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'antd';

import './History.css';
import { HistoryHeader } from '../HistoryHeader/HistoryHeader';
import { HistoryListItem } from '../HistoryListItem/HistoryListItem';
import { fetchOperaions } from '../../actions';
import { getOperations } from '../../selectors';
import { OperationAPI } from '../../types';
import { Dispatch } from '../../../../app/store';

export const History: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const operations = useSelector(getOperations);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    dispatch(fetchOperaions()).finally(() => setLoader(false));
  }, []);

  return (
    <section className="History">
      <HistoryHeader />

      <div className="History__list">
        <List
          size="small"
          itemLayout="horizontal"
          loading={isLoading}
          dataSource={operations}
          renderItem={(item: OperationAPI) => (
            <HistoryListItem
              id={item.id}
              title={item.name}
              text={item.cardNumber}
              balance={item.value}
              isIncome={item.type === 'income'}
            />
          )}
        />
      </div>
    </section>
  );
};
