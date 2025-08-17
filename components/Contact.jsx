import React from 'react';
import { useParams } from 'react-router-dom';

export default function Contact() {
  const prams = useParams()
  console.log(prams)
  return <h1>Contact Us</h1>;
}
