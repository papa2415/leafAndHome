import { useParams } from "react-router";

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <div>
      <h1>訂單編號:{id}</h1>;
    </div>
  );
}
