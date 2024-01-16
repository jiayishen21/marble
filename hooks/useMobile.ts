import { useWindowSize } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"

const useMobile = () => {
  const { width } = useWindowSize()
  const [mobile, setMobile] = useState<boolean>(false)

  useEffect(() => {
    if (width) {
      const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
      const mobileDevice = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
      setMobile(width <= 768 || mobileDevice)
    }
  }, [width])

  return { mobile, width }
}

export default useMobile