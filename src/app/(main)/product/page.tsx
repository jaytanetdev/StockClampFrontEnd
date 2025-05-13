"use client";

import apiClient from "@/api";
import { GetOptionResultDto, ProductResultDto } from "@/api/generated";
import ButtonCustom from "@/components/Button/ButtonCustom";
import InputCustom from "@/components/Input/InputCustom";
import TableCustom from "@/components/Table/TableCustomer";
import ModalProduct from "@/modules/product/ModalProduct";
import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Form, TableProps } from "antd";
import { useEffect, useState, useTransition } from "react";

type SearchProductType = {
  page?: number;
  pageSize?: number;
};
export default function ProductPage() {
  const defaultPage = { page: 1, pageSize: 5 };
  const [pagination, setPagination] = useState({
    current: defaultPage.page,
    pageSize: defaultPage.pageSize,
    total: 0,
  });
  const [dataProduct, setDataProduct] = useState<ProductResultDto[]>([]);
  const [dataOption, setDataOption] = useState<GetOptionResultDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [PendingProduct, startFetchProduct] = useTransition();
  const [PendingOption, startFetchOption] = useTransition();

  useEffect(() => {
    fetchData(defaultPage);

    startFetchOption(fetchOption);
  }, []);

  const fetchData = async ({ page, pageSize }: SearchProductType) => {
    const fetchProduct = async () => {
      const resProduct = await apiClient.product.productControllerFindAllV1(
        page || defaultPage.page,
        pageSize || defaultPage.pageSize
      );
      setDataProduct(resProduct.result);
      setPagination({
        current: page || defaultPage.page,
        pageSize: pageSize || defaultPage.pageSize,
        total: resProduct.total,
      });
    };
    startFetchProduct(fetchProduct);
  };
  const fetchOption = async () => {
    const resOption = await apiClient.option.optionControllerFindAllV1();
    setDataOption(resOption.result);
  };
  const defualHeader = {
    backgroundColor: "#172554",
    color: "white",
    fontSize: "10px",
  };
  const defualCell = {
    fontSize: "12px",
  };
  const columns: TableProps<ProductResultDto>["columns"] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      onHeaderCell: () => ({
        style: { ...defualHeader, height: "20px", width: "10px" },
      }),
      onCell: () => ({
        style: { ...defualCell, height: "50px", width: "10px" },
      }),
      render: (_value, _record: ProductResultDto, index: number) => {
        return (
          <p>{index + 1 + (pagination.current - 1) * pagination.pageSize}</p>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      onHeaderCell: () => ({
        style: {
          ...defualHeader,
          height: "20px",
          width: "120px",
        },
      }),
      onCell: () => ({
        style: { ...defualCell, height: "50px", width: "120px" },
      }),
      render: (_value, record: ProductResultDto) => {
        return <p>{record.productName}</p>;
      },
    },

    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      align: "end",
      onHeaderCell: () => ({
        style: {
          ...defualHeader,
          height: "20px",
          width: "20px",
        },
      }),
      onCell: () => ({
        style: { ...defualCell, height: "50px", width: "20px" },
      }),
    },
    {
      title: "SellingPrice",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      align: "end",
      onHeaderCell: () => ({
        style: {
          ...defualHeader,
          height: "20px",
          width: "20px",
        },
      }),
      onCell: () => ({
        style: { ...defualCell, height: "20px", width: "50px" },
      }),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      onHeaderCell: () => ({
        style: {
          ...defualHeader,
          height: "20px",
          width: "20px",
        },
      }),
      onCell: () => ({
        style: { ...defualCell, height: "20px", width: "20px" },
      }),
      render: () => {
        return (
          <div className="flex gap-[2px] items-center justify-center">
            <ButtonCustom className="bg-[#41B3FF] rounded-md w-[30px] h-[30px]">
              <EditFilled className="text-white w-[14px] h-[14px]" />
            </ButtonCustom>
            <ButtonCustom className="bg-[#DF5B5B] rounded-md  w-[30px] h-[30px]">
              <DeleteFilled className="text-white w-[14px] h-[14px]" />
            </ButtonCustom>
          </div>
        );
      },
    },
  ];
  const handlePageChange = async (page: number, pageSize: number) => {
    fetchData({ page, pageSize });
  };

  return (
    <div className="overflow-hidden  ">
      <>
        <Form>
          <div className="text-center border-b-[10px] pt-7">
            <InputCustom
              placeholder="Search something here"
              name="search"
              className={"w-[258px] h-[33px]"}
              prefix={<SearchOutlined />}
            />
          </div>

          <div className="text-end  pb-1 pt-[17px] px-5">
            <span>
              <ButtonCustom
                onClick={() => setIsModalOpen(true)}
                classNameBtn="h-[40px]"
              >
                <PlusOutlined className="w-[15px] h-[15px]" />
                Add Product
              </ButtonCustom>
            </span>
          </div>
        </Form>
        <div className="px-5">
          <TableCustom<ProductResultDto>
            loading={PendingProduct || PendingOption}
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
        </div>
        <ModalProduct
          handleCancel={() => setIsModalOpen(false)}
          dataOption={dataOption}
          isModalOpen={isModalOpen}
          setDataProduct={setDataProduct}
        />
      </>
    </div>
  );
}
