'use client';

import React from "react";
import { UserOutlined, NotificationOutlined, SettingOutlined, ReconciliationOutlined, MoonOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";

const MenuItems = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e) => {
    const { key } = e;
    const item = items.find((i) => i.key === key || (i.children && i.children.some((child) => child.key === key)));
    const childItem = item?.children?.find((child) => child.key === key);
    const slug = childItem ? childItem.slug : item?.slug;
    if (slug) {
      router.push(slug);
    }
  };

  const getItem = (key, label, icon, children, slug) => {
    return { key, label, icon, children, slug };
  };

  const childSetting = [
    getItem("2.1", "Pengumuman", <NotificationOutlined />, null, "/settings/pengumuman"),
    getItem("2.2", "Users", <UserOutlined />, null, "/settings/user-management"),
  ];

  const items = [
    getItem("1", "Home", <HomeOutlined />, null, "/home"),
    getItem("2", "Settings", <SettingOutlined />, childSetting, "/settings"),
    getItem("3", "Tukin", <ReconciliationOutlined />, null, "/tukin"),
    getItem("4", "Uang Makan", <MoonOutlined />, null, "/uang-makan"),
    getItem("5", "Uang Lembur", <MoonOutlined />, null, "/uang-lembur"),
  ];

  // Function to get the selected keys based on the current pathname
  const getSelectedKeys = () => {
    for (const item of items) {
      if (item.children) {
        const childItem = item.children.find((child) => pathname === child.slug);
        if (childItem) {
          return [childItem.key];
        }
      }
      if (pathname === item.slug) {
        return [item.key];
      }
    }
    return [];
  };

  // Function to get the open keys
  const getOpenKeys = () => {
    for (const item of items) {
      if (item.children) {
        if (item.children.some((child) => pathname === child.slug)) {
          return [item.key];
        }
      }
    }
    return [];
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={getSelectedKeys()}
      defaultOpenKeys={getOpenKeys()}
      items={items}
      onClick={handleClick}
    />
  );
};

export default MenuItems;