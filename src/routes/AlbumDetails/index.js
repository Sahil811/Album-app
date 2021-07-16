import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./index.scss";
import PhotoCard from "../../components/PhotoCard";
import Pagination from "../../components/Pagination";
import { fetchEntity } from "../../redux/actions";
import { API } from "../../constant";
import {
  ALBUM_PHOTOS_FETCH_DATA_SUCCESS,
  ALBUM_DETAILS_FETCH_DATA_SUCCESS,
  USER_DETAILS_FETCH_DATA_SUCCESS,
} from "../../redux/actions/actionTypes";
import albumDetails from "../../redux/reducers/albumDetails";
import { userDetailsReducer } from "../../redux/reducers";

const AlbumDetails = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9);

  // Getting the Album Id from Url
  let { albumId, userId } = useParams();

  useEffect(() => {
    document.title = "Albums List";
    const { triggerFetchEntity } = props;
    triggerFetchEntity(
      `${API.ALBUM_LIST}${albumId}/photos`,
      ALBUM_PHOTOS_FETCH_DATA_SUCCESS,
      {},
      1,
      5
    );

    triggerFetchEntity(
      `${API.ALBUM_LIST}${albumId}`,
      ALBUM_DETAILS_FETCH_DATA_SUCCESS,
      {}
    );

    triggerFetchEntity(
      `${API.USER_LIST}${userId}`,
      USER_DETAILS_FETCH_DATA_SUCCESS,
      {}
    );
  }, []);

  const { userDetails, albumDetails, photos } = props;

  // Get current Album
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const currentPhotos =
    photos?.photosData?.slice(indexOfFirst, indexOfLast) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="albumList">
      <div className="albumList_title">
        {albumDetails ? `${albumDetails?.title.substring(0, 13)}...` : "NA"}
      </div>
      <div className="albumList_user">
        Uploaded By: {userDetails?.name || "NA"}
      </div>
      <div className="albumList_data">
        <div className="albumList_data-Top-modify">
          {currentPhotos && currentPhotos?.length > 0
            ? currentPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  image={photo.thumbnailUrl}
                  id={photo.id}
                  albumId={photo.albumId}
                  title={photo.title}
                />
              ))
            : "NO DATA"}
        </div>

        <div className="albumList_data-bottom">
          <Pagination
            perPage={perPage}
            total={photos?.photosData?.length || 0}
            paginate={paginate}
            currentPage={currentPage}
            dataLength={currentPhotos.length}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerFetchEntity: (endpoint, action, payload, page, limit) =>
      dispatch(fetchEntity({ endpoint, action, payload, page, limit })),
  };
};

const mapStateToProps = (state) => {
  const { photos, userDetails, albumDetails } = state;
  return {
    photos,
    userDetails,
    albumDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetails);
