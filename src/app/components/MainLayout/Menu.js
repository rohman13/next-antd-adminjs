import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const getItem = (
  key,
  label,
  icon,
  children,
  slug
) => {
  return {
    key,
    label,
    icon,
    children,
    slug,
    onClick: () => {
      if (slug) {
        router.push(slug);
      }
    },
  };
};


const menuList = [
  getItem("1", "nav 1", <UserOutlined />, null, "/user"),
  getItem("2", "nav 2", <VideoCameraOutlined />, null, "/camera"),
  getItem("3", "nav 3", <UploadOutlined />, null, "/upload"),
];

export { menuList }