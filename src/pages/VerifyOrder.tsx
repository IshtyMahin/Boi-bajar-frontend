
import { Link, useSearchParams } from "react-router-dom";

import { CheckCircle, AlertCircle } from "lucide-react";
import { useVerifyOrderQuery } from "../redux/features/order/orderApi";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

export default function OrderVerification() {
  const [searchParams] = useSearchParams();

  const { isLoading, data } = useVerifyOrderQuery(
    searchParams.get("order_id"),
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const orderData: OrderData = data?.data?.[0];

  return isLoading ? (
     <h1>Loading....</h1>
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold">Order ID:</div>
              <div>{orderData?.order_id}</div>
              <div className="font-semibold">Amount:</div>
              <div>
                {orderData?.currency} {orderData?.amount?.toFixed(2)}
              </div>
              <div className="font-semibold">Status:</div>
              <div>
                <span
                  className={`badge ${
                    orderData?.bank_status === "Success"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {orderData?.bank_status}
                </span>
              </div>
              <div className="font-semibold">Date:</div>
              <div>{new Date(orderData?.date_time)?.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Payment Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold">Method:</div>
              <div>{orderData?.method}</div>
              <div className="font-semibold">Transaction ID:</div>
              <div>{orderData?.bank_trx_id}</div>
              <div className="font-semibold">Invoice No:</div>
              <div>{orderData?.invoice_no}</div>
              <div className="font-semibold">SP Code:</div>
              <div>{orderData?.sp_code}</div>
              <div className="font-semibold">SP Message:</div>
              <div>{orderData?.sp_message}</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Customer Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold">Name:</div>
              <div>{orderData?.name}</div>
              <div className="font-semibold">Email:</div>
              <div>{orderData?.email}</div>
              <div className="font-semibold">Phone:</div>
              <div>{orderData?.phone_no}</div>
              <div className="font-semibold">Address:</div>
              <div>{orderData?.address}</div>
              <div className="font-semibold">City:</div>
              <div>{orderData?.city}</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Verification Status</h2>
            <div className="flex items-center gap-2">
              {orderData?.is_verify === 1 ? (
                <>
                  <CheckCircle className="text-green-500" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-yellow-500" />
                  <span>Not Verified</span>
                </>
              )}
            </div>
            <div className="card-actions justify-end mt-4">
              <Link to="/orders">
                <button className="btn btn-primary w-full">View Orders</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
