import api from '../utils/api';

class PaymentService {
  async initiatePackagePayment(packageId, amount) {
    try {
      const response = await api.post('/payments/package/initiate', {
        packageId,
        amount
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyPayment(transactionId) {
    try {
      const response = await api.post('/payments/verify', {
        transactionId
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentHistory() {
    try {
      const response = await api.get('/payments/history');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Create instance before exporting
const paymentService = new PaymentService();
export default paymentService;