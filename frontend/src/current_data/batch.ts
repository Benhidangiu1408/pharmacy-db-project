import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface product {
  id: number;
  name: string;
  quantity: number;
  type:string;

}
export interface batchStore {
  batches: product[];
  addBatch: (product: product) => void;
  getAllBatches: () => product[];
  logoutBatches:()=> void
}
const useBatchStore = create<batchStore>()(
  persist(
    (set, get) => ({
      batches: [],

    //   addorder: (product) =>
    //     set((state) => ({
    //       orders: [...state.orders, product],
    //     })),
        addBatch: (product) =>
            set((state) => {
              const existingProductIndex = state.batches.findIndex((p) => p.id === product.id);
          
            //   if (existingProductIndex !== -1) {
            //     // Product exists, update quantity
            //     const updatedOrders = [...state.batches];
            //     updatedOrders[existingProductIndex].quantity = product.quantity;
          
            //     // If quantity becomes 0, remove the product
            //     if (updatedOrders[existingProductIndex].quantity <= 0) {
            //       updatedOrders.splice(existingProductIndex, 1);
            //     }
          
            //     return { batches: updatedOrders };
            //   } else {
            //     // Product does not exist, add it if quantity > 0
            //     return product.quantity > 0
            //       ? { orders: [...state.batches, product] }
            //       : { orders: state.batches };
            //   }
              return product.quantity > 0
                  ? { batches: [...state.batches, product] }
                  : { batches: state.batches };
            }),
          
        getAllBatches: () => get().batches,
        logoutBatches: () =>
                set(() => ({
                    batches: []
                })),
    }),
    { name: "batch-store" }
  )
);

export default useBatchStore;
