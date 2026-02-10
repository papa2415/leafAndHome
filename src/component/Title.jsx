import titleStroke from "/titleStroke.svg";
function Title({ title }) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-end gap-2 gap-md-5">
        <img className="py-3" src={titleStroke} alt="titleStroke" />
        <h2 className="h2">{title}</h2>
        <img className="py-3 title-rotation" src={titleStroke} alt="titleStroke" />
      </div>
    </>
  );
}

export default Title;
