function Card_product({ product }) {
  return (
    <div className="card radius-top-right p-2">
      <img src={product} className="radius-top-right mb-2" alt="租屋小套房" />
      <div className="card-body px-2 pb-1">
        <h6 className="card-title h6 text-neutral-900">龜背芋</h6>
        <h6 className="fs-8 fs-bold">Monstera Deliciosa</h6>
        <div className="d-flex justify-content-between align-items-center pt-3">
          <p>4.5</p>
          <p>NT $340</p>
        </div>
      </div>
    </div>
  );
}

export default Card_product;
