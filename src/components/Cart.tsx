import React from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { X, Send, Tag } from 'lucide-react';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { discountSettings } = useAdmin();

  const calculateItemPrice = (item: typeof state.items[0]) => {
    const { product, quantity } = item;
    if (
      product.hasDiscount &&
      discountSettings.discountedProducts.includes(product.id) &&
      state.items.length >= discountSettings.minItems
    ) {
      return (product.discountPrice || product.price) * quantity;
    }
    return product.price * quantity;
  };

  const total = state.items.reduce(
    (sum, item) => sum + calculateItemPrice(item),
    0
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const sendToWhatsApp = () => {
    const message = `🛒 *Nuevo Pedido de CPS ORIGINAL*\n\n` +
      state.items.map(item => {
        const itemPrice = calculateItemPrice(item);
        const isDiscounted = item.product.hasDiscount && 
          discountSettings.discountedProducts.includes(item.product.id) &&
          state.items.length >= discountSettings.minItems;
        
        return `*${item.product.name}*\n` +
          `Cantidad: ${item.quantity}\n` +
          `Precio: ${formatPrice(itemPrice)}${isDiscounted ? ' 🏷️' : ''}\n`;
      }).join('\n') +
      `\n*Total: ${formatPrice(total)}*\n\n` +
      `Por favor, confirma mi pedido 🙏`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+573334000164?text=${encodedMessage}`, '_blank');
  };

  if (state.items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Tu carrito está vacío
      </div>
    );
  }

  return (
    <div className="p-4">
      {state.items.map((item) => {
        const isDiscounted = item.product.hasDiscount && 
          discountSettings.discountedProducts.includes(item.product.id) &&
          state.items.length >= discountSettings.minItems;

        return (
          <div
            key={item.product.id}
            className="flex items-center justify-between py-2 border-b"
          >
            <div className="flex items-center gap-2">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h4 className="font-medium">{item.product.name}</h4>
                <p className="text-sm text-gray-500">
                  {isDiscounted ? (
                    <>
                      <span className="line-through">{formatPrice(item.product.price)}</span>
                      <span className="ml-2 text-green-600">{formatPrice(item.product.discountPrice || item.product.price)}</span>
                      <Tag className="inline-block ml-2 w-4 h-4 text-green-600" />
                    </>
                  ) : (
                    formatPrice(item.product.price)
                  )}
                  {' x '}{item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: {
                      productId: item.product.id,
                      quantity: parseInt(e.target.value) || 1,
                    },
                  })
                }
                className="w-16 px-2 py-1 border rounded"
              />
              <button
                onClick={() =>
                  dispatch({ type: 'REMOVE_ITEM', payload: item.product.id })
                }
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        );
      })}
      <div className="mt-4">
        <div className="text-xl font-bold mb-4">
          Total: {formatPrice(total)}
        </div>
        {state.items.length >= discountSettings.minItems && (
          <p className="text-green-600 text-sm mb-2">
            <Tag className="inline-block mr-2 w-4 h-4" />
            ¡Descuento aplicado en productos elegibles!
          </p>
        )}
        <button
          onClick={sendToWhatsApp}
          className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
        >
          <Send size={20} />
          Enviar a WhatsApp
        </button>
      </div>
    </div>
  );
};