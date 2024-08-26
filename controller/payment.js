import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: 'your_key_id', // Replace with your Razorpay key_id
    key_secret: 'your_key_secret', // Replace with your Razorpay key_secret
});

export const payment= async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency,
            receipt: `receipt_order_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};
