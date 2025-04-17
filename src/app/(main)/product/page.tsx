"use client";

import apiClient from "@/api";
import {
  GetOptionResponseDto,
  GetOptionResultDto,
  ProductResultDto,
} from "@/api/generated";
import ButtonCustom from "@/components/Button/ButtonCustom";
import TableCustom from "@/components/Table/TableCustomer";
import ModalProduct from "@/modules/product/ModalProduct";
import { PlusOutlined } from "@ant-design/icons";
import { Skeleton, TableProps } from "antd";
import { useEffect, useState, useTransition } from "react";

export default function ProductPage() {
  const defaulPage = { page: 1, pageSize: 10 };
  const [pagination, sePagination] = useState({
    current: defaulPage.page,
    pageSize: defaulPage.pageSize,
    total: 10,
  });
  const [dataProduct, setDataProduct] = useState<ProductResultDto[]>([]);
  const [dataOption, setDataOption] = useState<GetOptionResultDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingOption, setLoadingOption] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoadingProduct(true);
      const resProduct = await apiClient.product.productControllerFindAllV1(
        defaulPage.page,
        defaulPage.pageSize
      );
      setDataProduct(resProduct.result);
      sePagination({
        current: defaulPage.page,
        pageSize: defaulPage.pageSize,
        total: resProduct.total,
      });
      setLoadingProduct(false);
    };
    fetchProduct();

    const fetchOption = async () => {
      setLoadingOption(true);
      const resOption = await apiClient.option.optionControllerFindAllV1();
      setDataOption(resOption.result);
      setLoadingOption(false);
    };
    fetchOption();
  }, []);

  const columns: TableProps<ProductResultDto>["columns"] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      onHeaderCell: () => ({ style: { height: "50px", width: "10px" } }),
      onCell: () => ({ style: { height: "50px", width: "10px" } }),
      render: (_value: any, record: ProductResultDto, index: number) => {
        return (
          <p>{index + 1 + (pagination.current - 1) * pagination.pageSize}</p>
        );
      },
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      onHeaderCell: () => ({ style: { height: "50px", width: "10px" } }),
      onCell: () => ({ style: { height: "50px", width: "10px" } }),
      render: (_value: any, record: ProductResultDto) => {
        return <p>{record.group}</p>;
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      onHeaderCell: () => ({ style: { height: "50px", width: "120px" } }),
      onCell: () => ({ style: { height: "50px", width: "120px" } }),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      onHeaderCell: () => ({ style: { height: "50px", width: "50px" } }),
      onCell: () => ({ style: { height: "50px", width: "50px" } }),
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      onHeaderCell: () => ({ style: { height: "50px", width: "20px" } }),
      onCell: () => ({ style: { height: "50px", width: "20px" } }),
    },
    {
      title: "SellingPrice",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      onHeaderCell: () => ({ style: { height: "50px", width: "50px" } }),
      onCell: () => ({ style: { height: "50px", width: "50px" } }),
    },
  ];
  const handlePageChange = async (page: number, pageSize: number) => {
    const resProduct = await apiClient.product.productControllerFindAllV1(
      page,
      pageSize
    );
    setDataProduct(resProduct.result);
    sePagination({
      current: page,
      pageSize: pageSize,
      total: resProduct.total,
    });
  };

  return (
    <div className="overflow-hidden  px-10 py-12  ">
      {loadingProduct || loadingOption ? (
        <Skeleton active />
      ) : (
        <>
          <div className="flex justify-between items-start ">
            <p className="font-semibold text-xl ">Product</p>
            <ButtonCustom onClick={() => setIsModalOpen(true)}>
              <PlusOutlined /> Product
            </ButtonCustom>
          </div>
          <TableCustom<ProductResultDto>
            rowKey={(record) => record._id}
            dataSource={dataProduct}
            columns={columns}
            dataPage={{
              total: pagination.total,
              current: pagination.current,
              pageSize: pagination.pageSize,
            }}
            onPageChange={handlePageChange}
          />
          <ModalProduct
            handleCancel={() => setIsModalOpen(false)}
            dataOption={dataOption}
            isModalOpen={isModalOpen}
            setDataProduct={setDataProduct}
          />
        </>
      )}
    </div>
  );
}
