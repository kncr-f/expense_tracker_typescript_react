import React, { useState } from "react";
import { Button, Form, Modal, Select, Table, Tag, Input, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
    addCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../store/actions/categoryActions";
import { Category, CategoryDispatch, CategoryForm } from "../types/category";
import { SketchPicker } from "react-color";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type Mode = "new" | "edit" | "delete";

const emptyForm: CategoryForm = {
    name: "",
    type: "expense",
    color: "black",
};

console.log(Modal);
const Categories = () => {
    const { data, loading } = useSelector(
        (state: AppState) => state.categories
    );
    //console.log(data, loading, error);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode, setMode] = useState<Mode>("new");
    const [form, setForm] = useState<CategoryForm>(emptyForm);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const showModal = (mode: Mode) => {
        setIsModalVisible(true);
        setMode(mode);
    };

    const handleOk = () => {
        if (mode === "new") dispatch(addCategory(form));
        else if (mode === "edit" && typeof updateId === "number")
            dispatch(updateCategory(form, updateId));
        else if (mode === "delete" && typeof deleteId === "number")
            dispatch(deleteCategory(deleteId));
        setIsModalVisible(false);
        setMode("new");
        setForm(emptyForm);
        setUpdateId(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setMode("new");
        setForm(emptyForm);
        setUpdateId(null);
        setDeleteId(null);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (text: string, category: Category) => {
                return <Tag color={category.color}> {text.toUpperCase()}</Tag>;
            },
        },

        {
            title: "Action",
            key: "action",
            render: (text: string, category: Category) => (
                <Space size="middle">
                    <EditOutlined
                        style={{ color: "darkblue" }}
                        onClick={() => {
                            showModal("edit");
                            setForm(category);
                            setUpdateId(category.id);
                        }}
                    />
                    <DeleteOutlined
                        style={{ color: "fuchsia" }}
                        onClick={() => {
                            showModal("delete");
                            setDeleteId(category.id);
                        }}
                    />
                </Space>
            ),
        },
    ];
    const dispatch: CategoryDispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "10px",
                    }}
                >
                    <Button type="primary" onClick={() => showModal("new")}>
                        New Category
                    </Button>
                </div>
                <Modal
                    title={
                        mode === "new"
                            ? "Create a new Category"
                            : mode === "edit"
                            ? "Update Category"
                            : "Delete Category"
                    }
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okButtonProps={{
                        disabled: !form.name && !(mode === "delete"),
                    }}
                >
                    {mode === "edit" || mode === "new" ? (
                        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                            <Form.Item label="Category Name">
                                <Input
                                    name="name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Item>
                            <Form.Item label="Category Type">
                                <Select
                                    defaultValue="expense"
                                    value={form.type}
                                    onChange={(type: any) =>
                                        setForm({ ...form, type })
                                    }
                                >
                                    <Select.Option value="income">
                                        Income
                                    </Select.Option>
                                    <Select.Option value="expense">
                                        Expense
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Color">
                                <SketchPicker
                                    color={form.color}
                                    onChange={(color) =>
                                        setForm({ ...form, color: color.hex })
                                    }
                                />
                            </Form.Item>
                        </Form>
                    ) : mode === "delete" ? (
                        <>Are you sure to delete</>
                    ) : null}
                </Modal>
            </div>
            <Table loading={loading} columns={columns} dataSource={data} />
        </>
    );
};

export default Categories;
