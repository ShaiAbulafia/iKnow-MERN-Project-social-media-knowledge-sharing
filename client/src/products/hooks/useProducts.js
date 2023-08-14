import { useState, useCallback, useMemo, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import normalizeProduct from "../helpers/normalization/normalizeProduct";
import {
  changeWishStatus,
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../services/productApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";

const useProducts = () => {
  const { user } = useUser();
  const [products, setProducts] = useState();
  const [product, setProduct] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilter] = useState(null);
  const [searchParamas] = useSearchParams();

  useAxios();
  const snack = useSnack();
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchParamas.get("q") ?? "");
  }, [searchParamas]);

  useEffect(() => {
    if (products) {
      setFilter(
        products.filter(
          (product) =>
            product.title.includes(query) ||
            product.subtitle.includes(query) ||
            product.category.includes(query) ||
            product.brand.includes(query) ||
            String(product.productNumber).includes(query)
        )
      );
    }
  }, [products, query]);

  const requestStatus = useCallback(
    (loading, errorMessages, products, product = null) => {
      setLoading(loading);
      setError(errorMessages);
      setProducts(products);
      setProduct(product);
    },
    []
  );

  const handleGetProducts = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      requestStatus(false, null, products);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [requestStatus]);

  const handleGetProduct = useCallback(
    async (productId) => {
      try {
        setLoading(true);
        const product = await getProduct(productId);
        requestStatus(false, null, null, product);
        return product;
      } catch (error) {
        requestStatus(false, error, null, null);
      }
    },
    [requestStatus]
  );

  const handleGetWishProducts = useCallback(async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      const wishProducts = products.filter(
        (product) => !!product.wishes.find((id) => id === user._id)
      );
      requestStatus(false, null, wishProducts);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [requestStatus]);

  const handleCreateProduct = useCallback(
    async (productFromClient) => {
      try {
        setLoading(true);
        const normalizedProduct = normalizeProduct(productFromClient);
        const product = await createProduct(normalizedProduct);
        snack("success", "Created product successfully");
        navigate(ROUTES.PRODUCTS);
        requestStatus(false, null, null, product);
      } catch (error) {
        requestStatus(false, error, null, null);
      }
    },
    [navigate, requestStatus, snack]
  );

  const handleUpdateProduct = useCallback(
    async (productId, productFromClient) => {
      try {
        setLoading(true);
        const product = await editProduct(productId, productFromClient);
        requestStatus(false, null, null, product);
        snack("success", "Updated product successfully");
        navigate(ROUTES.PRODUCTS);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [navigate, requestStatus, snack]
  );

  const handleDeleteProduct = useCallback(
    async (productId) => {
      try {
        setLoading(true);
        await deleteProduct(productId);
        snack("success", "Deleted product successfully");
        requestStatus(false, null, null);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus, snack]
  );

  const handleWishProduct = useCallback(
    async (productId) => {
      try {
        setLoading(true);
        const product = await changeWishStatus(productId);
        const products = await getProducts();
        requestStatus(false, null, products, product);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );

  const handleChangeProductNumber = useCallback(
    async (productNum, productId) => {
      try {
        let isFree = true;
        const products = await getProducts();
        for (const index in products) {
          if (products[index].productNumber === Number(productNum)) {
            isFree = false;
          }
        }
        if (isFree) {
          const product = await getProduct(productId);
          const newProduct = {
            ...normalizeProduct({ ...product }),
            image: { url: product.image.url, alt: product.image.alt },
            productNumber: Number(productNum),
          };
          const retProduct = await editProduct(productId, newProduct);
          requestStatus(false, null, products, retProduct);
          return snack("success", "Product number changed");
        }
        snack("error", "Product number already taken");
      } catch (error) {}
    },
    [requestStatus, snack]
  );

  const valueProduct = useMemo(() => {
    return {
      isLoading,
      error,
      products,
      product,
      filteredProducts,
    };
  }, [isLoading, error, products, product, filteredProducts]);

  return {
    valueProduct,
    handleCreateProduct,
    handleDeleteProduct,
    handleGetProduct,
    handleGetProducts,
    handleWishProduct,
    handleUpdateProduct,
    handleGetWishProducts,
    handleChangeProductNumber,
  };
};

export default useProducts;
