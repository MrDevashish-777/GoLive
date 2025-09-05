import { Button, Container, TextField, Typography } from '@mui/material';

const LoginPage = () => (
  <Container maxWidth="xs" sx={{ mt: 8 }}>
    <Typography variant="h5" align="center" gutterBottom>Login</Typography>
    <form>
      <TextField label="Email" fullWidth margin="normal" required />
      <TextField label="Password" type="password" fullWidth margin="normal" required />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>
    </form>
  </Container>
);

export default LoginPage;
