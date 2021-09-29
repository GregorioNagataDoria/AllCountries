import React, { Component } from "react";
import "./Main.css";
import Arrow from "./arrow-down.svg";
import Search from "./search.svg";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.modeChange = this.modeChange.bind(this);
    this.showChange = this.showChange.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setFilterTab = this.setFilterTab.bind(this);
    this.goBack = this.goBack.bind(this);

    this.state = {
      items: [],
      isLoaded: false,
      mode: "d",
      show: "small",
      showNumber: 0,
      filter: "",
      filterTab: false,
      searching: "",
    };
  }

  componentDidMount() {
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          country: json,
          isLoaded: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  modeChange() {
    if (this.state.mode == "d") {
      this.setState({ mode: "l" });
    } else {
      this.setState({ mode: "d" });
    }
  }

  showChange(t) {
    this.state.country.map((country, index) => {
      if (country.name == t) {
        this.setState({ show: "big" });
        this.setState({ showNumber: index });
      }
    });
  }

  goBack() {
    this.setState({ show: "small" });
  }

  setFilter(r) {
    this.setState({ filter: r });
  }

  setFilterTab() {
    this.setState((prevState) => ({
      filterTab: !prevState.filterTab,
    }));
  }

  render() {
    const {
      isLoaded,
      country,
      mode,
      show,
      showNumber,
      filter,
      filterTab,
      searching,
    } = this.state;

    if (!isLoaded)
      return (
        <div className={`body-${mode}`}>
          <div className="loading">Loading...</div>
        </div>
      );

    return (
      <div className={`body-${mode}`}>
        <div className={`bar-${mode}`}>
          <span className="where">Where in the world ?</span>

          <div className="mode-button-holder" onClick={this.modeChange}>
            {mode == "l" ? "Dark Mode" : "Light Mode"}
          </div>
        </div>
        {show == "small" ? (
          <div>
            {" "}
            <div className={`options-${mode}`}>
              <div className={`search-${mode}`}>
                <img src={Search} className="small-img" />

                <input
                  type="text"
                  className={`search-input-${mode}`}
                  placeholder="Search ..."
                  onChange={(event) => {
                    this.setState({ searching: event.target.value });
                  }}
                />
              </div>
              <div
                className={`filter-${mode}`}
                onClick={() => this.setFilterTab()}
              >
                Filter by region
                <img src={Arrow} className="small-img" />{" "}
                {filterTab ? (
                  <div className={`filter-content-${mode}`}>
                    {" "}
                    <div
                      className="filter-option"
                      onClick={() => this.setFilter("Africa")}
                    >
                      Africa
                    </div>
                    <div
                      className="filter-option"
                      onClick={() => this.setFilter("Americas")}
                    >
                      Americas
                    </div>
                    <div
                      className="filter-option"
                      onClick={() => this.setFilter("Asia")}
                    >
                      Asia
                    </div>
                    <div
                      className="filter-option"
                      onClick={() => this.setFilter("Europe")}
                    >
                      Europe
                    </div>
                    <div
                      className="filter-option"
                      onClick={() => this.setFilter("Oceania")}
                    >
                      Oceania
                    </div>
                    <div
                      className="filter-option"
                      onClick={() => this.setFilter("")}
                    >
                      No Filter
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={`content-${mode}`}>
              <div className="content-flex">
                {" "}
                {country
                  .filter((country) => {
                    if (this.searching == "") {
                      console.log("2");
                      return country;
                    } else if (
                      country.name
                        .toLowerCase()
                        .includes(searching.toLowerCase())
                    ) {
                      console.log("1");
                      return country;
                    }
                  })
                  .map((country, index) => {
                    return (
                      <div>
                        {filter == "" ? (
                          <div
                            className={`country-holder-${mode}`}
                            onClick={() => this.showChange(country.name)}
                          >
                            <img src={country.flag} className="flag" />
                            <div class="name">{country.name}</div>

                            <div className="info-flex">
                              <span>
                                {" "}
                                <span className="desc">Population: </span>
                                {country.population == null
                                  ? "No data"
                                  : country.population}
                              </span>
                              <span>
                                <span className="desc">Region: </span>

                                {country.region == null
                                  ? "No data"
                                  : country.region}
                              </span>
                              <span>
                                {" "}
                                <span className="desc">Capital: </span>
                                {country.capital == null
                                  ? "No data"
                                  : country.capital}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {country.region == filter ? (
                              <div
                                className={`country-holder-${mode}`}
                                onClick={() => this.showChange(country.name)}
                              >
                                <img src={country.flag} className="flag" />
                                <div class="name">{country.name}</div>

                                <div className="info-flex">
                                  <span>
                                    {" "}
                                    <span className="desc">Population: </span>
                                    {country.population == null
                                      ? "No data"
                                      : country.population}
                                  </span>
                                  <span>
                                    <span className="desc">Region: </span>

                                    {country.region == null
                                      ? "No data"
                                      : country.region}
                                  </span>
                                  <span>
                                    {" "}
                                    <span className="desc">Capital: </span>
                                    {country.capital == null
                                      ? "No data"
                                      : country.capital}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              " "
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>{" "}
          </div>
        ) : (
          <div className={`content-${mode}`}>
            <div className={`back-${mode}`} onClick={() => this.goBack()}>
              Back
            </div>
            <div className="big-flex">
              <img src={country[showNumber].flag} className="big-flag" />
              <div className="right-div">
                <div className="country-name">{country[showNumber].name}</div>
                <div className="right-info">
                  <div className="right-info-individual">
                    <span className="info-title"> Native Name:</span>{" "}
                    {country[showNumber].nativeName == null
                      ? "No data"
                      : country[showNumber].nativeName}
                  </div>
                  <div className="right-info-individual">
                    <span className="info-title">Population:</span>{" "}
                    {country[showNumber].population == null
                      ? "No data"
                      : country[showNumber].population}
                  </div>
                  <div className="right-info-individual">
                    <span className="info-title"> Regions: </span>
                    {country[showNumber].region == null
                      ? "No data"
                      : country[showNumber].region}
                  </div>
                  <div className="right-info-individual">
                    <span className="info-title">Sub Regions:</span>{" "}
                    {country[showNumber].subregion == null
                      ? "No data"
                      : country[showNumber].subregion}
                  </div>
                  <div className="right-info-individual">
                    <span className="info-title">Capital:</span>{" "}
                    {country[showNumber].capital == null
                      ? "No data"
                      : country[showNumber].capital}
                  </div>
                  <div className="right-info-individual">
                    <span className="info-title">Top Level Domain:</span>{" "}
                    {country[showNumber].topLevelDomain == null
                      ? "No data"
                      : country[showNumber].topLevelDomain}
                  </div>
                  <div className="right-info-individual">
                    <span className="info-title">Currencies:</span>{" "}
                    {country[showNumber].currencies == null
                      ? "No data"
                      : country[showNumber].currencies[0].code}
                  </div>
                </div>
                <div className="border-div">
                  <span className="info-title">Borders: </span>
                  {country[showNumber].borders === undefined
                    ? "No data"
                    : country[showNumber].borders.map((b) => (
                        <span className={`border-${mode}`}>{b}</span>
                      ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
