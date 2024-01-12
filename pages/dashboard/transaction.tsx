import React, { useEffect } from "react";
import DashboardTabs from "../../components/DashboardTabs";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { PurchaseType } from "../../types";

export default function transaction() {
  const user = useSelector((state: RootState) => state.user.user);
  const [transactions, setTransactions] = React.useState<any[]>([]);

  const processShares = () => {
    if (!user?.purchaseHistory) {
      return;
    }

    let curShares = user.shares;
    const purchaseCopy: any[] = [];
    for (const purchase of user.purchaseHistory) {
      const newPurchase = { ...purchase, curShares };
      purchaseCopy.push(newPurchase);
      curShares -= purchase.quantity;
    }
    setTransactions(purchaseCopy);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    processShares();
  }, [user]);

  return (
    <main className="flex w-[70%] py-[8rem] ml-[8rem]">
      <DashboardTabs />
      <section className="flex flex-col gap-[3rem] w-full ml-[5rem]">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <table className="table-auto text-center w-full">
          <thead className="bg-[#F8F7F7]">
            <tr>
              <th className="px-4 py-4 align-middle rounded-tl-lg rounded-bl-lg">
                Transaction Date
              </th>
              <th className="px-4 py-4 align-middle">Shares</th>
              <th className="px-4 py-4 align-middle">Amount</th>
              <th className="px-4 py-4 align-middle rounded-tr-lg rounded-br-lg">
                Shares Owned At Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((purchase, index) => (
              <tr key={index} className="border-b-[1px]">
                <td className="border px-4 py-2 align-middle">
                  {purchase.createdAt.toString()}
                </td>
                <td className="border px-2 py-2 align-middle">
                  {purchase.quantity}
                </td>
                <td className="border px-2 py-2 align-middle">
                  {purchase.price}
                </td>
                <td className="border px-2 py-2 align-middle text-center">
                  {purchase.curShares}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
