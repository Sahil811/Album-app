import "./index.scss";

const PhotoCard = ({ image, id, title, albumId }) => {
  return (
    <div className="photoCard">
      <div className="photoCard_container">
        <img src={image} alt="albumPhoto" />
      </div>
      <div className="photoCard_title">
        {`${title.substring(0, 10)}...` || "NA"}
      </div>
    </div>
  );
};

export default PhotoCard;
