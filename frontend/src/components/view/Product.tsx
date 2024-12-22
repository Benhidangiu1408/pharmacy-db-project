import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./View.css";
import useProducts from "../../hooks/useProducts";
import { Product } from "../../entities/product";
import useUserStore from "../../current_data/user";
import JsonTable from "./jsonTable"; // Import the new table component
import { FaSearch } from "react-icons/fa";

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
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

// --- Main Component ---
const ProductView: React.FC = () => {
  const { isLoading, isError, data, error } = useProducts();
  const products = data ? data.products : [];
  // const nameRef = useRef<HTMLInputElement>(null);
  // const categoryRef = useRef<HTMLInputElement>(null);
  // const quantityRef = useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products && Array.isArray(products) && products.length>0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const searchKeywords = lowerCaseSearchTerm.split(" ").filter(keyword => keyword.trim() !== "");
      var results
      if (searchKeywords.length > 0) {
        results = products.filter((product) =>
          searchKeywords.some(keyword => {
            if (!keyword) {
              return false;
            }
            if (!isNaN(Number(keyword))) {
              return product.id === Number(keyword);
            }
            return (
              product.name.toLowerCase().includes(keyword) ||
              product.description.toLowerCase().includes(keyword) ||
              product.product_type.toLowerCase().includes(keyword) ||
              product.origin.toLowerCase().includes(keyword) ||
              product.tag.toLowerCase().includes(keyword)
            );
          })
        );
        console.log("results la ",results)
        setFilteredProducts(results);
      } else {
        setFilteredProducts(products);
      }
    }  else {
    }
  }, [searchTerm, products]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { info } = useUserStore();
  const role = info.jobType;

  const generateId = () => {
    if (products && products.length > 0) {
      return Math.max(...products.map((p) => p.id)) + 1;
    } else {
      return 1;
    }
  };

  const handleSubmit = async (productId:number) => {
    // e.preventDefault();

    // Lấy giá trị từ các ref
    // const newPass = nameRef.current?.value || "";

    console.log({productId})
    fetch(`/api/v2/disableProduct/${productId.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: ,
    })
    
  };

  var handleEditProduct;
  var handleDeleteProduct;
  var handleToggleRestock;
  if (role == "product manager" || role == "admin") {
    handleEditProduct = (product: Product) => {
      navigate("/homepage/productdetail", { state: { product: product } });
    };
    // handleDeleteProduct = (productId: number) => {
    //   navigate("/delete/product", { state: { int: productId } });
    // };

    handleDeleteProduct = (productId: number) => (
      
      handleSubmit(productId)
    );
      // handleToggleRestock
  }


  console.log("This is a", role);
  const addProduct = () => navigate("/homepage/CreateProducts");

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="title">Sản Phẩm</h1>

      <motion.div className="search-bar-container" variants={formVariants}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <motion.i className="search-icon" animate={{ scale: 1.2, rotate: 360 }} transition={{ repeat: 0, duration: 0.5 }}>
          <FaSearch/>
        </motion.i>
      </motion.div>

      <button className="toggle-form-button" onClick={() => addProduct()}>
        Thêm Sản Phẩm
      </button>

      <JsonTable
        data={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </motion.div>
  );
};

export default ProductView;