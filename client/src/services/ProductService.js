import axios from 'axios';

export default {

    getProducts(nameSearchTerm, skuSearchTerm) {
        if (nameSearchTerm != null && skuSearchTerm != null) {
            return axios.get('/products?name=' + nameSearchTerm + '&sku=' + skuSearchTerm);
        } else if (nameSearchTerm != null && skuSearchTerm == null) {
            return axios.get('/products?name=' + nameSearchTerm);
        } else if (nameSearchTerm == null && skuSearchTerm != null) {
            return axios.get('/products?sku=' + skuSearchTerm);
        } else if (nameSearchTerm == null && skuSearchTerm == null) {
            return axios.get('/products');
        }
    },

    getProductById(id) {
        return axios.get('/products/' + id)
    }

}
