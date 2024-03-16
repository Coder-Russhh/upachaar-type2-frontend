import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your form submission logic here, such as sending data to backend or displaying a success message
    console.log(formData);
    // Reset form fields
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div id="contact" className="container mx-auto my-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-8 bg-white rounded-lg border-2 border-black">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-400 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-400 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="border border-gray-400 rounded-md px-3 py-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#0B8FAC] text-white font-bold py-2 px-4 rounded-md hover:bg-[#0A5872] w-full"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center">
          <img
            src=""
            alt="Doctor"
            className="md:block hidden max-h-96 md:max-h-full w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
