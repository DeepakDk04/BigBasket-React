import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Badge from "@material-ui/core/Badge";
// import IconButton from "@material-ui/core/IconButton";
// import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import ErrorIcon from "@material-ui/icons/Error";
import CheckIcon from "@material-ui/icons/Check";
import Tooltip from "@material-ui/core/Tooltip";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: "50vw",
      minWidth: "50vw",
      maxHeight: "50vh",
      minHeight: "50vh",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "50vw",
      minWidth: "50vw",
      maxHeight: "50vh",
      minHeight: "50vh",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: "40vw",
      minWidth: "40vw",
      maxHeight: "60vh",
      minHeight: "60vh",
    },
    [theme.breakpoints.down("lg")]: {
      maxWidth: "40vw",
      minWidth: "40vw",
      maxHeight: "80vh",
      minHeight: "80vh",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "40vw",
      minWidth: "40vw",
      maxHeight: "80vh",
      minHeight: "80vh",
    },
  },
  grid: {
    marginTop: theme.spacing(3),
  },
  offerPrice: {
    textDecoration: "line-through",
    color: "#adadad",
  },
  cateogeries: {
    display: "flex",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  actionButtons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
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

const ProductView = () => {
  const classes = useStyles();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, error, status } = productDetail;
  const { id, name, price, stockCount, image, offer, category } = product;
  const isOfferExist = offer ? true : false;
  const isExpired = isOfferExist ? isOfferExpired(offer.expiry) : null;
  const offerStartDate = isOfferExist
    ? formatDateDisplay(getExpiryDateTime(offer.start))
    : null;
  const offerExpiryDate = isOfferExist
    ? formatDateDisplay(getExpiryDateTime(offer.expiry))
    : null;

  return (
    <Container key={id}>
      {status === "loading" || status === "idle" ? (
        <h1>
          <CircularProgress className={classes.spinner} />
        </h1>
      ) : status === "fail" ? (
        <div className={classes.noResult}>
          <Typography variant="h2"> {error}</Typography>
        </div>
      ) : (
        status === "success" && (
          <Grid
            container
            spacing={5}
            className={classes.grid}
            direction="row"
            justify="space-evenly"
            alignItems="stretch"
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Card raised>
                <CardMedia
                  component="img"
                  alt={name}
                  image={image}
                  title={name}
                />
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box>
                <Typography gutterBottom variant="h2">
                  {name}
                </Typography>
                <Typography gutterBottom variant="h4">
                  <span
                    className={
                      isOfferExist && !isExpired ? classes.offerPrice : ""
                    }
                  >
                    {price}{" "}
                  </span>
                  {isOfferExist &&
                    !isExpired &&
                    `${price - (price * offer.percentage) / 100}`}{" "}
                  Rupees
                  <Typography gutterBottom variant="caption" color="secondary">
                    {isOfferExist &&
                      !isExpired &&
                      ` ( "${offer.description}" applied )`}
                  </Typography>
                </Typography>

                <Typography gutterBottom variant="subtitle2" color={"inherit"}>
                  {stockCount > 0 ? (
                    stockCount < 25 ? (
                      <Chip
                        color="secondary"
                        size="small"
                        icon={<ErrorIcon />}
                        label="Only Few Stocks Left"
                      />
                    ) : (
                      <Chip
                        variant="outlined"
                        color="primary"
                        size="small"
                        icon={<CheckIcon />}
                        label="In Stock"
                      />
                    )
                  ) : (
                    <Chip
                      variant="outlined"
                      color="secondary"
                      size="small"
                      icon={<ErrorIcon />}
                      label="Out Of Stock"
                    />
                  )}
                </Typography>
                {isOfferExist && !isExpired && (
                  <Card>
                    <CardContent>
                      <Typography color="textPrimary" gutterBottom>
                        Offer Details
                      </Typography>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {offer.description}
                      </Typography>
                      <Typography color="secondary" variant="subtitle2">
                        Flat {offer.percentage} % offer
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Starts From : {offerStartDate}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Ends in : {offerExpiryDate}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                )}
                {isExpired && (
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    Offer Expired
                  </Typography>
                )}
                <Box className={classes.cateogeries}>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    color="textSecondary"
                  >
                    categories
                  </Typography>
                  {category &&
                    category.map((categ) => (
                      <Tooltip
                        key={categ.id}
                        title={categ.description}
                        aria-label={categ.description}
                      >
                        <Chip
                          variant="outlined"
                          color="primary"
                          size="small"
                          label={categ.name}
                        />
                      </Tooltip>
                    ))}
                </Box>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                  spacing={2}
                  className={classes.actionButtons}
                >
                  <Grid item xs={8} sm={8} md={4} lg={4}>
                    <Button
                      size="large"
                      color="primary"
                      variant="outlined"
                      startIcon={<ShoppingCartIcon />}
                    >
                      Add Cart
                    </Button>
                  </Grid>
                  <Grid item xs={8} sm={8} md={4} lg={4}>
                    <Button
                      size="large"
                      color="secondary"
                      variant="outlined"
                      startIcon={<CreditCardIcon />}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  component={Link}
                  to={"/"}
                  startIcon={<NavigateBeforeIcon />}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        )
      )}
    </Container>
  );
};

export default ProductView;

// const initialProductDetailState = {
//   loading: false,
//   product: {},
//   error: ''
// }

// productDetail: {
//   loading: false,
//   product: {
//     id: 10,
//     name: 'lakme kajal Iconic',
//     price: 150,
//     stockCount: 250,
//     image: 'http://localhost:8000/media/img/products/lakme-02-jpg-250x250.jpg',
//     offer: {
//       id: 3,
//       description: 'get 5% Off on Lakme Kajal',
//       percentage: 5,
//       start: '2021-05-03T20:26:25.957365+05:30',
//       expiry: '2021-05-22T18:00:00+05:30'
//     },
//     category: [
//       {
//         id: 5,
//         name: 'Beauty products',
//         description: 'Products make you Beautiful'
//       },
//       {
//         id: 6,
//         name: 'ladies beauty specials',
//         description: 'Products make you Beautiful'
//       }
//     ]
//   },
//   error: ''
// }

const getExpiryDateTime = (expiryString) => {
  const splitarray = expiryString.split("T");

  const datestring = splitarray[0];
  const timepart = splitarray[1].split("+");
  const timestring = timepart[0];

  const reqDates = datestring.split("-");
  const year = reqDates[0];
  const month = parseInt(reqDates[1]) - 1;
  const date = reqDates[2];

  const reqTimes = timestring.split(":");
  const hours = reqTimes[0];
  const minutes = reqTimes[1];
  const seconds = reqTimes[2];

  return new Date(year, month, date, hours, minutes, seconds);
};

const isOfferExpired = (expiry) => {
  const expiryDate = getExpiryDateTime(expiry);
  const today = new Date();

  return today <= expiryDate ? false : true;
};

const formatDateDisplay = (dateObject) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();
  let hour = dateObject.getHours();
  let minute = dateObject.getMinutes();
  let noon = "AM";
  if (parseInt(hour) > 12) {
    noon = "PM";
    hour = parseInt(hour) - 12;
  }

  minute =
    minute.toString().length === 1
      ? "0" + minute.toString()
      : minute.toString();

  const formatedString = `${month} ${date}, ${year} ${hour}:${minute} ${noon}`;

  return formatedString;
};
