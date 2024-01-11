import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Admin: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert input value to a float, if it's not empty
    setPrice(event.target.value === '' ? '' : parseFloat(event.target.value));
  };

  const handleSubmit = () => {
    try {
      const token = localStorage.getItem('token');
      const realDate = new Date(date)

      axios
        .post('/api/share/new-price', { date: realDate, price }, { headers: { Authorization: `Bearer ${token}` } })
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
      <input type="date" value={date} onChange={(e) => handleDateChange(e)} />
      <p>Selected Date: {date}</p>
      <input type="number" step='0.01' value={price} onChange={(e) => handlePriceChange(e)} />
      <p>Selected number: {price}</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Admin;

