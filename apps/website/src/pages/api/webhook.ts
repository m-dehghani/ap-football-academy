import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;
    
    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      await handleRecurringPayment(invoice);
      break;
    
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      await handleFailedPayment(failedInvoice);
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    // Get the registration data from session metadata
    const registrationData = JSON.parse(session.metadata?.registrationData || '{}');
    
    // Here you would typically:
    // 1. Save the registration to your database
    // 2. Create a user account
    // 3. Send welcome email with training schedule
    // 4. Add to mailing list
    
    console.log('Registration completed successfully:', {
      sessionId: session.id,
      customerEmail: session.customer_email,
      program: session.metadata?.program,
      registrationData: registrationData,
    });
    
    // For now, just log the successful registration
    // In production, you would save this to your database
    
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

async function handleRecurringPayment(invoice: Stripe.Invoice) {
  try {
    // Handle recurring monthly payments
    console.log('Recurring payment successful:', {
      invoiceId: invoice.id,
      customerEmail: invoice.customer_email,
      amount: invoice.amount_paid,
    });
    
    // Here you would typically:
    // 1. Update user's subscription status
    // 2. Send payment confirmation email
    // 3. Ensure continued access to training
    
  } catch (error) {
    console.error('Error handling recurring payment:', error);
  }
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  try {
    // Handle failed payments
    console.log('Payment failed:', {
      invoiceId: invoice.id,
      customerEmail: invoice.customer_email,
      amount: invoice.amount_due,
    });
    
    // Here you would typically:
    // 1. Send payment failed notification
    // 2. Suspend access if multiple failures
    // 3. Offer payment retry options
    
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
} 