import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 200,
      minWidth: 200,
      maxHeight: 280,
      minHeight: 280,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 250,
      minWidth: 250,
      maxHeight: 350,
      minHeight: 350,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 300,
      minWidth: 300,
      maxHeight: 420,
      minHeight: 420,
    },
  },
  actionButtons: {
    marginLeft: theme.spacing(1),
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
}));

const Product = ({ product }) => {
  const classes = useStyles();
  const { id, name, price, stockCount, image, offer, category } = product;
  const [favourite, setFavourite] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Badge badgeContent={offer ? "In Offer" : 0} color="secondary">
        <Card raised>
          <CardHeader
            action={
              <IconButton
                aria-label="favorite"
                onClick={() => setFavourite((prev) => !prev)}
                color={favourite ? "secondary" : "inherit"}
              >
                {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            }
            title={name}
            subheader={
              stockCount > 100
                ? "In Stock"
                : stockCount > 50
                ? `${stockCount} Stocks Left`
                : "Few Stocks Left"
            }
          />
          <CardActionArea component={Link} to={`product/${id}`}>
            <CardMedia
              component="img"
              alt={name}
              height="140"
              image={image}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <span>{price} &#8377;</span>
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                justify="center"
              >
                This product is so awesome that it can be beautiful offer{" "}
                {offer}, category {category}, stock {stockCount}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions className={classes.actionButtons}>
            <Button
              size="medium"
              color="primary"
              variant="outlined"
              startIcon={<AddShoppingCartIcon />}
            >
              Add To Cart
            </Button>
            <Button size="medium" color="secondary" variant="outlined">
              Buy Now
            </Button>
          </CardActions>
        </Card>
      </Badge>
    </Grid>
  );
};

export default Product;

export function ImgMediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <div>
            <IconButton aria-label="settings">
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        }
        title={
          <Badge badgeContent={"2"} color="secondary">
            Shrimp
          </Badge>
        }
        subheader="September 14, 2016"
      />
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

// const Product = ({ product }) => {
//   const { id, name, price, stockCount, image, offer, category } = product;
//   return (
//     <div>
//       <Link to={`product/${id}`}>
//         <h1>
//           {id} . Product name {name}
//         </h1>
//       </Link>
//       <h1>Product price {price}</h1>
//       <h2>Product stockCount {stockCount}</h2>
//       <img src={image} alt={name} height="250px" width="250px" />
//       <h5>Product offer {offer}</h5>
//       <h5>Product category {category}</h5>
//     </div>
//   );
// };

// export default Product;
