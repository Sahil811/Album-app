import "./App.css";
import React, { Suspense } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import AlbumList from "./routes/AlbumList";
//import AlbumDetails from "./routes/AlbumDetails";
const AlbumDetails = React.lazy(() => {
  return import("./routes/AlbumDetails");
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route
              path="/albumDetails/:albumId/:userId"
              render={(props) => <AlbumDetails {...props} />}
            />
            <Route path="/" exact component={AlbumList} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
