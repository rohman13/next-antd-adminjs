'use client';
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Skeleton, message, DatePicker } from "antd";
import RoleMappings from "@/app/utils/reference/roles";
import { getDocument, updateOrCreateDocument } from "@/app/utils/firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

const ModalPengumuman = ({ open, setOpen, pengumuman, setPengumuman }) => {
  const [form] = Form.useForm();
  const { setFieldsValue, resetFields } = form;
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPengumuman, setLoadingPengumuman] = useState(false);

  const getDataPengumuman = async (docName) => {
    setLoadingPengumuman(true);
    try {
      const pengumumanData = await getDocument("pengumuman", docName);
      const { judul, deskripsi, url_dokumen, expired_date } = pengumumanData;
      setFieldsValue({
        judul,
        deskripsi,
        url_dokumen,
        expired_date: dayjs(expired_date.toDate())
      });
    } catch (error) {
      message.error(error.message);
    }
    setLoadingPengumuman(false);
  }

  useEffect(() => {
    if (pengumuman.docName) {
      getDataPengumuman(pengumuman.docName);
    } else {
      resetFields();
    }
  }, [pengumuman]);

  const onFinish = async (values) => {
    // if (pengumuman.docName === undefined || pengumuman.docName === null) {
    //   pengumuman.docName = null;
    //   values = { ...values, docName: pengumuman.docName };
    // }

    // if any undefined value, set it to null
    Object.keys(values).forEach(key => {
      if (values[key] === undefined) {
        values[key] = null;
      }
    });

    values.expired_date = values.expired_date ? Timestamp.fromDate(values.expired_date.toDate()) : null;
    console.log(values);
    setLoadingUpdate(true);
    try {
      await updateOrCreateDocument("pengumuman", pengumuman.docName, values);
      if (pengumuman.docName) {
        message.success("Pengumuman berhasil diupdate");
      } else {
        message.success("Pengumuman berhasil ditambahkan");
      }
      setOpen(false);
      setPengumuman((prevState) =>
        prevState.map((item) => (item.docName === pengumuman.docName ? { ...item, ...values } : item))
      );
    } catch (error) {
      message.error(error.message);
    }
    setLoadingUpdate(false);
  };

  // react quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];


  return (
    <Modal
      title={pengumuman.docName ? "Edit Pengumuman" : "Tambah Pengumuman"}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      style={{ minWidth: "60%" }}
      destroyOnClose
    >
      <Skeleton loading={loadingPengumuman} active >
        <Form
          form={form}
          layout="vertical"
          // initialValues={pengumuman}
          onFinish={onFinish}
        >
          <Form.Item
            label="Judul"
            name="judul"
            rules={[{ required: true, message: "Please input judul!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Deskripsi"
            name="deskripsi"
            style={{ height: "400px" }}
          >
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              style={{ height: "300px" }}
              onChange={(value) => setFieldsValue({ deskripsi: value })}
            />
          </Form.Item>

          <Form.Item
            label="URL Dokumen"
            name="url_dokumen"
            style={{ marginTop: "20px" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Expired Date"
            name="expired_date"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            style={{ textAlign: "right", marginTop: "20px" }}
          >
            <Button type="primary" htmlType="submit" loading={loadingUpdate}>
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal >
  );
};

export default ModalPengumuman;