
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAppContext } from '../contexts/AppContext';
import { CURRENCY } from '../constants';
import Button from '../components/Button';
import { PaymentMethod, OrderStatus, CartItem } from '../types';

interface OrderConfirmation {
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

const CheckoutPage: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { translate } = useAppContext();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CARTE_BANCAIRE
  );
  const [orderConfirmed, setOrderConfirmed] = useState<OrderConfirmation | null>(null);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    if (!shippingAddress.name || !shippingAddress.address || !shippingAddress.city || !shippingAddress.phone || !shippingAddress.email) {
      alert('Please fill in all shipping address fields.');
      return;
    }

    const newOrder: OrderConfirmation = {
      orderNumber: `ARIA-${Date.now()}`,
      totalAmount: getCartTotal(),
      status: OrderStatus.EN_ATTENTE,
      items: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: selectedPaymentMethod,
    };

    setOrderConfirmed(newOrder);
    clearCart(); 
  };

  const commonInputClasses = "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-aria-accent focus:border-aria-accent text-gray-800 bg-white transition-all duration-200";

  if (orderConfirmed) {
    return (
      <div className="container mx-auto px-4 py-12 text-center bg-white rounded-2xl shadow-xl max-w-2xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">
          {translate('checkout.thankYou')}
        </h1>
        <p className="text-xl text-gray-700 mb-4 font-open-sans">
          {translate('checkout.orderNumber')} <span className="font-semibold text-aria-primary">{orderConfirmed.orderNumber}</span>
        </p>
        <p className="text-xl text-gray-700 mb-4 font-open-sans">
          Total: <span className="font-semibold text-aria-primary">{orderConfirmed.totalAmount.toFixed(2)} {CURRENCY}</span>
        </p>
        <p className="text-xl text-gray-700 mb-8 font-open-sans">
          {translate('checkout.orderStatus')}: <span className="font-semibold text-orange-500">{translate(`orderStatus.${orderConfirmed.status}`)}</span>
        </p>
        <p className="text-lg text-gray-600 font-open-sans leading-relaxed mb-8">
          Un email de confirmation avec les détails de votre commande a été envoyé à <span className="font-semibold">{orderConfirmed.shippingAddress.email}</span>.
        </p>
        <Button onClick={() => window.location.href = '#/'} className="mt-8 py-3 px-8 text-lg">
          {translate('notFound.backHome')}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        {translate('checkout.title')}
      </h1>

      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
        {/* Shipping Address & Payment Method */}
        <div className="lg:w-2/3 space-y-8">
          {/* Shipping Address - White Background */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              {translate('checkout.shippingAddress')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
                  {translate('checkout.name')}
                </label>
                <input type="text" id="name" name="name" value={shippingAddress.name} onChange={handleAddressChange} className={commonInputClasses} required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
                  {translate('checkout.email')}
                </label>
                <input type="email" id="email" name="email" value={shippingAddress.email} onChange={handleAddressChange} className={commonInputClasses} required />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-1">
                  {translate('checkout.address')}
                </label>
                <input type="text" id="address" name="address" value={shippingAddress.address} onChange={handleAddressChange} className={commonInputClasses} required />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-1">
                  {translate('checkout.city')}
                </label>
                <input type="text" id="city" name="city" value={shippingAddress.city} onChange={handleAddressChange} className={commonInputClasses} required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">
                  {translate('checkout.phone')}
                </label>
                <input type="tel" id="phone" name="phone" value={shippingAddress.phone} onChange={handleAddressChange} className={commonInputClasses} required />
              </div>
            </div>
          </div>

          {/* Payment Method - White Background */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              {translate('checkout.paymentMethod')}
            </h2>
            <div className="space-y-4">
              {Object.values(PaymentMethod).map((method) => (
                <label key={method} className="flex items-center space-x-3 cursor-pointer py-3 px-4 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors duration-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={selectedPaymentMethod === method}
                    onChange={() => setSelectedPaymentMethod(method)}
                    className="form-radio h-5 w-5 text-aria-accent border-gray-400 focus:ring-aria-accent"
                  />
                  <span className="text-gray-800 text-lg font-open-sans font-medium">{translate(`checkout.paymentMethod.${method}`)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary - White Background */}
        <div className="lg:w-1/3 bg-white p-8 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.05)] border border-gray-100 h-fit">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">
            {translate('checkout.orderSummary')}
          </h2>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-start text-gray-700 font-open-sans">
                <div>
                  <p className="font-bold text-base text-gray-900">{translate(item.productName)} ({item.quantity}x)</p>
                  <p className="text-sm text-gray-500">
                    {translate(item.selectedDimension.name)}, {translate(item.selectedPaperType.name)}
                  </p>
                </div>
                <span className="font-bold text-base text-right text-aria-primary">
                  {item.totalPrice.toFixed(2)} {CURRENCY}
                </span>
              </div>
            ))}
            <div className="flex justify-between text-lg text-gray-700 pt-4 border-t border-gray-100 mt-4">
              <span>{translate('cart.subtotal')}:</span>
              <span className="font-semibold">{getCartTotal().toFixed(2)} {CURRENCY}</span>
            </div>
            <div className="flex justify-between text-lg text-gray-700">
              <span>{translate('cart.delivery')}:</span>
              <span className="font-semibold text-green-600">Gratuite</span>
            </div>
            <div className="flex justify-between text-3xl font-extrabold text-gray-900 border-t-2 border-gray-100 pt-4 mt-6">
              <span>{translate('cart.totalToPay')}:</span>
              <span className="text-aria-primary">{getCartTotal().toFixed(2)} {CURRENCY}</span>
            </div>
          </div>
          <Button type="submit" className="w-full text-xl py-4 mt-10" disabled={cartItems.length === 0}>
            {translate('checkout.placeOrder')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
