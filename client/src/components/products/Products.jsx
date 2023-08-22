import React, { useState } from 'react'
import ProductItem from './ProductItem';
import Add from '../products/Add';
import { PlusOutlined , EditOutlined} from "@ant-design/icons"
import { useNavigate } from 'react-router-dom';
const Products = ({categories,filtered,products,setProducts,search}) => {
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const navigate = useNavigate()


    return (
        <div className='products-wrapper grid grid-cols-card gap-4'>
            {filtered
            .filter((product) => product.title.toLowerCase().includes(search))
            .map((item) => (
                <ProductItem item={item} key={item._id} />
            ))}

            <div onClick={() => setIsAddModalOpen(true)} className='product-item border hover:shadow-lg cursor-pointer transition-all
             select-none bg-purple-800 flex items-center justify-center min-h-[180px]'>
                <PlusOutlined className='text-white md:text-2xl' />
            </div>

            <div onClick={() => navigate("/products")}
            className='product-item border hover:shadow-lg cursor-pointer transition-all
             select-none bg-blue-800 flex items-center justify-center min-h-[180px]'>
                <EditOutlined className='text-white md:text-2xl' />
            </div>
            <Add isAddModalOpen={isAddModalOpen}
            setIsAddModalOpen={setIsAddModalOpen}
            categories={categories}
            products = {products}
            setProducts={setProducts}/>
        </div>
    )
}

export default Products