import React from "react";
//redux
import { useSelector } from "react-redux";

//material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Spinner from "../util/spinner/spinner";
import SwipeableImages from "./SwipeableImages";
import locationIcon from '../images/location.png';
import coinIcon from '../images/coin.png';
import cashIcon from '../images/cash.png';
import timeIcon from '../images/time.png';
import callIcon from '../images/call.png';
import cuisineIcon from '../images/cuisine.png';

const useStyles = makeStyles({
  borderBottom: {
    borderBottom: "2px solid #000",
    position: "absolute",
    top: "25.5%",
    left: "6.5%",
    bottom: 0,
    height: "40%",
    width: "44%",
  },
  borderLeft: {
    borderLeft: "2px solid #000",
    position: "absolute",
    top: "25.5%",
    left: "6.5%",
    bottom: 0,
    height: "40%",
  },
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
});

function Restaurant(props) {
  const classes = useStyles();
  const { loading } = useSelector((state) => state.data);
  const {
    name,
    imageUrl,
    tags,
    costForOne,
    minOrderAmount,
    payment,
    address,
  } = props;
  let paymentString;
  let phoneNo;
  let addressString;

  if (address) {
    phoneNo = address.phoneNo;
    addressString = `${address.aptName}, ${address.locality}, ${address.street}`;
  }

  if (payment ? payment.length === 1 : null)
    paymentString = `Accepts ${payment[0].toLowerCase()} payment`;

  if (payment ? payment.length === 2 : null)
    paymentString = `Accepts ${payment[0].toLowerCase()} & ${payment[1].toLowerCase()} payments`;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid container direction="row">
            <Grid item xs={false} sm={1} />
            <Grid item xs={12} sm={6} style={{ marginTop: 120 }}>
              <Typography
                gutterBottom
                variant="h4"
                component="h2"
                style={{ fontStyle: "bold" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <img src={cuisineIcon} alt="logo" width='20px' height='20px'/>
                &nbsp; {tags}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <img src={coinIcon} alt="logo" width='20px' height='20px'/>
                &nbsp; Costs Rs.{costForOne} for one
              </Typography>
              <Typography variant="body2" color="textPrimary">
                <img src={cashIcon} alt="logo" width='20px' height='20px'/>
                &nbsp; Minimum order Rs.{minOrderAmount}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                &nbsp; &nbsp; &nbsp; &nbsp;{paymentString}
              </Typography>
      
              <Typography variant="body2" color="textPrimary">
                <img src={locationIcon} alt="logo" width='20px' height='20px'/>
                &nbsp; Address: {addressString}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                <img src={callIcon} alt="logo" width='20px' height='20px'/>
                &nbsp; Call: +91 {phoneNo} 
              </Typography>
              <Typography variant="body2" color="textPrimary">
                <img src={timeIcon} alt="logo" width='20px' height='20px'/>
                &nbsp; Dine-In Timing: 1pm to 12am
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ marginTop: 34 }}>
              {imageUrl ? (
                <SwipeableImages images={imageUrl} type="restaurant" />
              ) : null}
            </Grid>
            <div className={classes.borderLeft}></div>
            <div className={classes.borderBottom}></div>
            <Grid item xs={false} sm={1} />
          </Grid>
        </>
      )}
    </>
  );
}

export default React.memo(Restaurant);
