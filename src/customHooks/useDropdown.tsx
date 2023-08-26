import React, { useContext } from 'react';
import { useState } from 'react';
import { Modal, MenuProps } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { apiDeleteCard, apiDeleteOperation } from '../api';
import { Context } from '../store/context';


export const useDropdown = (id: string, cardNumber?: string | null) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const { cards, setCards } = useContext(Context)


  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: cardNumber ? "Удалить карту?" : 'Удалить операцию?',
      icon: <ExclamationCircleOutlined />,
      content: 'Отменить удаление будет невозможно',
      cancelText: 'Отменить',
      okText: 'Удалить',
      async onOk() {
        if (cardNumber) {
          await apiDeleteCard(id);
          setCards(cards.filter((item) => item.id !== id));
        };
        return apiDeleteOperation(id);
      },
      onCancel() { },
    });
  };



  const items: MenuProps['items'] = [
    {
      label: 'Изменить',
      key: '1',
    },
    {
      label: 'Удалить',
      key: '2',
    },
  ];


  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const { key } = e;
    if (key === '1') {
      showEditModal()
    } else if (key === '2') {
      showDeleteConfirm()
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return { isEditModalVisible, closeEditModal, menuProps }

};
