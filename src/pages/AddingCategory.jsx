import { useEffect, useState } from "react";
import { getCategories, postCategory } from "../api/categoryservice";

const AddingCategory = () => {
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    console.log(load);
    async function load(){
      const category = await getCategories();
      setCategories(category.data)
    }
    load();
  }, [reload])
  function annouce(){
    alert("thêm danh mục thành công");
  }
  const create = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      parent: e.target.parent.value,
    }
    const formData = new FormData();
    Object.entries(data).forEach((key) => {
      formData.append(key[0], key[1]);
    });
    const res = await postCategory(data);
    if (res.status === 201){
      annouce()
      setReload(reload+1)
    } 
  }
  return (
    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-xl-6 col-lg-7 col-md-8 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row">
              <div className="col-12">
                <h2 className="tm-block-title d-inline-block">Thêm danh mục</h2>
              </div>
            </div>
            <div className="tm-edit-product-row">
              <form onSubmit={create} className="row tm-edit-product-form">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="form-group mb-3">
                    <label
                      htmlFor="name"
                      >Tên danh mục
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control validate"
                      required
                    />
                  </div>      
                  <div className="form-group mb-3">
                    <label
                      htmlFor="category"
                      >Danh mục cha</label>
                    <select
                      name="parent"
                      className="custom-select tm-select-accounts"
                      id="category"
                    >
                      <option value="0">Không</option>
                      {categories && categories.map((category) => {
                        return (<option key={category.name} value={category.name}>{category.name}</option>)
                      })}
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary btn-block text-uppercase">Thêm</button>
                    </div>      
                </div>
              </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
export default AddingCategory