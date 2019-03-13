export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const CHANGE_OFFSET = 'CHANGE_OFFSET'
export const CHANGE_PAGE = 'CHANGE_PAGE'

export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = (products, total) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products, total }
});

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error }
});

export const changeOffset = (offset) => ({
    type: CHANGE_OFFSET,
    payload: { offset }
});

export const changePage = (page) => ({
    type: CHANGE_PAGE,
    payload: { page }
});

export function fetchProducts(name, offset) {
    return dispatch => {
        dispatch(fetchProductsBegin())
        return fetch(`/api/products/${name}/${offset}`)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchProductsSuccess(json.products, json.total))
                return json
            })
            .catch(error => dispatch(fetchProductsFailure(error)))
    };
}
