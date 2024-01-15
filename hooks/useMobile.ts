import { useWindowSize } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"

const useMobile = () => {
    const {width} = useWindowSize()
    const [mobile, setMobile] = useState<boolean>(false)
  
    useEffect(() => {
      if(width){
        setMobile(width <= 1024)
      }
    }, [width])

    return {mobile, width}
}

export default useMobile