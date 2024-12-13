import React from 'react'
import useVouchers from '../../hooks/useVouchers';

const OrderDetail = () => {
  const { data, isLoading, error } = useVouchers();
  const shippersData = data?.vouchers;
    console.log(shippersData);
  return (
    // <div>OrderDetail</div>
    <ul>
   {shippersData?.map((shipper) => (
          <li key={shipper.id}>
            {shipper.id}. {shipper.name}
          </li>
        )) || <p>No shippers available.</p>}
      </ul>
  )
}

export default OrderDetail