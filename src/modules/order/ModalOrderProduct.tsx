"use client";
import apiClient from "@/api";
import {
  GetMaterialResultDto,
  GetModelResultDto,
  GetOptionResultDto,
  ProductResultGetDto,
} from "@/api/generated";
import InputCustom from "@/components/Input/InputCustom";
import ModalCustom from "@/components/Modal/ModalCustom";
import RadioCustom from "@/components/Radio/RadioCustom";
import SelectCustom from "@/components/Slect/SelectCustom";
import { OrderTempItem } from "@/types/order";
import { Form } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ModalOrderProductType = {
  isModalOpen: boolean;
  handleCancel: () => void;
  setDataOrderTemp: Dispatch<SetStateAction<OrderTempItem[]>>;
  updateSummaryFields: (data: OrderTempItem[]) => void;
};

const ModalOrderProduct = (prop: ModalOrderProductType) => {
  const [dataMaterial, setDataMaterial] = useState<GetMaterialResultDto[]>([]);
  const [dataModel, setDataModel] = useState<GetModelResultDto[]>([]);
  const [dataOption, setDataOption] = useState<GetOptionResultDto[]>([]);
  const [dataProduct, setDataProduct] = useState<ProductResultGetDto[]>([]);

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
      productName: productLabel ?? "",
      materialName: materialLabel ?? "",
      modalName: modelLabel ?? "",
      optionName: optionLabel ?? "",
    };

    prop.setDataOrderTemp((prev) => {
      const updated = [...prev, dataTemp];
      prop.updateSummaryFields(updated);
      prop.handleCancel();
      return updated;
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
          </div>
        </div>
      </Form>
    </ModalCustom>
  );
};
export default ModalOrderProduct;
