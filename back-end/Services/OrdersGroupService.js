const OrdersGroup = require("../Models/orders/OrdersGroup");
const { getProductById } = require("../Repositories/ProductRepository");
const { getVarientById } = require("../Repositories/VarientRepository");
const { getCartById } = require("./CartService");
const {
  createOrderFromCartItem,
  createOrderFromProduct,
  confirmOrder,
  removeOrder,
} = require("./OrderService");

const createOrderGroup = async (cart_id, customer_id) => {
  const cart = await getCartById(cart_id);
  const cart_items = cart.cart_items;

  const ordersGroup = new OrdersGroup();

  for (cart_item in cart_items) {
    const order = await createOrderFromCartItem(cart_item, customer_id);
    ordersGroup.order_items.push({
      product_id: order.order_item.product_id,
      varient_id: order.order_item.varient_id,
      varient_name: order.order_item.varient_name,
      order_id: order.id,
    });
  }
  ordersGroup.c_id = customer_id;
  const savedOrdersGroup = await ordersGroup.save();
  return savedOrdersGroup;
};

const getOrderGroup = async (orderGroup_id) => {
  const ordersGroup = await OrdersGroup.findById(orderGroup_id);
  return ordersGroup;
};

const createSingleOrderGroup = async (
  product_id,
  customer_id,
  varient_id,
  customization
) => {
  const product = await getProductById(product_id);
  const varient = await getVarientById(varient_id);
  const order = await createOrderFromProduct(
    product,
    customer_id,
    varient,
    customization
  );
  const ordersGroup = new OrdersGroup({
    order_items: [
      {
        order_id: order.id,
        product_id: product_id,
        varient_id: order.order_item.varient_id,
        varient_name: order.order_item.varient_name,
      },
    ],
    c_id: customer_id,
  });
  const savedOrdersGroup = ordersGroup.save();
  return savedOrdersGroup;
};

const cancelOrderGroup = async (orderGroupId, customer_id) => {
  const orderGroup = await getOrderGroup(orderGroupId);
  for (var i = 0; i < orderGroup.order_items.length; i++) {
    const order_item = orderGroup.order_items[i];
    const product = await getProductById(order_item.product_id);
    const artist_id = product.artist.artist_id;
    console.log(order_item);
    await removeOrder(order_item.order_id, customer_id, artist_id);
  }

  // delete orderGroup
};

const confirmOrderGroup = async (orderGroupId, order_details, customer_id) => {
  const orderGroup = await getOrderGroup(orderGroupId);
  for (var i = 0; i < orderGroup.order_items.length; i++) {
    const order_item = orderGroup.order_items[i];
    console.log(order_item);
    const confirmedOrder = await confirmOrder(
      order_item.order_id,
      order_details,
      customer_id
    );
  }

  orderGroup.order_status = "PAYMENT_NOT_RECIEVED";
  await orderGroup.save();
  return orderGroup;
};

module.exports = {
  createOrderGroup,
  createSingleOrderGroup,
  getOrderGroup,
  cancelOrderGroup,
  confirmOrderGroup,
};
