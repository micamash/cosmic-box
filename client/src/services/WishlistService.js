import axios from 'axios';

export default {

    getWishlists() {
        return axios.get('/wishlist');
    },

    getWishlistById(id) {
        return axios.get('/wishlist/' + id)
    },

    createWishlist() {
        return axios.post('/wishlist');
    },

    deleteWishlist(id) {
        return axios.delete('/wishlist/' + id);
    },

    addProductToWishlist(id, productId) {
        return axios.post('/wishlist/' + id + "/products/" + productId);
    },

    removeProductFromWishlist(id, productId) {
        return axios.delete('/wishlist/' + id + "/products/" + productId);
    }


}
