import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | HavenKeys`;
  }, [title]);
};

export default usePageTitle;
