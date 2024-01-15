import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, message, Radio, Select } from 'antd';
import { OperationType } from '../../types';
import { updateOperation, addOperation } from '../../actions';
import { getCards } from '../../../cards/selectors';
import { CardsAPI } from '../../../cards/types';
import { Dispatch } from 'app/store';

interface Props {
  isOpenModal: boolean;
  closeModal: () => any;
  id?: string;
  title?: string;
  text?: string;
  balance?: number;
  isIncome?: boolean;
}

interface OperationFormData {
  name: string;
  value: string;
  type: OperationType;
  cardNumber: string;
}

export const HistoryModal: FC<Props> = ({
  isOpenModal,
  closeModal,
  id,
  title = '',
  text = '',
  balance = '',
  isIncome = false,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<Dispatch>();
  const cards = useSelector(getCards);

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  const onValid = () => {
    const formData = form.getFieldsValue() as OperationFormData;
    const data = {
      name: formData.name,
      value: parseFloat(formData.value),
      type: formData.type,
      cardNumber: formData.cardNumber,
    };

    if (id) {
      dispatch(updateOperation(id, data)).then(() => {
        message.success('Операция обновлена!');
        onCancel();
      });
    } else {
      dispatch(addOperation(data)).then(() => {
        message.success('Операция сохранена!');
        onCancel();
      });
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <Modal
      title={id ? `Редактирование операции` : `Новая операция`}
      open={isOpenModal}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Отменить"
      closable
    >
      <Form form={form} layout="vertical" onFinish={onValid} autoComplete="off">
        <Form.Item label="Тип" name="type" initialValue={isIncome ? 'income' : 'expense'} rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="income">Доход</Radio.Button>
            <Radio.Button value="expense">Расход</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="name" label="Название платежа" initialValue={title} rules={[{ required: true }]}>
          <Input placeholder="Продукты" />
        </Form.Item>
        <Form.Item name="cardNumber" label="Карта" initialValue={text} rules={[{ required: true }]}>
          <Select placeholder="Выберите карту">
            {cards.map((item: CardsAPI) => (
              <Select.Option key={item.id} value={item.number}>
                {item.number}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="value" label="Сумма ₽" initialValue={balance} rules={[{ required: true }]}>
          <Input placeholder="Сумма в рублях" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
