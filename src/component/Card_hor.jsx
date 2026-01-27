function Card_hor({ plant }) {
  return (
    <div class="card mb-3 p-2">
      <div className="d-flex gap-3 ">
        <div className="align-self-center">
          <p className="circle rounded-pill p-2 bg-secondary-300  d-flex align-items-center justify-content-center text-white">1</p>
        </div>
        <div className="align-self-center">
          <img src={plant} className="card_hor_image" alt="圖片" />
        </div>
        <div className="flex-grow-1">
          <div className="card-body h-100 d-flex flex-column">
            <div className="mb-auto">
              <h5 className="card-title">虎尾蘭</h5>
              <p className="card-text">snake plant</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p>4.5</p>
              <button type="button" className="btn btn-outline-primary-700">
                超耐陰
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card_hor;
