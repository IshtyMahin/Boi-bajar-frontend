import { useGetOrdersQuery } from "../redux/features/order/orderApi";

export interface Transaction {
  id: string;
  transactionStatus: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  userStatus: string;
}

export interface Product {
  _id: string;
  name: string;
  authors: string[];
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  user: User;
  product?: Product;
  totalPrice: number;
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  transaction?: Transaction;
  __v: number;
}

export default function OrderDetails() {
  const { isLoading, data, error } = useGetOrdersQuery({}) as {
    isLoading: boolean;
    data: { data: Order[] };
    error: {
      status?: string | number;
      data?: { message?: string };
    };
  };

  console.log("Data:", data);
  console.log("Error:", error);

  const orderData: Order[] = data?.data || [];
  console.log(orderData);

  const renderError = () => {
    if (error) {
      if ("status" in error && error.status === "FETCH_ERROR") {
        return (
          <div className="text-red-500 text-center">
            Network Error: Unable to connect to the server.
          </div>
        );
      }

      if ("status" in error && typeof error.status === "number") {
        if (error.status === 404) {
          return (
            <div className="text-yellow-500 text-center">No orders found.</div>
          );
        }
        return (
          <div className="text-red-500 text-center">
            Server Error: {error.status}
          </div>
        );
      }

      if (
        "data" in error &&
        error.data &&
        typeof error?.data?.message === "string"
      ) {
        return (
          <div className="text-red-500 text-center">
            Error: {error.data.message}
          </div>
        );
      }

      return (
        <div className="text-red-500 text-center">
          An unexpected error occurred.
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Order Details</h1>
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl p-6 animate-pulse"
            >
              {/* Skeleton Loading */}
            </div>
          ))}
        </div>
      ) : error ? (
        renderError()
      ) : (
        <div className="space-y-6">
          {orderData.map((order) => (
            <div
              key={order._id}
              className="card bg-base-100 shadow-xl p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Customer Information
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {order.user.name}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {order.user.email}
                    </p>
                    <p>
                      <span className="font-medium">Address:</span>{" "}
                      {order.user.address}, {order.user.city}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {order.user.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Total Price:</span> $
                      {order.totalPrice.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
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
                    </p>
                    <p>
                      <span className="font-medium">Order Date:</span>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Products</h3>
                <ul className="space-y-2">
                  (
                  <li className="bg-base-200 p-3 rounded-lg">
                    <p>
                      <span className="font-medium">Product Name:</span>{" "}
                      {order.product?.name}
                    </p>
                    <p>
                      <span className="font-medium">Quantity:</span>{" "}
                      {order?.quantity}
                    </p>
                    <p>
                      <span className="font-medium">Price:</span> $
                      {order.product?.price.toFixed(2)}
                    </p>
                  </li>
                  )
                </ul>
              </div>

              {order.transaction && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Transaction Details
                  </h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Transaction ID:</span>{" "}
                      {order.transaction.id}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`badge ${
                          order.transaction.transactionStatus === "Success"
                            ? "badge-success"
                            : order.transaction.transactionStatus === "Failed"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {order.transaction.transactionStatus}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
