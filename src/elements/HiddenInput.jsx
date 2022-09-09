import React from "react";
import styled from "styled-components";
export function HiddenInput(props){

  const [type, setType] = React.useState('password')
  return  (
    <FlexRow>
      <input type={type} {...props} />
      <button type="button" onClick={()=>setType(s=>s=="password"?"text":"password")}>
        {type=="password" ? "show" : "hide" }
      </button>
    </FlexRow>
  );
}
const FlexRow = styled.div`
  display:flex;
  gap:5px;
`
