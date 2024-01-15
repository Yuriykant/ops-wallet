import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal, MenuProps } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { deleteCard } from '../features/cards/actions';
import { deleteOperation } from '../features/operations/actions';
import { Dispatch } from '../app/store';

export const useDropdown = (id: string, cardNumber?: string | null) => {
  const dispatch = useDispatch<Dispatch>();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: cardNumber ? 'Удалить карту?' : 'Удалить операцию?',
      icon: <ExclamationCircleOutlined />,
      content: 'Отменить удаление будет невозможно',
      cancelText: 'Отменить',
      okText: 'Удалить',
      async onOk() {
        if (cardNumber) {
          dispatch(deleteCard(id));
        }
        return dispatch(deleteOperation(id));
      },
      onCancel() {},
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
      showEditModal();
    } else if (key === '2') {
      showDeleteConfirm();
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return { isEditModalVisible, closeEditModal, menuProps };
};
