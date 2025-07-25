import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    // Return only the necessary data for the success page
    res.status(200).json({
      id: session.id,
      customer_email: session.customer_email,
      payment_status: session.payment_status,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ message: 'Error retrieving session data' });
  }
} 