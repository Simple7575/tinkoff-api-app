import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import Header from './components/Header'
// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Main from './pages/Main'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      {/* <Route path="/admin" element={<AdminWebApp />} errorElement={<AdminWebAppError />}>
        <Route index element={<Welcome />} />
        <Route path=":userID" element={<PlansLayout />}>
          <Route path="plans" errorElement={<ErrorPlans />}>
            <Route index element={<SubscriptionPlans />} loader={getSubscriptionPlans} />
            <Route path="create" element={<CreateNewPlan />} errorElement={<ErrorPlans />} />
            <Route path="plan/:subName" errorElement={<ErrorPlans />}>
              <Route index element={<SubscriptionPlan />} />
              <Route
                path="nameanddescription"
                element={<NameAndDescription />}
                loader={getSubscriptionPlan}
              />
              <Route path="durationandprice" element={<Duration />} loader={getSubscriptionPlan} />
              <Route
                path="groupsandchanneles"
                element={<GroupsChanneles />}
                loader={getGroupsAndChanneles}
              />
              <Route path="delete" element={<DeletePlan />} loader={getSubscriptionPlan} />
            </Route>
          </Route>
          <Route path="bots" errorElement={<ErrorBots />}>
            <Route index element={<Bots />} loader={getSubBots} />
            <Route path="create" element={<CreateNewBot />} loader={getSubscriptionPlans} />
            <Route path="bot/:token">
              <Route index element={<Bot />} loader={getSubBot} />
              <Route path="connectplan" element={<ConnectPlan />} loader={getPlansAndBot} />
              <Route path="setstartmessage" element={<SetStartMessage />} loader={getSubBot} />
              <Route path="delete" element={<DeleteBot />} loader={getSubBot} />
              <Route path="onoff" element={<OnOff />} loader={getSubBot} />
            </Route>
          </Route>
        </Route>
      </Route> */}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
)

function App(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <RouterProvider router={router} />

      {/* <Login /> */}
    </div>
  )
}

export default App
