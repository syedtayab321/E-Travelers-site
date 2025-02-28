import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import countryData from "./../../components/flightsAirportsLists";
import airlinesList from "./../../components/airLinesList";

const FlightFormModal = ({ flight, toggle, isEdit, setFlights, flights }) => {
  // Initial values for the form
  const initialValues = flight || {
    airline: "",
    flightNo: "",
    fromCountry: "",
    fromCity: "",
    fromAirport: "",
    toCountry: "",
    toCity: "",
    toAirport: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    economyPrice: "",
    businessPrice: "",
    firstClassPrice: "",
    seatsAvailable: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    airline: Yup.string().required("Airline is required"),
    flightNo: Yup.string().required("Flight number is required"),
    fromCountry: Yup.string().required("Departure country is required"),
    fromCity: Yup.string().required("Departure city is required"),
    fromAirport: Yup.string().required("Departure airport is required"),
    toCountry: Yup.string().required("Destination country is required"),
    toCity: Yup.string().required("Destination city is required"),
    toAirport: Yup.string().required("Destination airport is required"),
    departureDate: Yup.string().required("Departure date is required"),
    departureTime: Yup.string().required("Departure time is required"),
    arrivalDate: Yup.string().required("Arrival date is required"),
    arrivalTime: Yup.string().required("Arrival time is required"),
    economyPrice: Yup.number().required("Economy price is required"),
    businessPrice: Yup.number().required("Business price is required"),
    firstClassPrice: Yup.number().required("First Class price is required"),
    seatsAvailable: Yup.number().required("Seats available is required"),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    if (isEdit) {
      setFlights(flights.map((f) => (f.id === flight.id ? { ...f, ...values } : f)));
    } else {
      setFlights([...flights, { ...values, id: flights.length + 1 }]);
    }
    toggle();
  };

  // Get list of countries
  const countryOptions = countryData.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  // Get list of cities for a selected country
  const getCityOptions = (countryCode) => {
    const country = countryData.find((c) => c.code === countryCode);
    return country
      ? country.cities.map((city) => ({ value: city.name, label: city.name }))
      : [];
  };

  // Get list of airports for a selected city
  const getAirportOptions = (countryCode, cityName) => {
    const country = countryData.find((c) => c.code === countryCode);
    if (country) {
      const city = country.cities.find((c) => c.name === cityName);
      return city
        ? city.airports.map((airport) => ({
            value: airport.code,
            label: `${airport.name} (${airport.code})`,
          }))
        : [];
    }
    return [];
  };

  // Get list of airlines
  const airlineOptions = airlinesList.map((airline) => ({
    value: airline.code,
    label: airline.name,
  }));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Edit Flight" : "Add New Flight"}
          </h2>
          <button
            onClick={toggle}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Airline */}
                <div>
                  <label className="block text-gray-700">Airline</label>
                  <Select
                    options={airlineOptions}
                    value={airlineOptions.find(
                      (option) => option.value === values.airline
                    )}
                    onChange={(selected) =>
                      setFieldValue("airline", selected.value)
                    }
                    className="w-full"
                  />
                  <ErrorMessage
                    name="airline"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Flight No */}
                <div>
                  <label className="block text-gray-700">Flight No</label>
                  <Field
                    name="flightNo"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="flightNo"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* From Country */}
                <div>
                  <label className="block text-gray-700">From Country</label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find(
                      (option) => option.value === values.fromCountry
                    )}
                    onChange={(selected) => {
                      setFieldValue("fromCountry", selected.value);
                      setFieldValue("fromCity", ""); // Reset city when country changes
                      setFieldValue("fromAirport", ""); // Reset airport when country changes
                    }}
                    className="w-full"
                  />
                  <ErrorMessage
                    name="fromCountry"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* From City */}
                <div>
                  <label className="block text-gray-700">From City</label>
                  <Select
                    options={getCityOptions(values.fromCountry)}
                    value={getCityOptions(values.fromCountry).find(
                      (option) => option.value === values.fromCity
                    )}
                    onChange={(selected) => {
                      setFieldValue("fromCity", selected.value);
                      setFieldValue("fromAirport", ""); // Reset airport when city changes
                    }}
                    isDisabled={!values.fromCountry} // Disable if no country is selected
                    className="w-full"
                  />
                  <ErrorMessage
                    name="fromCity"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* From Airport */}
                <div>
                  <label className="block text-gray-700">From Airport</label>
                  <Select
                    options={getAirportOptions(values.fromCountry, values.fromCity)}
                    value={getAirportOptions(values.fromCountry, values.fromCity).find(
                      (option) => option.value === values.fromAirport
                    )}
                    onChange={(selected) =>
                      setFieldValue("fromAirport", selected.value)
                    }
                    isDisabled={!values.fromCity} // Disable if no city is selected
                    className="w-full"
                  />
                  <ErrorMessage
                    name="fromAirport"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* To Country */}
                <div>
                  <label className="block text-gray-700">To Country</label>
                  <Select
                    options={countryOptions}
                    value={countryOptions.find(
                      (option) => option.value === values.toCountry
                    )}
                    onChange={(selected) => {
                      setFieldValue("toCountry", selected.value);
                      setFieldValue("toCity", ""); // Reset city when country changes
                      setFieldValue("toAirport", ""); // Reset airport when country changes
                    }}
                    className="w-full"
                  />
                  <ErrorMessage
                    name="toCountry"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* To City */}
                <div>
                  <label className="block text-gray-700">To City</label>
                  <Select
                    options={getCityOptions(values.toCountry)}
                    value={getCityOptions(values.toCountry).find(
                      (option) => option.value === values.toCity
                    )}
                    onChange={(selected) => {
                      setFieldValue("toCity", selected.value);
                      setFieldValue("toAirport", ""); // Reset airport when city changes
                    }}
                    isDisabled={!values.toCountry} // Disable if no country is selected
                    className="w-full"
                  />
                  <ErrorMessage
                    name="toCity"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* To Airport */}
                <div>
                  <label className="block text-gray-700">To Airport</label>
                  <Select
                    options={getAirportOptions(values.toCountry, values.toCity)}
                    value={getAirportOptions(values.toCountry, values.toCity).find(
                      (option) => option.value === values.toAirport
                    )}
                    onChange={(selected) =>
                      setFieldValue("toAirport", selected.value)
                    }
                    isDisabled={!values.toCity} // Disable if no city is selected
                    className="w-full"
                  />
                  <ErrorMessage
                    name="toAirport"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Departure Date */}
                <div>
                  <label className="block text-gray-700">Departure Date</label>
                  <Field
                    type="date"
                    name="departureDate"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="departureDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Departure Time */}
                <div>
                  <label className="block text-gray-700">Departure Time</label>
                  <Field
                    type="time"
                    name="departureTime"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="departureTime"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Arrival Date */}
                <div>
                  <label className="block text-gray-700">Arrival Date</label>
                  <Field
                    type="date"
                    name="arrivalDate"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="arrivalDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Arrival Time */}
                <div>
                  <label className="block text-gray-700">Arrival Time</label>
                  <Field
                    type="time"
                    name="arrivalTime"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="arrivalTime"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Economy Price */}
                <div>
                  <label className="block text-gray-700">Economy Price</label>
                  <Field
                    type="number"
                    name="economyPrice"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="economyPrice"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Business Price */}
                <div>
                  <label className="block text-gray-700">Business Price</label>
                  <Field
                    type="number"
                    name="businessPrice"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="businessPrice"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* First Class Price */}
                <div>
                  <label className="block text-gray-700">First Class Price</label>
                  <Field
                    type="number"
                    name="firstClassPrice"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="firstClassPrice"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Seats Available */}
                <div>
                  <label className="block text-gray-700">Seats Available</label>
                  <Field
                    type="number"
                    name="seatsAvailable"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="seatsAvailable"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {isEdit ? "Update Flight" : "Add Flight"}
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FlightFormModal;