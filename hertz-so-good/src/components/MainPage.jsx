import React, { useState, useEffect } from "react";

const MainPage = ({ user, onSignOut, onSignIn }) => {
  const [location, setLocation] = useState("");
  const [carType, setCarType] = useState("");
  const [rentalDate, setRentalDate] = useState("");
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // Fetch cars data from the JSON file
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/cars.json");
        const carsData = await response.json();
        setCars(carsData);
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter cars based on location and type
    const results = cars.filter(
      (car) =>
        (location ? car.location.toLowerCase().includes(location.toLowerCase()) : true) &&
        (carType ? car.type === carType : true)
    );

    setFilteredCars(results);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#d6d6d6" }}>

      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">HertzSoGood</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Cars
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Locations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  About
                </a>
              </li>
              <li>
                {user ? (
                  <button
                    onClick={onSignOut}
                    className="px-4 py-2 border rounded-lg border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={onSignIn}
                    className="px-4 py-2 border rounded-lg border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Search Form */}
      <main className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Rental Car
          </h2>
          <p className="text-xl text-gray-600">
            Explore our wide range of vehicles for any occasion
          </p>
        </section>

        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Search for Available Cars
          </h3>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSearch}
          >
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Pick-up Location
              </label>
              <input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or airport"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="car-type"
                className="block text-sm font-medium text-gray-700"
              >
                Car Type
              </label>
              <select
                id="car-type"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select car type</option>
                <option value="Economy">Economy</option>
                <option value="Compact">Compact</option>
                <option value="Midsize">Midsize</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="rental-period"
                className="block text-sm font-medium text-gray-700"
              >
                Rental Start Date
              </label>
              <input
                id="rental-period"
                type="date"
                value={rentalDate}
                onChange={(e) => setRentalDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search Available Cars
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {filteredCars.length > 0 && (
          <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 object-cover mb-4 rounded-lg"
                />
                <h4 className="text-lg font-bold">{car.name}</h4>
                <p className="text-sm text-gray-600">{car.modelYear}</p>
                <p className="text-sm text-gray-600">{car.type}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default MainPage;
