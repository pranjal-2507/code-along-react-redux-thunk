import React from "react";
import { thunk } from "redux-thunk";
import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import reducer from "./Reducer";
import { fetchUserData, showError } from "./Action";

// make the store
const store = createStore(reducer, applyMiddleware(thunk));
// fetch the data
const fetchData = () => async () => {
  try {
    let data = await axios.get("https://jsonplaceholder.typicode.com/users");
    store.dispatch(fetchUserData(data.data));
  } catch (error) {
    store.dispatch(showError(error));
  }
};

function DisplayData() {
  const [showData, setShowData] = React.useState(false);
  const [data, setData] = React.useState([]);

  function handleClick() {
    store.dispatch(fetchData());
    setShowData(!showData);
  }

  React.useEffect(() => {
    let subscribe = store.subscribe(() => setData(store.getState().users));
    return subscribe;
  }, []);

  // console.log(Data)
  return (
    <>
      <div>
        <button onClick={handleClick}>
          {showData ? "Hide Data" : "Fetch Data"}
        </button>
        {showData && (
          <div>
            {data.map((el, i) => (
              <div key={i}>
                <h3>{el.name}</h3>
                <h3>{el.email}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default DisplayData;
