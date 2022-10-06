import { useEffect, useRef } from "react";

const useDidMount = () => {
  const didMountRef = useRef(true);

  useEffect(() => {
    didMountRef.current = true;
  }, []);
  return didMountRef.current;
};

export default useDidMount;
