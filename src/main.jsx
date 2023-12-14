import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import ErrorPage from "./error-page";
import EditContact, { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader, // loader (ใช้กับ Form method GET หรือเกิดการ Refresh/Re-Render) จะใช้งานกับ useLoaderData Hook มันจะทำการมาดึง loader ที่กำหนดไว้ โดยถ้ามี param url ก็จะส่งมาผ่าน loader ด้วย
    action: rootAction, // action (ใช้กับ Form method POST) คือเมื่อ Submit Form ของ react-router-dom จะส่งข้อมูลต่างไปที่ action ที่กำหนด ซึ่งที่น่าส่นใจ คือ request (ex: request body), params (params: path param)
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader, // loader (ใช้กับ Form method GET หรือเกิดการ Refresh/Re-Render) จะใช้งานกับ useLoaderData Hook มันจะทำการมาดึง loader ที่กำหนดไว้ โดยถ้ามี param url ก็จะส่งมาผ่าน loader ด้วย
            action: contactAction, // action (ใช้กับ Form method POST) คือเมื่อ Submit Form ของ react-router-dom จะส่งข้อมูลต่างไปที่ action ที่กำหนด ซึ่งที่น่าส่นใจ คือ request (ex: request body), params (params: path param)
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />, // มี element จะแสดง element ก่อนจะยังไม่ทำงานในส่วนของ action
            loader: contactLoader, // loader (ใช้กับ Form method GET หรือเกิดการ Refresh/Re-Render) จะใช้งานกับ useLoaderData Hook มันจะทำการมาดึง loader ที่กำหนดไว้ โดยถ้ามี param url ก็จะส่งมาผ่าน loader ด้วย
            action: editAction, // action (ใช้กับ Form method POST) คือเมื่อ Submit Form ของ react-router-dom จะส่งข้อมูลต่างไปที่ action ที่กำหนด ซึ่งที่น่าส่นใจ คือ request (ex: request body), params (params: path param)
          },
          {
            path: "contacts/:contactId/destroy", // ไม่มี element ทำให้จะไปทำงานที action ทันที
            action: destroyAction, // action (ใช้กับ Form method POST) คือเมื่อ Submit Form ของ react-router-dom จะส่งข้อมูลต่างไปที่ action ที่กำหนด ซึ่งที่น่าส่นใจ คือ request (ex: request body), params (params: path param)
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

// เขียนแบบ JSX Routes
/* const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path="contacts/:contactId/destroy" action={destroyAction} />
      </Route>
    </Route>
  )
); */

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
