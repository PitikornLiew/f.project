import axios from 'axios';
import { useState, useEffect } from 'react';
import addPostCommu from './addPostCommu.css';
import Success from "./success"
import Bug from './bug';

function AddPostCommu() {
    const [ID, setID] = useState('');
    const [ProIMG, setProIMG] = useState(null);
    const [Detail, setDetail] = useState('');
    const [addStatus, setAddStatus] = useState(null);

    const handleSubmit = async () => {

        const formData = new FormData();
        formData.append('id', ID);
        formData.append('product_name', Detail);
        formData.append('image_product', ProIMG, ProIMG.name);

        try {
            const response = await axios.post("http://localhost:5003//posts/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                setAddStatus({
                    message: "Post Successful",
                    success: true
                });
            } else {
                setAddStatus({
                    message: "Post Failed",
                    success: false
                });
            }
        } catch (error) {
            setAddStatus({
                message: "Error",
                success: false
            });
        }
    }
    
    useEffect(() => {
        if (addStatus && addStatus.success) {
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 1 seconds
        }
    }, [addStatus]);

    return (
        <form onSubmit={handleSubmit} className={addPostCommu.enter}>

            <div className={addPostCommu.flex}>

                <div className={addPostCommu.bigger}>
                <div className={addPostCommu.name}><h1>User: </h1></div>
                <div className={addPostCommu.boxID}>
                    <input type="text" value={ID} onChange={e => setID(e.target.value)} placeholder="User" className={addPostCommu.boxID} />
                </div>
                </div>

                <div className={addPostCommu.bigger}>
                <div className={addPostCommu.name}><h1>Import Image: </h1></div>
                <div className={addPostCommu.boxIMG}>
                    <input type="file" onChange={e => setProIMG(e.target.files[0])} className={addPostCommu.boxIMGS} />
                </div>
                </div>
                
                <div className={addPostCommu.bigger}>
                <div className={addPostCommu.name}><h1>Detail: </h1></div>
                <div className={addPostCommu.boxP}>
                    <input type="text" value={Detail} onChange={e => setDetail(e.target.value)} placeholder="Name" className={addPostCommu.boxP}/>
                </div>
                </div>

            </div>

                <div className={addPostCommu.butt}>
                    <button type="submit">Post</button>
                </div>
            
            {addStatus && addStatus.success && <Success message={"Post Successful"} />}
            {addStatus && !addStatus.success && <Bug message={"Post Failed"} />} 
        </form>
    )
}

export default AddPostCommu;