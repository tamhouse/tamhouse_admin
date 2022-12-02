import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import {postProduct} from '../api/productService';

const AddingProduct = () => {
  const [ descript, setDescript ] = useState({})
  const [ img, setImg ] = useState({})
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
      img: img.file
    }
    const formData = new FormData();
    Object.entries(data).forEach((key) => {
      formData.append(key[0], key[1]);
    });
    const res = await postProduct(formData);
    console.log(res)
    if (res.status === 201) console.log("success");
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
    <div class="container tm-mt-big tm-mb-big">
      <div class="row">
        <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div class="row">
              <div class="col-12">
                <h2 class="tm-block-title d-inline-block">Add Product</h2>
              </div>
            </div>
            <div class="tm-edit-product-row">
              <form onSubmit={create} class="row tm-edit-product-form">
                <div class="col-xl-6 col-lg-6 col-md-6">
                  <div class="form-group mb-3">
                    <label
                      for="name"
                      >Product Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      class="form-control validate"
                      required
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label
                      for="description"
                      >Description
                      </label>
                      <CKEditor
                    editor={ ClassicEditor }
                    data="<p>type something here"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                      setDescript(editor.getData());
                    } }
                />
                  </div>
                  <div class="form-group mb-3">
                    <label
                      for="category"
                      >Category</label>
                    <select
                      name="category"
                      class="custom-select tm-select-accounts"
                      id="category"
                    >
                      <option selected>Select category</option>
                      <option value="New Arrival">New Arrival</option>
                      <option value="2">Most Popular</option>
                      <option value="3">Trending</option>
                    </select>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-block text-uppercase">Add Product Now</button>
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6">
                  <div class="tm-product-img-dummy mx-auto" >
                    { img && img.url && (<img style={styleImg} alt={img.name} src={img.url}/>)}
                    { (!img || !img.url) && (<i class="fas fa-cloud-upload-alt tm-upload-icon" onclick="document.getElementById('fileInput').click();"></i>)}
                  </div>
                  <div class="custom-file mt-3 mb-3">
                    <input id="image" name='image' type="file" style={styleFile} onChange={imageChange}/>
                    <input type="button" class="btn btn-primary btn-block mx-auto" value="UPLOAD PRODUCT IMAGE" onclick="document.getElementById('fileInput').click();"/>
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