import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProductApiUrl,
  listProducts,
} from "../../redux_part/ActionCreaters/productActions";

import Product from "./Product";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import StoreIcon from "@material-ui/icons/Store";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// const Products = () => {
//   const dispatch = useDispatch();
//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products, productsUrl } = productList;

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch, productsUrl]);

//   const navigateToOtherPage = (url) => {
//     url && dispatch(setProductApiUrl(url));
//   };

//   return (
//     <div>
//       {loading ? (
//         <h1>Loading...</h1>
//       ) : error ? (
//         <h2>Error... {error}</h2>
//       ) : (
//         products.count &&
//         products.results.map((product) => (
//           <Product key={product.id} product={product} />
//         ))
//       )}

//       {products.results && (
//         <div>
//           <h1>{products.count} results found</h1>
//           <button
//             disabled={products.previous ? false : true}
//             onClick={() => navigateToOtherPage(products.previous)}
//           >
//             Previus page
//           </button>
//           <button
//             disabled={products.next ? false : true}
//             onClick={() => navigateToOtherPage(products.next)}
//           >
//             Next Page
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;

const useStyles = makeStyles((theme) => ({
  resultInfo: {
    marginBottom: theme.spacing(3),
  },
  noResult: {
    margin: theme.spacing(10),
    textAlign: "center",
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Products = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const productList = useSelector((state) => state.productList);
  const { error, products, productsUrl, status } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, productsUrl]);

  const navigateToOtherPage = (url) => {
    url && dispatch(setProductApiUrl(url));
  };

  return (
    <Container>
      {status === "loading" || status === "idle" ? (
        <CircularProgress className={classes.spinner} />
      ) : status === "fail" ? (
        <div className={classes.noResult}>
          <Typography variant="h2"> {error}</Typography>
        </div>
      ) : (
        status === "success" &&
        (products.count ? (
          <div>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="space-between"
              alignItems="center"
              className={classes.resultInfo}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="h4" justify="center" gutterBottom>
                  {products.count} Results Found
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                  color="primary"
                >
                  <Button
                    startIcon={<NavigateBeforeIcon />}
                    disabled={products.previous ? false : true}
                    onClick={() => navigateToOtherPage(products.previous)}
                  >
                    previous
                  </Button>
                  <Button
                    endIcon={<NavigateNextIcon />}
                    disabled={products.next ? false : true}
                    onClick={() => navigateToOtherPage(products.next)}
                  >
                    next
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              {products.results.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </Grid>
          </div>
        ) : (
          <div className={classes.noResult}>
            <Typography variant="h2">
              {" "}
              ! No results found , try search with other words{" "}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<StoreIcon />}
              onClick={() =>
                navigateToOtherPage("http://localhost:8000/products/all/")
              }
            >
              All Products
            </Button>
          </div>
        ))
      )}
    </Container>
  );
};

export default Products;

// const initialproductListState = {
//   loading: false,
//   products: [
//       {
//           count: 0,
//           next: '',
//           previous: '',
//           results: []
//       }
//   ],
//   error: '',
//   productsUrl : 'http://localhost:8000/products/all/'
// }
