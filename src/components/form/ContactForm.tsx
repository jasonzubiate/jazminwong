"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { playfair_display } from "@/fonts";
import {
  serviceOptions,
  budgetOptions,
  referralOptions,
} from "@/data/contactForm";
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
  const [referrals, setReferrals] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
    services: false,
    budget: false,
    referrals: false,
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

  // Handle referral selection (multiselect)
  const toggleReferral = (referral: string) => {
    if (referrals.includes(referral)) {
      setReferrals(referrals.filter((item) => item !== referral));
    } else {
      setReferrals([...referrals, referral]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset all errors
    const newErrors = {
      name: false,
      email: false,
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
    console.log(referrals);

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
        referrals,
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
      setReferrals([]);
      setErrors({
        name: false,
        email: false,
        message: false,
        services: false,
        budget: false,
        referrals: false,
      });
      toggleModal();
    } else {
      console.error("Failed to send email");
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-8">
        Get in touch
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-12 lg:gap-8"
      >
        <div className="flex flex-col gap-2 lg:gap-4 w-full lg:w-1/2">
          <p
            className={`${playfair_display.className} mb-1 lg:mb-0 text-2xl font-normal`}
          >
            Your information
          </p>

          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
            <input
              type="text"
              name="name"
              value={clientData.name}
              onChange={(e) => {
                setClientData({ ...clientData, name: e.target.value });
                setErrors({ ...errors, name: false });
              }}
              placeholder="Full name"
              className={`w-full py-3 px-5 rounded-full font-normal bg-transparent focus:outline-none border ${
                errors.name
                  ? "border-[#ff6c9f]"
                  : "border-stone-300 hover:border-stone-900"
              } focus:border-stone-900 placeholder:text-stone-400 transition-colors duration-300 ease-in-out`}
            />
            <input
              type="email"
              name="email"
              value={clientData.email}
              onChange={(e) => {
                setClientData({ ...clientData, email: e.target.value });
                setErrors({ ...errors, email: false });
              }}
              placeholder="Email"
              className={`w-full py-3 px-5 rounded-full font-normal bg-transparent focus:outline-none border ${
                errors.email
                  ? "border-[#ff6c9f]"
                  : "border-stone-300 hover:border-stone-900"
              } focus:border-stone-900 placeholder:text-stone-400 transition-colors duration-300 ease-in-out`}
            />
          </div>

          <input
            type="text"
            name="company"
            value={clientData.company}
            onChange={(e) =>
              setClientData({ ...clientData, company: e.target.value })
            }
            placeholder="Company name (optional)"
            className="w-full py-3 px-5 rounded-full font-normal bg-transparent focus:outline-none border border-stone-300 focus:border-stone-900 hover:border-stone-900 placeholder:text-stone-400 transition-colors duration-200 ease-in-out"
          />

          <textarea
            name="message"
            value={clientData.message}
            onChange={(e) => {
              setClientData({ ...clientData, message: e.target.value });
              setErrors({ ...errors, message: false });
            }}
            placeholder="What are we creating?"
            className={`w-full h-48 sm:h-full resize-none p-5 rounded-xl font-normal bg-transparent focus:outline-none border ${
              errors.message
                ? "border-[#ff6c9f]"
                : "border-stone-300 hover:border-stone-900"
            } focus:border-stone-900 placeholder:text-stone-400 transition-colors duration-200 ease-in-out`}
          />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <p
            className={`${playfair_display.className} mb-1 lg:mb-0 text-2xl font-normal`}
          >
            What can I do for you?
          </p>

          <div className="flex flex-wrap gap-2 lg:gap-3">
            {serviceOptions.map((service) => (
              <div
                key={service}
                onClick={() => toggleService(service)}
                className={`px-5 py-3 font-normal rounded-full border cursor-pointer transition-colors duration-300 ease-in-out
                    ${
                      services.includes(service)
                        ? "text-stone-100 bg-stone-900 border-stone-900"
                        : errors.services
                        ? "border-[#ff6c9f]"
                        : "border-stone-300 hover:border-stone-900"
                    }`}
              >
                {service}
              </div>
            ))}
          </div>

          <p
            className={`${playfair_display.className} mb-1 lg:mb-0 text-2xl font-normal`}
          >
            Do you have a budget range?
          </p>

          <div className="flex flex-wrap gap-2 lg:gap-3">
            {budgetOptions.map((option) => (
              <div
                key={option}
                onClick={() => selectBudget(option)}
                className={`px-5 py-3 font-normal rounded-full border cursor-pointer transition-colors duration-300 ease-in-out
                    ${
                      budget === option
                        ? "text-stone-100 bg-stone-900 border-stone-900"
                        : errors.budget
                        ? "border-[#ff6c9f]"
                        : "border-stone-300 hover:border-stone-900"
                    }`}
              >
                {option}
              </div>
            ))}
          </div>

          <p
            className={`${playfair_display.className} mb-1 lg:mb-0 text-2xl font-normal`}
          >
            How did you hear about me?
          </p>

          <div className="flex flex-wrap gap-2 lg:gap-3">
            {referralOptions.map((referral) => (
              <div
                key={referral}
                onClick={() => toggleReferral(referral)}
                className={`px-5 py-3 font-normal rounded-full border cursor-pointer transition-colors duration-300 ease-in-out
                    ${
                      referrals.includes(referral)
                        ? "text-stone-100 bg-stone-900 border-stone-900"
                        : "border-stone-300 hover:border-stone-900"
                    }`}
              >
                {referral}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
});

ContactForm.displayName = "ContactForm";

export default ContactForm;
