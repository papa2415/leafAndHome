import image_plant from "/plant.png";
import Card_hor from "../component/Card_hor";

function Card_list() {
  return (
    <div className="card radius-top-right p-5">
      <h3 className="text-neutral-900">幾乎沒日照也能活</h3>
      <p className="text-neutral-700 mb-5">適合幾乎沒日照空間的植物 TOP 5</p>
      <div className="card-body">
        <div className="row  flex-column g-4">
          <div className="cols">
            <Card_hor image={image_plant} id="1" title="虎尾蘭" enTitle="snake plant" star="4.9" tag="超簡單" />
            <Card_hor image={image_plant} id="1" title="虎尾蘭" enTitle="snake plant" star="4.9" tag="超簡單" />
            <Card_hor image={image_plant} id="1" title="虎尾蘭" enTitle="snake plant" star="4.9" tag="超簡單" />
            <Card_hor image={image_plant} id="1" title="虎尾蘭" enTitle="snake plant" star="4.9" tag="超簡單" />
            <Card_hor image={image_plant} id="1" title="虎尾蘭" enTitle="snake plant" star="4.9" tag="超簡單" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card_list;
