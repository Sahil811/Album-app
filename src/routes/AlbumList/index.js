import { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./index.scss";
import AlbumCard from "../../components/AlbumCard";
import Pagination from "../../components/Pagination";
import { fetchEntity } from "../../redux/actions";
import { API } from "../../constant";
import {
  ALBUM_FETCH_DATA_SUCCESS,
  USER_FETCH_DATA_SUCCESS,
} from "../../redux/actions/actionTypes";

const AlbumList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    document.title = "Albums List";
    const { triggerFetchEntity } = props;
    triggerFetchEntity(API.ALBUM_LIST, ALBUM_FETCH_DATA_SUCCESS, {}, 1, 5);
    triggerFetchEntity(API.USER_LIST, USER_FETCH_DATA_SUCCESS, {});
  }, []);

  const { albums, users } = props;

  // Get current Album
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentAlbums =
    albums?.albumsData?.slice(indexOfFirst, indexOfLast) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const albumDetailsFunction = (albumId) => {
    props.history.push(`/albumDetails/${albumId}`);
  };

  return (
    <div className="albumList">
      <div className="albumList_title">LIST OF ALBUMS</div>
      <div className="albumList_data">
        <div className="albumList_data-Top">
          {currentAlbums && currentAlbums?.length > 0
            ? currentAlbums.map((album, i) => (
                <AlbumCard
                  key={album.id + i}
                  title={album.title}
                  name={
                    (users &&
                      users?.usersData?.length > 0 &&
                      users?.usersData?.find((user) => user.id === album.userId)
                        ?.name) ||
                    "NA"
                  }
                  userId={album.userId}
                  id={album.id}
                  albumDetailsFunction={albumDetailsFunction}
                />
              ))
            : "NO DATA"}
        </div>

        <div className="albumList_data-bottom">
          <Pagination
            perPage={perPage}
            total={albums?.albumsData?.length || 0}
            paginate={paginate}
            currentPage={currentPage}
            dataLength={currentAlbums.length}
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
  const { albums, users } = state;
  return {
    albums,
    users,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
