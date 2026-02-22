import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchAll", async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return response.data;
});

export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return id;
});

export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productData) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, productData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return response.data;
});

export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async ({ id, productData }) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    });
    return response.data;
});

/*
 * NOTE: For edit page we often need a single product fetch. 
 * If the API supports it, we should add it. 
 * Assuming `api/products/:id` or `api/admin/products/:id` exists?
 * Usually for admin editing, we might use the public get or a specific admin get. 
 * I will assume referencing `fetchProductById` implies a need for it.
 * But wait, `fetchProductById` usually is in the public `productsSlice`.
 * However, the user's `EditProductPage` imports it from `adminProductSlice`.
 * So I MUST define it here or alias it.
 * I will define it here.
 */
export const fetchProductById = createAsyncThunk("adminProducts/fetchProductById", async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
    return response.data;
});

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: { products: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) state.products[index] = action.payload;
            });
    },
});

export default adminProductSlice.reducer;