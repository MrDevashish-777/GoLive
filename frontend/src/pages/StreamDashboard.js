import { Button, Container, Typography } from '@mui/material';

const StreamDashboard = () => (
  <Container maxWidth="md" sx={{ mt: 8 }}>
    <Typography variant="h4" gutterBottom>Stream Dashboard</Typography>
    {/* TODO: List user streams, create new stream, manage invites */}
    <Button variant="contained" color="primary">Create New Stream</Button>
  </Container>
);

export default StreamDashboard;
