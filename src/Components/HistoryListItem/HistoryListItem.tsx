import React, { FC } from "react";
import "./HistoryListItem.css";
import { Typography, List, Avatar, Dropdown, Button } from "antd";
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";

import { HistoryModal } from "@components/HistoryModal/HistoryModal";
import { useDropdown } from "../../customHooks/useDropdown";


interface Props {
  id: string;
  title: string;
  text: string;
  balance: number;
  isIncome: boolean;
}

export const HistoryListItem: FC<Props> = ({
  id,
  title,
  text,
  balance,
  isIncome = false
}) => {
  const { isEditModalVisible, closeEditModal, menuProps } = useDropdown(id)

  return (
    <>
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar
              src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${Math.random() * 10}`}
            />
          }
          title={title}
          description={text}
        />
        <div className="HistoryListItem__extra">
          <Dropdown menu={menuProps}>
            <Button size="small" shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
          <Typography.Text type={isIncome ? "success" : "secondary"}>
            {isIncome ? "+" : ""}
            {balance.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              maximumFractionDigits: 0
            })}
          </Typography.Text>
        </div>
      </List.Item>

      <HistoryModal
        id={id}
        balance={balance}
        title={title}
        text={text}
        isIncome={isIncome}
        closeModal={closeEditModal}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};
