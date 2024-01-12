import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Sell: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const shares = useSelector((state: RootState) => state.shares.shares);
  const [quantity, setQuantity] = useState<number | ''>('');

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert input value to a float, if it's not empty
    setQuantity(event.target.value === '' ? '' : parseInt(event.target.value));
  };

  const handleSubmit = () => {
    try {
      const token = localStorage.getItem('token');

      axios
        .post('/api/shares/sell', { quantity }, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          toast.success('New price added successfully');
          console.log(res.data.shares)
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <p>You currently own {user?.shares} shares</p>
      <input type="number" value={quantity} onChange={(e) => handlePriceChange(e)} />
      <p>Number of shares to sell: {quantity}</p>
      <button onClick={handleSubmit}>Submit</button>
      <p>These shares sell for $ {quantity && shares.length > 0 ? shares[0].price * quantity : 0}</p>
    </div>
  );
};

export default Sell;
