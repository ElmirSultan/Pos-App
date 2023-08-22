import { Button, Form, Input, Modal, message,Select } from 'antd'
import React from 'react'

const Add = ({ isAddModalOpen, setIsAddModalOpen, categories,products,setProducts }) => {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            message.success("Product is added successfully.")
            form.resetFields()
            setProducts([...products, {
                ...values,
                _id: Math.random(),
                price:Number(values.price)
            }])
            setIsAddModalOpen(false)

        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <Modal title="Add New Product"
            open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}>
            <Form layout="vertical" onFinish={onFinish} form={form}>
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
                    <Button type="primary" htmlType="submit">Create</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Add