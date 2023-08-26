import React, { FC, useContext, useEffect, useState } from "react";
import { List } from "antd";
import { apiGetOperations } from "../../api";

import { Context } from "../../store/context";
import "./History.css";
import { HistoryHeader } from "@components/HistoryHeader/HistoryHeader";
import { HistoryListItem } from "@components/HistoryListItem/HistoryListItem";


export const History: FC = () => {
  const { operations, setOperations } = useContext(Context);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    apiGetOperations()
      .then(setOperations)
      .finally(() => setLoader(false));
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
          renderItem={(item) => (
            <HistoryListItem
              id={item.id}
              title={item.name}
              text={item.cardNumber}
              balance={item.value}
              isIncome={item.type === "income"}
            />
          )}
        />
      </div>
    </section>
  );
};
