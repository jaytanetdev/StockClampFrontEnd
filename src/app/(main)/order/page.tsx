"use client";

import apiClient from "@/api";
import { GetOrderResultDto } from "@/api/generated";
import ButtonCustom from "@/components/Button/ButtonCustom";
import TableCustom from "@/components/Table/TableCustomer";
import ModalOrder from "@/modules/order/ModalOrder";
import { PlusOutlined } from "@ant-design/icons";
import { TableProps } from "antd";
import { useEffect, useState, useTransition } from "react";

type SearchOrderType = {
  page?: number;
  pageSize?: number;
};
export default function OrderPage() {
  const defaultPage = { page: 1, pageSize: 10 };
  const [pagination, sePagination] = useState({
    current: defaultPage.page,
    pageSize: defaultPage.pageSize,
    total: 10,
  });
  const [dataOrder, setDataOrder] = useState<GetOrderResultDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderPending, startFetchOrder] = useTransition();

  useEffect(() => {
    fetchData(defaultPage);
  }, []);

  const fetchData = async ({ page, pageSize }: SearchOrderType) => {
    const fetchOrder = async () => {
      const resOrder = await apiClient.order.orderControllerFindAllV1(
        page ?? defaultPage.page,
        pageSize ?? defaultPage.pageSize
      );
      setDataOrder(resOrder.result);
      sePagination({
        current: defaultPage.page,
        pageSize: defaultPage.pageSize,
        total: resOrder.total,
      });
    };
    startFetchOrder(fetchOrder);
  };

  const handlePageChange = async (page: number, pageSize: number) => {
    fetchData({ page, pageSize });
  };

  const columns: TableProps<GetOrderResultDto>["columns"] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      align: "center",
      onHeaderCell: () => ({ style: { height: "50px", width: "10px" } }),
      onCell: () => ({ style: { height: "50px", width: "10px" } }),
      render: (_value: unknown, record: GetOrderResultDto, index: number) => {
        return (
          <p>{index + 1 + (pagination.current - 1) * pagination.pageSize}</p>
        );
      },
    },
    {
      title: "Net Profit",
      dataIndex: "profit",
      key: "profit",
      align: "center",

      onHeaderCell: () => ({ style: { height: "50px", width: "50px" } }),
      onCell: () => ({ style: { height: "50px", width: "50px" } }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      onHeaderCell: () => ({ style: { height: "50px", width: "50px" } }),
      onCell: () => ({ style: { height: "50px", width: "50px" } }),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",

      onHeaderCell: () => ({ style: { height: "50px", width: "20px" } }),
      onCell: () => ({ style: { height: "50px", width: "20px" } }),
      render: (_value: unknown, record: GetOrderResultDto) => {
        return (
          <div className="flex items-center justify-center h-[50px] pt-5">
            <ButtonCustom
              className="bg-white border border-blue-950"
              onClick={() => {
                console.log(record._id);
              }}
            >
              Action
            </ButtonCustom>
          </div>
        );
      },
    },
  ];

  return (
    <div className="  px-10 py-12 flex-col flex gap-2 ">
      <div className="flex justify-between items-start ">
        <p className="font-semibold text-xl ">Order</p>
        <ButtonCustom onClick={() => setIsModalOpen(true)}>
          <PlusOutlined /> Add Order
        </ButtonCustom>
      </div>
      <TableCustom<GetOrderResultDto>
        rowKey={(record) => record?._id ?? `temp_${Math.random()}`}
        dataSource={dataOrder}
        loading={orderPending}
        columns={columns}
        dataPage={{
          total: pagination.total,
          current: pagination.current,
          pageSize: pagination.pageSize,
        }}
        onPageChange={handlePageChange}
      />
      <ModalOrder
        handleCancel={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        setDataOrder={setDataOrder}
      />
    </div>
  );
}
