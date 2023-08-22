import { createSlice } from "@reduxjs/toolkit"


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).cartItems
        : [],
        total:localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")).total
        : 0,
        tax: 8,
    },
    reducers: {
        addProduct: (state, action) => {
            const findCartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            )
            if (findCartItem) {
                findCartItem.quantity = findCartItem.quantity + 1
            } else {
                state.cartItems.push(action.payload)
            }

            state.total += action.payload.price;
        },
        deleteCart: (state,action) => {
          
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload._id
                );

            state.total -= action.payload.price * action.payload.quantity;

        },
        increase: (state,action) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            )
            cartItem.quantity += 1;
            state.total += cartItem.price
        },

        decrease: (state,action) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            )

            cartItem.quantity -= 1;
            
            if(cartItem.quantity === 0){
                state.cartItems = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                )
            }
            state.total -= cartItem.price
        },

        reset: (state) => {
            state.cartItems = []
            state.total = 0;
        }
    }

})
// addProducta ulasim uchun export etmek lazimdir ve reducersin ichinde olan her sey actions olaraq kecir
export const { addProduct ,deleteCart ,increase,decrease,reset} = cartSlice.actions
export default cartSlice.reducer