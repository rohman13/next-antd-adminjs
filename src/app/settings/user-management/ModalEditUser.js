'use client';
import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import RoleMappings from "@/app/utils/reference/roles";
import { updateOrCreateDocument } from "@/app/utils/firebase";

const ModalEditUser = ({ open, setOpen, user, setUsers }) => {
  const [form] = Form.useForm();
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const onFinish = async (values) => {
    setLoadingUpdate(true);
    values = { ...values, id: user.id };
    try {
      await updateOrCreateDocument("users", user.docName, values);
      message.success("User updated successfully");
      setOpen(false);
      setUsers((prevState) =>
        prevState.map((item) => (item.id === user.id ? { ...item, ...values } : item))
      );
    } catch (error) {
      message.error(error.message);
    }
    setLoadingUpdate(false);
  };

  return (
    <Modal
      title="Edit User"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={user}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone_number"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="NIP"
          name="nip"
          rules={[{ required: true, message: "Please input NIP!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select>
            {Object.keys(RoleMappings).map((role) => (
              <Select.Option key={role} value={role}>
                {RoleMappings[role]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ textAlign: "right", marginTop: "20px" }}
        >
          <Button type="primary" htmlType="submit" loading={loadingUpdate}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal >
  );
};

export default ModalEditUser;