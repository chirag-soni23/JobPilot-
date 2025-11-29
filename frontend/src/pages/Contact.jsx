import { useState } from "react";
import { Phone, Mail, MapPin, Twitter, Instagram, Disc } from "lucide-react";
import { useMailData } from "../context/NodeMailerContext.jsx";
import { assets } from "../assets/assets.js";

const Contact = () => {
  const { sendMail, isLoading } = useMailData();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const reset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    name: `${firstName} ${lastName}`.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
  };
  if (!payload.message) return; // empty message guard
  if (await sendMail(payload)) reset();
};


  return (
    <>
      <section className="flex flex-col md:flex-row w-full h-auto font-sans dark:bg-gray-900 transition-colors duration-300">
        <div className="rounded-tr-xl rounded-br-xl relative dark:border-b-2 flex flex-col justify-between md:w-1/3 bg-[#0A65CC] dark:bg-gray-900 text-white p-10 transition-colors duration-300 dark:text-white">
          <div>
            <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
            <p className="text-lg opacity-90 mb-12">Say something!</p>
            <div className="space-y-10">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6" />
                <span className="text-lg">+91 8233877457</span>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6" />
                <span className="text-lg">csoni0693@gmail.com</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6" />
                <span className="text-lg">
                  145 Mumbai Bandra,
                  <br />
                  Kanjurmarg Road, Railway Station
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-16">
            <Twitter className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            <Instagram className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            <Disc className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        <div className="relative md:w-2/3 p-10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="flex flex-col">
              <label className="text-sm mb-2 text-gray-700 dark:text-gray-200">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-gray-800 dark:focus:border-indigo-400 outline-none py-2 text-black dark:text-white"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2 text-gray-700 dark:text-gray-200">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-gray-800 dark:focus:border-indigo-400 outline-none py-2 text-black dark:text-white"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2 text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-gray-800 dark:focus:border-indigo-400 outline-none py-2 text-black dark:text-white"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-2 text-gray-700 dark:text-gray-200">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 1234567890"
                className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-gray-800 dark:focus:border-indigo-400 outline-none py-2 text-black dark:text-white"
                required
              />
            </div>
            <div className="col-span-full mt-6 flex flex-col">
              <label className="text-sm mb-2 text-gray-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message.."
                className="bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-gray-800 dark:focus:border-indigo-400 outline-none py-2 resize-none text-black dark:text-white"
                required
              />
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                disabled={isLoading}
                className="ml-auto block bg-[#0A65CC] hover:bg-[#084d9bcf] text-white px-8 py-4 rounded shadow-lg hover:shadow-xl transition disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          <img
            src={assets.send}
            alt=""
            className="pointer-events-none select-none absolute -bottom-1 -left-80 w-72"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;
