import React from 'react'
import { Button,message } from 'antd'
import { ClearOutlined , PlusCircleOutlined , MinusCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart,increase,decrease,reset } from '../../redux/cartSlice'
import { useNavigate } from 'react-router-dom'
const CartTotals = () => {
    const cart = useSelector((state)=> state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className='cart h-full max-h-[calc(100vh_-_90px)] flex flex-col'>
            <h2 className='bg-blue-600 text-center py-4 text-white font-bold tracking-wide'>
                Baket Items
            </h2>
            <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto py-2">
                {cart.cartItems.length > 0 ? 
                    cart.cartItems.map((item) => (
                        <li key={item._id} className="cart-item flex justify-between">
                        <div className='flex items-center'>
                            <img onClick={() => {
                                dispatch(deleteCart(item))
                                message.success("The product is removed")
                            }}
                            src={item.img} alt="" className='w-16 h-16 object-cover cursor-pointer' />
                            <div className='flex flex-col ml-2'>
                                <b>{item.title}</b>
                                <span>{item.price}$ x {item.quantity}</span>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Button onClick={() => dispatch(increase(item))}
                                type="primary"
                                size="small"
                                className="w-full flex items-center justify-center !rounded-full"
                                icon={<PlusCircleOutlined />} />
    
                                <span className='font-bold w-6 inline-block text-center'>{item.quantity}</span>
    
                                <Button onClick={() => {
                                    if(item.quantity === 1){
                                        if(window.confirm("Are you sure you want to remove this product?")){
                                            dispatch(decrease(item))
                                            message.success("The product is removed")
                                        }
                                    }
                                    if(item.quantity > 1){
                                        dispatch(decrease(item))
                                        
                                    }
                                }}
                                type="primary"
                                size="small"
                                className="w-full flex items-center justify-center !rounded-full"
                                icon={<MinusCircleOutlined />} />
    
    
    
                        </div>
                    </li>
                    )).reverse()
                  : "The Basket is empty..." }
            </ul>

            <div className="cart-totals mt-auto">
                <div className='border-t border-b'>
                    <div className='flex justify-between p-2'>
                        <b>Subtotal</b>
                        <span>{(cart.total).toFixed(2)}$</span>
                    </div>
                    <div className='flex justify-between p-2'>
                        <b>VAT %{cart.tax}</b>
                        <span className='text-red-700'>+{((cart.total * cart.tax) / 100).toFixed(2)}$</span>
                    </div>
                </div>

                <div className='border-b mt-4'>
                    <div className='flex justify-between p-2'>
                        <b className='text-xl text-green-500'>Total</b>
                        <span className='text-xl'>
                            {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}$
                        </span>
                    </div>
                </div>

                <div className='py-4 px-2'>
                    <Button onClick={() => navigate("/cart")}
                    disabled={cart.cartItems.length === 0}
                    type="primary" 
                    size="large" 
                    className="w-full" >
                        Create order
                    </Button>

                    <Button 
                    onClick={() =>{
                        if(window.confirm("Are you sure to delete")){
                            dispatch(reset())
                            message.success("Basket cleared")
                            
                        }
                    }}
                    disabled={cart.cartItems.length === 0}
                    type="primary" 
                    size="large" 
                    className="w-full mt-2 flex items-center justify-center" danger
                    icon={<ClearOutlined />}>
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartTotals