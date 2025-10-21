import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Protected } from './components/index.js'
import {MyPosts,Home,Login,Signup,AddPost,EditPost,Post} from './pages'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       <Route path="/" element={<Home />} />,
//       <Route path="/posts" element={<AllPosts />} />,
//       <Route path="/posts/:slug" element={<Post />} />,
//       <Route path="/edit-post/:slug" element={<EditPost />} />,
//       <Route path="/add-post" element={<AddPost />} />,
//     ],
//   },
// ])

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home />},
      { path: "/all-posts", element: <Home /> },
      { path: "/my-posts", element: <Protected authentication={true}> <MyPosts /> </Protected> },
      { path: '/login', element: <Protected authentication={false}> <Login /> </Protected> },
      { path: '/signup', element: <Protected authentication={false}> <Signup /> </Protected> },
      { path: '/add-post', element: <Protected authentication={true}> <AddPost /> </Protected> },
      { path: '/edit-post/:id', element: <Protected authentication={true}> <EditPost /> </Protected> },
      { path: '/post/:id', element: <Post /> }
    ]
  }
]  
)



createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
