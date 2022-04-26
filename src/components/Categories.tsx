import { Table, Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getCategories } from "../store/actions/categoryActions";
import { Category, CategoryDispatch } from "../types/category";

const Categories = () => {
    const { data, loading, error } = useSelector(
        (state: AppState) => state.categories
    );
    console.log(data, loading, error);
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

        //    {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //       <Space size="middle">
        //         <a>Invite {record.name}</a>
        //         <a>Delete</a>
        //       </Space>
        //     ),
        //   },
    ];
    const dispatch: CategoryDispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    return <Table columns={columns} dataSource={data} />;
};

export default Categories;
