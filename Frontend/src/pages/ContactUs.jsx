import React from "react";
import { sendMail } from "../Utils/SendMail";

function ContactUs() {
    return (
        <div className="w-full flex justify-center items-center py-28 bg-gray-100">
            {/* Contact Form */}
            <form
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-4"
                onSubmit={sendMail}
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Contact Us
                </h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                >
                    Send Email
                </button>
            </form>
        </div>
    );
}

export default ContactUs;
