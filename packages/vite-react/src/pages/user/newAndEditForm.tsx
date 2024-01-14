import { Form, Input, Modal, message } from 'antd';
import React, { useEffect } from 'react';
import { trpc } from '../../utils/trpc';

interface Props {
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
  editRecord: any;
}

const NewAndEditForm: React.FC<Props> = ({
  open,
  onSuccess,
  editRecord,
  onClose,
}) => {

  const onSuccessHandle = () => {
    message.success('操作成功');
    onClose();
    onSuccess();
    form.resetFields();
  }

  const { mutate: createMutate, isLoading: createLoading } = trpc.user.create.useMutation({
    onSuccess: onSuccessHandle,
  });

  const { mutate: editMutate, isLoading: editLoading } = trpc.user.update.useMutation({
    onSuccess: onSuccessHandle,
  });

  const [form] = Form.useForm();


  useEffect(() => {
    if (open) {
      form.setFieldsValue(editRecord);
    }
  }, [open, editRecord, form]);

  // antd的表单和trpc配合的不是很好，需要自己定义类型，不能通过FormItem下面的元素自动推导出values类型，可以自己封装一个Form组件
  const save = (values: any) => {
    if (editRecord) {
      editMutate({ ...editRecord, ...values })
    } else {
      createMutate(values);
    }
  }

  return (
    <Modal
      title="hello"
      open={open}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      onOk={() => {
        form.submit();
      }}
      confirmLoading={createLoading || editLoading}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        onFinish={save}
      >
        <Form.Item rules={[{ required: true }]} label="姓名" name="name">
          <Input />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="邮箱" name="email">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewAndEditForm;
