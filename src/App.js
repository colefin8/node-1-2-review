import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      name: "",
      type: "",
      nickname: "",
      deleteName: "",
      editing: false,
    };
  }

  componentDidMount() {
    axios
      .get("/api/pokemon")
      .then((res) => {
        //# res.data will be the data send from the controller function inside send()
        this.setState({ pokemon: res.data });
      })
      .catch((err) => {
        console.log(err, "get request failed");
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addPokemon = () => {
    const { name, type, nickname } = this.state;
    axios
      .post("/api/pokemon", { name, type, nickname })
      .then((res) => {
        this.setState({ pokemon: res.data });
      })
      .catch((err) => {
        console.log(err, "post request failed");
      });
  };

  deletePokemon = () => {
    const { deleteName } = this.state;
    axios
      //# .delete(`/api/pokemon/${deleteName}`)
      .delete(`/api/pokemon?name=${deleteName}`)
      .then((res) => {
        this.setState({ pokemon: res.data });
      })
      .catch((err) => {
        console.log(err, "delete request failed");
      });
  };

  editPokemon = () => {
    const { name, type, nickname } = this.state;

    axios
      .put("/api/pokemon", { name, type, nickname })
      .then((res) => {
        this.setState({ pokemon: res.data });
      })
      .catch((err) => {
        console.log(err, "put request failed");
      });
  };

  render() {
    return (
      <div className="App">
        {this.state.pokemon.map((element, index, array) => {
          return (
            <div>
              <div>{element.name}</div>
              <div>{element.type}</div>
              <div>{element.nickname}</div>
            </div>
          );
        })}
        <div>
          <input name="name" placeholder="name" onChange={this.handleChange} />
          <input name="type" placeholder="type" onChange={this.handleChange} />
          <input
            name="nickname"
            placeholder="nickname"
            onChange={this.handleChange}
          />
          <button onClick={this.addPokemon}>Add a Pokemon</button>
          <button onClick={this.editPokemon}>Edit an exsting pokemon</button>

          <div>To delete a pokemon enter its name below</div>
          <input
            name="deleteName"
            placeholder="pokemon name"
            onChange={this.handleChange}
          />
          <button onClick={this.deletePokemon}>
            {"Delete your pokemon :("}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
