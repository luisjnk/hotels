import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Header from '../components/Header/Header';


test('renders Header component', () => {
  render(
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    >s
      <Header/>
    </BrowserRouter>
  );

  expect(screen.getByText(/Find Hotel by name/i)).toBeInTheDocument();
});