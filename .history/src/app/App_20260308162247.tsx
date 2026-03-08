import { RouterProvider } from 'react-router';
import { router } from '.js';
import { Toaster } from '.js';
import { UserProvider } from '.js';

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserProvider>
  );
}
