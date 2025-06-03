"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { serviceOptions, budgetOptions } from "@/data/contactForm";
import { useContactModalStore } from "@/lib/zustand/stores";
export interface ContactFormRef {
  submit: () => void;
}

const ContactForm = forwardRef<ContactFormRef>((_, ref) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    company: false,
    message: false,
    services: false,
    budget: false,
  });
  const toggleModal = useContactModalStore((state) => state.toggleModal);

  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    },
  }));

  // Handle service selection (multiselect)
  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((item) => item !== service));
    } else {
      setServices([...services, service]);
    }
    setErrors({ ...errors, services: false });
  };

  // Handle budget selection (single select)
  const selectBudget = (option: string) => {
    setBudget(option);
    setErrors({ ...errors, budget: false });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset all errors
    const newErrors = {
      name: false,
      email: false,
      company: false,
      message: false,
      services: false,
      budget: false,
      referrals: false,
    };

    // Validate each field
    if (clientData.name.trim() === "") {
      newErrors.name = true;
    }
    if (clientData.email.trim() === "") {
      newErrors.email = true;
    }
    if (clientData.company.trim() === "") {
      newErrors.company = true;
    }
    if (clientData.message.trim() === "") {
      newErrors.message = true;
    }
    if (services.length === 0) {
      newErrors.services = true;
    }
    if (budget === "") {
      newErrors.budget = true;
    }

    setErrors(newErrors);

    // If there are any errors, don't submit
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Add your form submission logic here
    console.log("Form submitted: ");
    console.log(clientData);
    console.log(services);
    console.log(budget);

    // Send email
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: clientData.name,
        email: clientData.email,
        company: clientData.company,
        message: clientData.message,
        services,
        budget,
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully");
      setClientData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
      setServices([]);
      setBudget("");
      setErrors({
        name: false,
        email: false,
        company: false,
        message: false,
        services: false,
        budget: false,
      });
      toggleModal();
    } else {
      console.error("Failed to send email");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* <div className="flex flex-col"> */}
      <h2 className="text-5xl lg:text-8xl font-semibold tracking-tight mb-8 leading-[0.8]">
        <span className="text-[#C56386]">Get in</span>{" "}
        <span className="text-[#5D001D]">touch</span>
      </h2>

      {/* <div className="w-full flex justify-between">
          <p className="font-semibold text-[clamp(16px,1.6vw,24px)] text-[#C56386]">
            Always interested in hearing about new projects and collaborations.
            Please reach out to me with your project details if interested in
            collaborating.
          </p>
        </div> */}
      {/* </div> */}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 h-full"
      >
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          {/* Full name */}
          <div
            className={`flex flex-col justify-end w-full lg:w-1/3 px-6 py-4 h-28 lg:h-32 rounded-xl lg:rounded-2xl bg-[#F0CCDF] border-3 transition-colors duration-300 focus-within:border-[#C56386]
              ${errors.name ? "border-[#d40101]" : "border-[#C56386]/0"}
              `}
          >
            <label
              htmlFor="name"
              className="text-[#C56386] font-semibold text-xl lg:text-2xl"
            >
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={clientData.name}
              onChange={(e) => {
                setClientData({ ...clientData, name: e.target.value });
                setErrors({ ...errors, name: false });
              }}
              placeholder="Fiona Wong"
              className="text-[#C56386] font-semibold placeholder:text-[#C56386]/40 text-xl lg:text-2xl focus:outline-none"
            />
          </div>

          {/* Email */}
          <div
            className={`flex flex-col justify-end w-full lg:w-1/3 px-6 py-4 h-28 lg:h-32 rounded-xl lg:rounded-2xl bg-[#F0CCDF] border-3 transition-colors duration-300 focus-within:border-[#C56386]
              ${errors.email ? "border-[#d40101]" : "border-[#C56386]/0"}
              `}
          >
            <label
              htmlFor="email"
              className="text-[#C56386] font-semibold text-xl lg:text-2xl"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={clientData.email}
              onChange={(e) => {
                setClientData({ ...clientData, email: e.target.value });
                setErrors({ ...errors, email: false });
              }}
              placeholder="fionawong@gmail.com"
              className="text-[#C56386] font-semibold placeholder:text-[#C56386]/40 text-xl lg:text-2xl focus:outline-none"
            />
          </div>

          {/* Company */}
          <div
            className={`flex flex-col justify-end w-full lg:w-1/3 px-6 py-4 h-28 lg:h-32 rounded-xl lg:rounded-2xl bg-[#F0CCDF] border-3 transition-colors duration-300 focus-within:border-[#C56386]
              ${errors.company ? "border-[#d40101]" : "border-[#C56386]/0"}
              `}
          >
            <label
              htmlFor="company"
              className="text-[#C56386] font-semibold text-xl lg:text-2xl"
            >
              Company
            </label>
            <input
              type="text"
              name="company"
              value={clientData.company}
              onChange={(e) => {
                setClientData({ ...clientData, email: e.target.value });
                setErrors({ ...errors, email: false });
              }}
              placeholder="Fifi Vintage"
              className="text-[#C56386] font-semibold placeholder:text-[#C56386]/40 text-xl lg:text-2xl focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-full h-full">
          {/* Message */}
          <div
            className={`flex flex-col w-full lg:w-1/3 px-6 pt-12 lg:pt-16 pb-4 h-72 lg:h-full rounded-xl lg:rounded-2xl bg-[#F0CCDF] border-3 transition-colors duration-300 focus-within:border-[#C56386]
              ${errors.message ? "border-[#d40101]" : "border-[#C56386]/0"}
              `}
          >
            <label
              htmlFor="message"
              className="text-[#C56386] font-semibold text-xl lg:text-2xl mb-2"
            >
              Project details
            </label>
            <textarea
              name="message"
              value={clientData.message}
              onChange={(e) => {
                setClientData({ ...clientData, message: e.target.value });
                setErrors({ ...errors, message: false });
              }}
              placeholder="Tell me you goals"
              className="text-[#C56386] font-semibold placeholder:text-[#C56386]/40 text-xl lg:text-2xl leading-tight focus:outline-none h-full resize-none"
            ></textarea>
          </div>

          {/* Services */}
          <div
            className={`flex flex-col w-full lg:w-1/3 px-6 pt-12 lg:pt-16 pb-6 lg:h-full rounded-xl lg:rounded-2xl bg-[#F0CCDF] border-3 transition-colors duration-300 focus-within:border-[#C56386]
              ${errors.services ? "border-[#d40101]" : "border-[#C56386]/0"}
              `}
          >
            <label
              htmlFor="services"
              className="text-[#C56386] font-semibold text-xl lg:text-2xl mb-2"
            >
              What can I do for you?
            </label>
            <ul className="flex flex-wrap gap-2 w-full">
              {serviceOptions.map((service) => (
                <li
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`px-3.5 py-1.5 font-semibold rounded-full border-2 border-[#C56386] cursor-pointer transition-colors duration-300 ease-in-out
                    ${
                      services.includes(service)
                        ? "text-[#F0CCDF] bg-[#C56386]"
                        : "text-[#C56386]"
                    }`}
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Budget */}
          <div
            className={`flex flex-col w-full lg:w-1/3 px-6 pt-12 lg:pt-16 pb-6 h-96 lg:h-full rounded-xl lg:rounded-2xl bg-[#F0CCDF] border-3 transition-colors duration-300 focus-within:border-[#C56386]
              ${errors.budget ? "border-[#d40101]" : "border-[#C56386]/0"}
              `}
          >
            <label
              htmlFor="budget"
              className="text-[#C56386] font-semibold text-xl lg:text-2xl mb-2"
            >
              Do you have a budget range?
            </label>
            <ul className="flex flex-wrap gap-2 w-full">
              {budgetOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => selectBudget(option)}
                  className={`px-3.5 py-1.5 font-semibold rounded-full border-2 border-[#C56386] cursor-pointer transition-colors duration-300 ease-in-out
                    ${
                      budget === option
                        ? "text-[#F0CCDF] bg-[#C56386]"
                        : "text-[#C56386]"
                    }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
