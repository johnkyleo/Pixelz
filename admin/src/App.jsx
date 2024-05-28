import NavBar from "./components/NavBar";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <main className="bg-primary text-tertiary">
      <NavBar />
      <Admin/>
    </main>
  )
}