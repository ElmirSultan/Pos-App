import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'
import { message } from 'antd'
const ProductItem = ({item}) => {
  const dispatch = useDispatch()
  
  const handleClick = () => {
    // console.log(item);
    dispatch(addProduct({...item,quantity:1}));
    message.success("The product is added to the basket.")
  }
 
  return (
    <div className='product-item border hover:shadow-lg cursor-pointer transition-all
    select-none' onClick={handleClick}>
       <div className="product-image">
           <img src={item.img}
           className='h-28 object-cover w-full border-b' alt="" />
       </div>
       <div className="product-info flex flex-col p-3">
           <span className='font-bold'>{item.title}</span>
           <span>{item.price}$</span>
       </div>
   </div>
  )
}

export default ProductItem