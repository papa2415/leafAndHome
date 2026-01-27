function Card_place({ place }) {
  return (
    <div className="card radius-top-right">
      <img src={place} className="card-img-top radius-top-right" alt="租屋小套房" />
      <div className="card-body text-center px-6 pb-5">
        <h5 className="card-title h4 text-neutral-900">租屋小套房</h5>
        <p className="card-text">小空間也能綠意盎然</p>
      </div>
    </div>
  );
}

export default Card_place;
