import { useDispatch } from "react-redux";
import { RiDeleteBin3Line } from "react-icons/ri";
import { removeFromCart, updateCartItemQuantity } from "../../redux/Slices/cartSlice";



const CartContents = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

   
        const handleQuantityChange = (productId, quantity, size, color, delta) => {
            const newQuantity = quantity + delta;
            if (newQuantity >= 1) {
                dispatch(
                    updateCartItemQuantity({
                        productId: productId,
                        quantity: newQuantity,
                        guestId,
                        userId,
                        size,
                        color,
                    })
                );
            }
        };

        const handleRemoveItem = (productId, size, color) => {
            dispatch(
                removeFromCart({
                    productId: productId,
                    guestId,
                    userId,
                    size,
                    color,
                })
            );
        };
  

    return (
        <div>
            {cart.products.map((product, index) => (
                <div
                    key={index}
                    className="flex items-start justify-between py-4 border-b"
                >
                    <div className="flex items-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-24 object-cover mr-4 rounded"
                        />
                        <div>
                            <h3 className="font-semibold text-sm">{product.name}</h3>
                            <p className="text-xs text-gray-500">
                                Size: {product.size} | Color: {product.color}
                            </p>
                            <div className="flex items-center mt-2 border rounded w-fit">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(
                                            product.productId,
                                            product.quantity,
                                            product.size,
                                            product.color,
                                            -1
                                        )
                                    }
                                    className="px-2 py-1 bg-gray-100 text-lg hover:bg-gray-200"
                                >
                                    -
                                </button>
                                <span className="px-4 text-sm font-medium">
                                    {product.quantity}
                                </span>
                                <button
                                    onClick={() =>
                                        handleQuantityChange(
                                            product.productId,
                                            product.quantity,
                                            product.size,
                                            product.color,
                                            1
                                        )
                                    }
                                    className="px-2 py-1 bg-gray-100 text-lg hover:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-24">
                        <p className="font-medium text-sm">
                            ${(product.price * product.quantity).toLocaleString()}
                        </p>
                        <button
                            onClick={() =>
                                handleRemoveItem(product.productId, product.size, product.color,-1)
                            }
                            className="text-red-600 hover:text-red-800"
                        >
                            <RiDeleteBin3Line className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContents;