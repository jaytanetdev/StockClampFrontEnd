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
import RadioCustom from "@/components/Radio/RadioCustom";
import SelectCustom from "@/components/Slect/SelectCustom";
import TableCustom from "@/components/Table/TableCustomer";
import { DeleteFilled } from "@ant-design/icons";
import { Form, Table, TableProps } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ModalOrderType = {
  isModalOpen: boolean;
  handleCancel: () => void;
  setDataOrder: Dispatch<SetStateAction<GetOrderResultDto[]>>;
};

type OrderTempItem = {
  amount: number;
  costEA: number;
  costNet: number;
  expenses?: number;
  materialId: string;
  materialName: string;
  modalId: string;
  modalName: string;
  optionId: string;
  optionName: string;
  platform: "SHOPEE" | "LAZADA" | "Other"; // หากมี enum ชัดเจน
  productId: string;
  productName: string;
  profitNet?: number;
  sellingPriceEA: number;
  sellingPriceNet: number;
  tax?: number;
  total?: number;
  totalExpenses?: number;
};


const ModalOrder = (prop: ModalOrderType) => {
  const [dataMaterial, setDataMaterial] = useState<GetMaterialResultDto[]>([]);
  const [dataModel, setDataModel] = useState<GetModelResultDto[]>([]);
  const [dataOption, setDataOption] = useState<GetOptionResultDto[]>([]);
  const [dataProduct, setDataProduct] = useState<ProductResultGetDto[]>([]);
  const [dataOrderTemp, setDataOrderTemp] = useState<OrderTempItem[]>([]);

  const [form] = Form.useForm();
  useEffect(() => {
    if (prop.isModalOpen) {
      fetchMaterial();
      form.setFieldsValue({ platform: "SHOPEE" });
    }
  }, [prop.isModalOpen]);

  const handleOk = async (data: OrderTempItem) => {
    const materialLabel = dataMaterial.find(
      (item) => item._id === data.materialId
    )?.materialName;
    const modelLabel = dataModel.find(
      (item) => item._id === data.modalId
    )?.modelName;
    const optionLabel = dataOption.find(
      (item) => item._id === data.optionId
    )?.optionName;
    const productLabel = dataProduct.find(
      (item) => item._id === data.productId
    )?.productName;

    const dataTemp: OrderTempItem = {
      ...data,
      productId: data.productId,
      productName: productLabel ?? '',
      materialName: materialLabel ?? '',
      modalName: modelLabel ?? '',
      optionName: optionLabel ?? '',
    };
    
    console.log(dataTemp)
    setDataOrderTemp((prev) => {
      const updated = [...prev, dataTemp];
      updateSummaryFields(updated);
      return updated;
    });

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

  const fetchMaterial = async () => {
    const res = await apiClient.material.materialControllerFindAllV1();
    setDataMaterial(res.result);
    if (res.result?.[0]?._id) {
      form.setFieldsValue({ materialId: res.result[0]._id });

      handleMaterial(res.result[0]._id);
    }
  };

  const handleMaterial = async (id: string) => {
    const res = await apiClient.model.modelControllerFindByMaterialIdV1(id);
    if (res.result?.[0]?._id) {
      handleModel(res.result[0]._id);
      form.setFieldsValue({ modalId: res.result[0]._id });
    }
    setDataModel(res.result);
    setDataOption([]);
    resetValue();
  };

  const handleModel = async (id: string) => {
    const res = await apiClient.option.optionControllerFindByModalIdV1(id);
    if (res.result?.[0]?._id) {
      handleOption(res.result[0]._id);
      form.setFieldsValue({ optionId: res.result[0]._id });
    }
    setDataOption(res.result);
    resetValue();
  };
  const handleOption = async (id: string) => {
    const res = await apiClient.product.productControllerFindByOptionIdV1(id);
    setDataProduct(res.result);
    resetValue();
  };

  const handleProduct = async (value: string) => {
    const selectProduct = dataProduct.find((e) => e._id === value);
    form.setFieldsValue({
      costEA: selectProduct?.cost,
      sellingPriceEA: selectProduct?.sellingPrice,
    });
    const amount = form.getFieldValue("amount");
    if (!amount) {
      form.setFieldsValue({
        amount: 1,
      });
      handleChangeAmount(1);
    } else {
      const amount = form.getFieldValue("amount");
      handleChangeAmount(amount);
    }
  };

  const removeProductTemp = (index: number) => {
    setDataOrderTemp((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      updateSummaryFields(updated);
      return updated;
    });
  };

  const handleChangeAmount = async (value: number) => {
    const costEA = form.getFieldValue("costEA");
    const sellingPriceEA = form.getFieldValue("sellingPriceEA");
    const expenses = value * costEA;
    form.setFieldsValue({
      costNet: expenses,
      sellingPriceNet: value * sellingPriceEA,
    });
  };
  const handleChangeExpenses = async (expenses: number) => {
    const sellingPriceNet = form.getFieldValue("sellingPriceNet");
    const profit = sellingPriceNet - expenses;
    form.setFieldsValue({
      profit: profit,
    });
  };
  const resetValue = () => {
    form.setFieldsValue({
      productId: undefined,
      costEA: undefined,
      sellingPriceEA: undefined,
      costNet: undefined,
      sellingPriceNet: undefined,
      amount: undefined,
      status: undefined,
      expenses: undefined,
      profit: undefined,
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
  return (
    <ModalCustom
      width={800}
      title={"Add Order"}
      isModalOpen={prop.isModalOpen}
      handleOk={() => form.submit()}
      handleCancel={prop.handleCancel}
    >
      <Form
        layout="vertical"
        onFinish={handleOk}
        form={form}
        onValuesChange={(changedValues) => {
          if (changedValues.amount) {
            handleChangeAmount(changedValues.amount);
          }
          if (changedValues.expenses) {
            handleChangeExpenses(changedValues.expenses);
          }
        }}
      >
        <div className="border px-2 py-1 rounded-lg">
          <div className="border px-3 py-3 my-5 rounded-lg">
            <div className="flex flex-col items-center justify-center gap-2 py-2 ">
              <RadioCustom
                name="materialId"
                options={dataMaterial?.map((item) => ({
                  label: item.materialName,
                  value: item._id,
                }))}
                onChange={(e) => handleMaterial(e.target.value)}
              />
              <RadioCustom
                name="modalId"
                options={dataModel?.map((item) => ({
                  label: item.modelName,
                  value: item._id,
                }))}
                onChange={(e) => handleModel(e.target.value)}
              />
              <RadioCustom
                name="optionId"
                options={dataOption?.map((item) => ({
                  label: item.optionName,
                  value: item._id,
                }))}
                onChange={(e) => handleOption(e.target.value)}
              />
            </div>

            <SelectCustom
              label="Product"
              name="productId"
              placeholder="Product"
              onChange={handleProduct}
              options={(dataProduct || []).map((item) => ({
                label: `${item.productName}`,
                value: item._id,
              }))}
              formItemProps={{
                rules: [{ required: true, message: "Please select product" }],
              }}
            />
            <InputCustom
              label="Amount"
              name="amount"
              type="number"
              placeholder="amount"
              formItemProps={{
                rules: [{ required: true, message: "Please input amount " }],
              }}
            />
            <div className="flex gap-2">
              <InputCustom
                label="Cost 1 (EA)"
                name="costEA"
                placeholder="costEA"
                className="h-30"
                type="number"
                formItemProps={{
                  rules: [
                    { required: true, message: "Please input cost (EA)" },
                  ],
                }}
              />
              <InputCustom
                label="Cost (Net)"
                name="costNet"
                placeholder="cost"
                className="bg-red-700 text-white  hover:bg-red-700 focus:bg-red-700 placeholder:text-gray-300"
                type="number"
                formItemProps={{
                  rules: [
                    { required: true, message: "Please input cost (Net)" },
                  ],
                }}
              />
            </div>
            <div className="flex gap-2">
              <InputCustom
                label="Selling Price 1 (EA)"
                name="sellingPriceEA"
                type="number"
                placeholder="selling price EA"
                formItemProps={{
                  rules: [
                    {
                      required: true,
                      message: "Please input selling price (EA)",
                    },
                  ],
                }}
              />
              <InputCustom
                label="Selling Price (Net)"
                name="sellingPriceNet"
                type="number"
                className="bg-green-700 text-white hover:bg-green-700 focus:bg-green-700  placeholder:text-gray-300"
                placeholder="selling price "
                formItemProps={{
                  rules: [
                    {
                      required: true,
                      message: "Please input selling price (Net)",
                    },
                  ],
                }}
              />
            </div>
            <div className="text-center">
              <ButtonCustom type="dashed" onClick={() => form.submit()}>
                <span className="px-5 "> + Add Item</span>
              </ButtonCustom>
            </div>
          </div>
          <SelectCustom
            label="Platform"
            name="platform"
            placeholder="platform"
            options={[
              { label: "asdfasdfasdfsad", value: "SHOPEE" },
              { label: "Lazvzxcvzxcvzxcvada", value: "LAZADA" },
              { label: "Othzxcvxzcvxczer", value: "Other" },
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
          <div className="w-[300px] px-10 py-10">
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
    </ModalCustom>
  );
};
export default ModalOrder;
