import { useRef, useState } from "react";
import axios from "axios";
import './ImageUpload.css'

const cloudname = "dmhsbpc29";
const preset = "hackathon_preset";

export default function ImageUploader({ defaultImage, setImgUrl, uploaded }) {
  const fileSelect = useRef(null);
  const [image, setImage] = useState(defaultImage);
  const [progress, setProgress] = useState(0);
  // console.log(uploaded, "yehhh")
  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      //   console.log(files[i]);
      uploadFile(files[i]);
    }
  }
  async function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/${cloudname}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);

        setImage(response.secure_url);
        // console.log({ resp: response.secure_url });
        setImgUrl(response.secure_url);
      }
    };

    fd.append("upload_preset", preset);
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    const resp = await xhr.send(fd);
    // console.log({resp});
    // const ress = await axios.post()
  }
  // const ButtonStyle = {
  //   font: "bolder",
  //   cursor: "pointer",
  //   padding: "0.5rem 1.5rem",
  //   border: "1px solid rgb(49, 208, 44)",
  //   backgroundColor: "rgb(65, 209, 60)",
  //   color: "white",
  //   borderRadius: "12px",
  //   marginRight: "1rem",
  //   boxShadow:
  //     "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  // };
  // console.log(image)

  const ButtonStyle = {
    margin:'2px',
    font: "bolder",
    cursor: "pointer",
    padding: "0.5rem 1.5rem",
    border: "1px solid #00ABB3",
    backgroundColor: "#00ABB3",
    color: "white",
    borderRadius: "12px",
    marginRight: "1rem",
    
  };

  return (
    <>
      <div className="" style={{ height: "auto", width: "100%" }}>
        <div className="" style={{ height: "auto", width: "100%" }}>
          <form className="">
            {progress === 0 || progress === 100 ? (
              <div className="">
                <button
                  className="BrowseButton"
                  onClick={handleImageUpload}
                  type="button"
                  style={ButtonStyle}
                  
                >
                  Browse
                </button>
               
              </div>
            ) : (
              <span className="">{progress}%</span>
            )}

            <input
              ref={fileSelect}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </form>
        </div>
        {/* {console.log(uploaded) } */}
        {image && !uploaded && (
          <img
            className=""
            src={image.replace("upload/", "upload/w_600/")}
            style={{ height: "400", width: "600", padding:'10px' ,margin:'auto',maxWidth:'90%'}}
          />
        )}
      </div>
    </>
  );
}
