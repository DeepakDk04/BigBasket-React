import React, { useState } from "react";
import { useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

import List from "@material-ui/core/List";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SubjectSharpIcon from "@material-ui/icons/SubjectSharp";
import SearchIcon from "@material-ui/icons/Search";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import NewReleasesIcon from "@material-ui/icons/NewReleases";

import { setProductApiUrl } from "../../redux_part/ActionCreaters/productActions";

const FilterProducts = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const BASE_URL = "http://localhost:8000/products/all/";
  const SORTBY_A_Z = `${BASE_URL}?ordering=name`;
  const SORTBY_Z_A = `${BASE_URL}?ordering=-name`;
  const SORTBY_LowPrice_HighPrice = `${BASE_URL}?ordering=price`;
  const SORTBY_HighPrice_LowPrice = `${BASE_URL}?ordering=-price`;
  const SORTBY_Availability = `${BASE_URL}?ordering=-stockCount`;
  const SORTBY_Latest = `${BASE_URL}?ordering=-id`;
  const SORTBY_Trending = `${BASE_URL}?ordering=stockCount`;

  const FilterByCategory = (url, filterField) => {
    dispatch(setProductApiUrl(url));
    setSelectedFilter(filterField);
  };

  const FilterByName = () => {
    const url = `${BASE_URL}?search=${searchName}`;
    dispatch(setProductApiUrl(url));
    setSearchName("");
  };

  return (
    <React.Fragment>
      <List>
        <ListItem>
          <ListItemIcon>
            {" "}
            <GraphicEqIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Search Products"} />
        </ListItem>
      </List>

      <List>
        <ListItem>
          <TextField
            label="Product Name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            autoFocus={false}
          />
          <IconButton
            aria-label="search"
            color="primary"
            onClick={() => FilterByName()}
            disabled={searchName ? false : true}
          >
            <SearchIcon />
          </IconButton>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemIcon>
            {" "}
            <SubjectSharpIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Filter Products"} />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem
          button
          selected={selectedFilter === "aZ" ? true : false}
          onClick={() => FilterByCategory(SORTBY_A_Z, "aZ")}
        >
          <ListItemIcon>
            {" "}
            <SortByAlphaIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"A to Z "} />
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          selected={selectedFilter === "zA" ? true : false}
          onClick={() => FilterByCategory(SORTBY_Z_A, "zA")}
        >
          <ListItemIcon>
            {" "}
            <SortByAlphaIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Z to A "} />
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          selected={selectedFilter === "lowHigh" ? true : false}
          onClick={() => FilterByCategory(SORTBY_LowPrice_HighPrice, "lowHigh")}
        >
          <ListItemIcon>
            {" "}
            <AttachMoneyIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Low price to High Price "} />
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          selected={selectedFilter === "highLow" ? true : false}
          onClick={() => FilterByCategory(SORTBY_HighPrice_LowPrice, "highLow")}
        >
          <ListItemIcon>
            {" "}
            <AttachMoneyIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"High price to Low Price "} />
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          selected={selectedFilter === "latest" ? true : false}
          onClick={() => FilterByCategory(SORTBY_Latest, "latest")}
        >
          <ListItemIcon>
            {" "}
            <NewReleasesIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Latest "} />
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          selected={selectedFilter === "trending" ? true : false}
          onClick={() => FilterByCategory(SORTBY_Trending, "trending")}
        >
          <ListItemIcon>
            {" "}
            <TrendingUpIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Trending "} />
        </ListItem>
      </List>

      <List>
        <ListItem
          button
          selected={selectedFilter === "availability" ? true : false}
          onClick={() => FilterByCategory(SORTBY_Availability, "availability")}
        >
          <ListItemIcon>
            {" "}
            <DashboardIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"Availability "} />
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default FilterProducts;

// const dummy = () => {
//   <div>
//     <div>
//       search products
//       <input
//         type="text"
//         placeholder="enter product name"
//         value={searchName}
//         onChange={(e) => setSearchName(e.target.value)}
//       />
//       <button onClick={() => FilterByName()}>Search</button>
//     </div>

//     <button onClick={() => FilterByCategory(SORTBY_A_Z)}>
//       sort by A to Z{" "}
//     </button>
//     <button onClick={() => FilterByCategory(SORTBY_Z_A)}>
//       sort by Z to A{" "}
//     </button>
//     <button onClick={() => FilterByCategory(SORTBY_LowPrice_HighPrice)}>
//       sort by low price to high price{" "}
//     </button>
//     <button onClick={() => FilterByCategory(SORTBY_HighPrice_LowPrice)}>
//       sort by high price to low price{" "}
//     </button>
//     <button onClick={() => FilterByCategory(SORTBY_Availability)}>
//       sort by Availability{" "}
//     </button>
//     <button onClick={() => FilterByCategory(SORTBY_Latest)}>
//       sort by latest products{" "}
//     </button>
//     <button onClick={() => FilterByCategory(SORTBY_Trending)}>
//       sort by trending products{" "}
//     </button>
//   </div>;
// };
