
import axios from 'axios'
import React, {useState} from 'react'
import styled from 'styled-components';

const ImageUpload = ({url,handleurl}) => {

const [selectedFile, setSelectedFile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const ImagePreviewContainer = styled.div`
    background-color: #CFCFCF;
    width: 50%;
    min-height: 60px;
    border-radius: 10px;
    position: relative;
  `;

  const fileSelectHandler = (evt) => {
    setSelectedFile(evt.target.files[0]);
    console.log(selectedFile);
  }

  const fileUploadHandler = (evt) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('tags', `codeinfuse, medium, gist`);
    formData.append('upload_preset', 'FECimages'); //folder name
    formData.append('api_key', '272364821824685');
    formData.append('timestamp', (Date.now() / 1000) || 0);
    setIsLoading(true);

    return axios.post('https://api.cloudinary.com/v1_1/db2wefzgf/image/upload', formData, {
      headers: {"X-Requested-With": "XMLHttpRequest"}
    })
      .then((response) => {
        const data = response.data;
        // console.log(data);
        const imageurl = data.secure_url;
        console.log(imageurl);
        handleurl(imageurl);
        setSelectedFile({});
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const imagePreview = () => {
    if (isLoading) {
      return (
        <ImagePreviewContainer>
          <label>Loading... </label>
        </ImagePreviewContainer>
      )
    } else {
      return (
        <ImagePreviewContainer>
          {url.length > 0 ?
          url.map((image) => (
            <img alt="uploaded image" style={{width: "50px", height: "50px", padding:"5px"}} src={image} />
          ))
          : <span className="image-text">No Images Uploaded Yet</span>}
        </ImagePreviewContainer>
      )
    }
  }

  return (
      <div>
        {url.length < 5 ?
        <div>
          <input type="file" onChange={fileSelectHandler}/>
          <button onClick={fileUploadHandler}>Upload</button>
        </div> :
        <div>
          <label>Maximum amount of photos uploaded</label>
        </div>}
      {imagePreview()}
      </div>
  )
}


export default ImageUpload;

