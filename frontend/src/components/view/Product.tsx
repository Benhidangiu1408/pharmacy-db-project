import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheck } from 'react-icons/fa';
import JsonTable from './jsonTable'; // Import the table component
import './Product.css';

// --- Data Structure ---
interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  restock: boolean;
}

// --- Initial Dummy Data ---
const initialProducts: Product[] = [
  { id: 1000, name: 'Aspirin', category: 'Pain Relief', quantity: 50, restock: false },
  { id: 2, name: 'Band-Aids', category: 'First Aid', quantity: 10, restock: true },
  { id: 3, name: 'Vitamin C', category: 'Vitamins', quantity: 80, restock: false },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
};

const formVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
};


// --- Main Component ---
const ProductInput: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  const generateId = () => {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  };

  const clearForm = () => {
    if (nameRef.current) nameRef.current.value = '';
    if (categoryRef.current) categoryRef.current.value = '';
    if (quantityRef.current) quantityRef.current.value = '';
    setEditProduct(null);
  };

  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct: Product = {
      id: editProduct ? editProduct.id : generateId(),
      name: nameRef.current?.value || '',
      category: categoryRef.current?.value || '',
      quantity: parseInt(quantityRef.current?.value || '0'),
      restock: false,
    };

    if (editProduct) {
      setProducts(products.map(p => (p.id === editProduct.id ? newProduct : p)));
    } else {
      setProducts([...products, newProduct]);
    }
    clearForm();
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);

    // Pre-fill form fields using refs (alternative to two-way binding)
    if (nameRef.current) nameRef.current.value = product.name;
    if (categoryRef.current) categoryRef.current.value = product.category;
    if (quantityRef.current) quantityRef.current.value = product.quantity.toString();
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleToggleRestock = (productId: number) => {
    setProducts(products.map(p => (p.id === productId ? { ...p, restock: !p.restock } : p)));
  };

  const addProduct = () => {

  };

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="title">Drugstore Product Inventory</h1>

      <button className="toggle-form-button" onClick={() => addProduct()}>
        Add New Product
      </button>

        

      {/* Using the JsonTable component */}
      <JsonTable
        data={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </motion.div>
  );
};

export default ProductInput;