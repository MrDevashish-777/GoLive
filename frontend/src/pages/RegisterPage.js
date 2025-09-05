import { Button, Container, TextField, Typography } from '@mui/material';

const RegisterPage = () => (
  <Container maxWidth="xs" sx={{ mt: 8 }}>
    <Typography variant="h5" align="center" gutterBottom>Register</Typography>
    <form>
      <TextField label="Username" fullWidth margin="normal" required />
      <TextField label="Email" fullWidth margin="normal" required />
      <TextField label="Password" type="password" fullWidth margin="normal" required />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </form>
  </Container>
);

export default RegisterPage;
