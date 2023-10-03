import reactDom from "react-dom";
type Props = {
  children: React.ReactNode;
};
export default function ModalPortal({ children }: Props) {
  //SSR에서 렌더링 되지 않도록 브라우저 환경에서 존재하는 window객체가 undefined 일 때, return null한다.
  if (typeof window === "undefined") {
    return null;
  }
  const node = document.getElementById("portal") as Element;

  return reactDom.createPortal(children, node);
}
