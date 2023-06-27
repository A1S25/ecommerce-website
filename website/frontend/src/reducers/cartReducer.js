import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO,
  ADD_TO_WISHLIST, REMOVE_WISHLIST } from "../constants/cartConstants";
  
  export const cartReducer = (state = { cartItems: [], shippingInfo: {}, wishlistItems: [] }, action ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
  
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
        console.log(isItemExist);
  
        if (isItemExist) {
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };

        case ADD_TO_WISHLIST:
          const wishlistItem = action.payload;

          const isItemExists = state.wishlistItems.find((i) => i.product === wishlistItem.product);
        
          if (isItemExists) {
            return {
              ...state,
              wishlistItems: state.wishlistItems.map((i) =>
                i.product === isItemExists.product ? wishlistItem : i
              ),
            };
          } else {
            return {
              ...state,
              wishlistItems: [...state.wishlistItems, wishlistItem],
            };
          }

    case REMOVE_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((i) => i.product !== action.payload),
      };
  
      default:
        return state;
    }
  };