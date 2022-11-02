import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import myAxios, { myPrivateAxios } from '../config/axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function EventDetailsPage() {
  const [event, setEvent] = useState([]);
  const navigate = useNavigate();
  // console.log(event);
  // const getEventDetailsById = ({ events }) => {
  //   // setEventId(events.eventId);
  //   // navigate('/events/:eventId');
  // };
  const eventId = useParams();
  console.log(eventId);

  const getEventById = async () => {
    try {
      console.log('try');
      await myAxios({ method: 'GET', url: `/event/id/${eventId.eventId}` }).then((res) => {
        console.log(res.data);
        setEvent(res.data);
      });
      console.log('success');
    } catch (err) {
      console.log('error');
      console.log(err.response);
    }
  };

  const getSeats = () => {
    navigate(`/buytickets/${event.eventId}`);
  };

  useEffect(() => {
    getEventById();
  }, []);

  return (
    <div>
      <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
        <Stack spacing={2}>
          <Item>
            <Typography color="primary" variant="h6">
              {event.eventName}
            </Typography>
          </Item>

        </Stack>
      </Box>
      <Card
        sx={{
          maxWidth: '80%',
          margin: 'auto',
          mt: 5,
          borderRadius: 2,
          boxShadow: 1,
          height: '50%',
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="1%"
            image={`${process.env.PUBLIC_URL}/static/trial.jpg`}
            alt="../../public/static/trial.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Date :
              {event.eventDate}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Timings :
              {event.eventStartTime}
              -
              {event.eventEndTime}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Age Limit :
              {event.eventAge}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Artists : Description
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>

          <Button sx={{ '&:hover': { backgroundColor: 'lightblue' } }} onClick={() => { getSeats(); }} size="small" color="primary">
            Continue for booking
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default EventDetailsPage;
