import { CKEditor } from '@ckeditor/ckeditor5-react';
import classicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from 'react';
import {postProduct} from '../api/productService';
import { getCategories } from '../api/categoryservice';
import { instance } from '../api/base';

const AddingProduct = () => {
  const [ descript, setDescript ] = useState({})
  const [ img, setImg ] = useState({})
  const [ categories, setCategories] = useState([])
  useEffect(() => {
    const loadCategory = async () => {
      let cate = []
      const category = (await getCategories()).data
      category.forEach(element => {
        if(element.child && element.child.length > 0){
          element.child.forEach(item => {
            cate.push(item.name)
          });
        }
        cate.push(element.name)
      });
      setCategories(cate)
    }
    loadCategory();
  }, [])
  const styleFile = {
    top: "-350px",
    position: "absolute",
    opacity: 0,
    height: "402px",
    cursor: "pointer"
  }
  const styleImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }
  const create = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      category: e.target.category.value,
      descript,
      image: img.file
    }
    const formData = new FormData();
    Object.entries(data).forEach((key) => {
      formData.append(key[0], key[1]);
    });
    const res = await postProduct(formData);
    if (res.status === 201){
      document.getElementById("form").reset()
      alert("thêm thành công");
    } 
  }
  const uploadAdapter = (loader) =>{
    const API_URL = "http://localhost:3000"
    return {
      upload : () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then(async (file) => {
            body.append("uploadImg", file);
            const res = await instance.post("/images", body)
            resolve({ default: `${API_URL}/img/${res.data}`})
          })
        })
      }
    }
  }
  const uploadPlugin = (editor) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
  }
  const imageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }
  return (
    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row">
              <div className="col-12">
                <h2 className="tm-block-title d-inline-block">Thêm sản phẩm</h2>
              </div>
            </div>
            <div className="tm-edit-product-row">
              <form onSubmit={create} id="form" className="row tm-edit-product-form">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="form-group mb-3">
                    <label
                      htmlFor="name"
                      >Tên Sản Phẩm
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
                      >Danh Mục</label>
                    <select
                      name="category"
                      className="custom-select tm-select-accounts"
                      id="category"
                    >
                    { categories.map((name) => {
                      return (<option value={name}>{name}</option>)
                    })}
                    </select>
                  </div>      
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tm-product-img-dummy mx-auto" >
                    { img && img.url && (<img style={styleImg} alt={img.name} src={img.url}/>)}
                    { (!img || !img.url) && (<i className="fas fa-cloud-upload-alt tm-upload-icon"></i>)}
                  </div>
                  <div className="custom-file mt-3 mb-3">
                    <input id="image" name='image' type="file" accept="image/*" style={styleFile} onChange={imageChange}/>
                    <input type="button" className="btn btn-primary btn-block mx-auto" value="Tải Ảnh Sản Phẩm"/>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="form-group mb-3">
                      <label
                        htmlFor="description"
                        >Mô tả sản phẩm
                        </label>
                        <CKEditor
                          editor={ classicEditor }
                          data="<p>type something here"
                          onReady={ editor => {
                            uploadPlugin(editor)
                          } }
                          onChange={ ( event, editor ) => {
                            setDescript(editor.getData());
                          } }
                        />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block text-uppercase">Thêm sản phẩm</button>
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
export default AddingProduct