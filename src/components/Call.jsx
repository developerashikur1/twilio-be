import { Phone, PhoneOff } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { callAPI } from '../services/api';

function Call() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeCall, setActiveCall] = useState(null);

  const handleMakeCall = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await callAPI.makeCall({ 
        toNumber: phoneNumber,
        email,
        estimatedDuration: 60 // Default 1 minute
      });
      setActiveCall(response.data);
      setSuccess('Call initiated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to make call');
    } finally {
      setLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      setLoading(true);
      setError('');
      
      await callAPI.endCall(activeCall.callSid, { email });
      setActiveCall(null);
      setSuccess('Call ended successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to end call');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Make a Call
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+1234567890"
          sx={{ mb: 2 }}
        />

        {activeCall ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<PhoneOff />}
            onClick={handleEndCall}
            disabled={loading}
            fullWidth
            sx={{ py: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'End Call'}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<Phone />}
            onClick={handleMakeCall}
            disabled={loading || !phoneNumber || !email}
            fullWidth
            sx={{ py: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Make Call'}
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Call; 