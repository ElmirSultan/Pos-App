import { Button, Form, Input, Modal,message } from 'antd'
import React from 'react'

const Add = ({isAddModalOpen,setIsAddModalOpen,categories,setCategories}) => {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        try{
            fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/add-category",{
                method: "POST",
                body: JSON.stringify(values),
                headers: {"Content-type" : "application/json; charset=UTF-8"}
            })
            message.success("Category is added successfully.")
            form.resetFields()
            setCategories([...categories,{
                _id: Math.random(),
                title: values.title
            }])

        }
        catch(error){
            console.log(error);
        }

    }
  return (
    <Modal title="Add New Category" 
    open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}>
    <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item name="title" label="Add Category" 
        rules={[{required:true,message:"You can not pass the category blank empty"}]}>
            <Input />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">Create</Button>
        </Form.Item>
    </Form>
  </Modal>
  )
}

export default Add