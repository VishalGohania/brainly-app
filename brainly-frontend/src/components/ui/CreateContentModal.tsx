import { useRef, useState } from "react"
import { CrossIcon } from "../../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../../config"

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}

export const CreateContentModal = ({open, onClose}) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube)

  async function addContent(){
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      link,
      title,
      type
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
  }

  return <div>
    {open && <div className="w-screen h-screen fixed bg-slate-500 top-0 left-0 opacity-60 flex justify-center">

      <div className="flex flex-col justify-center">
        <span className="bg-white opacity-100 p-4 rounded-md">
          <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer">
              <CrossIcon size="md"/>
            </div>
          </div>
          <div>
            <Input reference={titleRef} placeholder="Title"/>
            <Input reference={linkRef} placeholder="Link"/>
          </div>
          <div>
            <h1>Type</h1>
            <div className="flex gap-1 justify-center pb-2">
              <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} size="md" onClick={() => {
                setType(ContentType.Youtube)
              }}>YouTube</Button>
              <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} size="md" onClick={() => {
                setType(ContentType.Twitter)
              }}>Twitter</Button>
            </div>         
          </div>
          <div className="flex justify-center">
            <Button onClick={addContent} variant="primary" text="Submit" size="md"/>
          </div>
        </span>
      </div>
    </div>
    }
  </div>
}

