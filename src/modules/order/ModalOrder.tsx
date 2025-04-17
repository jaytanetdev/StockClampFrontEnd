"use client";
import apiClient from "@/api";
import {
  ApiError,
  CreateOrderDto,
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
import { showNotification } from "@/utils/notification";
import { Form } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ModalOrderType = {
  isModalOpen: boolean;
  handleCancel: () => void;
  setDataOrder: Dispatch<SetStateAction<GetOrderResultDto[]>>;
};

const ModalOrder = (prop: ModalOrderType) => {
  const [dataMaterial, setDataMaterial] = useState<GetMaterialResultDto[]>([]);
  const [dataModel, setDataModel] = useState<GetModelResultDto[]>([]);
  const [dataOption, setDataOption] = useState<GetOptionResultDto[]>([]);
  const [dataProduct, setDataProduct] = useState<ProductResultGetDto[]>([]);
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchMaterial = async () => {
      const res = await apiClient.material.materialControllerFindAllV1();
      setDataMaterial(res.result);
      if (res.result?.[0]?._id) {
        handleMaterial(res.result[0]._id);
        setActiveMaterial(res.result[0]._id);
      }
    };
    if (prop.isModalOpen) {
      fetchMaterial();
    }
  }, [prop.isModalOpen]);

  const handleOk = async (data: CreateOrderDto) => {
    try {
      const res = await apiClient.order.orderControllerCreateV1({
        productId: data.productId,
        amount: data.amount,
        status: data.status,
        cost: data.cost,
        sellingPrice: data.sellingPrice,
        expenses: data.expenses,
        profit: data.profit,
      });
      console.log("res", res);
      prop?.setDataOrder((prev) => [...prev, res]);
      showNotification("success", "Success", "บันทึกรายการสำเร็จ");
    } catch (e) {
      if (e instanceof ApiError) {
        showNotification("error", "Error", e.body?.message);
      }
    }
  };
  const resetValue = () => {
    form.setFieldsValue({
      product: undefined,
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

  const handleMaterial = async (id: string) => {
    setActiveMaterial(id);
    const res = await apiClient.model.modelControllerFindByMaterialIdV1(id);
    if (res.result?.[0]?._id) {
      handleModel(res.result[0]._id);
      setActiveModel(res.result[0]._id);
    }
    setDataModel(res.result);
    setDataOption([]);
    resetValue();
  };
  const handleModel = async (id: string) => {
    setActiveModel(id);
    const res = await apiClient.option.optionControllerFindByModalIdV1(id);
    if (res.result?.[0]?._id) {
      handleOption(res.result[0]._id);
      setActiveOption(res.result[0]._id);
    }
    setDataOption(res.result);
    resetValue();
  };
  const handleOption = async (id: string) => {
    setActiveOption(id);
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
    }else{
      const amount = form.getFieldValue("amount");
      handleChangeAmount(amount);
    }
  };
  const handleChangeAmount = async (value: number) => {
    const costEA = form.getFieldValue("costEA");
    const sellingPriceEA = form.getFieldValue("sellingPriceEA");
    const expenses = value * costEA;
    const profit = value * sellingPriceEA - value * costEA;
    form.setFieldsValue({
      costNet: expenses,
      sellingPriceNet: value * sellingPriceEA,
      expenses: expenses,
      profit: profit,
    });
  };
  const handleChangeExpenses = async (expenses: number) => {
    const sellingPriceNet = form.getFieldValue("sellingPriceNet");
    const profit = sellingPriceNet - expenses;
    form.setFieldsValue({
      profit: profit,
    });
  };

  return (
    <ModalCustom
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
        <div className="flex gap-2">
          {dataMaterial?.map((item, index) => (
            <div key={index}>
              <ButtonCustom
                type="primary"
                className={`border border-blue-950 ${
                  activeMaterial === item._id
                    ? "bg-blue-950 text-white "
                    : "bg-white text-blue-950"
                }`}
                onClick={() => handleMaterial(item._id)}
              >
                {item.materialName}
              </ButtonCustom>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {dataModel?.map((item, index) => (
            <div key={index}>
              <ButtonCustom
                type="primary"
                className={`border border-blue-950 ${
                  activeModel === item._id
                    ? "bg-red-700 text-white "
                    : "bg-white text-blue-950"
                }`}
                onClick={() => handleModel(item._id)}
              >
                {item.modelName}
              </ButtonCustom>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {dataOption?.map((item, index) => (
            <div key={index}>
              <ButtonCustom
                type="primary"
                className={`border border-blue-950 ${
                  activeOption === item._id
                    ? "bg-green-700 text-white "
                    : "bg-white text-blue-950"
                }`}
                onClick={() => handleOption(item._id)}
              >
                {item.optionName}
              </ButtonCustom>
            </div>
          ))}
        </div>
        <SelectCustom
          label="Product"
          name="product"
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
            type="number"
            formItemProps={{
              rules: [{ required: true, message: "Please input cost (EA)" }],
            }}
          />
          <InputCustom
            label="Cost (Net)"
            name="costNet"
            placeholder="cost"
            className="bg-red-700 text-white  hover:bg-red-700 focus:bg-red-700 placeholder:text-gray-300"
            type="number"
            formItemProps={{
              rules: [{ required: true, message: "Please input cost (Net)" }],
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
                { required: true, message: "Please input selling price (EA)" },
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
                { required: true, message: "Please input selling price (Net)" },
              ],
            }}
          />
        </div>

        {/* <InputCustom
          label="Status"
          name="status"
          placeholder="status"
          formItemProps={{
            rules: [{ required: true, message: "Please input status" }],
          }}
        /> */}

        {/* <InputCustom
          label="Expenses"
          name="expenses"
          type="number"
          placeholder="expenses"
          formItemProps={{
            rules: [{ required: true, message: "Please input expenses" }],
          }}
        />
        <InputCustom
          label="Profit"
          name="profit"
          type="number"
          placeholder="profit"
          formItemProps={{
            rules: [{ required: true, message: "Please input profit" }],
          }}
        /> */}
      </Form>
    </ModalCustom>
  );
};
export default ModalOrder;
