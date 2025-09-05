import { Container, Grid } from '@mui/material';
import ChatBox from '../components/ChatBox';
import DonationForm from '../components/DonationForm';
import VideoPlayer from '../components/VideoPlayer';

const StreamView = () => (
  <Container maxWidth="lg" sx={{ mt: 4 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <VideoPlayer />
      </Grid>
      <Grid item xs={12} md={4}>
        <ChatBox />
        <DonationForm />
      </Grid>
    </Grid>
  </Container>
);

export default StreamView;
