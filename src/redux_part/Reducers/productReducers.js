import {
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,

    SET_ALL_PRODUCTS_URL,

    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL

} from '../Actions/productActionTypes'


const initialProductListState = {
    products: [
        {
            count: 0,
            next: '',
            previous: '',
            results: []
        }
    ],
    error: '',
    productsUrl: 'http://localhost:8000/products/all/',
    status: 'idle'
}


export const productListReducer = (state = initialProductListState, action) => {

    switch (action.type) {
        case SET_ALL_PRODUCTS_URL:
            return {
                ...state,
                productsUrl: action.payload
            }
        case GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                status: 'loading'
            }
        case GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                error: '',
                status: 'success'
            }
        case GET_ALL_PRODUCTS_FAIL:
            return {
                ...state,
                error: action.payload,
                status: 'fail'
            }

        default:
            return state
    }

}


const initialProductDetailState = {

    product: {},
    error: '',
    status: 'idle'
}


export const productDetailReducer = (state = initialProductDetailState, action) => {

    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                status: 'loading'
            }
        case GET_PRODUCT_SUCCESS:
            return {

                product: action.payload,
                error: '',
                status: 'success'
            }
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
                status: 'fail'
            }

        default:
            return state
    }

}