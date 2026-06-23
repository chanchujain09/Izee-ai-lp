/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, CheckCircle2, Brain, BarChart3, Rocket, TrendingUp, Zap, Bot, Handshake, Target, Briefcase, Settings, Lightbulb, Star } from "lucide-react";

export default function App() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states matching Name*, Email*, Phone*, State*, City*, Query* from reference image
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    query: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Dynamic States & Cities inside India (Bangalore / Premier Institution themes)
  const statesList = [
    { name: "Karnataka", cities: ["Bangalore", "Mysore", "Mangalore", "Hubli"] },
    { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Thane"] },
    { name: "Delhi", cities: ["New Delhi", "Dwarka", "Noida"] },
    { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai"] },
    { name: "Telangana", cities: ["Hyderabad", "Warangal", "Secunderabad"] },
  ];

  const currentCities = statesList.find((s) => s.name === formData.state)?.cities || [];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^[0-9\s-]{10,12}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      errors.phone = "Enter a valid phone number";
    }
    if (!formData.state) errors.state = "State is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.query.trim()) errors.query = "Query is required";
    return errors;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* ---------------- BACKGROUND DETAILS ---------------- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

      {/* Red Aura glows for white background */}
      <div className="absolute top-[18%] left-[30%] w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.05)_0%,transparent_70%)] blur-[50px] pointer-events-none z-0" />
      <div className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.04)_0%,transparent_75%)] pointer-events-none z-0" />

      {/* Subtle details */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40 select-none">
        <div className="relative w-[340px] sm:w-[540px] lg:w-[720px] aspect-square">
          
          <motion.div 
            className="absolute inset-0 rounded-full border border-red-500/10 shadow-[0_0_80px_rgba(239,68,68,0.03)]"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[15%] rounded-full border border-dashed border-red-500/10"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[30%] rounded-full border border-rose-500/10"
            animate={{ rotate: 180 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          />

        </div>
      </div>

      {/* ---------------- BRAND HEADER ---------------- */}
      <header className="sticky top-0 z-50 w-full border-b border-red-700 bg-red-600/95 backdrop-blur-xl shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 group">
            <div className="relative py-2 transition-all duration-300">
              <img
                src="https://izeeinstitutions.com/wp-content/uploads/2024/12/Logo-1-1.png.webp"
                alt="iZee Institutions Logo"
                referrerPolicy="no-referrer"
                onLoad={() => setLogoLoaded(true)}
                className={`h-12 sm:h-14 w-auto object-contain transition-all duration-500 hover:scale-105 filter drop-shadow-md brightness-0 invert ${
                  logoLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
              {!logoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-2 bg-red-700/50 px-3 py-1.5 rounded-full border border-red-500/50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="text-xs font-mono tracking-widest font-bold text-white uppercase">Admissions Live 2026</span>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN APP CONTENT ---------------- */}
      <main className="flex-1 w-full flex flex-col relative z-10">
        
        {/* HERO SECTION */}
        <section className="max-w-7xl w-full mx-auto px-6 py-12 md:py-16 flex flex-col justify-center min-h-[calc(100vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT SIDE: GRAPHICAL DETAILS & HEADER ELEMENTS */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6">
            
            {/* 1. Rounded Pill: "AI-POWERED LEADERSHIP!" */}
            <div className="flex justify-center lg:justify-start">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-red-50 border border-red-200 shadow-sm"
              >
                <span className="text-xs font-mono tracking-[0.22em] uppercase text-red-700 font-extrabold">
                  AI-POWERED LEADERSHIP!
                </span>
              </motion.div>
            </div>

            {/* 3. Hero Title & Underline Layout matching reference image exactly */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-col space-y-3"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-slate-900 leading-tight">
                  {"Bangalore’s"}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-rose-500" style={{ filter: "drop-shadow(0 0 10px rgba(239,68,68,0.15))" }}>
                    Ai-First
                  </span>{" "}
                  MBA
                </h1>
                
                {/* Thin white/light accent horizontal separator underneath title */}
                <div className="w-36 h-[2.5px] bg-[#ef4444] rounded-full mx-auto lg:mx-0 shadow-[0_0_10px_#ef4444]" />
              </motion.div>

              {/* 4. Paragraph blurb matching image */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
              >
                Business Leadership. Powered by Artificial Intelligence.
              </motion.p>
            </div>

            {/* Features overlay checklist built to highlight professional iZee pedigree */}
            <div className="grid grid-cols-1 gap-3 max-w-xl mx-auto lg:mx-0 pt-2 text-left">
              <div className="flex items-center space-x-2.5 bg-white p-3 rounded-lg border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
                <span className="text-red-500 font-extrabold text-base">✔</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">AI Integrated Curriculum</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white p-3 rounded-lg border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
                <span className="text-red-500 font-extrabold text-base">✔</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">IBM Global Certification</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white p-3 rounded-lg border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.03)]">
                <span className="text-red-500 font-extrabold text-base">✔</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700">Earn While You Learn</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: HIGH-FIDELITY RED/WHITE REGISTER NOW CARD */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full bg-white rounded-xl border-t-4 border-t-red-600 border border-slate-200 shadow-[0_15px_40px_rgba(220,38,38,0.1)] px-6 py-8 sm:px-8 sm:py-9 relative"
            >
              {/* Form header: "Register Now" */}
              <div className="text-center mb-6">
                <h2 className="text-lg sm:text-xl font-bold tracking-widest text-slate-900 uppercase select-none">
                  Register Now
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    
                    {/* Name Field */}
                    <div className="space-y-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name*"
                        className={`w-full px-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500/35 transition-all ${
                          formErrors.name ? "border-red-500/80" : "border-slate-200 focus:border-red-500"
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-red-400 font-medium ml-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email*"
                        className={`w-full px-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500/35 transition-all ${
                          formErrors.email ? "border-red-500/80" : "border-slate-200 focus:border-red-500"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-red-400 font-medium ml-1">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-1">
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone*"
                        className={`w-full px-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500/35 transition-all ${
                          formErrors.phone ? "border-red-500/80" : "border-slate-200 focus:border-red-500"
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-[11px] text-red-400 font-medium ml-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* State Selector Field */}
                    <div className="space-y-1">
                      <div className="relative">
                        <select
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500/35 transition-all appearance-none cursor-pointer ${
                            formErrors.state ? "border-red-500/80" : "border-slate-200 focus:border-red-500"
                          }`}
                        >
                          <option value="" disabled className="bg-white">State*</option>
                          {statesList.map((s) => (
                            <option key={s.name} value={s.name} className="bg-white">{s.name}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      {formErrors.state && (
                        <p className="text-[11px] text-red-400 font-medium ml-1">{formErrors.state}</p>
                      )}
                    </div>

                    {/* City Selector Field */}
                    <div className="space-y-1">
                      <div className="relative">
                        <select
                          id="city"
                          name="city"
                          required
                          disabled={!formData.state}
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500/35 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                            formErrors.city ? "border-red-500/80" : "border-slate-200 focus:border-red-500"
                          }`}
                        >
                          <option value="" disabled className="bg-white">City*</option>
                          {currentCities.map((c) => (
                            <option key={c} value={c} className="bg-white">{c}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      {formErrors.city && (
                        <p className="text-[11px] text-red-400 font-medium ml-1">{formErrors.city}</p>
                      )}
                    </div>

                    {/* Query Field */}
                    <div className="space-y-1">
                      <input
                        id="query"
                        name="query"
                        type="text"
                        required
                        value={formData.query}
                        onChange={handleInputChange}
                        placeholder="Query*"
                        className={`w-full px-4 py-3 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500/35 transition-all ${
                          formErrors.query ? "border-red-500/80" : "border-slate-200 focus:border-red-500"
                        }`}
                      />
                      {formErrors.query && (
                        <p className="text-[11px] text-red-400 font-medium ml-1">{formErrors.query}</p>
                      )}
                    </div>

                    {/* Solid button matching theme */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white py-3.5 px-4 rounded-lg transition-all duration-150 flex items-center justify-center cursor-pointer font-bold shadow-lg shadow-red-600/20 active:scale-99"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          <span className="text-sm font-semibold">Processing...</span>
                        </>
                      ) : (
                        <span className="text-sm font-bold tracking-wide">SUBMIT INQUIRY</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 shadow-sm">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Inquiry Received</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 px-1">
                        Thank you <strong className="text-slate-900">{formData.name}</strong>. Your academic inquiry has been registered. Our Bangalore team will reach you on <span className="text-red-600 font-semibold">{formData.phone}</span> in a few business hours.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: "", email: "", phone: "", state: "", city: "", query: "" });
                      }}
                      className="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-slate-600 underline cursor-pointer"
                    >
                      ← Back to Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          </div>
        </section>

        {/* ---------------- SECTION 2: PLACEMENT STATS ---------------- */}
        <section className="w-full bg-slate-50 border-t border-slate-200 py-24 relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Left Card: Graphic & Title */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm min-h-[450px] flex flex-col">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
                
                {/* Content Overlay */}
                <div className="relative z-10 pt-12 px-8 sm:px-12 pb-8">
                  <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-display font-black leading-[1.1] text-slate-900 tracking-tight">
                    The Future Doesn't Reward Degrees.<br/>
                    <div className="inline-block relative mt-4 transform -rotate-1">
                      <span className="absolute inset-0 bg-gradient-to-r from-red-100 via-red-200 to-rose-100 shadow-sm" />
                      <span className="relative z-10 px-4 py-1 block text-red-900">It Rewards Capability.</span>
                    </div>
                  </h3>
                </div>
                
                {/* Image Masked at Bottom */}
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  className="absolute bottom-0 w-full h-[65%] object-cover object-top opacity-95"
                  style={{ WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)' }}
                  alt="Students collaborating" 
                />
              </div>

              {/* Right Card: Statistics Grid */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-bl-full pointer-events-none opacity-50" />
                <h3 className="text-2xl sm:text-3xl font-display text-slate-900 mb-10 tracking-tight relative z-10">Placement Statistics</h3>
                
                <div className="grid grid-cols-2 text-left relative z-10">
                  {/* Stat 1 */}
                  <div className="pr-4 sm:pr-8 pb-8 sm:pb-12 border-b border-r border-slate-100">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 mb-2 tracking-tight">350+</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider leading-relaxed">Recruiting<br/>Companies</div>
                  </div>
                  
                  {/* Stat 2 */}
                  <div className="pl-6 sm:pl-8 pb-8 sm:pb-12 border-b border-slate-100">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 mb-2 tracking-tight">95%</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider leading-relaxed">Placement<br/>Support</div>
                  </div>
                  
                  {/* Stat 3 */}
                  <div className="pr-4 sm:pr-8 pt-8 sm:pt-12 border-r border-slate-100">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 mb-2 tracking-tight">18.7 <span className="text-2xl sm:text-3xl font-medium tracking-normal text-slate-400">LPA</span></div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider leading-relaxed">Highest<br/>Package</div>
                  </div>
                  
                  {/* Stat 4 */}
                  <div className="pl-6 sm:pl-8 pt-8 sm:pt-12">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 mb-2 tracking-tight">1000+</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider leading-relaxed">Placed<br/>Students</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ---------------- SECTION 3: THE PROGRAMME CONCEPT (2x2 Grid) ---------------- */}
        <section className="w-full relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Block 1: Dark Slate Text Area */}
            <div className="bg-slate-900 px-6 py-10 lg:px-12 lg:py-16 flex flex-col justify-center order-1">
              <h2 className="text-2xl lg:text-3xl font-display text-white mb-4 leading-tight tracking-tight">
                <span className="font-light">The MBA Your Seniors Did</span><br/>
                <span className="font-bold">Is Not The MBA You Need.</span>
              </h2>
              <div className="text-slate-300 font-medium space-y-2 mb-6 text-[13px] lg:text-sm leading-relaxed max-w-md">
                <p>The workplace has changed.<br/>The tools have changed.<br/>The expectations have changed.</p>
                <p>Yet most MBA programs still prepare students for yesterday's jobs.<br/>Companies today hire professionals who understand:</p>
              </div>
              <ul className="space-y-2">
                {[
                  'AI', 
                  'Data', 
                  'Automation', 
                  'Digital Business', 
                  'Real-world problem solving'
                ].map(item => (
                  <li key={item} className="flex items-center space-x-3 text-white font-medium text-[13px] lg:text-sm">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Block 2: Image Top Right */}
            <div className="relative min-h-[250px] lg:min-h-full order-2">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070" 
                alt="Modern Tech Workspace" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>

            {/* Block 3: Image Bottom Left */}
            <div className="relative min-h-[250px] lg:min-h-full order-4 lg:order-3">
              <img 
                src="https://images.unsplash.com/photo-1620712948343-008423f0146c?auto=format&fit=crop&q=80&w=2071" 
                alt="AI Network" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>

            {/* Block 4: Dark Slate Text Area */}
            <div className="bg-slate-900 px-6 py-10 lg:px-12 lg:py-16 flex flex-col justify-center order-3 lg:order-4">
              <h2 className="text-2xl lg:text-3xl font-display text-white mb-4 leading-tight tracking-tight">
                <span className="font-light">Why Choose The</span><br/>
                <span className="font-bold">AI-First MBA?</span>
              </h2>
              <p className="text-slate-300 font-medium text-[13px] lg:text-sm leading-relaxed mb-8 max-w-md">
                Unlike traditional MBA programs, AI isn't taught as a separate subject. It's integrated across your business learning journey.
              </p>
              
              <h3 className="text-lg lg:text-xl font-bold font-display text-white mb-4">What Makes It Different?</h3>
              <ul className="space-y-2">
                {[
                  'AI Across Every Business Function', 
                  'Real Industry Projects', 
                  'Corporate Mentorship', 
                  'Business Simulations', 
                  'Industry Certifications', 
                  'Career Acceleration Framework'
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-white font-medium text-[13px] lg:text-sm">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* ---------------- SECTION 4: CAREER OPPORTUNITIES ---------------- */}
        <section className="w-full bg-white py-24 lg:py-32 relative overflow-hidden border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col space-y-6 relative z-10 lg:pr-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-900 leading-tight">
                Career Opportunities<br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-red-600 font-medium mt-2 block font-sans tracking-tight">after AI MBA</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-lg mt-2">
                The future belongs to professionals who can combine business thinking with AI-powered decision making.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-lg">
                Our AI-First MBA prepares students for emerging roles across consulting, marketing, business strategy, analytics, operations, and digital transformation.
              </p>
            </div>

            {/* Right Content - Vertical Scrolling Marquee */}
            <div className="relative h-[450px] lg:h-[550px] overflow-hidden flex justify-start lg:justify-end">
              {/* Top/Bottom Fade Masks */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
              
              <motion.div 
                className="flex flex-col gap-5 items-start lg:items-end w-max max-w-full pr-2"
                animate={{ y: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
              >
                {/* Double the list for seamless infinite scroll */}
                {[
                  { role: 'AI Strategy Consultant', icon: <Brain className="w-5 h-5 text-red-600" /> },
                  { role: 'Business Intelligence Analyst', icon: <BarChart3 className="w-5 h-5 text-red-600" /> },
                  { role: 'Product Manager', icon: <Rocket className="w-5 h-5 text-red-600" /> },
                  { role: 'Growth Manager', icon: <TrendingUp className="w-5 h-5 text-red-600" /> },
                  { role: 'Digital Transformation Specialist', icon: <Zap className="w-5 h-5 text-red-600" /> },
                  { role: 'AI Business Analyst', icon: <Bot className="w-5 h-5 text-red-600" /> },
                  { role: 'Customer Success Manager', icon: <Handshake className="w-5 h-5 text-red-600" /> },
                  { role: 'Marketing Analytics Manager', icon: <Target className="w-5 h-5 text-red-600" /> },
                  { role: 'Business Development Manager', icon: <Briefcase className="w-5 h-5 text-red-600" /> },
                  { role: 'Operations Excellence Manager', icon: <Settings className="w-5 h-5 text-red-600" /> },
                  { role: 'Innovation Consultant', icon: <Lightbulb className="w-5 h-5 text-red-600" /> },
                  { role: 'Entrepreneur / Startup Founder', icon: <Star className="w-5 h-5 text-red-600" /> },
                  { role: 'AI Strategy Consultant', icon: <Brain className="w-5 h-5 text-red-600" /> },
                  { role: 'Business Intelligence Analyst', icon: <BarChart3 className="w-5 h-5 text-red-600" /> },
                  { role: 'Product Manager', icon: <Rocket className="w-5 h-5 text-red-600" /> },
                  { role: 'Growth Manager', icon: <TrendingUp className="w-5 h-5 text-red-600" /> },
                  { role: 'Digital Transformation Specialist', icon: <Zap className="w-5 h-5 text-red-600" /> },
                  { role: 'AI Business Analyst', icon: <Bot className="w-5 h-5 text-red-600" /> },
                  { role: 'Customer Success Manager', icon: <Handshake className="w-5 h-5 text-red-600" /> },
                  { role: 'Marketing Analytics Manager', icon: <Target className="w-5 h-5 text-red-600" /> },
                  { role: 'Business Development Manager', icon: <Briefcase className="w-5 h-5 text-red-600" /> },
                  { role: 'Operations Excellence Manager', icon: <Settings className="w-5 h-5 text-red-600" /> },
                  { role: 'Innovation Consultant', icon: <Lightbulb className="w-5 h-5 text-red-600" /> },
                  { role: 'Entrepreneur / Startup Founder', icon: <Star className="w-5 h-5 text-red-600" /> },
                ].map((item, i) => (
                  <div key={i} className="pl-3 pr-8 py-3 outline outline-1 outline-slate-100 bg-white/80 backdrop-blur-md rounded-full shadow-[0_8px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.08)] transition-all whitespace-nowrap flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl bg-slate-50 border border-slate-100 shadow-sm flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-slate-800 text-lg sm:text-xl font-bold tracking-tight">{item.role}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
          </div>
        </section>

        {/* ---------------- SECTION 5: AI-FIRST MBA EDGE ---------------- */}
        <section className="w-full bg-white py-20 lg:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-slate-900 tracking-tight mb-4">
                Why The AI-First MBA Gives You An Edge
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                The future belongs to professionals who can combine business thinking, AI capabilities, and real-world execution.
              </p>
            </div>

            {/* Image banner with floating cards */}
            <div className="relative rounded-2xl overflow-hidden mb-6 shadow-sm border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" 
                alt="Business edge"
                className="absolute inset-0 w-full h-full object-cover origin-center scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
              
              <div className="relative z-10 px-6 py-12 lg:px-12 lg:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                  {/* Card 1 */}
                  <div className="bg-white rounded-xl p-5 shadow-lg transform transition-transform hover:-translate-y-1 border border-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full pointer-events-none opacity-50" />
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm relative z-10">1</div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-2.5 leading-snug relative z-10 tracking-tight">Future-Ready Business Skills</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium relative z-10">Develop practical business and AI capabilities that align with the evolving needs of modern organizations.</p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white rounded-xl p-5 shadow-lg transform transition-transform hover:-translate-y-1 border border-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full pointer-events-none opacity-50" />
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm relative z-10">2</div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-2.5 leading-snug relative z-10 tracking-tight">Real Industry Exposure</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium relative z-10">Gain insights from industry leaders, corporate mentors, and real-world business environments.</p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white rounded-xl p-5 shadow-lg transform transition-transform hover:-translate-y-1 border border-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full pointer-events-none opacity-50" />
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm relative z-10">3</div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-2.5 leading-snug relative z-10 tracking-tight">Professional Advantage</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium relative z-10">Build a stronger profile through practical experience, projects, certifications, and industry engagement.</p>
                  </div>
                  {/* Card 4 */}
                  <div className="bg-white rounded-xl p-5 shadow-lg transform transition-transform hover:-translate-y-1 border border-slate-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full pointer-events-none opacity-50" />
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm mb-4 shadow-sm relative z-10">4</div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-2.5 leading-snug relative z-10 tracking-tight">Leadership For The AI Era</h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium relative z-10">Learn how to make better decisions, solve complex business challenges, and lead in an AI-driven world.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Strip */}
            <div className="bg-slate-900 rounded-xl mt-6 py-6 px-10 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
                {/* Eligibility */}
                <div className="flex items-center space-x-4 md:justify-center pt-2 md:pt-0">
                  <div className="w-10 h-10 border border-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base tracking-tight mb-0.5">Eligibility</h4>
                    <p className="text-slate-200 text-xs">Bachelor's Degree from a Recognized University (50% & Above)</p>
                  </div>
                </div>
                
                {/* Duration */}
                <div className="flex items-center space-x-4 md:justify-center pt-6 md:pt-0 md:pl-4">
                  <div className="w-10 h-10 border border-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base tracking-tight mb-0.5">Duration</h4>
                    <p className="text-slate-200 text-xs">2-Year Full-Time MBA</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4 md:justify-center pt-6 md:pt-0 md:pl-4">
                  <div className="w-10 h-10 border border-white/20 rounded-md flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base tracking-tight mb-0.5">Location</h4>
                    <p className="text-slate-200 text-xs">Bangalore Campus</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ---------------- SECTION 6: TOP RECRUITERS ---------------- */}
        <section className="w-full bg-white py-20 lg:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 space-y-8 lg:space-y-0">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif text-slate-900 tracking-tight flex items-center gap-2">
                Top <span className="italic font-medium text-slate-800">Recruiters</span>
              </h2>
              
              {/* Category Pills */}
              <div className="flex overflow-x-auto hide-scrollbar space-x-2.5 pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 scroll-smooth">
                {[
                  { name: 'Consulting', active: true },
                  { name: 'Finance and Fintech', active: false },
                  { name: 'Large Tech', active: false },
                  { name: 'Venture Capital', active: false },
                  { name: 'Consumer Tech', active: false },
                  { name: 'Emerging', active: false }
                ].map((tag, i) => (
                  <button 
                    key={i} 
                    className={`flex-shrink-0 px-6 py-2.5 rounded-full border text-[13.5px] font-medium transition-colors whitespace-nowrap
                    ${tag.active 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-transparent text-slate-800 border-slate-800 hover:bg-slate-50'}`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop / Tablet Grid (Sparse Matrix matching image) */}
            <div className="hidden md:grid grid-cols-6 border-slate-200 w-full mb-8" style={{ gridAutoRows: 'minmax(110px, auto)' }}>
              
              {/* Row 1 */}
              <div className="flex items-center justify-center p-6"></div>
              <div className="flex items-center justify-center p-6"></div>
              <div className="flex items-center justify-center p-6 border-b border-r border-l border-slate-200">
                <span className="font-sans font-medium text-slate-800 tracking-widest text-[15px]">KEARNEY</span>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                 <span className="font-serif font-semibold text-slate-800 text-sm leading-tight text-center">McKinsey <br/> & Company</span>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <div className="flex flex-col items-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 mb-1.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
                    <path d="M11 6L16 11H8L11 6Z" fill="currentColor"/>
                  </svg>
                  <span className="text-[8px] uppercase font-bold text-slate-500 tracking-widest">BAIN & COMPANY</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <span className="font-serif font-bold text-slate-600 text-2xl tracking-tighter">BCG</span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-center p-6"></div>
              <div className="flex items-center justify-center p-6 border-b border-r border-l border-slate-200">
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex space-x-0.5">
                    <div className="w-4 h-4 bg-slate-800 rounded-sm transform skew-x-[-20deg]"></div>
                    <div className="w-4 h-4 bg-slate-800 rounded-sm transform skew-x-[-20deg]"></div>
                  </div>
                  <span className="text-[12px] font-sans font-semibold text-slate-800 mt-1">OliverWyman</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-600 self-end leading-none translate-y-1 translate-x-2">&gt;</span>
                  <span className="text-xl font-bold text-slate-900 tracking-tight">accenture</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                 <div className="flex flex-col items-center">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-slate-500" fill="currentColor"><path d="M12 2L2 12l3 3 7-7 7 7 3-3L12 2z"/></svg>
                    <span className="text-[6px] font-sans font-bold text-slate-500 text-center uppercase tracking-[0.2em] mt-1.5">SAMAGRA SHIKSHA ABHIYAN</span>
                 </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <span className="font-sans font-black text-slate-800 text-3xl italic relative pr-3">EY<span className="w-4 h-[3px] bg-yellow-400 absolute top-1 right-0 transform -rotate-12"></span></span>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <span className="font-sans font-bold text-slate-900 text-xl tracking-tight">Deloitte<span className="text-green-500 text-2xl leading-none">.</span></span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-center p-6 border-b border-r border-l border-t border-slate-200">
                <div className="flex items-end space-x-1.5">
                  <div className="grid grid-cols-2 gap-0.5 translate-y-[-2px]">
                    <div className="w-2 h-2 bg-[#d04a02] rounded-[1px]"></div>
                    <div className="w-2 h-2 bg-[#eb8c00] rounded-[1px]"></div>
                    <div className="w-2 h-2 bg-[#e0301e] rounded-[1px]"></div>
                    <div className="w-2 h-2 bg-[#ffb600] rounded-[1px]"></div>
                  </div>
                  <span className="font-serif font-bold text-slate-900 text-xl leading-none lowercase">pwc</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border-[1.5px] border-slate-400 rounded-full flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[13px] font-bold text-slate-600 leading-none mb-0.5 tracking-tight">AVALON</span>
                    <span className="text-[10px] text-slate-500 leading-none">Consulting</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <div className="flex items-center space-x-1.5">
                  <span className="font-serif italic text-4xl text-slate-400 leading-none -translate-y-1">t</span>
                  <div className="flex flex-col items-start">
                    <span className="text-[14px] font-medium text-slate-600 leading-none mb-0.5">akshashila</span>
                    <span className="text-[6px] text-slate-300 leading-none tracking-widest uppercase">CONSULTING</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                 <span className="font-sans font-black text-slate-800 text-xl tracking-tighter lowercase">acuvon</span>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <div className="flex flex-col items-center">
                  <span className="font-sans font-bold text-slate-600 text-lg tracking-tight lowercase">virtusa</span>
                  <span className="text-slate-400 tracking-widest uppercase mt-0.5" style={{fontSize: '5px'}}>Accelerating Business Outcomes</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6"></div>

              {/* Row 4 */}
              <div className="flex items-center justify-center p-6 border-b border-r border-l border-slate-200">
                <span className="font-sans font-medium text-slate-400 text-lg tracking-widest uppercase">TEKION</span>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <div className="flex flex-col items-start">
                  <span className="font-sans font-semibold text-slate-500 text-[14px] lowercase flex items-center tracking-tight">
                    thou<span className="w-2.5 h-2.5 border-[1.5px] border-slate-400 rounded-full mx-0.5 relative flex items-center justify-center"><span className="w-full h-[1px] bg-slate-400"></span></span>entric labs
                  </span>
                  <span className="font-bold text-white bg-slate-600 px-0.5 rounded-sm self-end mt-1 uppercase" style={{fontSize: '4px'}}>RESOLVE.EVOLVE</span>
                  <span className="text-slate-500 self-end mt-0.5" style={{fontSize: '4px'}}>A Xoriant Company</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-1 mb-1">
                    <span className="font-sans font-black text-slate-800 text-xl tracking-tight">HEX</span>
                    <div className="w-5 h-5 border-[1.5px] border-slate-400 rounded-[2px] transform rotate-45 flex items-center justify-center -ml-1">
                      <div className="w-2 h-2 bg-slate-200 rounded-[1px]"></div>
                    </div>
                  </div>
                  <span className="text-[7px] text-slate-500 uppercase tracking-[0.2em] mt-0.5">Advisory Group</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 border-b border-r border-slate-200">
                <div className="border-[1.5px] border-slate-600 px-3 py-1">
                  <span className="font-sans font-bold text-slate-700 text-[10px] tracking-widest uppercase">URBAN PIPER</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6"></div>
              <div className="flex items-center justify-center p-6"></div>
            </div>

            {/* Mobile / Compact Grid (Continuous list, hiding empties) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border-t border-l border-slate-200 w-full md:hidden">
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                <span className="font-sans font-medium text-slate-800 tracking-widest text-xs">KEARNEY</span>
              </div>
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                 <span className="font-serif font-semibold text-slate-800 text-xs leading-tight text-center">McKinsey <br/> & Company</span>
              </div>
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                <span className="font-serif font-bold text-slate-600 text-xl tracking-tighter">BCG</span>
              </div>
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex space-x-0.5">
                    <div className="w-3 h-3 bg-slate-800 rounded-sm transform skew-x-[-20deg]"></div>
                    <div className="w-3 h-3 bg-slate-800 rounded-sm transform skew-x-[-20deg]"></div>
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-slate-800 mt-1">OliverWyman</span>
                </div>
              </div>
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                <span className="text-base font-bold text-slate-900 tracking-tight">accenture</span>
              </div>
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                <span className="font-sans font-bold text-slate-900 text-base tracking-tight">Deloitte<span className="text-green-500 leading-none">.</span></span>
              </div>
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                <span className="font-serif font-bold text-slate-900 text-lg leading-none lowercase">pwc</span>
              </div>
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                 <span className="font-sans font-black text-slate-800 text-base tracking-tighter lowercase">acuvon</span>
              </div>
              <div className="flex items-center justify-center py-8 px-4 border-b border-r border-slate-200">
                 <span className="font-sans font-bold text-slate-700 text-base tracking-tight lowercase">virtusa</span>
              </div>
            </div>

          </div>
        </section>

        {/* ---------------- SECTION 7: RECOGNITIONS ---------------- */}
        <section className="w-full bg-white py-20 lg:py-28 relative overflow-hidden border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Header Area */}
            <div className="flex flex-col mb-16 max-w-4xl">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-display font-bold text-slate-900 mb-6 leading-tight tracking-wide uppercase">
                Recognized. Ranked.<br/>
                <span className="relative inline-block pb-2 mt-1">
                  Respected.
                  <span className="absolute bottom-0 left-0 w-3/4 h-1.5 bg-red-600 rounded-r-md" />
                </span>
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed max-w-2xl">
                The AI-First MBA is built on the foundation of an institution trusted by students, recruiters, and industry leaders.
              </p>
            </div>

            {/* Grid of Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { title: "Top 100", suffix: "B-Schools in India", iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                { title: "34th Best", suffix: "B-School in India", iconPath: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                { title: "11th Best", suffix: "B-School in South India", iconPath: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
                { title: "Top Emerging", suffix: "B-School in Bangalore", iconPath: "M13 10V3L4 14h7v7l9-11h-7z" },
                { title: "AICTE Approved", suffix: "& Bangalore University Affiliated", iconPath: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
                { title: "Collaborations", suffix: "with IBM & AIMA", iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 rounded-xl p-8 flex flex-col items-center text-center group hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-50/50 rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex flex-col items-center justify-center mb-6 shadow-sm group-hover:bg-white group-hover:border-slate-200 transition-colors duration-300 relative z-10">
                    <svg className="w-7 h-7 text-slate-800" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d={item.iconPath}></path>
                    </svg>
                  </div>
                  <h4 className="text-[17px] font-sans font-bold text-slate-900 mb-2 tracking-tight group-hover:text-red-700 transition-colors relative z-10">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-[180px] relative z-10">
                    {item.suffix}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>

      {/* ---------------- GOLD SCHOLARSHIPS STRIP ON FOOLPROOF FOOTER ---------------- */}
      <footer className="w-full z-10 mt-auto">
        
        {/* Horizontal strip ticker */}
        <div className="w-full bg-slate-50 border-t border-slate-200 py-3.5 px-4 text-center">
          <p className="text-xs sm:text-sm font-extrabold tracking-widest text-red-700 uppercase drop-shadow-sm">
            Scholarships Available - Check Your Eligibility Today
          </p>
        </div>

        {/* Minimal academic copyright line */}
        <div className="w-full bg-white py-4.5 border-t border-slate-100 text-center shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
            <span>
              © 2026 iZee Institutions. Designed and deployed strictly to custom industrial blueprints.
            </span>
            <div className="flex space-x-4">
              <span className="hover:text-red-600 cursor-pointer">Admissions Suite</span>
              <span>•</span>
              <span className="text-slate-400">IBM Strategic Alliance</span>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}
