import React, { FC } from "react";
import { Statistic, Button, Typography, Dropdown } from "antd";
import EllipsisOutlined from "@ant-design/icons/EllipsisOutlined";
import { CardModal } from "@components/CardModal/CardModal";
import { CardColor } from "../../types";

import classnames from "classnames";
import "./CardItem.css";
import { useDropdown } from "../../customHooks/useDropdown";


interface Props {
  balance: number;
  cardNumber: string;
  id: string;
  color?: CardColor;
}

export const CardItem: FC<Props> = ({
  id,
  balance,
  cardNumber,
  color
}) => {
  const { isEditModalVisible, closeEditModal, menuProps } = useDropdown(id, cardNumber)

  return (
    <>
      <section
        className={classnames("CardItem", {
          [`CardItem--${color}`]: color !== undefined
        })}
      >
        <header className="CardItem__header">
          <Statistic
            value={balance}
            groupSeparator=" "
            suffix="₽"
            valueStyle={{ color: "white" }}
          />
          <Dropdown menu={menuProps}>
            <Button shape="circle" size="small" icon={<EllipsisOutlined />} />
          </Dropdown>
        </header>
        <Typography.Text style={{ color: "white" }}>
          {cardNumber}
        </Typography.Text>
      </section>

      <CardModal
        id={id}
        cardNumber={cardNumber}
        balance={balance.toString()}
        color={color}
        closeModal={closeEditModal}
        isOpenModal={isEditModalVisible}
      />
    </>
  );
};
