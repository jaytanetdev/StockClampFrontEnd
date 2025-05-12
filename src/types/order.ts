
export type OrderTempItem = {
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