import React from "react";
import DashboardTabs from "../../components/DashboardTabs";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function transaction() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <main className="flex w-[70%] py-[8rem] ml-[8rem]">
      <DashboardTabs />
      <section className="flex flex-col gap-[3rem] w-full ml-[5rem]">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <table className="table-auto text-center w-full">
          <thead className="bg-[#F8F7F7]">
            <tr className="">
              <th className="px-4 py-4 align-middle rounded-tl-lg rounded-bl-lg">
                Transaction Date
              </th>
              <th className="px-4 py-4 align-middle">Shares</th>
              <th className="px-4 py-4 align-middle">Amount</th>
              <th className="px-4 py-4 align-middle rounded-tr-lg rounded-br-lg">
                Account Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {user?.purchaseHistory.map((transaction, index) => (
              <tr key={index} className="border-b-[1px]">
                <td className="px-4 py-2 align-middle">
                  {transaction.createdAt.toLocaleString()}
                </td>
                <td className="px-2 py-2 align-middle underline">
                  {transaction.quantity}
                </td>
                <td className="px-2 py-2 align-middle">{transaction.price}</td>
                <td className="px-2 py-2 align-middle text-center">
                  {transaction.quantity * transaction.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
