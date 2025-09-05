import { Button, Paper, TextField, Typography } from '@mui/material';

const DonationForm = () => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6">Send a Gift</Typography>
    {/* TODO: Integrate with Stripe and gifting API */}
    <TextField fullWidth label="Amount (tokens)" type="number" sx={{ mt: 2 }} />
    <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
      Donate
    </Button>
  </Paper>
);

export default DonationForm;
