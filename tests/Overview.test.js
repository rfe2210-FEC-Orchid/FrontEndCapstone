import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { render, screen, cleanup, fireEvent } from 'react-test-renderer';

// import App from '../src/Components/App.jsx';
// import AddToCart from '../src/Components/Overview/AddToCart.jsx';
import handleAddToCart from '../src/Components/Overview/AddToCart.jsx';
import CartButton from '../src/Components/Overview/AddToCart.jsx';

Enzyme.configure({ adapter: new Adapter() });

test('I should be able to write a test', () => {
  expect(true).toBe(true);
});

describe('AddToCart', () => {
  it('should call handleAddToCart function on click', () => {
    const buttonClick = jest.fn();
    // const wrapper = shallow(
    //   <AddToCart
    //     options={options}
    //     handleChangeQuantity={handleChangeQuantity}
    //     displayError={displayError}
    //     setDisplayError={setDisplayError}
    //   />
    // );

    const wrapper = shallow(
      <CartButton
        onClick={handleAddToCart}
      />
    );

    const button = wrapper.find(CartButton);
    button.simulate('click');

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
  })
})