import { getDocument } from "@/app/utils/firebase";
import { Modal, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css'


const ModalPreviewPengumuman = ({
  open,
  setOpen,
  pengumuman,
}) => {
  const [deskripsiPengumuman, setDeskripsiPengumuman] = useState("");
  const [loadingPengumuman, setLoadingPengumuman] = useState(false);

  const getDataPengumuman = async (docName) => {
    setLoadingPengumuman(true);
    try {
      const pengumumanData = await getDocument("pengumuman", docName);
      setDeskripsiPengumuman(pengumumanData.deskripsi);
    } catch (error) {
      message.error(error.message);
    }
    setLoadingPengumuman(false);
  }

  useEffect(() => {
    if (pengumuman.docName) {
      setDeskripsiPengumuman("");
      getDataPengumuman(pengumuman.docName);
    }
  }, [pengumuman]);

  return (
    <Modal
      style={{ minWidth: "80%" }}
      title={pengumuman.judul}
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <Skeleton loading={loadingPengumuman} active />
      <div
        dangerouslySetInnerHTML={{ __html: deskripsiPengumuman }}
        className="ql-editor"
      />
    </Modal >
  );
}

export default ModalPreviewPengumuman;