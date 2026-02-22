import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts, deleteProduct } from "../../redux/Slices/adminProductSlice";

const ProductManagement = () => {
    const dispatch = useDispatch();

    // Accessing product state from Redux
    const { products, loading, error } = useSelector((state) => state.adminProducts);

    useEffect(() => {
        // Fetch all products for the admin panel on mount
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        // Confirmation before deleting a product
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    if (loading) return <p className="text-center">Loading products...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Product Management</h2>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-3 px-6">Name</th>
                            <th className="py-3 px-6">Price</th>
                            <th className="py-3 px-6">SKU</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                        {product.name}
                                    </td>
                                    <td className="py-4 px-6">${product.price}</td>
                                    <td className="py-4 px-6">{product.sku}</td>
                                    <td className="py-4 px-6">
                                        {/* Edit Link */}
                                        <Link
                                            to={`/admin/products/${product._id}/edit`}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                                        >
                                            Edit
                                        </Link>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;