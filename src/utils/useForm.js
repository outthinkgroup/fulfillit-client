import React, { useState } from "react";

export default function UseForm(fields) {
  const [form, setForm] = useState({ ...fields });
  function updateForm(e) {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  }
  return [form, updateForm];
}
