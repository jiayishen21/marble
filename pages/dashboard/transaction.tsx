import React, { useEffect } from "react";
import DashboardTabs from "../../components/DashboardTabs";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { PurchaseType } from "../../types";
import useMobile from "../../hooks/useMobile";
import { Spin } from "antd";

export default function transaction() {
  const user = useSelector((state: RootState) => state.user.user);
  const [transactions, setTransactions] = React.useState<any[]>([]);

  const { mobile } = useMobile();
  const isLoading = !user;

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
    <main
      className={`flex w-[70%] py-[8rem] ${
        mobile ? "ml-[1.5rem]" : "ml-[8rem]"
      }`}
      data-aos={mobile ? undefined : "fade-up"}
    >
      <DashboardTabs />
      <section
        className={`flex flex-col gap-[3rem] w-full ${
          mobile ? "ml-[10rem]" : "ml-[5rem]"
        }`}
      >
        <h1 className="text-2xl font-bold">Transactions</h1>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <table className="table-auto text-center w-full">
            <thead className="bg-[#F8F7F7]">
              <tr>
                <th className="px-4 py-4 align-middle rounded-tl-lg rounded-bl-lg w-1/4 font-medium whitespace-nowrap">
                  Transaction Date
                </th>
                <th className="px-4 py-4 align-middle w-1/4 font-medium whitespace-nowrap">
                  Shares
                </th>
                <th className="px-4 py-4 align-middle w-1/4 font-medium whitespace-nowrap">
                  Amount
                </th>
                <th className="px-4 py-4 align-middle rounded-tr-lg rounded-br-lg w-1/4 font-medium whitespace-nowrap">
                  Shares Owned At Date
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((purchase, index) => (
                <tr key={index} className="border-b-[1px]">
                  <td className="px-4 py-2 align-middle">
                    {new Date(purchase.createdAt.toString()).toLocaleString()}
                  </td>
                  <td className="px-2 py-2 align-middle">
                    <span
                      className={
                        purchase.quantity > 0
                          ? "text-[#38A248]"
                          : "text-red-500"
                      }
                    >
                      {purchase.quantity > 0 ? "BUY" : "SELL"}{" "}
                    </span>{" "}
                    {purchase.quantity < 0
                      ? purchase.quantity * -1
                      : purchase.quantity}{" "}
                    share(s)
                  </td>
                  <td className="px-2 py-2 align-middle">
                    <span
                      className={
                        purchase.quantity > 0
                          ? "text-[#38A248]"
                          : "text-red-500"
                      }
                    >
                      {purchase.quantity > 0 ? "+" : "-"}$
                      {purchase.price * purchase.quantity}
                    </span>
                    &nbsp; CAD
                  </td>
                  <td className="px-2 py-2 align-middle text-center">
                    {purchase.curShares}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
