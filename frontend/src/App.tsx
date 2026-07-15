import { Navigate, Route, Routes } from "react-router";

import { CreatePersonPage } from "./features/people/pages/CreatePersonPage";
import { PeoplePage } from "./features/people/pages/PeoplePage";
import { PersonDetailsPage } from "./features/people/pages/PersonDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/people" element={<PeoplePage /> } />

      <Route path="/people/:personId" element={<PersonDetailsPage />} />

      <Route path="/people/new" element={<CreatePersonPage /> }/>

      <Route path="*" element={<Navigate to="/people" replace /> }/>
    </Routes>
  );
}

export default App;