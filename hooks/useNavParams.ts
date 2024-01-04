import { useRef, useEffect, useState } from "react";

export function useNavParams() {
  //adjust navRef to the height of the navbar (used for future responsiveness)
  const navRef = useRef<any>(null);
  const [navHeight, setNavHeight] = useState<number>(120);

  //update if something changes with the navRef (make sure any dropdowns are absolute)
  useEffect(() => {
    setNavHeight(navRef?.current?.offsetHeight || 120);
  }, [navRef]);

  return { navRef, navHeight };
}
