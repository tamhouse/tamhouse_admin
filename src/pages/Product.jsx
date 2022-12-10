import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { getCategories } from "../api/categoryservice"
import { deleteProducts, getProducts } from "../api/productService"
const Product = () => {
  const list = []
  const style = {
    maxWidth: "100px",
    objectFit: "cover",
  } 
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    async function load(){
      const product = await getProducts();
      const category = await getCategories();
      setProducts(product.data)
      setCategories(category.data)
    }
    load();
  }, [])
  const removeList = async (e) => {
    e.preventDefault()
    const res = await deleteProducts(list);
    if (res.status === 200)
      console.log("delete success")
  }
  const checkboxChange = (e) => {
    if (e.target.checked)
      list.push(e.target.value)
    else list.pop(e.target.value)
  }
  return (
  <div className="container mt-5">
    <div className="row tm-content-row">
      <div className="col-sm-12 col-md-12 col-lg-10 col-xl-10 tm-block-col">
        <form onSubmit={removeList}>
          <div className="tm-bg-primary-dark tm-block tm-block-products">
            <div className="tm-product-table-container">
              <table className="table table-hover tm-table-small tm-product-table">
                <thead>
                  <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Ngày Tạo</th>
                    <th scope="col">Danh mục</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.map((product) => {
                    return (
                      <tr>
                        <th scope="row"><input value={product.name} type="checkbox" onChange={checkboxChange} name='checkbox' /></th>
                        <td className="tm-product-name" style={{maxWidth: 200,}}>{product.name}</td>
                        <td><img  style={style} src={process.env.REACT_APP_BASE_URL+"img/"+product.img}/></td>
                        <td>{product.createdAt.substring(0,10)}</td>
                        <td>{product.category}</td>
                        <td>
                          <a href="#" className="tm-product-delete-link">
                            <i className="far fa-trash-alt tm-product-delete-icon"></i>
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                
                </tbody>
              </table>
            </div>
            <Link
              to="product/add"
              className="btn btn-primary btn-block text-uppercase mb-3">Thêm sản phẩm</Link>
            <button type='submit' className="btn btn-primary btn-block text-uppercase">
              Xoá các sản phẩm đã chọn
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}
export default Product