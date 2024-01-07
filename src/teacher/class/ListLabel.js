import React from "react";
import CardLabel from "../../modal/cardLabel";
import { Link } from "react-router-dom";

const ListLabel = () => {
  const [labels, setLabels] = React.useState([]);

  let items = [];

  React.useEffect(() => {
    const getData = async () => {
      await fetch("http://127.0.0.1:8080/dashboard/create-question", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.label;
        })
        .then((response) => {
          let arrIn = [];
          for (let i = 0; i < response.length; i++) {
            arrIn.push(response[i]);
          }

          setLabels(arrIn);
        });
    };
    getData();
  }, []);

  for (let i = 0; i < labels.length; i++) {
    items.push(<CardLabel label={labels[i]} />);
  }

  return (
    <>
      <div className="container mt-5">
        <div className="mt-5"></div>

        <div className="close">
          <Link to="/teacher/class/quiz/question">
            <button type="button" class="btn-close">
              <span class="icon-cross"></span>
              <span class="visually-hidden">Close</span>
            </button>
          </Link>
        </div>

        <h1 className="judul mb-3">List Question Label</h1>

        <hr></hr>
        {items}
      </div>
    </>
  );
};

export default ListLabel;
