import React from 'react';
import { createRoot } from 'react-dom/client';
import RouterApp from './router';
import "../sass/main.scss";
import "cropperjs/dist/cropper.css";
import "react-datepicker/dist/react-datepicker.css";

// dooooommmm
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterApp/>);