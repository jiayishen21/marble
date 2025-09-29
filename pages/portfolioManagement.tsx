import React, { useState, useEffect } from "react";
import { Table, Input, Button, Form, message, Popconfirm } from "antd";
import axios from "axios";

interface Holding {
  _id?: string;
  company: string;
  ticker: string;
  shares: number;
  type: "long" | "short";
  buyPrice?: number;
  buyDate?: string;
}

export default function PortfolioManagement() {
  const [form] = Form.useForm();
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

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

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Add a new holding
  const handleAdd = (values: any) => {
    const newHolding: Holding = {
      company: values.company,
      ticker: values.ticker.toUpperCase(),
      shares: Number(values.shares),
      type: values.type.toLowerCase() as "long" | "short",
    };
    setHoldings([...holdings, newHolding]);
    form.resetFields();
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

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (_: any, record: Holding, index: number) => (
        <Input
          value={record.company}
          onChange={(e) => {
            const updated = [...holdings];
            updated[index].company = e.target.value;
            setHoldings(updated);
          }}
        />
      ),
    },
    {
      title: "Ticker",
      dataIndex: "ticker",
      key: "ticker",
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
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_: any, record: Holding, index: number) => (
        <Input
          value={record.type}
          onChange={(e) => {
            const updated = [...holdings];
            updated[index].type = e.target.value.toLowerCase() as
              | "long"
              | "short";
            setHoldings(updated);
          }}
        />
      ),
    },
    {
      title: "Buy Price",
      dataIndex: "buyPrice",
      key: "buyPrice",
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
      render: (_: any, record: Holding, index: number) => (
        <Input
          type="date"
          value={record.buyDate ? record.buyDate.split("T")[0] : ""}
          onChange={(e) => {
            const updated = [...holdings];
            updated[index].buyDate = e.target.value;
            setHoldings(updated);
          }}
        />
      ),
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
            <Form.Item name="company" rules={[{ required: true }]}>
              <Input placeholder="Company" />
            </Form.Item>
            <Form.Item name="ticker" rules={[{ required: true }]}>
              <Input placeholder="Ticker" />
            </Form.Item>
            <Form.Item name="shares" rules={[{ required: true }]}>
              <Input type="number" placeholder="Shares" />
            </Form.Item>
            <Form.Item name="type" rules={[{ required: true }]}>
              <Input placeholder="Type (long/short)" />
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
        </>
      ) : (
        <p className="text-red-600">Enter passcode to unlock editing.</p>
      )}
    </div>
  );
}
