import { Button, Form, Input, Modal, Table, message } from 'antd'
import React, { useState } from 'react'

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {
    const [editingRow, setEditingRow] = useState({})
    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category",{
                method:"PUT",
                body: JSON.stringify({...values, _id: editingRow._id}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            message.success("Category is updated successfully.")
            setCategories(categories.map((item) => {
                if(item._id === editingRow._id){
                    return {...item,title:values.title}
                }
                return item;
            }))
        } catch (error) {
            message.error("Category is not updated")
            console.log(error);
        }
    }

    const deleteCategory = (id) => {
        if(window.confirm("Are you sure?")){
            try {
                fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category",{
                   method: "DELETE",
                   body: JSON.stringify({_id: id}),
                   headers: {"Content-type":"application/json; charset=UTF-8"} 
                })
                message.success("Category is deleted successfully.")
                // silinmis categoriyalari ekrandada aninda silmek uchun
                setCategories(categories.filter((item)=> item._id !== id))
            } catch (error) {
                message.error("Something went wrong!")
                console.log(error);
            }
        }
    }
    const columns = [
        {
            title: "Category title",
            dataIndex: "title",
            render: (_, record) => {
                if (record._id === editingRow._id) {
                    return (
                        <Form.Item className='mb-0' name="title" rules={[{required:true,message:"You can not save this blank empty"}]}>
                            <Input defaultValue={record.title}/>
                        </Form.Item>
                    )
                } else {
                    return <p>{record.title}</p>
                }
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => {
                return (
                    <div className='flex items-center'>
                        <Button type='link' onClick={() => setEditingRow(record)} className='pl-0'>Edit</Button>
                        <Button type='text' htmlType='submit'>Save</Button>
                        <Button type='text' danger onClick={() => deleteCategory(record._id)}>Delete</Button>
                    </div>
                )
            }
        }
    ]
    return (
        <Modal open={isEditModalOpen} title="Category actions" footer={false}
            onCancel={() => setIsEditModalOpen(false)}>
            <Form onFinish={onFinish}>
                <Table bordered dataSource={categories} columns={columns} rowKey={"_id"} />
            </Form>
        </Modal>
    )
}

export default Edit