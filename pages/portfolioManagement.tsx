import React, { useState, useEffect } from "react";
import { Table, Input, Button, Form, message, Popconfirm } from "antd";
import axios from "axios";
import type { ColumnsType, SorterResult } from "antd/es/table/interface";

interface Holding {
  _id?: string;
  ticker: string;
  shares: number;
  session?: "pre-market" | "market" | "post-market" | "other";
  buyPrice?: number;
  buyDate?: string; // e.g., "Q1 2024", "Q2 2025"
}

export default function PortfolioManagement() {
  const [form] = Form.useForm();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [addSession, setAddSession] = useState<
    "pre-market" | "market" | "post-market" | "other"
  >("market");
  const [addClosedYear, setAddClosedYear] = useState<"2023" | "2024" | "2025">(
    "2024"
  );
  interface ClosedHolding extends Omit<Holding, "session"> {
    session?:
      | "2023"
      | "2024"
      | "2025"
      | "pre-market"
      | "market"
      | "post-market"
      | "other";
    exitPrice?: number;
    exitDate?: string; // e.g., "Q3 2024", "Q4 2025"
  }
  const [closedHoldings, setClosedHoldings] = useState<ClosedHolding[]>([]);
  const [closedLoading, setClosedLoading] = useState(false);
  const [closedForm] = Form.useForm();

  const PASSCODE = process.env.NEXT_PUBLIC_PORTFOLIO_PASSCODE;

  // Fetch portfolio from backend
  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/holdings"); // ✅ Correct path
      setHoldings(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch portfolio data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchClosed = async () => {
    try {
      setClosedLoading(true);
      const res = await axios.get("/api/holdings/closed");
      setClosedHoldings(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch closed positions.");
    } finally {
      setClosedLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    fetchClosed();
  }, []);

  // Add a new holding
  const handleAdd = (values: any) => {
    const newHolding: Holding = {
      ticker: values.ticker.toUpperCase(),
      shares: Number(values.shares),
      session: addSession,
      buyPrice:
        values.buyPrice !== undefined && values.buyPrice !== ""
          ? Number(values.buyPrice)
          : undefined,
      buyDate: values.buyDate || undefined,
    };
    setHoldings([...holdings, newHolding]);
    form.resetFields();
    setAddSession("market");
  };

  // Delete a holding locally
  const handleDelete = (id?: string) => {
    setHoldings(holdings.filter((h) => h._id !== id));
  };

  // Save portfolio to backend
  const handleSave = async () => {
    if (passcode !== PASSCODE) {
      message.error("Invalid passcode.");
      return;
    }

    try {
      await axios.post("/api/holdings", holdings); // ✅ Correct path
      message.success("Portfolio saved successfully!");
      fetchPortfolio();
    } catch (err) {
      console.error(err);
      message.error("Failed to save portfolio.");
    }
  };

  const columns: ColumnsType<Holding> = [
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
      sorter: (a, b) => a.ticker.localeCompare(b.ticker),
      render: (_: any, record: Holding, index: number) => (
        <Input
          value={record.ticker}
          onChange={(e) => {
            const updated = [...holdings];
            updated[index].ticker = e.target.value.toUpperCase();
            setHoldings(updated);
          }}
        />
      ),
    },
    {
      title: "Shares",
      dataIndex: "shares",
      key: "shares",
      sorter: (a, b) => a.shares - b.shares,
      render: (_: any, record: Holding, index: number) => (
        <Input
          type="number"
          value={record.shares}
          onChange={(e) => {
            const updated = [...holdings];
            updated[index].shares = Number(e.target.value);
            setHoldings(updated);
          }}
        />
      ),
    },

    {
      title: "Buy Price",
      dataIndex: "buyPrice",
      key: "buyPrice",
      sorter: (a, b) => (a.buyPrice || 0) - (b.buyPrice || 0),
      render: (_: any, record: Holding, index: number) => (
        <Input
          type="number"
          value={record.buyPrice || ""}
          onChange={(e) => {
            const updated = [...holdings];
            updated[index].buyPrice = Number(e.target.value);
            setHoldings(updated);
          }}
        />
      ),
    },
    {
      title: "Buy Date",
      dataIndex: "buyDate",
      key: "buyDate",
      sorter: (a, b) => (a.buyDate || "").localeCompare(b.buyDate || ""),
      render: (_: any, record: Holding, index: number) => (
        <Input
          placeholder="Q1 2024"
          value={record.buyDate ?? ""}
          onChange={(e) => {
            const updated = [...holdings];
            updated[index].buyDate = e.target.value;
            setHoldings(updated);
          }}
        />
      ),
    },
    {
      title: "Buy Value",
      key: "buyValue",
      sorter: (a, b) => {
        const aValue = a.buyPrice ? a.shares * a.buyPrice : 0;
        const bValue = b.buyPrice ? b.shares * b.buyPrice : 0;
        return aValue - bValue;
      },
      render: (_: any, record: Holding) => {
        return record.buyPrice ? `$${record.shares * record.buyPrice}` : "-";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Holding) => (
        <Popconfirm
          title="Are you sure you want to delete this holding?"
          onConfirm={() => handleDelete(record._id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const handleAddClosed = (values: any) => {
    const newClosed: any = {
      ticker: values.ticker.toUpperCase(),
      shares: Number(values.shares),
      session: addClosedYear,
      buyPrice: values.buyPrice ? Number(values.buyPrice) : undefined,
      buyDate: values.buyDate || undefined,
      exitPrice: values.exitPrice ? Number(values.exitPrice) : undefined,
      exitDate: values.exitDate || undefined,
    };
    setClosedHoldings([...closedHoldings, newClosed]);
    closedForm.resetFields();
    setAddClosedYear("2024");
  };

  const handleDeleteClosed = (id?: string) => {
    setClosedHoldings(closedHoldings.filter((h) => h._id !== id));
  };

  const handleSaveClosed = async () => {
    if (passcode !== PASSCODE) {
      message.error("Invalid passcode.");
      return;
    }
    try {
      await axios.post("/api/holdings/closed", closedHoldings);
      message.success("Closed positions saved successfully!");
      fetchClosed();
    } catch (err) {
      console.error(err);
      message.error("Failed to save closed positions.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Portfolio Management</h1>

      <div className="mb-6 flex items-center">
        <Input.Password
          placeholder="Enter Admin Passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          style={{ width: 250, marginRight: 10 }}
        />
        <Button
          type="primary"
          onClick={() => {
            if (passcode === PASSCODE) {
              setIsAuthorized(true);
              message.success("Unlocked!");
            } else {
              message.error("Invalid passcode.");
            }
          }}
        >
          Unlock
        </Button>
      </div>

      {isAuthorized ? (
        <>
          <Form
            form={form}
            layout="inline"
            onFinish={handleAdd}
            className="mb-6"
          >
            <Form.Item name="ticker" rules={[{ required: true }]}>
              <Input placeholder="Ticker" />
            </Form.Item>
            <Form.Item name="shares" rules={[{ required: true }]}>
              <Input type="number" placeholder="Shares" />
            </Form.Item>

            <Form.Item name="buyPrice">
              <Input type="number" placeholder="Buy Price (optional)" />
            </Form.Item>
            <Form.Item name="buyDate">
              <Input placeholder="Buy Date (e.g., Q1 2024)" />
            </Form.Item>
            {/* Removed fund selection; only session applies now */}
            <Form.Item>
              <div className="flex gap-[0.5rem] items-center">
                {["pre-market", "market", "post-market", "other"].map((key) => (
                  <Button
                    key={key}
                    className={`flex items-center justify-center w-fit rounded-full gap-[0.5rem] px-[1rem] py-[0.5rem] text-base text-[#17499A] ${
                      addSession === (key as any)
                        ? "bg-[#E7F6F9] border-2 border-[#17499A]"
                        : "bg-none border border-transparent"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setAddSession(key as any);
                    }}
                  >
                    {key}
                  </Button>
                ))}
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>

          <Table
            dataSource={holdings}
            columns={columns}
            rowKey={(record) => record._id || record.ticker}
            loading={loading}
            pagination={false}
          />

          <div className="mt-6">
            <Button type="primary" onClick={handleSave}>
              Save Portfolio
            </Button>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">Closed Positions</h2>
          <Form
            form={closedForm}
            layout="vertical"
            onFinish={(values) => handleAddClosed(values)}
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <Form.Item
                name="ticker"
                rules={[{ required: true }]}
                label="Ticker"
              >
                <Input placeholder="Ticker" />
              </Form.Item>
              <Form.Item
                name="shares"
                rules={[{ required: true }]}
                label="Shares"
              >
                <Input type="number" placeholder="Shares" />
              </Form.Item>
              <Form.Item name="buyPrice" label="Buy Price">
                <Input type="number" placeholder="Buy Price (optional)" />
              </Form.Item>
              <Form.Item name="buyDate" label="Buy Date">
                <Input placeholder="Q1 2024" />
              </Form.Item>
              <Form.Item name="exitPrice" label="Exit Price">
                <Input type="number" placeholder="Exit Price (optional)" />
              </Form.Item>
              <Form.Item name="exitDate" label="Exit Date">
                <Input placeholder="Q3 2024" />
              </Form.Item>
              {/* Year selection for closed positions */}
              <Form.Item label="Year" className="col-span-1 md:col-span-3">
                <div className="flex gap-[0.5rem] items-center">
                  {["2023", "2024", "2025"].map((key) => (
                    <Button
                      key={key}
                      className={`flex items-center justify-center w-fit rounded-full gap-[0.5rem] px-[1rem] py-[0.5rem] text-base text-[#17499A] ${
                        addClosedYear === (key as any)
                          ? "bg-[#E7F6F9] border-2 border-[#17499A]"
                          : "bg-none border border-transparent"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setAddClosedYear(key as any);
                      }}
                    >
                      {key}
                    </Button>
                  ))}
                </div>
              </Form.Item>
              <Form.Item className="col-span-1 md:col-span-3">
                <Button type="primary" htmlType="submit">
                  Add Closed
                </Button>
              </Form.Item>
            </div>
          </Form>

          <Table
            dataSource={closedHoldings}
            columns={[
              {
                title: "Ticker",
                dataIndex: "ticker",
                key: "ticker",
                sorter: (a, b) => a.ticker.localeCompare(b.ticker),
                render: (_: any, record: ClosedHolding, index: number) => (
                  <Input
                    value={record.ticker}
                    onChange={(e) => {
                      const updated = [...closedHoldings];
                      updated[index].ticker = e.target.value.toUpperCase();
                      setClosedHoldings(updated);
                    }}
                  />
                ),
              },
              {
                title: "Year",
                dataIndex: "session",
                key: "session",
                sorter: (a, b) =>
                  (a.session || "").localeCompare(b.session || ""),
                render: (_: any, record: ClosedHolding, index: number) => {
                  // Map old session values to display values
                  const getDisplayValue = (session?: string) => {
                    if (
                      session === "2023" ||
                      session === "2024" ||
                      session === "2025"
                    ) {
                      return session;
                    }
                    // Map old values to new ones
                    if (session === "pre-market") return "2023";
                    if (session === "market") return "2024";
                    if (session === "post-market") return "2025";
                    if (session === "other") return "2024";
                    return "2024"; // default
                  };

                  return (
                    <select
                      value={getDisplayValue(record.session)}
                      onChange={(e) => {
                        const updated = [...closedHoldings];
                        updated[index].session = e.target.value as
                          | "2023"
                          | "2024"
                          | "2025";
                        setClosedHoldings(updated);
                      }}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                  );
                },
              },
              {
                title: "Shares",
                dataIndex: "shares",
                key: "shares",
                sorter: (a, b) => a.shares - b.shares,
                render: (_: any, record: ClosedHolding, index: number) => (
                  <Input
                    type="number"
                    value={record.shares}
                    onChange={(e) => {
                      const updated = [...closedHoldings];
                      updated[index].shares = Number(e.target.value);
                      setClosedHoldings(updated);
                    }}
                  />
                ),
              },
              {
                title: "Buy Price",
                dataIndex: "buyPrice",
                key: "buyPrice",
                sorter: (a, b) => (a.buyPrice || 0) - (b.buyPrice || 0),
                render: (_: any, record: ClosedHolding, index: number) => (
                  <Input
                    type="number"
                    value={record.buyPrice || ""}
                    onChange={(e) => {
                      const updated = [...closedHoldings];
                      updated[index].buyPrice = Number(e.target.value);
                      setClosedHoldings(updated);
                    }}
                  />
                ),
              },
              {
                title: "Buy Date",
                dataIndex: "buyDate",
                key: "buyDate",
                sorter: (a, b) =>
                  (a.buyDate || "").localeCompare(b.buyDate || ""),
                render: (_: any, record: ClosedHolding, index: number) => (
                  <Input
                    placeholder="Q1 2024"
                    value={record.buyDate ?? ""}
                    onChange={(e) => {
                      const updated = [...closedHoldings];
                      updated[index].buyDate = e.target.value;
                      setClosedHoldings(updated);
                    }}
                  />
                ),
              },
              {
                title: "Exit Price",
                dataIndex: "exitPrice",
                key: "exitPrice",
                sorter: (a, b) => (a.exitPrice || 0) - (b.exitPrice || 0),
                render: (_: any, record: ClosedHolding, index: number) => (
                  <Input
                    type="number"
                    value={record.exitPrice || ""}
                    onChange={(e) => {
                      const updated = [...closedHoldings];
                      updated[index].exitPrice = Number(e.target.value);
                      setClosedHoldings(updated);
                    }}
                  />
                ),
              },
              {
                title: "Exit Date",
                dataIndex: "exitDate",
                key: "exitDate",
                sorter: (a, b) =>
                  (a.exitDate || "").localeCompare(b.exitDate || ""),
                render: (_: any, record: ClosedHolding, index: number) => (
                  <Input
                    placeholder="Q3 2024"
                    value={record.exitDate ?? ""}
                    onChange={(e) => {
                      const updated = [...closedHoldings];
                      updated[index].exitDate = e.target.value;
                      setClosedHoldings(updated);
                    }}
                  />
                ),
              },
              {
                title: "Realized Net Profit",
                key: "realizedNetProfit",
                sorter: (a, b) => {
                  const aProfit =
                    a.buyPrice && a.exitPrice
                      ? (a.exitPrice - a.buyPrice) * a.shares
                      : 0;
                  const bProfit =
                    b.buyPrice && b.exitPrice
                      ? (b.exitPrice - b.buyPrice) * b.shares
                      : 0;
                  return aProfit - bProfit;
                },
                render: (_: any, record: ClosedHolding) => {
                  if (record.buyPrice && record.exitPrice) {
                    const profit =
                      (record.exitPrice - record.buyPrice) * record.shares;
                    return `$${profit.toFixed(2)}`;
                  }
                  return "-";
                },
              },
              {
                title: "Actions",
                key: "actions",
                render: (_: any, record: ClosedHolding) => (
                  <Popconfirm
                    title="Are you sure you want to delete this closed position?"
                    onConfirm={() => handleDeleteClosed(record._id)}
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                ),
              },
            ]}
            rowKey={(record) => record._id || `${record.ticker}-closed`}
            loading={closedLoading}
            pagination={false}
          />

          <div className="mt-6">
            <Button type="primary" onClick={handleSaveClosed}>
              Save Closed Positions
            </Button>
          </div>
        </>
      ) : (
        <p className="text-red-600">Enter passcode to unlock editing.</p>
      )}
    </div>
  );
}
