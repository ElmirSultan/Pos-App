import { Button, Popconfirm, Table, message } from "antd"
import { useState } from "react"
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import Header from "../components/Header/Header"
import { Card } from "antd"
import Bill from "../components/cart/Bill"
import { useDispatch, useSelector } from "react-redux"
import { decrease, deleteCart, increase } from "../redux/cartSlice"
const CartPage = () => {

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const columns = [
        {
            title: 'Product Image',
            dataIndex: 'img',
            key: 'img',
            width: "125px",
            render: (text) => {
                return (
                    <img src={text} alt="" className="w-full h-20 object-cover" />
                )
            }
        },
        {
            title: 'Product Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => {
                return (
                    <span>{text.toFixed(2)}$</span>
                )
            }
        },
        {
            title: 'Product Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => {
                return (

                    <div className='flex items-center'>
                        <Button onClick={() => dispatch(increase(record))}
                            type="primary"
                            size="small"
                            className="w-full flex items-center justify-center !rounded-full"
                            icon={<PlusCircleOutlined />} />

                        <span className='font-bold w-6 inline-block text-center'>{record.quantity}</span>

                        <Button onClick={() => {
                            if (record.quantity === 1) {
                                if (window.confirm("Are you sure you want to remove this product?")) {
                                    dispatch(decrease(record))
                                    message.success("The product is removed")
                                }
                            }
                            if (record.quantity > 1) {
                                dispatch(decrease(record))

                            }
                        }}
                            type="primary"
                            size="small"
                            className="w-full flex items-center justify-center !rounded-full"
                            icon={<MinusCircleOutlined />} />



                    </div>
                )
            }
        },
        {
            title: 'Product Cost',
            render: (text, record) => {
                return (
                    <span>{(record.quantity * record.price).toFixed(2)}$</span>
                )
            }
        },
        {
            title: 'Actions',
            render: (_, record) => {
                return (
                    <Popconfirm
                        onConfirm={() => {
                            dispatch(deleteCart(record));
                            message.success("The product is removed")
                        }}
                        okText="Yes"
                        title="Are you sure to delete this product?">

                        <Button

                            type="link" danger>Delete</Button>
                    </Popconfirm>
                )
            }
        },

    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

  
    return (
        <>
            <Header />
            <div className="px-6">
                <Table rowKey={"_id"}
                bordered pagination={false}
                    dataSource={cart.cartItems}
                    columns={columns}
                    scroll={{x:1200,y:300}} />;
                <div className="cart-total flex justify-end mt-4">
                    <Card className="w-72 ">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{(cart.total).toFixed(2)}$</span>
                        </div>

                        <div className="flex justify-between">
                            <span>VAT %{cart.tax}</span>
                            <span className="text-red-600">+{((cart.total * cart.tax) / 100).toFixed(2)}$</span>
                        </div>

                        <div className="flex justify-between">
                            <b>Total</b>
                            <b> {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}$</b>
                        </div>

                        <Button
                            className="mt-4 w-full"
                            type="primary"
                            size="large"
                            onClick={() => setIsModalOpen(true)}
                            disabled={cart.cartItems.length === 0}
                        >
                            Create Order
                        </Button>

                    </Card>
                </div>
            </div>
            <Bill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </>
    )
}

export default CartPage