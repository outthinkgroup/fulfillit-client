import styled from "styled-components"

const CheckoutStyledWrapper = styled.div`
  .MyCardElement {
    height: 40px;
    padding: 10px 12px;
    width: 100%;
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .MyCardElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .MyCardElement--invalid {
    border-color: #fa755a;
  }

  .MyCardElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
`
export default CheckoutStyledWrapper
