import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function UserCard(props) {
  const [userList, setUserList] = useState(props.results);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserList((userList) => {
        let arrLen = userList.length - 1;
        let temp;
        for (let i = arrLen; i > 0; i--) {
          temp = userList[i];
          userList[i] = userList[i - 1];
          userList[i - 1] = temp;
        }
        console.log(userList);
      });
    }, 2000);
  });

  return (
    <section>
      {props.results.map((item) => (
        <article>
          <h2>
            {item.name.title} {item.name.first} {item.name.last}
          </h2>
          <img src={item.picture.large} />
        </article>
      ))}
    </section>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          results: json.results,
        });
      });
  }

  render() {
    const { isLoaded, results } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <section>
          <UserCard results={this.state.results} />
        </section>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
