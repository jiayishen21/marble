import React from "react";
import DashboardTabs from "../../components/DashBoardTabs";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function transaction() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <main className="flex w-[70%] py-[8rem] ml-[8rem]">
      <DashboardTabs />
      <section className="flex flex-col gap-[3rem] w-full ml-[5rem]">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <table className="table-auto text-center w-full border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-4 align-middle">Transaction Date</th>
              <th className="px-4 py-4 align-middle">Shares</th>
              <th className="px-4 py-4 align-middle">Amount</th>
              <th className="px-4 py-4 align-middle">Account Balance</th>
            </tr>
          </thead>
          <tbody>
            {user?.purchaseHistory.map((transaction, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-200" : ""}`}
              >
                {/* <td
                  className={`border px-4 py-2 align-middle ${
                    index === transactions.length - 1 ? "rounded-bl-lg" : ""
                  }`} 
                >
                  {transaction.date}
                </td>
                <td className="border px-2 py-2 align-middle underline">

                    {transaction.shares}

                </td>
                <td className="border px-2 py-2 align-middle">
                  {transaction.amount}
                </td>
                <td className="border px-2 py-2 align-middle text-center">
                  {transaction.balance}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
