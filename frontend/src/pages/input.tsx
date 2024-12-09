import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheck } from 'react-icons/fa'; // For icons
import './input.css'; // Separate CSS file for styling

// --- Data Structure (can be expanded with more fields) ---
interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  restock: boolean;
}

// --- Initial Dummy Data ---
const initialProducts: Product[] = [
  { id: 1, name: 'Aspirin', category: 'Pain Relief', quantity: 50, restock: false },
  { id: 2, name: 'Band-Aids', category: 'First Aid', quantity: 10, restock: true },
  { id: 3, name: 'Vitamin C', category: 'Vitamins', quantity: 80, restock: false },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation of children
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
const InputProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null); // Product being edited

  // Refs for form inputs
  const nameRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  // --- Utility Functions ---
  const generateId = () => {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  };

  const clearForm = () => {
    if (nameRef.current) nameRef.current.value = '';
    if (categoryRef.current) categoryRef.current.value = '';
    if (quantityRef.current) quantityRef.current.value = '';
    setEditProduct(null);
  };

  // --- CRUD Operations ---
  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct: Product = {
      id: editProduct ? editProduct.id : generateId(),
      name: nameRef.current?.value || '',
      category: categoryRef.current?.value || '',
      quantity: parseInt(quantityRef.current?.value || '0'),
      restock: false, // Default to false
    };

    if (editProduct) {
      // Modify existing product
      setProducts(products.map(p => (p.id === editProduct.id ? newProduct : p)));
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }

    setShowForm(false);
    clearForm();
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);

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

  // --- Effects ---
  useEffect(() => {
    // Focus on the name input when the form is shown
    if (showForm && nameRef.current) {
      nameRef.current.focus();
    }
  }, [showForm]);

  // --- JSX Rendering ---
  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="title">Drugstore Product Inventory</h1>

      <AnimatePresence>
        {showForm && (
          <motion.form
            key="form"
            className="product-form"
            onSubmit={handleAddProduct}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <input type="text" placeholder="Product Name" ref={nameRef} required />
            <input type="text" placeholder="Category" ref={categoryRef} required />
            <input type="number" placeholder="Quantity" ref={quantityRef} required min="0" />
            <button type="submit" className="add-button">
              {editProduct ? 'Save Changes' : 'Add Product'} <FaPlus />
            </button>
            <button type="button" className="cancel-button" onClick={() => { setShowForm(false); clearForm(); }}>
              Cancel
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Product'}
      </button>

      <motion.ul className="product-list">
        <AnimatePresence>
          {products.map(product => (
            <motion.li
              key={product.id}
              className={`product-item ${product.restock ? 'restock' : ''}`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="product-category">{product.category}</span>
                <span className="product-quantity">Qty: {product.quantity}</span>
              </div>
              <div className="product-actions">
                <button
                  className={`restock-button ${product.restock ? 'active' : ''}`}
                  onClick={() => handleToggleRestock(product.id)}
                >
                  {product.restock ? <FaCheck /> : <FaExclamationTriangle />}
                </button>
                <button className="edit-button" onClick={() => handleEditProduct(product)}>
                  <FaEdit />
                </button>
                <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>
                  <FaTrash />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
};

export default InputProduct;