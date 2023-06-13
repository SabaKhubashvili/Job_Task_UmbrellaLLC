

export default class BaseUrl{

    static BaseUrl = 'http://127.0.0.1:8000/api/';

    static getProducts = this.BaseUrl+'getAllProducts';
    static getTags = this.BaseUrl+'getAllTags'
    static getSingleProduct = this.BaseUrl+'getSingleProduct'

    static createProduct = this.BaseUrl+'createProduct'
    static createTag = this.BaseUrl+'createTag'

    static DeleteProduct = this.BaseUrl+'deleteProduct'
    

}