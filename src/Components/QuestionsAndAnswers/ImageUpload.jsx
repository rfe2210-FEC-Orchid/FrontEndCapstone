
import ReactDOM from 'react-dom';
import axios from 'axios'
import React, {useState} from 'react'

const ImageUpload = ({image, setImage,url,setUrl}) => {
  const uploadImage = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "wzr4tqnj")
    data.append("cloud_name","dvzmvxypr")
    fetch("https://api.cloudinary.com/v1_1/dvzmvxypr/image/upload", {
      method:"post",
      body: data
    })
    .then(resp => resp.json())
    .then(data => {
    setUrl([...url,data.url])
    })
    .catch(err => console.log(err))
    }
  return (
  <div>
  <div>
  <input type="file" name = 'file[]' onChange= {(e)=> setImage(e.target.files[0])} multiple/>
  <button onClick={uploadImage}>Upload</button>
  <input type="file" name = 'file[]' onChange= {(e)=> setImage(e.target.files[0])} multiple/>
  <button onClick={uploadImage}>Upload</button>
  <input type="file" name = 'file[]' onChange= {(e)=> setImage(e.target.files[0])} multiple/>
  <button onClick={uploadImage}>Upload</button>
  </div>
  </div>
  )
  }

export default ImageUpload;

