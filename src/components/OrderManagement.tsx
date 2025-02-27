/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useUpdateOrderStatusMutation,
} from "../redux/features/order/orderApi";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-end p-4">
      <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderManagement = () => {
  const { data, isLoading, error } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateOrder, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  interface Order {
    _id: string;
    user: { name: string };
    products: { product: string; quantity: number }[];
    product?: { name: string };
    quantity?: number;
    totalPrice: number;
    status: string;
  }

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  const orders = data?.data || [];

  const handleUpdateOrder = async (updatedOrder:any) => {
    try {
      console.log(updatedOrder._id);

      await updateOrder({
        orderId: updatedOrder._id,
        status: updatedOrder.status,
      }).unwrap();
      toast.success("Order updated successfully!");
      setSelectedOrder(null);
    } catch (err) {
        console.log(err);
        
      toast.error("Failed to update order. Please try again.");
    }
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      await deleteOrder(orderToDelete).unwrap();
      toast.success("Order deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch (err:any) {
      toast.error("Failed to delete order. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8">
        Error fetching orders. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Orders</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order:any) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name || "N/A"}</td>
                <td>
                  {order.products ? (
                    <ul>
                      {order.products.map((product:any, index:number) => (
                        <li key={index}>
                          {product.product} (Qty: {product.quantity})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      {order.product?.name} (Qty: {order.quantity})
                    </div>
                  )}
                </td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "Pending"
                        ? "badge-warning"
                        : order.status === "Paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => setSelectedOrder(order)}
                    disabled={isUpdating || isDeleting}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => {
                      setOrderToDelete(order._id);
                      setIsDeleteModalOpen(true);
                    }}
                    disabled={isUpdating || isDeleting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-end">
          <div className="bg-gray-700 p-6 rounded-lg w-1/3 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Order</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateOrder(selectedOrder);
              }}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedOrder?.status}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="btn btn-ghost mr-2"
                  onClick={() => setSelectedOrder(null)}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteOrder}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
        isLoading={isDeleting}
      />
    </div>
  );
};

export default OrderManagement;
