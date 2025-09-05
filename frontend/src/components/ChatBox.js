import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const ChatBox = () => (
  <Paper sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6">Live Chat</Typography>
    {/* TODO: Render chat messages here */}
    <Box sx={{ mt: 2 }}>
      <TextField fullWidth placeholder="Type a message..." />
      <Button variant="contained" color="primary" sx={{ mt: 1 }}>Send</Button>
    </Box>
  </Paper>
);

export default ChatBox;
