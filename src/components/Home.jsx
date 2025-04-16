import { Payment, Phone } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Twilio Call App
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Make calls and manage your balance easily
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Phone />}
              onClick={() => navigate('/call')}
              sx={{ width: '100%', py: 2 }}
            >
              Make a Call
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Payment />}
              onClick={() => navigate('/payment')}
              sx={{ width: '100%', py: 2 }}
            >
              Add Balance
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            How it works
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            1. Add balance to your account
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            2. Make calls to any phone number
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            3. Get refunds for unused minutes
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Home; 