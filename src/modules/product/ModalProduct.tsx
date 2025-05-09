"use client";
import apiClient from "@/api";
import {
  ApiError,
  CreateProductDto,
  GetOptionResultDto,
  ProductResultDto,
} from "@/api/generated";
import InputCustom from "@/components/Input/InputCustom";
import InputNumberCustom from "@/components/Input/InputNumberCustom";
import ModalCustom from "@/components/Modal/ModalCustom";
import SelectCustom from "@/components/Slect/SelectCustom";
import { showNotification } from "@/utils/notification";
import { Form } from "antd";
import { Dispatch, SetStateAction, useTransition } from "react";

type ModalProductType = {
  dataOption: GetOptionResultDto[];
  isModalOpen: boolean;
  handleCancel: () => void;
  setDataProduct: Dispatch<SetStateAction<ProductResultDto[]>>;
};

const ModalProduct = (prop: ModalProductType) => {
  const [pendingProduct, startFetchProduct] = useTransition();
  const [form] = Form.useForm();

  const handleOk = async (data: CreateProductDto) => {
    const submitProduct = async () => {
      try {
        const res = await apiClient.product.productControllerCreateV1({
          productName: data.productName,
          size: data.size,
          group: data.group,
          cost: data.cost,
          sellingPrice: data.sellingPrice,
          optionId: data.optionId,
        });
        prop?.setDataProduct((prev) => [...prev, res.result]);
        showNotification("success", "Success", "บันทึกสินค้าสำเร็จ");
      } catch (e) {
        if (e instanceof ApiError) {
          showNotification("error", "Error", e.body?.message);
        }
      }
    };
    startFetchProduct(async () => {
      await submitProduct();
    });
  };

  return (
    <ModalCustom
      title={"Add Product"}
      isModalOpen={prop.isModalOpen}
      handleOk={() => form.submit()}
      handleCancel={prop.handleCancel}
      confirmLoading={pendingProduct}
      
    >
      <Form layout="vertical" onFinish={handleOk} form={form}>
        <div className="border w-full py-10 px-5">
          <SelectCustom
            label="Option"
            name="optionId"
            placeholder="option"
            options={(prop?.dataOption || []).map((item) => ({
              label: `${item.modelId?.materialId.materialName} - ${item.optionName} - ${item.modelId?.modelName}`,
              value: item._id,
            }))}
            formItemProps={{
              rules: [{ required: true, message: "Please select option" }],
            }}
          />

          <InputCustom
            label="Product Name"
            name="productName"
            placeholder="product name"
            formItemProps={{
              rules: [{ required: true, message: "Please input product name" }],
            }}
          />
          <InputCustom
            label="Group"
            name="group"
            placeholder="group"
            formItemProps={{
              rules: [{ required: true, message: "Please input group" }],
            }}
          />
          <InputCustom
            label="Size"
            name="size"
            placeholder="size"
            formItemProps={{
              rules: [{ required: true, message: "Please input size" }],
            }}
          />
          <InputNumberCustom
            label="Cost"
            name="cost"
            placeholder="cost"
            addonAfter={<span>Bath</span>}
            className="w-full"
            formItemProps={{
              rules: [{ required: true, message: "Please input cost" }],
            }}
          />

          <InputNumberCustom
            label="Selling Price"
            name="sellingPrice"
            placeholder="selling price"
            addonAfter={<span>Bath</span>}
            className="w-full"
            formItemProps={{
              rules: [
                { required: true, message: "Please input selling price" },
              ],
            }}
          />
        </div>
      </Form>
    </ModalCustom>
  );
};
export default ModalProduct;
