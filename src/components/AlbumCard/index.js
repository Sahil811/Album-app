import "./index.scss";

const AlbumCard = ({ title, name, userId, id, albumDetailsFunction }) => {
  return (
    <div className="albumCard" key={id}>
      <div className="albumCard_left">
        <div className="albumCard_title">
          ALBUM TITLE: {`${title.substring(0, 25)}...`}
        </div>
        <div className="albumCard_user">User: {name || userId}</div>
      </div>

      <div
        className="albumCard_right"
        onClick={() => albumDetailsFunction(`${id}/${userId}`)}
      >
        VIEW MORE
      </div>
    </div>
  );
};

export default AlbumCard;
