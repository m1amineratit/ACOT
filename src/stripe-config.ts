export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  features: string[];
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_STAfWMRBS8PKKc',
    priceId: 'price_1RYEKYRxebcXidgt16XSFQ9J',
    name: 'Premium Monthly',
    description: 'Unlimited access to all features with advanced AI capabilities.',
    mode: 'subscription',
    price: 9.99,
    currency: 'usd',
    features: [
      'Unlimited email generation',
      'Unlimited voice messages',
      '7 advanced tone options',
      'Industry-specific templates',
      'Email analytics & scoring',
      'Email history & export',
      'Priority support',
      'A/B testing for subject lines',
      'Response rate tracking'
    ]
  },
  {
    id: 'prod_lifetime',
    priceId: 'price_lifetime',
    name: 'Lifetime Access',
    description: 'One-time payment for lifetime access to all premium features.',
    mode: 'payment',
    price: 99.99,
    currency: 'usd',
    features: [
      'Everything in Premium Monthly',
      'Lifetime access - no recurring fees',
      'Future feature updates included',
      'VIP support',
      'Early access to new features',
      'Custom integrations',
      'White-label options'
    ]
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};