import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getPrisma } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { registrationId } = req.body;

  if (!registrationId) {
    return res.status(400).json({ message: 'Registration ID is required' });
  }

  try {
    const db = await getPrisma();

    // Get registration with program details
    const registration = await db.registration.findUnique({
      where: { id: registrationId },
      include: {
        user: true,
        program: {
          include: { coach: true },
        },
      },
    });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'irr',
            product_data: {
              name: registration.program.name,
              description: `برنامه تمرینی با مربی ${registration.program.coach.firstName} ${registration.program.coach.lastName}`,
            },
            unit_amount: registration.totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/register?canceled=true`,
      customer_email: registration.user.email,
      metadata: {
        registrationId: registration.id,
        userId: registration.user.id,
        programId: registration.program.id,
      },
    });

    // Update registration with Stripe session ID
    await db.registration.update({
      where: { id: registrationId },
      data: {
        stripeSessionId: session.id,
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Error creating checkout session' });
  }
}