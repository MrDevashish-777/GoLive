import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <Container maxWidth="sm" sx={{ mt: 8 }}>
    <Typography variant="h3" align="center" gutterBottom>
      Creator’s Stream Hub
    </Typography>
    <Typography align="center" sx={{ mb: 4 }}>
      Go live, chat, and connect with your fans in real-time.
    </Typography>
    <Button component={Link} to="/login" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
      Login
    </Button>
    <Button component={Link} to="/register" variant="outlined" color="primary" fullWidth>
      Register
    </Button>
  </Container>
);

export default HomePage;
