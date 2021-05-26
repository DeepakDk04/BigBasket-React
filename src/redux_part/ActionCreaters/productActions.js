import {
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,

    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,

    SET_ALL_PRODUCTS_URL

} from '../Actions/productActionTypes'

import axios from 'axios'

export const setProductApiUrl = (url) => (dispatch) => {
    dispatch({
        type: SET_ALL_PRODUCTS_URL,
        payload: url
    })
}



export const listProducts = () => async (dispatch, getState) => {
    // initial url : 'http://localhost:8000/products/all/'
    const { productList } = getState()
    const { productsUrl } = productList
    dispatch({
        type: GET_ALL_PRODUCTS_REQUEST
    })
    try {
        const { data, status } = await axios.get(productsUrl)
        console.log(status)
        dispatch({
            type: GET_ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_ALL_PRODUCTS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}


export const getProductDetail = (productId) => async (dispatch) => {

    dispatch({
        type: GET_PRODUCT_REQUEST
    })

    try {
        const { data, status } = await axios.get(`http://localhost:8000/products/detail/${productId}`)
        console.log(status)
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log("err >> ", error)
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}