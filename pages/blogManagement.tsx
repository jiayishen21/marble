import React, { useEffect, useState } from "react";
import { Table, Input, Button, Form, message, Popconfirm, Radio } from "antd";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";

interface BlogItem {
  _id?: string;
  title: string;
  type: "post" | "file";
  content?: string;
  link?: string;
  category?: "blog" | "legacy" | "core";
}

export default function BlogManagement() {
  const [form] = Form.useForm();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const PASSCODE = process.env.NEXT_PUBLIC_PORTFOLIO_PASSCODE;

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAdd = (values: any) => {
    const newItem: BlogItem = {
      title: values.title,
      type: values.type,
      content: values.type === "post" ? values.content || "" : undefined,
      link: values.type === "file" ? values.link || "" : undefined,
      category: values.category || "blog",
    };
    setBlogs([newItem, ...blogs]);
    form.resetFields();
  };

  const handleDelete = (id?: string, index?: number) => {
    if (id) {
      setBlogs(blogs.filter((b) => b._id !== id));
    } else if (index !== undefined) {
      const copy = [...blogs];
      copy.splice(index, 1);
      setBlogs(copy);
    }
  };

  const handleSave = async () => {
    if (passcode !== PASSCODE) {
      message.error("Invalid passcode.");
      return;
    }
    try {
      await axios.post("/api/blogs", blogs);
      message.success("Blogs saved successfully!");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      message.error("Failed to save blogs.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Management</h1>

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
            layout="vertical"
            onFinish={handleAdd}
            className="mb-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Article title" />
                </Form.Item>
                <Form.Item
                  name="category"
                  label="Category"
                  initialValue="blog"
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio value="blog">Blog</Radio>
                    <Radio value="legacy">Legacy</Radio>
                    <Radio value="core">Core Strategy</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="type"
                  label="Type"
                  initialValue="post"
                  rules={[{ required: true }]}
                >
                  <Radio.Group>
                    <Radio value="post">In-house Post</Radio>
                    <Radio value="file">File Link (PDF)</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <Form.Item noStyle shouldUpdate>
                {() => {
                  const t = form.getFieldValue("type");
                  if (t === "post") {
                    return (
                      <Form.Item name="content" label="Content">
                        <RichTextEditor
                          rows={8}
                          placeholder="Write content with formatting (bold, underline, titles, etc.)"
                        />
                      </Form.Item>
                    );
                  }
                  return (
                    <Form.Item
                      name="link"
                      label="Public file link (e.g., /resources/xyz.pdf)"
                    >
                      <Input placeholder="/resources/your-file.pdf" />
                    </Form.Item>
                  );
                }}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </div>
          </Form>

          <Table
            dataSource={blogs}
            rowKey={(r, idx) => r._id || `${r.title}-${idx}`}
            loading={loading}
            pagination={false}
            columns={[
              {
                title: "Title",
                dataIndex: "title",
                key: "title",
                width: "25%",
                render: (_: any, record: BlogItem, index: number) => (
                  <Input
                    value={record.title}
                    onChange={(e) => {
                      const updated = [...blogs];
                      updated[index].title = e.target.value;
                      setBlogs(updated);
                    }}
                  />
                ),
              },
              {
                title: "Category",
                dataIndex: "category",
                key: "category",
                width: "15%",
                render: (_: any, record: BlogItem, index: number) => (
                  <Radio.Group
                    value={record.category || "blog"}
                    onChange={(e) => {
                      const updated = [...blogs];
                      updated[index].category = e.target.value;
                      setBlogs(updated);
                    }}
                  >
                    <Radio value="blog">Blog</Radio>
                    <Radio value="legacy">Legacy</Radio>
                    <Radio value="core">Core</Radio>
                  </Radio.Group>
                ),
              },
              {
                title: "Type",
                dataIndex: "type",
                key: "type",
                width: "15%",
                render: (_: any, record: BlogItem, index: number) => (
                  <Radio.Group
                    value={record.type}
                    onChange={(e) => {
                      const updated = [...blogs];
                      updated[index].type = e.target.value;
                      if (e.target.value === "post") {
                        delete updated[index].link;
                        updated[index].content = updated[index].content || "";
                      } else {
                        delete updated[index].content;
                        updated[index].link = updated[index].link || "";
                      }
                      setBlogs(updated);
                    }}
                  >
                    <Radio value="post">Post</Radio>
                    <Radio value="file">File</Radio>
                  </Radio.Group>
                ),
              },
              {
                title: "Content / Link",
                key: "content",
                width: "40%",
                render: (_: any, record: BlogItem, index: number) =>
                  record.type === "post" ? (
                    <RichTextEditor
                      rows={6}
                      value={record.content}
                      onChange={(value) => {
                        const updated = [...blogs];
                        updated[index].content = value;
                        setBlogs(updated);
                      }}
                    />
                  ) : (
                    <Input
                      value={record.link}
                      onChange={(e) => {
                        const updated = [...blogs];
                        updated[index].link = e.target.value;
                        setBlogs(updated);
                      }}
                      placeholder="/resources/your-file.pdf"
                    />
                  ),
              },
              {
                title: "Actions",
                key: "actions",
                width: "5%",
                render: (_: any, record: BlogItem, index: number) => (
                  <Popconfirm
                    title="Are you sure you want to delete this entry?"
                    onConfirm={() => handleDelete(record._id, index)}
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                ),
              },
            ]}
          />

          <div className="mt-6">
            <Button type="primary" onClick={handleSave}>
              Save Blogs
            </Button>
          </div>
        </>
      ) : (
        <p className="text-red-600">Enter passcode to unlock editing.</p>
      )}
    </div>
  );
}
