import { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { deleteCategory, getCategories } from "../api/categoryservice"
const Category = () => {
  const [categories, setCategories] = useState([])
  const [lock, setLock] = useState(1)
  useEffect(() => {
    async function load(){
      const category = (await getCategories()).data;
      const cate = []
      category.forEach(element => {
        if(element.child && element.child.length > 0){
            element.child.forEach(it => {
                cate.push({name: it.name, parent: element.name})
            });
        }
        cate.push({name: element.name})
      });
      console.log(cate)
      setCategories(cate)
    }
    load();
  }, [lock])
  const del = async (cate) => {
    const res = await deleteCategory(cate);
    if(res.status === 204){
        alert("xoá thành công");
        setLock(lock+1);
    }
  }
  return (
  <div className="container mt-5">
    <div className="row tm-content-row">
      <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-products">
            <div className="tm-product-table-container">
              <table className="table table-hover tm-table-small tm-product-table">
                <thead>
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Danh mục cha</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {categories && categories.map((category) => {
                    return (
                      <tr>
                        <td className="tm-product-name">{category.name}</td>
                        <td>{category.parent && (category.parent)}</td>
                        <td>
                          <a href="#" onClick={(e) => del(category)} className="tm-product-delete-link">
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
                to="category/add"
                className="btn btn-primary btn-block text-uppercase mb-3">Thêm danh mục
            </Link>
          </div>
      </div>
    </div>
  </div>
  )
}
export default Category