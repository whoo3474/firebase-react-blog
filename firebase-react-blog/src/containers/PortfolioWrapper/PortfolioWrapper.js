import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
const styles = {
    card: {
      maxWidth: 345*3,
      margin:'50px auto'
    },
    media: {
      height: 140*3,
    },
  };
class PortfolioWrapper extends Component {
    state={
        slideIndex:1
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <h2> 제목입니다 </h2>
                <Carousel
                slideIndex={this.state.slideIndex}
                afterSlide={slideIndex => this.setState({ slideIndex })}
                cellAlign='center'>
                { [0,1,2,3].map((a)=>
                <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={`http://placehold.it/1000x400/ffffff/c0392b/&text=slide${a}`}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Lizard
                            </Typography>
                            <Typography component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
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
                )}
            </Carousel>
          </div>
        );
    }
}

export default  withStyles(styles)(PortfolioWrapper);