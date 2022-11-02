import { useEffect, useState } from 'react';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import myAxios, { myPrivateAxios } from '../config/axios';
import EventDetailsPage from './EventDetailsPage';
// import trial from '../../public/static/trial.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvent] = useState([]);
  const getEvents = async () => {
    try {
      console.log('try');
      await myAxios({ method: 'GET', url: '/event/all' }).then((res) => {
        console.log(res.data);
        setEvent(res.data);
      });
      console.log('success');
    } catch (err) {
      console.log('error');
      console.log(err.response);
    }
  };

  const getEventDetailsById = ({ event }) => {
    navigate(`/events/${event.eventId}`);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
        <Stack spacing={2}>
          <Item>
            <Typography color="primary" variant="h">
              List of Events!
            </Typography>
          </Item>

        </Stack>
      </Box>
      {events.map((event) => (
        // <Box sx={{ width: '80%' }} mt={5} key={event.eventId}>
        //   <Stack spacing={2}>
        //     <Item>
        //       Item 1
        //
        //         SHOW
        //       </Button>
        //     </Item>
        //     <Item>Item 2</Item>
        //     <Item>Item 3</Item>

        //   </Stack>
        // </Box>

        <Card
          sx={{
            maxWidth: '80%', margin: 'auto', mt: 5, borderRadius: 2, boxShadow: 1,
          }}
          key={event.eventId}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="100"
              image={`${process.env.PUBLIC_URL}/static/trial.jpg`}
              alt="../../public/static/trial.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {event.eventName}
                {event.eventId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Artists : Description
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>

            <Button size="small" onClick={() => { getEventDetailsById({ event }); }} sx={{ '&:hover': { backgroundColor: 'lightblue' } }} color="primary">
              SHOW
            </Button>
          </CardActions>
        </Card>
      ))}

      {/* <Stack spacing={2} direction="row">
        <Button variant="text" onClick={() => { getEvents(); }}>Text</Button>
      </Stack> */}
    </>
  );
}

export default EventsPage;

// onClick={navigate('/events/' + {event.eventId})}
// <Button size="small" onClick={() => { getEventDetailsById({ event }); }} color="primary">
// <Button size="small" onClick={() => { getEventDetailsById({ event }); }} color="primary">
