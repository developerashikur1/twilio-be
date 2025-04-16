import { Payment as PaymentIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { paymentAPI } from '../services/api';

function Payment() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await paymentAPI.getBalance();
      setBalance(response.data.balance);
    } catch (err) {
      setError('Failed to fetch balance');
    }
  };

  const handleAddBalance = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await paymentAPI.createPaymentIntent({ amount: parseFloat(amount) });
      
      // Here you would typically redirect to Stripe Checkout
      // For now, we'll simulate a successful payment
      await paymentAPI.addBalance({ amount: parseFloat(amount) });
      setSuccess('Balance added successfully!');
      setAmount('');
      fetchBalance();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add balance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Balance
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Current Balance
            </Typography>
            <Typography variant="h4" color="primary">
              ${balance.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>

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
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="10.00"
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          startIcon={<PaymentIcon />}
          onClick={handleAddBalance}
          disabled={loading || !amount || parseFloat(amount) <= 0}
          fullWidth
          sx={{ py: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Balance'}
        </Button>
      </Box>
    </Container>
  );
}

export default Payment; 