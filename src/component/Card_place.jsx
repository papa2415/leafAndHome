import { NavLink } from "react-router";
function Card_place({ image, title, content }) {
  return (
    <>
      <NavLink className="place" to="/products">
        <div className="card radius-top-right position-relative">
          <img src={image} alt="租屋小套房" />
          <div className="position-absolute  bottom-0  text-center px-6 pb-5 pt-4 w-100 backgroud_blur">
            <h5 className="card-title h4 text-neutral-900 mb-2">{title}</h5>
            <p className="card-text">{content}</p>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default Card_place;
