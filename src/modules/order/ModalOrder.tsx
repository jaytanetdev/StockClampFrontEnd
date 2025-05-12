"use client";
import apiClient from "@/api";
import {
  GetMaterialResultDto,
  GetModelResultDto,
  GetOptionResultDto,
  GetOrderResultDto,
  ProductResultGetDto,
} from "@/api/generated";
import ButtonCustom from "@/components/Button/ButtonCustom";
import InputCustom from "@/components/Input/InputCustom";
import ModalCustom from "@/components/Modal/ModalCustom";
import SelectCustom from "@/components/Slect/SelectCustom";
import TableCustom from "@/components/Table/TableCustomer";
import { DeleteFilled, PlusCircleOutlined } from "@ant-design/icons";
import { Form, Table, TableProps } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ModalOrderProduct from "./ModalOrderProduct";
import { OrderTempItem } from "@/types/order";

type ModalOrderType = {
  isModalOpen: boolean;
  handleCancel: () => void;
  setDataOrder: Dispatch<SetStateAction<GetOrderResultDto[]>>;
};

const ModalOrder = (prop: ModalOrderType) => {
  const [dataOrderTemp, setDataOrderTemp] = useState<OrderTempItem[]>([]);
  const [isModalOrderProduct, setIsModalOrderProduct] =
    useState<boolean>(false);

  const [form] = Form.useForm();
  useEffect(() => {
    if (prop.isModalOpen) {
      form.setFieldsValue({ platform: "SHOPEE" });
    }
  }, [prop.isModalOpen]);

  const handleOk = async (data: OrderTempItem) => {
    console.log(dataOrderTemp, data);
    // try {
    //   const res = await apiClient.order.orderControllerCreateV1({
    //     productId: data.productId,
    //     amount: data.amount,
    //     status: CreateOrderDto.status.OPEN,
    //     cost: 11,
    //     sellingPrice: 22,
    //     expenses: 33,
    //     profit: 44,
    //   });
    //   console.log("res", res);
    //   prop?.setDataOrder((prev) => [...prev, res]);
    //   showNotification("success", "Success", "บันทึกรายการสำเร็จ");
    // } catch (e) {
    //   if (e instanceof ApiError) {
    //     showNotification("error", "Error", e.body?.message);
    //   }
    // }
  };
  const updateSummaryFields = (data: OrderTempItem[]) => {
    const getTotal = (field: keyof (typeof data)[number]) =>
      data.reduce((sum, row) => sum + (Number(row[field]) || 0), 0);

    const costNetTotal = getTotal("costNet");
    const sellingPriceNetTotal = getTotal("sellingPriceNet");
    const expenses = Number(form.getFieldValue("expenses")) || 0;

    form.setFieldsValue({
      total: sellingPriceNetTotal.toLocaleString(),
      totalExpenses: expenses.toLocaleString(),
      profitNet: (
        sellingPriceNetTotal -
        costNetTotal -
        expenses
      ).toLocaleString(),
    });
  };

  const removeProductTemp = (index: number) => {
    setDataOrderTemp((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      updateSummaryFields(updated);
      return updated;
    });
  };

  const handleChangeExpenses = async (expenses: number) => {
    const sellingPriceNet = form.getFieldValue("sellingPriceNet");
    const profit = sellingPriceNet - expenses;
    form.setFieldsValue({
      profit: profit,
    });
  };

  const columns: TableProps["columns"] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      align: "center",
      onHeaderCell: () => ({
        style: {
          height: "50px",
          backgroundColor: "#172554",
          color: "white",
          width: "10px",
          fontSize: "12px",
        },
      }),
      onCell: () => ({
        style: { height: "50px", width: "10px", fontSize: "12px" },
      }),
      render: (_value, _record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      align: "center",
      onHeaderCell: () => ({
        style: {
          height: "50px",
          backgroundColor: "#172554",
          color: "white",
          width: "100px",
          fontSize: "12px",
        },
      }),
      onCell: () => ({
        style: { height: "50px", width: "100px", fontSize: "12px" },
      }),
      render: (_value, record) => {
        return (
          <div className="flex items-center justify-center sm:flex-row gap-1 flex-col">
            <span>{record.materialName}</span>
            <span>{record.modalName}</span>
            <span>{record.optionName}</span>
            <span>{record.productName}</span>
          </div>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      onHeaderCell: () => ({
        style: {
          height: "50px",
          backgroundColor: "#172554",
          color: "white",
          width: "20px",
          fontSize: "12px",
        },
      }),
      onCell: () => ({
        style: { height: "50px", width: "20px", fontSize: "12px" },
      }),
    },
    {
      title: "Cost (Net)",
      dataIndex: "costNet",
      key: "costNet",
      align: "center",
      onHeaderCell: () => ({
        style: {
          height: "50px",
          backgroundColor: "#172554",
          color: "white",
          width: "50px",
          fontSize: "12px",
        },
      }),
      onCell: () => ({
        style: { height: "50px", width: "50px", fontSize: "12px" },
      }),
    },
    {
      title: "Selling (Net)",
      dataIndex: "sellingPriceNet",
      key: "sellingPriceNet",
      align: "center",
      onHeaderCell: () => ({
        style: {
          height: "50px",
          backgroundColor: "#172554",
          color: "white",
          width: "50px",
          fontSize: "12px",
        },
      }),
      onCell: () => ({
        style: { height: "50px", width: "50px", fontSize: "12px" },
      }),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",

      onHeaderCell: () => ({
        style: {
          height: "50px",
          backgroundColor: "#172554",
          color: "white",
          width: "20px",
        },
      }),
      onCell: () => ({ style: { height: "50px", width: "20px" } }),
      render: (_value, _record, index) => {
        return (
          <ButtonCustom
            className="bg-[#DF5B5B] rounded-md  w-[30px] h-[30px]"
            onClick={() => {
              removeProductTemp(index);
            }}
          >
            <DeleteFilled className="text-white w-[14px] h-[14px]" />
          </ButtonCustom>
        );
      },
    },
  ];
  const handleCancel = () => {
    setDataOrderTemp([]);
    prop.handleCancel();
    resetValue();
  };

  const resetValue = () => {
    form.setFieldsValue({
      tax:undefined,
      platform: undefined,
      expenses: undefined,
      total: undefined,
      totalExpenses: undefined,
      profitNet: undefined,
    });
  };
  return (
    <ModalCustom
      width={800}
      title={"Add Order"}
      isModalOpen={prop.isModalOpen}
      handleOk={() => form.submit()}
      handleCancel={handleCancel}
    >
      <Form
        layout="vertical"
        onFinish={handleOk}
        form={form}
        onValuesChange={(changedValues) => {
          if (changedValues.expenses) {
            handleChangeExpenses(changedValues.expenses);
          }
        }}
      >
        <div className="border px-2 py-1 rounded-lg w-full">
          <div className="max-w-[400px] px-10 ">
            <SelectCustom
              label="Platform"
              name="platform"
              placeholder="platform"
              options={[
                { label: "Shopee", value: "SHOPEE" },
                { label: "Lazada", value: "LAZADA" },
                { label: "Other", value: "Other" },
              ]}
              formItemProps={{
                rules: [{ required: true, message: "Please select platform" }],
              }}
            />
            <InputCustom name="tax" label="Tax" addonAfter={<span>%</span>} />
            <InputCustom
              name="expenses"
              type="number"
              label="Expenses"
              addonAfter={<span>Bath</span>}
            />
          </div>

          <div className="text-end py-1">
            <ButtonCustom onClick={() => setIsModalOrderProduct(true)}>
              <PlusCircleOutlined /> Add Product
            </ButtonCustom>
          </div>
          <TableCustom
            className="overflow-auto"
            rowKey={(record) => `${record.productId}temp_${Math.random()}`}
            dataSource={dataOrderTemp}
            columns={columns}
            summary={(pageData) => {
              const getTotal = (field: keyof (typeof pageData)[number]) =>
                pageData.reduce(
                  (sum, row) => sum + (Number(row[field]) || 0),
                  0
                );
              const amountTotal = getTotal("amount");
              const costNetTotal = getTotal("costNet");
              const sellingPriceNetTotal = getTotal("sellingPriceNet");

              return (
                <Table.Summary.Row className="bg-[#E5EEFE]">
                  <Table.Summary.Cell index={0} colSpan={2} align="center">
                    Totol
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="center">
                    {amountTotal.toLocaleString()}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} align="center">
                    {costNetTotal.toLocaleString()}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} align="center">
                    {sellingPriceNetTotal.toLocaleString()}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}></Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
          <div className="w-full max-w-[300px] px-10 py-10">
            <InputCustom
              label="Total"
              name="total"
              disabled
              addonAfter={<span>Bath</span>}
            />
            <InputCustom
              label="Total Expenses"
              name="totalExpenses"
              disabled
              addonAfter={<span>Bath</span>}
            />

            <InputCustom
              label="Profit (Net)"
              name="profitNet"
              disabled
              addonAfter={<span>Bath</span>}
            />
          </div>
        </div>
      </Form>
      <ModalOrderProduct
        handleCancel={() => setIsModalOrderProduct(false)}
        isModalOpen={isModalOrderProduct}
        setDataOrderTemp={setDataOrderTemp}
        updateSummaryFields={updateSummaryFields}
      />
    </ModalCustom>
  );
};
export default ModalOrder;
