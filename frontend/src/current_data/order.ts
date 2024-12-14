import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface product {
  id: number;
  name: string;
  quantity: number;
  price:number;

}
export interface orderStore {
  orders: product[];
  addorder: (product: product) => void;
  getAllorders: () => product[];
  logoutOrders:()=> void
}
const useorderStore = create<orderStore>()(
  persist(
    (set, get) => ({
      orders: [],

    //   addorder: (product) =>
    //     set((state) => ({
    //       orders: [...state.orders, product],
    //     })),
        addorder: (product) =>
            set((state) => {
              const existingProductIndex = state.orders.findIndex((p) => p.id === product.id);
          
            //   if (existingProductIndex !== -1) {
            //     // Product exists, update quantity
            //     const updatedOrders = [...state.orders];
            //     updatedOrders[existingProductIndex].quantity = product.quantity;
          
            //     // If quantity becomes 0, remove the product
            //     if (updatedOrders[existingProductIndex].quantity <= 0) {
            //       updatedOrders.splice(existingProductIndex, 1);
            //     }
          
            //     return { orders: updatedOrders };
            //   } else {
            //     // Product does not exist, add it if quantity > 0
            //     return product.quantity > 0
            //       ? { orders: [...state.orders, product] }
            //       : { orders: state.orders };
            //   }
              return product.quantity > 0
                  ? { orders: [...state.orders, product] }
                  : { orders: state.orders };
            }),
          
      getAllorders: () => get().orders,
      logoutOrders: () =>
        set(() => ({
          orders: []
        })),
    }),
    { name: "order-store" }
  )
);

export default useorderStore;
