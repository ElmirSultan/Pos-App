import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'

const Edit = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState({})
    const [form] = Form.useForm()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all")
                const data = await res.json()
                console.log(data);
                setProducts(data)
            } catch (error) {
                console.log(error);
            }
        }

        getProducts()
    }, [])


    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all")
                const data = await res.json()
                data && setCategories(data.map((item)=> {
                    return {...item, value: item.title}
                 }))
                console.log(data);
                setProducts(data)
            } catch (error) {
                console.log(error);
            }
        }

        getCategories()
    }, [])

    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/update-product", {
                method: "PUT",
                body: JSON.stringify({ ...values,_id:editingItem._id }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            message.success("Category is updated successfully.")
            setProducts(products.map((item) => {
                if(item._id === editingItem._id){
                    return values
                }
                return item
            }))
        } catch (error) {
            message.error("Category is not updated")
            console.log(error);
        }
    }

    const deleteCategory = (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                fetch(process.env.REACT_APP_SERVER_URL + "/api/products/delete-product", {
                    method: "DELETE",
                    body: JSON.stringify({ _id: id }),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                })
                message.success("Product is deleted successfully.")
                // silinmis categoriyalari ekrandada aninda silmek uchun
                setProducts(products.filter((item) => item._id !== id))
            } catch (error) {
                message.error("Something went wrong!")
                console.log(error);
            }
        }
    }
    const columns = [
        {
            title: "Product Name",
            dataIndex: "title",
            width: "8%",
            render: (_, record) => {
                return <p>{record.title}</p>
            }
        },
        {
            title: "Product Image",
            dataIndex: "img",
            width: "4%",
            render: (_, record) => {
                return <img className='w-full h-20 object-cover'
                    src={record.img} alt="" />
            }
        },
        {
            title: "Product Price",
            dataIndex: "price",
            width: "8%"
        },
        {
            title: "Category",
            dataIndex: "category",
            width: "8%",
        },
        {
            title: "Action",
            dataIndex: "action",
            width: "8%",
            render: (_, record) => {
                return (
                    <div className='flex items-center'>
                        <Button type='link' className='pl-0' 
                        onClick={()=> {
                            setIsEditModalOpen(true)
                            setEditingItem(record)
                        }}>Edit</Button>
       
                        <Button type='text' danger onClick={() => deleteCategory(record._id)}>Delete</Button>
                    </div>
                )
            }
        }
    ]
    return (

        <>
            <Table
                bordered
                dataSource={products}
                columns={columns}
                rowKey={"_id"}
                scroll={{
                    x: 1000,
                    y: 600,
                }} />

            <Modal title="Add New Product"
                open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={false}>
                <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingItem}>
                    <Form.Item name="title" label="Product Name"
                        rules={[{ required: true, message: "You can not pass the product blank empty" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="img" label="Product Image"
                        rules={[{ required: true, message: "You can not pass the product image blank empty" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="price" label="Product Price"
                        rules={[{ required: true, message: "You can not pass the product price empty" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="category" label="Select category"
                        rules={[{ required: true, message: "You can not pass the category empty" }]}>
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.title ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                            }
                            options={categories}
                        />
                    </Form.Item>

                    <Form.Item className="flex justify-end mb-0">
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>


    )
}

export default Edit