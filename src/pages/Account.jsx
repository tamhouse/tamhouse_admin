import { useState } from "react";
import { useEffect } from "react";
import { getInfor, updateInfor } from "../api/infor.service";
import { post } from "../api/slide.service";

const Account = () => {
    const [ infor, setInfor ] = useState({});
    const [ img, setImg ] = useState([])
    useEffect(() => {
        async function Load(){
            const res = await getInfor();
            setInfor(res.data[0])
        }
        Load()
    }, [])
    const update = async (e) => {
        e.preventDefault();
        const data = {
          phone: e.target.phone.value,
          zalo: e.target.zalo.value,
          youtube: e.target.youtube.value,
          facebook: e.target.facebook.value,
          email: e.target.email.value,
          address: e.target.address.value,
        }
        const res = await updateInfor(data, infor._id);
        if (res.status === 200){
          alert("cập nhật thành công");
        } 
    }
    const updateSlide = async (e) => {
        e.preventDefault();
        let imgs = []
        const formData = new FormData();
        img.forEach((i) => {
         formData.append("images", i.file);
        })
        console.log(imgs)
        const res = await post(formData);
        console.log(res)
        if (res.status === 200){
          alert("cập nhật thành công");
        } 
    }
    const imageChange = (e) => {
        if (e.target.files) {
            let imgs = [];
            var files = e.target.files;
            [...files].forEach(file => {
                imgs.push({
                    file: file,
                    url: URL.createObjectURL(file),
                });
            });
            setImg(imgs)
        }
      }
    return (
        <div className="" id="home">
            <div className="container mt-5">
                <div className="row tm-content-row">
                <div className="tm-block-col tm-col-avatar">
                    <div className="tm-bg-primary-dark tm-block tm-block-avatar">
                    <h2 className="tm-block-title">Đổi ảnh quảng cáo</h2>
                    <form onSubmit={updateSlide} enctype="multipart/form-data">
                        <div className="tm-avatar-container">
                            {img && img.map((i) => {
                                return (<img style={{maxWidth: "100%"}} alt={i.name} src={i.url}/>)
                            })}
                            <input onChange={imageChange} type="file" multiple="true" accept="image/*" style={{width: "100%"}}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block text-uppercase">
                            cập nhật
                        </button>
                    </form>
                    </div>
                </div>
                <div className="tm-block-col tm-col-account-settings">
                    <div className="tm-bg-primary-dark tm-block tm-block-settings">
                    <h2 className="tm-block-title">Thông tin website</h2>
                    <form onSubmit={update}  className="tm-signup-form row">
                        <div className="form-group col-lg-6">
                        <label htmlFor="name">SĐT</label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            defaultValue={infor.phone}
                            className="form-control validate"
                        />
                        </div>
                        <div className="form-group col-lg-6">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            defaultValue={infor.email}
                            type="email"
                            className="form-control validate"
                        />
                        </div>
                        <div className="form-group col-lg-6">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            id="address"
                            name="address"
                            defaultValue={infor.address}
                            type="text"
                            className="form-control validate"
                        />
                        </div>
                        <div className="form-group col-lg-6">
                        <label htmlFor="facebook">link Facebook</label>
                        <input
                            id="facebook"
                            name="facebook"
                            defaultValue={infor.facebook}
                            type="text"
                            className="form-control validate"
                        />
                        </div>
                        <div className="form-group col-lg-6">
                        <label htmlFor="youtube">link Youtube</label>
                        <input
                            id="youtube"
                            name="youtube"
                            defaultValue={infor.youtube}
                            type="tel"
                            className="form-control validate"
                        />
                        </div>
                        <div className="form-group col-lg-6">
                        <label htmlFor="zalo">số Zalo</label>
                        <input
                            id="zalo"
                            name="zalo"
                            defaultValue={infor.zalo}
                            type="tel"
                            className="form-control validate"
                        />
                        </div>
                        <div className="col-12">
                        <button
                            type="submit"
                            className="btn btn-primary btn-block text-uppercase"
                        >
                            Cập nhật thông tin
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
    )
}
export default Account