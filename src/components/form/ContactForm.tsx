"use client";

import { useState } from "react";
import { playfair_display } from "@/fonts";
import {
  serviceOptions,
  budgetOptions,
  referralOptions,
} from "@/data/contactForm";

export default function ContactForm() {
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [referrals, setReferrals] = useState<string[]>([]);

  // Handle service selection (multiselect)
  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((item) => item !== service));
    } else {
      setServices([...services, service]);
    }
  };

  // Handle budget selection (single select)
  const selectBudget = (option: string) => {
    setBudget(option);
  };

  // Handle referral selection (multiselect)
  const toggleReferral = (referral: string) => {
    if (referrals.includes(referral)) {
      setReferrals(referrals.filter((item) => item !== referral));
    } else {
      setReferrals([...referrals, referral]);
    }
  };

  return (
    <div
      className="flex flex-col"
    >
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold mb-8">
        Get in touch
      </h2>

      <form className="flex flex-col lg:flex-row gap-12 lg:gap-8">
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
              placeholder="Full name"
              required
              className="w-full py-3 px-5 rounded-full font-normal bg-transparent focus:outline-none border border-stone-300 focus:border-stone-900 hover:border-stone-900 placeholder:text-stone-400 transition-colors duration-300 ease-in-out"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full py-3 px-5 rounded-full font-normal bg-transparent focus:outline-none border border-stone-300 focus:border-stone-900 hover:border-stone-900 placeholder:text-stone-400 transition-colors duration-300 ease-in-out"
            />
          </div>

          <input
            type="text"
            name="company"
            placeholder="Company name (optional)"
            className="w-full py-3 px-5 rounded-full font-normal bg-transparent focus:outline-none border border-stone-300 focus:border-stone-900 hover:border-stone-900 placeholder:text-stone-400 transition-colors duration-200 ease-in-out"
          />

          <textarea
            name="message"
            placeholder="Spill the tea!"
            className="w-full h-full resize-none p-5 rounded-xl font-normal bg-transparent focus:outline-none border border-stone-300 focus:border-stone-900 hover:border-stone-900 placeholder:text-stone-400 transition-colors duration-200 ease-in-out"
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
}
