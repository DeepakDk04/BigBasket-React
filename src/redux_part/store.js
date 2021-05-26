import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailReducer } from './Reducers/productReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
})

// const cartItemsFromStorage = localStorage.getItem('cartItem') ?
//                             JSON.parse(localStorage.getItem('cartItem')) :
//                             []
// const userInfoFromStorage = localStorage.getItem('userInfo') ?
//                             JSON.parse(localStorage.getItem('userInfo')) :
//                             null
// const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
//                             JSON.parse(localStorage.getItem('shippingAddress')) :
//                             {}
// const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
//                             JSON.parse(localStorage.getItem('paymentMethod')) :
//                             ''







const middleware = [thunk]

const store = createStore(
    reducer,
    {},
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store