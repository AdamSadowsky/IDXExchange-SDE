import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<ListingsPage />}/>
        <Route path ="/property/:id" element={<PropertyDetailPage />}/>
      </Routes>
    </ErrorBoundary>
  )
}

export default App;
