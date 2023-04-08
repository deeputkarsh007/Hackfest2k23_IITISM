import { useRef, useState } from "react";
import axios from "axios";
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
  // console.log(image)
  return (
    <>
      <div className="" style={{ height: 400, width: 600 }}>
        <form className="">
          {progress === 0 || progress === 100 ? (
            <div className="">
              <button className="" onClick={handleImageUpload} type="button">
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
          style={{ height: "400", width: "600" }}
        />
      )}
    </>
  );
}
