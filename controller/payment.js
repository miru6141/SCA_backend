import Razorpay from 'razorpay';
import  dotenv from 'dotenv';


dotenv.config({
    path:"/.env"
  })
  const RZkey=process.env.RZ_KEY;
const RZsecret=process.env.RZ_SCERET;

const razorpay = new Razorpay({
    key_id:RZkey,  
    key_secret:RZsecret  // Replace with your Razorpay key_secret
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
