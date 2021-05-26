import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";

import Hidden from "@material-ui/core/Hidden";
// import AppBar from "@material-ui/core/AppBar";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";

import Products from "../components/Products/Products";
import FilterProducts from "../components/Products/FilterProducts";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
  },
}));

// const Home = () => {
//   const dispatch = useDispatch();
//   const { productsUrl } = useSelector((state) => state.productList);

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch, productsUrl]);

//   return (
//     <div>
//       Home
//       <Products />
//       <br />
//       <FilterProducts />
//     </div>
//   );
// };

// export default Home;

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <FilterProducts />
          </div>
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <Toolbar />
        <Products />
      </main>
    </div>
  );
};

export default Home;

// export function ClippedDrawer() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <CssBaseline />

//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <Typography variant="h6" noWrap>
//             Clipped drawer
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <Toolbar />

//         <div className={classes.drawerContainer}>
//           <List>
//             <ListItem button key={1}>
//               <ListItemIcon>
//                 {" "}
//                 <InboxIcon />{" "}
//               </ListItemIcon>
//               <ListItemText primary={"Price"} />
//             </ListItem>
//           </List>
//           <Divider />
//           <List>
//             <ListItem button key={2}>
//               <ListItemIcon>
//                 {" "}
//                 <MailIcon />{" "}
//               </ListItemIcon>
//               <ListItemText primary={"Name"} />
//             </ListItem>
//           </List>
//         </div>
//       </Drawer>

//       <main className={classes.content}>
//         <Toolbar />
//         <Products />
//       </main>
//     </div>
//   );
// }
