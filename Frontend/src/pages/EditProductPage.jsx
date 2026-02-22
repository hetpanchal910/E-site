import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../redux/Slices/adminProductSlice";
import axios from "axios";

const EditProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get single product data from Redux
    const { selectedProduct, loading, error } = useSelector((state) => state.adminProducts);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [],
    });

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setUploading(true);
        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData);
                return { url: res.data.url, altText: file.name };
            });

            const uploadedImages = await Promise.all(uploadPromises);
            setProductData((prev) => ({
                ...prev,
                images: [...prev.images, ...uploadedImages],
            }));
            setUploading(false);
        } catch (error) {
            console.error("Image upload failed", error);
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id, productData }));
        navigate("/admin/products");
    };

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white">
            <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-semibold mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-2">Count In Stock</label>
                        <input
                            type="number"
                            name="countInStock"
                            value={productData.countInStock}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-semibold mb-2">Upload Images</label>
                    <input type="file" multiple onChange={handleImageUpload} />
                    {uploading && <p>Uploading...</p>}
                    <div className="flex space-x-4 mt-4">
                        {productData.images && productData.images.map((img, index) => (
                            <img
                                key={index}
                                src={img.url}
                                alt={img.altText}
                                className="w-24 h-24 object-cover border rounded"
                            />
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;